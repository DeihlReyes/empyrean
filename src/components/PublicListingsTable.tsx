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
  bedrooms: string | null;
  leasing_price: number | null;
  updated_at: string;
};

type SortKey =
  | "code"
  | "caption"
  | "category"
  | "city"
  | "property_type"
  | "bedrooms"
  | "leasing_price"
  | "updated_at";

type SortDir = "asc" | "desc";

function toLowerSafe(v: string | null | undefined) {
  return (v ?? "").toLowerCase();
}

function fmtNum(v: number | null) {
  if (v == null) return "";
  return new Intl.NumberFormat("en-PH").format(v);
}

export default function PublicListingsTable() {
  const [rows, setRows] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [globalQ, setGlobalQ] = useState("");
  const [captionQ, setCaptionQ] = useState("");

  const [sortKey, setSortKey] = useState<SortKey>("updated_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("properties")
        .select(
          "id,code,caption,category,city,property_type,bedrooms,leasing_price,updated_at"
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
          r.category,
          r.city,
          r.property_type,
          r.bedrooms,
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
    if (sortKey === k) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
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
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 cursor-pointer" onClick={() => toggleSort("code")}>Code</th>
              <th className="px-3 py-2 cursor-pointer min-w-[420px]" onClick={() => toggleSort("caption")}>Caption</th>
              <th className="px-3 py-2 cursor-pointer" onClick={() => toggleSort("city")}>City</th>
              <th className="px-3 py-2 cursor-pointer" onClick={() => toggleSort("property_type")}>Type</th>
              <th className="px-3 py-2 cursor-pointer" onClick={() => toggleSort("bedrooms")}>BR</th>
              <th className="px-3 py-2 cursor-pointer" onClick={() => toggleSort("leasing_price")}>Lease</th>
              <th className="px-3 py-2 cursor-pointer" onClick={() => toggleSort("updated_at")}>Updated</th>
            </tr>

            <tr className="bg-white">
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
                  {r.caption}
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
