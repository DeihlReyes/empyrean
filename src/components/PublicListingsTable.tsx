// src/components/PublicListingsTable.tsx
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
  if (v === null || Number.isNaN(v)) return "";
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

  // Optional global search (kept)
  const [globalQ, setGlobalQ] = useState("");

  // Per-column filters
  const [codeQ, setCodeQ] = useState("");
  const [captionQ, setCaptionQ] = useState("");
  const [propertyNameQ, setPropertyNameQ] = useState("");
  const [floorQ, setFloorQ] = useState("");
  const [unitQ, setUnitQ] = useState("");
  const [parkingQ, setParkingQ] = useState("");

  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [availability, setAvailability] = useState("");

  const [balcony, setBalcony] = useState<BoolFilter>("");
  const [pet, setPet] = useState<BoolFilter>("");

  const [sqmMin, setSqmMin] = useState("");
  const [sqmMax, setSqmMax] = useState("");
  const [leaseMin, setLeaseMin] = useState("");
  const [leaseMax, setLeaseMax] = useState("");
  const [saleMin, setSaleMin] = useState("");
  const [saleMax, setSaleMax] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr(null);

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

  const options = useMemo(() => {
    const uniq = (arr: (string | null)[]) =>
      Array.from(new Set(arr.filter(Boolean) as string[])).sort();

    return {
      categories: uniq(rows.map((r) => r.category)),
      cities: uniq(rows.map((r) => r.city)),
      types: uniq(rows.map((r) => r.property_type)),
      furnishings: uniq(rows.map((r) => r.furnishing)),
      bedrooms: uniq(rows.map((r) => r.bedrooms)),
      availability: uniq(rows.map((r) => r.availability)),
    };
  }, [rows]);

  const filtered = useMemo(() => {
    const g = globalQ.trim().toLowerCase();

    const codeNeedle = codeQ.trim().toLowerCase();
    const captionNeedle = captionQ.trim().toLowerCase();
    const propNeedle = propertyNameQ.trim().toLowerCase();
    const floorNeedle = floorQ.trim().toLowerCase();
    const unitNeedle = unitQ.trim().toLowerCase();
    const parkingNeedle = parkingQ.trim().toLowerCase();

    const nSqmMin = parseNumInput(sqmMin);
    const nSqmMax = parseNumInput(sqmMax);
    const nLeaseMin = parseNumInput(leaseMin);
    const nLeaseMax = parseNumInput(leaseMax);
    const nSaleMin = parseNumInput(saleMin);
    const nSaleMax = parseNumInput(saleMax);

    return rows.filter((r) => {
      // Per-column text search
      if (codeNeedle && !toLowerSafe(r.code).includes(codeNeedle)) return false;
      if (captionNeedle && !toLowerSafe(r.caption).includes(captionNeedle))
        return false;
      if (propNeedle && !toLowerSafe(r.property_name).includes(propNeedle))
        return false;
      if (floorNeedle && !toLowerSafe(r.floor_number).includes(floorNeedle))
        return false;
      if (unitNeedle && !toLowerSafe(r.unit_number).includes(unitNeedle))
        return false;
      if (parkingNeedle && !toLowerSafe(r.parking).includes(parkingNeedle))
        return false;

      // Dropdown exact matches
      if (category && r.category !== category) return false;
      if (city && r.city !== city) return false;
      if (type && r.property_type !== type) return false;
      if (furnishing && r.furnishing !== furnishing) return false;
      if (bedrooms && r.bedrooms !== bedrooms) return false;
      if (availability && r.availability !== availability) return false;

      // Boolean dropdowns
      if (balcony) {
        const want = balcony === "true";
        if (r.with_balcony !== want) return false;
      }
      if (pet) {
        const want = pet === "true";
        if (r.pet_friendly !== want) return false;
      }

      // Numeric ranges
      if (nSqmMin !== null && (r.area_sqm ?? -Infinity) < nSqmMin) return false;
      if (nSqmMax !== null && (r.area_sqm ?? Infinity) > nSqmMax) return false;

      if (
        nLeaseMin !== null &&
        (r.leasing_price ?? -Infinity) < nLeaseMin
      )
        return false;
      if (nLeaseMax !== null && (r.leasing_price ?? Infinity) > nLeaseMax)
        return false;

      if (
        nSaleMin !== null &&
        (r.selling_price ?? -Infinity) < nSaleMin
      )
        return false;
      if (nSaleMax !== null && (r.selling_price ?? Infinity) > nSaleMax)
        return false;

      // Optional global search (across common fields)
      if (g) {
        const hay = [
          r.code,
          r.caption,
          r.category,
          r.city,
          r.property_type,
          r.furnishing,
          r.bedrooms,
          r.property_name,
          r.floor_number,
          r.unit_number,
          r.parking,
          r.availability,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        if (!hay.includes(g)) return false;
      }

      return true;
    });
  }, [
    rows,
    globalQ,
    codeQ,
    captionQ,
    propertyNameQ,
    floorQ,
    unitQ,
    parkingQ,
    category,
    city,
    type,
    furnishing,
    bedrooms,
    availability,
    balcony,
    pet,
    sqmMin,
    sqmMax,
    leaseMin,
    leaseMax,
    saleMin,
    saleMax,
  ]);

  function resetAll() {
    setGlobalQ("");
    setCodeQ("");
    setCaptionQ("");
    setPropertyNameQ("");
    setFloorQ("");
    setUnitQ("");
    setParkingQ("");

    setCategory("");
    setCity("");
    setType("");
    setFurnishing("");
    setBedrooms("");
    setAvailability("");

    setBalcony("");
    setPet("");

    setSqmMin("");
    setSqmMax("");
    setLeaseMin("");
    setLeaseMax("");
    setSaleMin("");
    setSaleMax("");
  }

  if (loading) return <div className="p-6">Loading…</div>;
  if (err) return <div className="p-6 text-red-600">Error: {err}</div>;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <div className="p-4 border-b flex flex-col md:flex-row md:items-center gap-3">
        <input
          className="border rounded-md px-3 py-2 w-full md:w-[420px]"
          placeholder="Global search (optional)…"
          value={globalQ}
          onChange={(e) => setGlobalQ(e.target.value)}
        />
        <button
          type="button"
          className="border rounded-md px-3 py-2 text-sm w-full md:w-auto"
          onClick={resetAll}
        >
          Reset
        </button>
        <div className="text-sm text-gray-600 md:ml-auto">
          Showing <strong>{filtered.length}</strong> of{" "}
          <strong>{rows.length}</strong>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="min-w-[1700px] w-full text-sm">
          <thead className="bg-gray-50">
            {/* Header row */}
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
              <th className="text-left px-3 py-2 border-b">Property Name</th>
              <th className="text-left px-3 py-2 border-b">Floor</th>
              <th className="text-left px-3 py-2 border-b">Unit</th>
              <th className="text-left px-3 py-2 border-b">sqm (min/max)</th>
              <th className="text-left px-3 py-2 border-b">Lease (min/max)</th>
              <th className="text-left px-3 py-2 border-b">Sale (min/max)</th>
              <th className="text-left px-3 py-2 border-b">Parking</th>
              <th className="text-left px-3 py-2 border-b">Availability</th>
              <th className="text-left px-3 py-2 border-b">Updated</th>
            </tr>

            {/* Filter row (per column) */}
            <tr className="bg-white">
              <th className="px-2 py-2 border-b">
                <input
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Search…"
                  value={codeQ}
                  onChange={(e) => setCodeQ(e.target.value)}
                />
              </th>
              <th className="px-2 py-2 border-b">
                <input
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Search…"
                  value={captionQ}
                  onChange={(e) => setCaptionQ(e.target.value)}
                />
              </th>
              <th className="px-2 py-2 border-b">
                <select
                  className="border rounded px-2 py-1 w-full"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All</option>
                  {options.categories.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-2 py-2 border-b">
                <select
                  className="border rounded px-2 py-1 w-full"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">All</option>
                  {options.cities.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-2 py-2 border-b">
                <select
                  className="border rounded px-2 py-1 w-full"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">All</option>
                  {options.types.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-2 py-2 border-b">
                <select
                  className="border rounded px-2 py-1 w-full"
                  value={furnishing}
                  onChange={(e) => setFurnishing(e.target.value)}
                >
                  <option value="">All</option>
                  {options.furnishings.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-2 py-2 border-b">
                <select
                  className="border rounded px-2 py-1 w-full"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                >
                  <option value="">All</option>
                  {options.bedrooms.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-2 py-2 border-b">
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
              <th className="px-2 py-2 border-b">
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
              <th className="px-2 py-2 border-b">
                <input
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Search…"
                  value={propertyNameQ}
                  onChange={(e) => setPropertyNameQ(e.target.value)}
                />
              </th>
              <th className="px-2 py-2 border-b">
                <input
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Search…"
                  value={floorQ}
                  onChange={(e) => setFloorQ(e.target.value)}
                />
              </th>
              <th className="px-2 py-2 border-b">
                <input
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Search…"
                  value={unitQ}
                  onChange={(e) => setUnitQ(e.target.value)}
                />
              </th>
              <th className="px-2 py-2 border-b">
                <div className="flex gap-2">
                  <input
                    className="border rounded px-2 py-1 w-full"
                    placeholder="Min"
                    value={sqmMin}
                    onChange={(e) => setSqmMin(e.target.value)}
                  />
                  <input
                    className="border rounded px-2 py-1 w-full"
                    placeholder="Max"
                    value={sqmMax}
                    onChange={(e) => setSqmMax(e.target.value)}
                  />
                </div>
              </th>
              <th className="px-2 py-2 border-b">
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
              <th className="px-2 py-2 border-b">
                <div className="flex gap-2">
                  <input
                    className="border rounded px-2 py-1 w-full"
                    placeholder="Min"
                    value={saleMin}
                    onChange={(e) => setSaleMin(e.target.value)}
                  />
                  <input
                    className="border rounded px-2 py-1 w-full"
                    placeholder="Max"
                    value={saleMax}
                    onChange={(e) => setSaleMax(e.target.value)}
                  />
                </div>
              </th>
              <th className="px-2 py-2 border-b">
                <input
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Search…"
                  value={parkingQ}
                  onChange={(e) => setParkingQ(e.target.value)}
                />
              </th>
              <th className="px-2 py-2 border-b">
                <select
                  className="border rounded px-2 py-1 w-full"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                >
                  <option value="">All</option>
                  {options.availability.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-2 py-2 border-b" />
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="px-3 py-4 text-gray-600" colSpan={18}>
                  No listings match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
