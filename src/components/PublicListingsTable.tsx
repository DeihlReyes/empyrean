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

type SortKey =
  | "code"
  | "caption"
  | "category"
  | "city"
  | "property_type"
  | "furnishing"
  | "bedrooms"
  | "with_balcony"
  | "pet_friendly"
  | "property_name"
  | "floor_number"
  | "unit_number"
  | "area_sqm"
  | "leasing_price"
  | "selling_price"
  | "parking"
  | "availability"
  | "updated_at";

type SortDir = "asc" | "desc";

const PAGE_LIMIT = 1000;

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

// Small debounce so we don’t query on every keystroke instantly
function useDebounced<T>(value: T, ms = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

export default function PublicListingsTable() {
  const [rows, setRows] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // total matches in DB for current filters (not just the 1000 we render)
  const [totalMatches, setTotalMatches] = useState<number>(0);

  // Optional global search
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

  // Sorting
  const [sortKey, setSortKey] = useState<SortKey>("updated_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Debounce text inputs (esp global search)
  const dGlobalQ = useDebounced(globalQ, 300);
  const dCodeQ = useDebounced(codeQ, 250);
  const dCaptionQ = useDebounced(captionQ, 250);
  const dPropertyNameQ = useDebounced(propertyNameQ, 250);
  const dFloorQ = useDebounced(floorQ, 250);
  const dUnitQ = useDebounced(unitQ, 250);
  const dParkingQ = useDebounced(parkingQ, 250);

  const options = useMemo(() => {
    // NOTE: with server-side search we can’t reliably compute *all* unique options from all rows
    // without extra queries. For now we keep options blank (or you can replace with static lists).
    // If you still want dropdown options, see note below after the code.
    return {
      categories: [] as string[],
      cities: [] as string[],
      types: [] as string[],
      furnishings: [] as string[],
      bedrooms: [] as string[],
      availability: [] as string[],
    };
  }, []);

  async function fetchRows(signal?: AbortSignal) {
    setLoading(true);
    setErr(null);

    const nSqmMin = parseNumInput(sqmMin);
    const nSqmMax = parseNumInput(sqmMax);
    const nLeaseMin = parseNumInput(leaseMin);
    const nLeaseMax = parseNumInput(leaseMax);
    const nSaleMin = parseNumInput(saleMin);
    const nSaleMax = parseNumInput(saleMax);

    // Base query with COUNT of ALL matches (exact count can be expensive on huge tables;
    // this is still the most accurate approach. If it’s slow, we can switch to "planned".
    let q = supabase
      .from("properties")
      .select(
        "id,code,caption,category,city,property_type,furnishing,bedrooms,with_balcony,pet_friendly,property_name,floor_number,unit_number,area_sqm,leasing_price,selling_price,parking,availability,updated_at",
        { count: "exact" }
      );

    // Exact matches (dropdowns)
    if (category) q = q.eq("category", category);
    if (city) q = q.eq("city", city);
    if (type) q = q.eq("property_type", type);
    if (furnishing) q = q.eq("furnishing", furnishing);
    if (bedrooms) q = q.eq("bedrooms", bedrooms);
    if (availability) q = q.eq("availability", availability);

    // Boolean dropdowns
    if (balcony) q = q.eq("with_balcony", balcony === "true");
    if (pet) q = q.eq("pet_friendly", pet === "true");

    // Per-column partial search
    if (dCodeQ.trim()) q = q.ilike("code", `%${dCodeQ.trim()}%`);
    if (dCaptionQ.trim()) q = q.ilike("caption", `%${dCaptionQ.trim()}%`);
    if (dPropertyNameQ.trim())
      q = q.ilike("property_name", `%${dPropertyNameQ.trim()}%`);
    if (dFloorQ.trim()) q = q.ilike("floor_number", `%${dFloorQ.trim()}%`);
    if (dUnitQ.trim()) q = q.ilike("unit_number", `%${dUnitQ.trim()}%`);
    if (dParkingQ.trim()) q = q.ilike("parking", `%${dParkingQ.trim()}%`);

    // Numeric ranges
    if (nSqmMin !== null) q = q.gte("area_sqm", nSqmMin);
    if (nSqmMax !== null) q = q.lte("area_sqm", nSqmMax);

    if (nLeaseMin !== null) q = q.gte("leasing_price", nLeaseMin);
    if (nLeaseMax !== null) q = q.lte("leasing_price", nLeaseMax);

    if (nSaleMin !== null) q = q.gte("selling_price", nSaleMin);
    if (nSaleMax !== null) q = q.lte("selling_price", nSaleMax);

    // Global search across multiple columns (OR)
    // NOTE: PostgREST "or" syntax is picky; we escape commas minimally by just using raw string.
    const g = dGlobalQ.trim();
    if (g) {
      const escaped = g.replace(/%/g, "\\%").replace(/_/g, "\\_");
      q = q.or(
        [
          `code.ilike.%${escaped}%`,
          `caption.ilike.%${escaped}%`,
          `category.ilike.%${escaped}%`,
          `city.ilike.%${escaped}%`,
          `property_type.ilike.%${escaped}%`,
          `furnishing.ilike.%${escaped}%`,
          `bedrooms.ilike.%${escaped}%`,
          `property_name.ilike.%${escaped}%`,
          `floor_number.ilike.%${escaped}%`,
          `unit_number.ilike.%${escaped}%`,
          `parking.ilike.%${escaped}%`,
          `availability.ilike.%${escaped}%`,
        ].join(",")
      );
    }

    // Sorting + limit (THIS is what shows only 1000)
    q = q.order(sortKey, { ascending: sortDir === "asc" }).limit(PAGE_LIMIT);

    // Optional abort support (avoid race conditions)
    if (signal?.aborted) return;

    const { data, error, count } = await q;

    if (signal?.aborted) return;

    if (error) {
      setErr(error.message);
      setRows([]);
      setTotalMatches(0);
    } else {
      setRows((data ?? []) as Listing[]);
      setTotalMatches(count ?? 0);
    }
    setLoading(false);
  }

  // Run server-side query whenever filters/sort change
  useEffect(() => {
    const ctrl = new AbortController();
    fetchRows(ctrl.signal);
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // debounced text
    dGlobalQ,
    dCodeQ,
    dCaptionQ,
    dPropertyNameQ,
    dFloorQ,
    dUnitQ,
    dParkingQ,

    // dropdowns + ranges
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

    // sort
    sortKey,
    sortDir,
  ]);

  function toggleSort(k: SortKey) {
    if (sortKey === k) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(k);
      setSortDir("asc");
    }
  }

  function sortIndicator(k: SortKey) {
    if (sortKey !== k) return "↕";
    return sortDir === "asc" ? "↑" : "↓";
  }

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

    setSortKey("updated_at");
    setSortDir("desc");
  }

  // Sticky header layout
  const headTop = "top-0";
  const filterTop = "top-[42px]";

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <div className="p-4 border-b flex flex-col md:flex-row md:items-center gap-3">
        <input
          className="border rounded-md px-3 py-2 w-full md:w-[420px]"
          placeholder="Global search (searches entire DB)…"
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
          {loading ? (
            "Searching…"
          ) : err ? (
            <span className="text-red-600">Error: {err}</span>
          ) : (
            <>
              Showing <strong>{rows.length}</strong> of{" "}
              <strong>{totalMatches}</strong>
              {totalMatches > PAGE_LIMIT ? (
                <span className="text-gray-500">
                  {" "}
                  (showing first {PAGE_LIMIT})
                </span>
              ) : null}
            </>
          )}
        </div>
      </div>

      <div className="overflow-auto max-h-[70vh]">
        <table className="min-w-[1700px] w-full text-sm">
          <thead>
            <tr className={`bg-gray-50 sticky ${headTop} z-20`}>
              {(
                [
                  ["code", "Code"],
                  ["caption", "Caption"],
                  ["category", "Category"],
                  ["city", "City"],
                  ["property_type", "Type"],
                  ["furnishing", "Furnishing"],
                  ["bedrooms", "BR"],
                  ["with_balcony", "Balcony"],
                  ["pet_friendly", "Pet"],
                  ["property_name", "Property Name"],
                  ["floor_number", "Floor"],
                  ["unit_number", "Unit"],
                  ["area_sqm", "sqm"],
                  ["leasing_price", "Lease"],
                  ["selling_price", "Sale"],
                  ["parking", "Parking"],
                  ["availability", "Availability"],
                  ["updated_at", "Updated"],
                ] as [SortKey, string][]
              ).map(([key, label]) => (
                <th
                  key={key}
                  className={`text-left px-3 py-2 border-b cursor-pointer select-none ${
                    key === "caption"
                      ? "whitespace-pre-line min-w-[420px]"
                      : "whitespace-nowrap"
                  }`}
                  onClick={() => toggleSort(key)}
                >
                  {label}{" "}
                  <span className="text-gray-400">{sortIndicator(key)}</span>
                </th>
              ))}
            </tr>

            <tr className={`bg-white sticky ${filterTop} z-10`}>
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

              {/* For now, keep dropdowns as text inputs if you don’t have option lists */}
              <th className="px-2 py-2 border-b">
                <input
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Category…"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </th>

              <th className="px-2 py-2 border-b">
                <input
                  className="border rounded px-2 py-1 w-full"
                  placeholder="City…"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </th>

              <th className="px-2 py-2 border-b">
                <input
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Type…"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </th>

              <th className="px-2 py-2 border-b">
                <input
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Furnishing…"
                  value={furnishing}
                  onChange={(e) => setFurnishing(e.target.value)}
                />
              </th>

              <th className="px-2 py-2 border-b">
                <input
                  className="border rounded px-2 py-1 w-full"
                  placeholder="BR…"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                />
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
                <input
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Availability…"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                />
              </th>

              <th className="px-2 py-2 border-b" />
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="px-3 py-4 text-gray-600" colSpan={18}>
                  Loading…
                </td>
              </tr>
            ) : err ? (
              <tr>
                <td className="px-3 py-4 text-red-600" colSpan={18}>
                  Error: {err}
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td className="px-3 py-4 text-gray-600" colSpan={18}>
                  No listings match your filters.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b">{r.code ?? ""}</td>

                  <td className="px-3 py-2 border-b whitespace-pre-line min-w-[420px]">
                    {r.caption ?? ""}
                  </td>

                  <td className="px-3 py-2 border-b">{r.category ?? ""}</td>
                  <td className="px-3 py-2 border-b">{r.city ?? ""}</td>
                  <td className="px-3 py-2 border-b">
                    {r.property_type ?? ""}
                  </td>
                  <td className="px-3 py-2 border-b">{r.furnishing ?? ""}</td>
                  <td className="px-3 py-2 border-b">{r.bedrooms ?? ""}</td>
                  <td className="px-3 py-2 border-b">
                    {fmtBool(r.with_balcony)}
                  </td>
                  <td className="px-3 py-2 border-b">
                    {fmtBool(r.pet_friendly)}
                  </td>
                  <td className="px-3 py-2 border-b">
                    {r.property_name ?? ""}
                  </td>
                  <td className="px-3 py-2 border-b">
                    {r.floor_number ?? ""}
                  </td>
                  <td className="px-3 py-2 border-b">{r.unit_number ?? ""}</td>
                  <td className="px-3 py-2 border-b">{fmtNum(r.area_sqm)}</td>
                  <td className="px-3 py-2 border-b">
                    {fmtNum(r.leasing_price)}
                  </td>
                  <td className="px-3 py-2 border-b">
                    {fmtNum(r.selling_price)}
                  </td>
                  <td className="px-3 py-2 border-b">{r.parking ?? ""}</td>
                  <td className="px-3 py-2 border-b">
                    {r.availability ?? ""}
                  </td>
                  <td className="px-3 py-2 border-b">
                    {r.updated_at
                      ? new Date(r.updated_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : ""}
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
