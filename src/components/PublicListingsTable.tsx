"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Listing = {
  id: string;
  code: string | null;
  caption: string | null;
  category: string | null;
  city: string | null;
  property_type: string | null;
  furnishing: string | null;
  bedrooms: string | null;
  with_balcony: boolean | null;
  pet_friendly: boolean | null;
  property_name: string | null;
  floor_number: string | null;
  unit_number: string | null;
  area_sqm: number | null;
  leasing_price: number | null;
  selling_price: number | null;
  parking: string | null;
  availability: string | null;
  updated_at: string;
};

type BoolFilter = "" | "true" | "false";
type SortDir = "asc" | "desc";
type SortKey = keyof Listing;

function toLowerSafe(v: string | null | undefined) {
  return (v ?? "").toLowerCase();
}
function parseNumInput(s: string): number | null {
  const t = s.trim();
  if (!t) return null;
  const n = Number(t.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}
function fmtNum(v: number | null) {
  if (v == null) return "";
  return new Intl.NumberFormat("en-PH").format(v);
}
function fmtBool(v: boolean | null) {
  if (v === null) return "";
  return v ? "Yes" : "No";
}

export default function PublicListingsTable() {
  const [rows, setRows] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [globalQ, setGlobalQ] = useState("");
  const [captionQ, setCaptionQ] = useState("");

  const [sortKey, setSortKey] = useState<SortKey>("updated_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    }
  }

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("properties")
        .select(
          "id,code,caption,category,city,property_type,furnishing,bedrooms,with_balcony,pet_friendly,property_name,floor_number,unit_number,area_sqm,leasing_price,selling_price,parking,availability,updated_at"
        )
        .order("updated_at", { ascending: false })
        .limit(5000);

      if (error) {
        setErr(error.message);
        setRows([]);
      } else {
        setRows((data ?? []) as Listing[]);
      }
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = globalQ.toLowerCase();
    const c = captionQ.toLowerCase();

    return rows.filter((r) => {
      if (c && !toLowerSafe(r.caption).includes(c)) return false;
      if (q) {
        const hay = [
          r.code,
          r.caption,
          r.city,
          r.category,
          r.property_type,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [rows, globalQ, captionQ]);

  const sorted = useMemo(() => {
    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null) return -1 * dir;
      if (bv == null) return 1 * dir;
      return av > bv ? dir : -dir;
    });
  }, [filtered, sortKey, sortDir]);

  function toggleSort(k: SortKey) {
    if (sortKey === k) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(k);
      setSortDir("asc");
    }
  }

  if (loading) return <div className="p-6">Loading…</div>;
  if (err) return <div className="p-6 text-red-600">Error: {err}</div>;

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="p-4 border-b flex gap-3">
        <input
          className="border rounded px-3 py-2 w-full max-w-md"
          placeholder="Search…"
          value={globalQ}
          onChange={(e) => setGlobalQ(e.target.value)}
        />
        <button
          className="border rounded px-3 py-2 text-sm"
          onClick={() => {
            setGlobalQ("");
            setCaptionQ("");
          }}
        >
          Reset
        </button>
      </div>

      <div className="overflow-auto max-h-[70vh]">
        <table className="min-w-[1400px] w-full text-sm">
          <thead className="sticky top-0 bg-gray-50 z-10">
            <tr>
              <th className="px-3 py-2 cursor-pointer" onClick={() => toggleSort("code")}>Code</th>
              <th className="px-3 py-2 cursor-pointer min-w-[420px]" onClick={() => toggleSort("caption")}>Caption</th>
              <th className="px-3 py-2">City</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">BR</th>
              <th className="px-3 py-2">Lease</th>
              <th className="px-3 py-2">Updated</th>
            </tr>
            <tr>
              <th />
              <th className="px-2 py-2">
                <input
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Filter caption…"
                  value={captionQ}
                  onChange={(e) => setCaptionQ(e.target.value)}
                />
              </th>
              <th colSpan={5} />
            </tr>
          </thead>

          <tbody>
            {sorted.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50 align-top">
                <td className="px-3 py-2 border-b">{r.code}</td>

                <td className="px-3 py-2 border-b whitespace-pre-line min-w-[420px]">
                  <div className="flex gap-2">
                    <button
                      className="border rounded px-2 py-1 text-xs"
                      onClick={async () => {
                        const ok = await copyText(r.caption ?? "");
                        if (ok) {
                          setCopiedId(r.id);
                          setTimeout(() => setCopiedId(null), 1200);
                        }
                      }}
                    >
                      {copiedId === r.id ? "Copied" : "Copy"}
                    </button>
                    <div>{r.caption}</div>
                  </div>
                </td>

                <td className="px-3 py-2 border-b">{r.city}</td>
                <td className="px-3 py-2 border-b">{r.property_type}</td>
                <td className="px-3 py-2 border-b">{r.bedrooms}</td>
                <td className="px-3 py-2 border-b">{fmtNum(r.leasing_price)}</td>
                <td className="px-3 py-2 border-b">
                  {new Date(r.updated_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
