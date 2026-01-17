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

  // Search
  const [globalQ, setGlobalQ] = useState("");
  const [captionQ, setCaptionQ] = useState("");

  // ✅ Filters you said you still need
  const [balcony, setBalcony] = useState<BoolFilter>("");
  const [pet, setPet] = useState<BoolFilter>("");

  // ✅ Use numeric parsing (so parseNumInput is used) — Lease range filter
  const [leaseMin, setLeaseMin] = useState("");
  const [leaseMax, setLeaseMax] = useState("");

  // Sorting
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

    const nLeaseMin = parseNumInput(leaseMin);
    const nLeaseMax = parseNumInput(leaseMax);

    return rows.filter((r) => {
      // Caption search
      if (c && !toLowerSafe(r.caption).includes(c)) return false;

      // Global search
      if (q) {
        const hay = [
          r.code,
          r.caption,
          r.city,
          r.category,
          r.property_type,
          r.bedrooms,
          r.furnishing,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }

      // ✅ Balcony filter
      if (balcony) {
        const want = balcony === "true";
        if (r.with_balcony !== want) return false;
      }

      // ✅ Pet filter
      if (pet) {
        const want = pet === "true";
        if (r.pet_friendly !== want) return false;
      }

      // ✅ Lease numeric range
      if (nLeaseMin !== null && (r.leasing_price ?? -Infinity) < nLeaseMin)
        return false;
      if (nLeaseMax !== null && (r.leasing_price ?? Infinity) > nLeaseMax)
        return false;

      return true;
    });
  }, [rows, globalQ, captionQ, balcony, pet, leaseMin, leaseMax]);

  const sorted = useMemo(() => {
    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null) return -1 * dir;
      if (bv == null) return 1 * dir;
      // Works fine for strings/numbers/booleans; for dates you still get consistent ordering
      return av > bv ? dir : av < bv ? -dir : 0;
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
      <div className="p-4 border-b flex flex-col md:flex-row md:items-center gap-3">
        <input
          className="border rounded px-3 py-2 w-full md:max-w-md"
          placeholder="Search…"
          value={globalQ}
          onChange={(e) => setGlobalQ(e.target.value)}
        />
        <button
          className="border rounded px-3 py-2 text-sm w-full md:w-auto"
          onClick={() => {
            setGlobalQ("");
            setCaptionQ("");
            setBalcony("");
            setPet("");
            setLeaseMin("");
            setLeaseMax("");
          }}
        >
          Reset
        </button>

        <div className="text-sm text-gray-600 md:ml-auto">
          Showing <strong>{sorted.length}</strong> of{" "}
          <strong>{rows.length}</strong>
        </div>
      </div>

      <div className="overflow-auto max-h-[70vh]">
        <table className="min-w-[1700px] w-full text-sm">
          <thead className="sticky top-0 bg-gray-50 z-10">
            <tr>
              <th
                className="px-3 py-2 cursor-pointer whitespace-nowrap"
                onClick={() => toggleSort("code")}
              >
                Code
              </th>

              <th
                className="px-3 py-2 cursor-pointer min-w-[420px] whitespace-nowrap"
                onClick={() => toggleSort("caption")}
              >
                Caption
              </th>

              <th className="px-3 py-2 whitespace-nowrap">City</th>
              <th className="px-3 py-2 whitespace-nowrap">Type</th>
              <th className="px-3 py-2 whitespace-nowrap">BR</th>

              <th
                className="px-3 py-2 cursor-pointer whitespace-nowrap"
                onClick={() => toggleSort("with_balcony")}
              >
                Balcony
              </th>

              <th
                className="px-3 py-2 cursor-pointer whitespace-nowrap"
                onClick={() => toggleSort("pet_friendly")}
              >
                Pet
              </th>

              <th
                className="px-3 py-2 cursor-pointer whitespace-nowrap"
                onClick={() => toggleSort("leasing_price")}
              >
                Lease
              </th>

              <th
                className="px-3 py-2 cursor-pointer whitespace-nowrap"
                onClick={() => toggleSort("updated_at")}
              >
                Updated
              </th>
            </tr>

            {/* Filter row */}
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

              <th colSpan={3} />

              {/* ✅ Balcony filter */}
              <th className="px-2 py-2">
                <select
                  className="border rounded px-2 py-1 w-full"
                  value={balcony}
                  onChange={(e) => setBalcony(e.target.value as BoolFilter)}
                >
                  <option value="">Any</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </th>

              {/* ✅ Pet filter */}
              <th className="px-2 py-2">
                <select
                  className="border rounded px-2 py-1 w-full"
                  value={pet}
                  onChange={(e) => setPet(e.target.value as BoolFilter)}
                >
                  <option value="">Any</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </th>

              {/* ✅ Lease range filter */}
              <th className="px-2 py-2">
                <div className="flex gap-2">
                  <input
                    className="border rounded px-2 py-1 w-full"
                    placeholder="Min"
                    value={leaseMin}
                    onChange={(e) => setLeaseMin(e.target.value)}
                  />
                  <input
                    className="border rounded px-2 py-1 w-full"
                    placeholder="Max"
                    value={leaseMax}
                    onChange={(e) => setLeaseMax(e.target.value)}
                  />
                </div>
              </th>

              <th />
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
                      title="Copy caption"
                    >
                      {copiedId === r.id ? "Copied" : "Copy"}
                    </button>
                    <div className="select-text">{r.caption}</div>
                  </div>
                </td>

                <td className="px-3 py-2 border-b">{r.city}</td>
                <td className="px-3 py-2 border-b">{r.property_type}</td>
                <td className="px-3 py-2 border-b">{r.bedrooms}</td>

                <td className="px-3 py-2 border-b">{fmtBool(r.with_balcony)}</td>
                <td className="px-3 py-2 border-b">{fmtBool(r.pet_friendly)}</td>

                <td className="px-3 py-2 border-b">{fmtNum(r.leasing_price)}</td>

                <td className="px-3 py-2 border-b whitespace-nowrap">
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
