"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Listing = {
  id: string;
  code: string | null;
  caption: string | null;
  city: string | null;
  category: string | null;
  property_type: string | null;
  bedrooms: string | null;
  leasing_price: number | null;
  selling_price: number | null;
  updated_at: string;
};

export default function PublicListingsTable() {
  const [rows, setRows] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr(null);

      const { data, error } = await supabase
        .from("properties")
        .select(
          "id,code,caption,city,category,property_type,bedrooms,leasing_price,selling_price,updated_at"
        )
        .order("updated_at", { ascending: false })
        .limit(50);

      if (error) setErr(error.message);
      setRows((data ?? []) as Listing[]);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="p-6">Loading…</div>;
  if (err) return <div className="p-6 text-red-600">Error: {err}</div>;
  if (rows.length === 0)
    return <div className="p-6 text-gray-600">No listings yet.</div>;

  return (
    <div className="overflow-auto border rounded-lg">
      <table className="min-w-[900px] w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left px-3 py-2 border-b">Code</th>
            <th className="text-left px-3 py-2 border-b">Caption</th>
            <th className="text-left px-3 py-2 border-b">City</th>
            <th className="text-left px-3 py-2 border-b">Type</th>
            <th className="text-left px-3 py-2 border-b">BR</th>
            <th className="text-left px-3 py-2 border-b">Lease</th>
            <th className="text-left px-3 py-2 border-b">Sale</th>
            <th className="text-left px-3 py-2 border-b">Updated</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="px-3 py-2 border-b">{r.code ?? ""}</td>
              <td className="px-3 py-2 border-b">{r.caption ?? ""}</td>
              <td className="px-3 py-2 border-b">{r.city ?? ""}</td>
              <td className="px-3 py-2 border-b">{r.property_type ?? ""}</td>
              <td className="px-3 py-2 border-b">{r.bedrooms ?? ""}</td>
              <td className="px-3 py-2 border-b">{r.leasing_price ?? ""}</td>
              <td className="px-3 py-2 border-b">{r.selling_price ?? ""}</td>
              <td className="px-3 py-2 border-b">
                {r.updated_at ? new Date(r.updated_at).toLocaleString() : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
