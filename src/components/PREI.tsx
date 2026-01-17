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

function fmtBool(v: boolean | null) {
  if (v === null) return "";
  return v ? "Yes" : "No";
}

function fmtNum(v: number | null) {
  if (v === null || Number.isNaN(v)) return "";
  return new Intl.NumberFormat("en-PH").format(v);
}

export default function PublicListingsTable() {
  const [rows, setRows] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("properties")
        .select(
          "id,code,caption,category,city,property_type,furnishing,bedrooms,with_balcony,pet_friendly,property_name,floor_number,unit_number,area_sqm,leasing_price,selling_price,parking,availability,updated_at"
        )
        .order("updated_at", { ascending: false })
        .limit(1000);

      if (error) {
        setError(error.message);
        setRows([]);
      } else {
        setRows((data ?? []) as Listing[]);
      }
      setLoading(false);
    })();
  }, []);

  const cities = useMemo(
    () => Array.from(new Set(rows.map((r) => r.city).filter(Boolean))).sort(),
    [rows]
  );
  const categories = useMemo(
    () =>
      Array.from(new Set(rows.map((r) => r.category).filter(Boolean))).sort(),
    [rows]
  );

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();

    return rows.filter((r) => {
      if (city && r.city !== city) return false;
      if (category && r.category !== category) return false;

      if (!qq) return true;
      const hay = [
        r.code,
        r.caption,
        r.city,
        r.category,
        r.property_type,
        r.property_name,
        r.unit_number,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(qq);
    });
  }, [rows, q, city, category]);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="p-4 flex flex-col md:flex-row gap-3 md:items-center bg-white">
        <input
          className="border rounded-md px-3 py-2 w-full md:w-[420px]"
          placeholder="Search code, caption, city, property…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="border rounded-md px-3 py-2 w-full md:w-[220px]"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={String(c)} value={String(c)}>
              {String(c)}
            </option>
          ))}
        </select>

        <select
          className="border rounded-md px-3 py-2 w-full md:w-[220px]"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={String(c)} value={String(c)}>
              {String(c)}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="p-6 bg-white">Loading…</div>
      ) : error ? (
        <div className="p-6 bg-white text-red-600">Error: {error}</div>
      ) : filtered.length === 0 ? (
        <div className="p-6 bg-white text-gray-600">
          No listings yet. (If this is unexpected, your Supabase connection or RLS
          might be blocking reads.)
        </div>
      ) : (
        <div className="overflow-auto bg-white">
          <table className="min-w-[1400px] w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 border-b">Code</th>
                <th className="text-left px-3 py-2 border-b">Caption</th>
                <th className="text-left px-3 py-2 border-b">Category</th>
                <th className="text-left px-3 py-2 border-b">City</th>
                <th className="text-left px-3 py-2 border-b">Type</th>
                <th className="text-left px-3 py-2 border-b">Furnishing</th>
                <th className="text-left px-3 py-2 border-b">BR</th>
                <th className="text-left px-3 py-2 border-b">Balcony</th>
                <th className="text-left px-3 py-2 border-b">Pet</th>
                <th className="text-left px-3 py-2 border-b">Property</th>
                <th className="text-left px-3 py-2 border-b">Floor</th>
                <th className="text-left px-3 py-2 border-b">Unit</th>
                <th className="text-left px-3 py-2 border-b">sqm</th>
                <th className="text-left px-3 py-2 border-b">Lease</th>
                <th className="text-left px-3 py-2 border-b">Sale</th>
                <th className="text-left px-3 py-2 border-b">Parking</th>
                <th className="text-left px-3 py-2 border-b">Availability</th>
                <th className="text-left px-3 py-2 border-b">Updated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b">{r.code ?? ""}</td>
                  <td className="px-3 py-2 border-b">{r.caption ?? ""}</td>
                  <td className="px-3 py-2 border-b">{r.category ?? ""}</td>
                  <td className="px-3 py-2 border-b">{r.city ?? ""}</td>
                  <td className="px-3 py-2 border-b">{r.property_type ?? ""}</td>
                  <td className="px-3 py-2 border-b">{r.furnishing ?? ""}</td>
                  <td className="px-3 py-2 border-b">{r.bedrooms ?? ""}</td>
                  <td className="px-3 py-2 border-b">{fmtBool(r.with_balcony)}</td>
                  <td className="px-3 py-2 border-b">{fmtBool(r.pet_friendly)}</td>
                  <td className="px-3 py-2 border-b">{r.property_name ?? ""}</td>
                  <td className="px-3 py-2 border-b">{r.floor_number ?? ""}</td>
                  <td className="px-3 py-2 border-b">{r.unit_number ?? ""}</td>
                  <td className="px-3 py-2 border-b">{fmtNum(r.area_sqm)}</td>
                  <td className="px-3 py-2 border-b">{fmtNum(r.leasing_price)}</td>
                  <td className="px-3 py-2 border-b">{fmtNum(r.selling_price)}</td>
                  <td className="px-3 py-2 border-b">{r.parking ?? ""}</td>
                  <td className="px-3 py-2 border-b">{r.availability ?? ""}</td>
                  <td className="px-3 py-2 border-b">
                    {r.updated_at ? new Date(r.updated_at).toLocaleString() : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
