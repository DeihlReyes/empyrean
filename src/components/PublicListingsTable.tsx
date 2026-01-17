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

function cmpNullableString(a: string | null, b: string | null) {
  const aa = (a ?? "").toLowerCase();
  const bb = (b ?? "").toLowerCase();
  if (aa < bb) return -1;
  if (aa > bb) return 1;
  return 0;
}

function cmpNullableNumber(a: number | null, b: number | null) {
  const aa = a ?? Number.NEGATIVE_INFINITY;
  const bb = b ?? Number.NEGATIVE_INFINITY;
  return aa - bb;
}

function cmpNullableBool(a: boolean | null, b: boolean | null) {
  const aa = a === null ? -1 : a ? 1 : 0;
  const bb = b === null ? -1 : b ? 1 : 0;
  return aa - bb;
}

function cmpDateIso(a: string, b: string) {
  const aa = new Date(a).getTime();
  const bb = new Date(b).getTime();
  return aa - bb;
}

export default function PublicListingsTable() {
  const [rows, setRows] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

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

      if (nSaleMin !== null && (r.selling_price ?? -Infinity) < nSaleMin)
        return false;
      if (nSaleMax !== null && (r.selling_price ?? Infinity) > nSaleMax)
        return false;

      // Optional global search
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

  const sorted = useMemo(() => {
    const dir = sortDir === "asc" ? 1 : -1;

    const getCmp = (a: Listing, b: Listing) => {
      switch (sortKey) {
        case "code":
          return cmpNullableString(a.code, b.code);
        case "caption":
          return cmpNullableString(a.caption, b.caption);
        case "category":
          return cmpNullableString(a.category, b.category);
        case "city":
          return cmpNullableString(a.city, b.city);
        case "property_type":
          return cmpNullableString(a.property_type, b.property_type);
        case "furnishing":
          return cmpNullableString(a.furnishing, b.furnishing);
        case "bedrooms":
          return cmpNullableString(a.bedrooms, b.bedrooms);
        case "with_balcony":
          return cmpNullableBool(a.with_balcony, b.with_balcony);
        case "pet_friendly":
          return cmpNullableBool(a.pet_friendly, b.pet_friendly);
        case "property_name":
          return cmpNullableString(a.property_name, b.property_name);
        case "floor_number":
          return cmpNullableString(a.floor_number, b.floor_number);
        case "unit_number":
          return cmpNullableString(a.unit_number, b.unit_number);
        case "area_sqm":
          return cmpNullableNumber(a.area_sqm, b.area_sqm);
        case "leasing_price":
          return cmpNullableNumber(a.leasing_price, b.leasing_price);
        case "selling_price":
          return cmpNullableNumber(a.selling_price, b.selling_price);
        case "parking":
          return cmpNullableString(a.parking, b.parking);
        case "availability":
          return cmpNullableString(a.availability, b.availability);
        case "updated_at":
          return cmpDateIso(a.updated_at, b.updated_at);
        default:
          return 0;
      }
    };

    return [...filtered].sort((a, b) => dir * getCmp(a, b));
  }, [filtered, sortKey, sortDir]);

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
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for some browsers
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }
}
  if (loading) return <div className="p-6">Loading…</div>;
  if (err) return <div className="p-6 text-red-600">Error: {err}</div>;

  // Sticky header layout: header row height ~42px; filter row below it ~48px
  const headTop = "top-0";
  const filterTop = "top-[42px]";

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
          Showing <strong>{sorted.length}</strong> of{" "}
          <strong>{rows.length}</strong>
        </div>
      </div>

      <div className="overflow-auto max-h-[70vh]">
        <table className="min-w-[1700px] w-full text-sm">
          <thead>
            {/* Header row (sticky) */}
            <tr className={`bg-gray-50 sticky ${headTop} z-20`}>
              {[
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
].map(([key, label]) => (
  <th
    key={key}
    className={`text-left px-3 py-2 border-b cursor-pointer select-none
      ${key === "caption" ? "whitespace-pre-line min-w-[420px]" : "whitespace-nowrap"}
    `}
    onClick={() => toggleSort(key as SortKey)}
  >
    {label}{" "}
    <span className="text-gray-400">
      {sortIndicator(key as SortKey)}
    </span>
  </th>
))}
            </tr>

            {/* Filter row (sticky) */}
            <tr className={`bg-white sticky ${filterTop} z-10`}>
              <th className="px-2 py-2 border-b">
                <input className="border rounded px-2 py-1 w-full" placeholder="Search…" value={codeQ} onChange={(e) => setCodeQ(e.target.value)} />
              </th>
              <th className="px-2 py-2 border-b">
                <input className="border rounded px-2 py-1 w-full" placeholder="Search…" value={captionQ} onChange={(e) => setCaptionQ(e.target.value)} />
              </th>
              <th className="px-2 py-2 border-b">
                <select className="border rounded px-2 py-1 w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">All</option>
                  {options.categories.map((v) => (<option key={v} value={v}>{v}</option>))}
                </select>
              </th>
              <th className="px-2 py-2 border-b">
                <select className="border rounded px-2 py-1 w-full" value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">All</option>
                  {options.cities.map((v) => (<option key={v} value={v}>{v}</option>))}
                </select>
              </th>
              <th className="px-2 py-2 border-b">
                <select className="border rounded px-2 py-1 w-full" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">All</option>
                  {options.types.map((v) => (<option key={v} value={v}>{v}</option>))}
                </select>
              </th>
              <th className="px-2 py-2 border-b">
                <select className="border rounded px-2 py-1 w-full" value={furnishing} onChange={(e) => setFurnishing(e.target.value)}>
                  <option value="">All</option>
                  {options.furnishings.map((v) => (<option key={v} value={v}>{v}</option>))}
                </select>
              </th>
              <th className="px-2 py-2 border-b">
                <select className="border rounded px-2 py-1 w-full" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                  <option value="">All</option>
                  {options.bedrooms.map((v) => (<option key={v} value={v}>{v}</option>))}
                </select>
              </th>
              <th className="px-2 py-2 border-b">
                <select className="border rounded px-2 py-1 w-full" value={balcony} onChange={(e) => setBalcony(e.target.value as BoolFilter)}>
                  <option value="">Any</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </th>
              <th className="px-2 py-2 border-b">
                <select className="border rounded px-2 py-1 w-full" value={pet} onChange={(e) => setPet(e.target.value as BoolFilter)}>
                  <option value="">Any</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </th>
              <th className="px-2 py-2 border-b">
                <input className="border rounded px-2 py-1 w-full" placeholder="Search…" value={propertyNameQ} onChange={(e) => setPropertyNameQ(e.target.value)} />
              </th>
              <th className="px-2 py-2 border-b">
                <input className="border rounded px-2 py-1 w-full" placeholder="Search…" value={floorQ} onChange={(e) => setFloorQ(e.target.value)} />
              </th>
              <th className="px-2 py-2 border-b">
                <input className="border rounded px-2 py-1 w-full" placeholder="Search…" value={unitQ} onChange={(e) => setUnitQ(e.target.value)} />
              </th>
              <th className="px-2 py-2 border-b">
                <div className="flex gap-2">
                  <input className="border rounded px-2 py-1 w-full" placeholder="Min" value={sqmMin} onChange={(e) => setSqmMin(e.target.value)} />
                  <input className="border rounded px-2 py-1 w-full" placeholder="Max" value={sqmMax} onChange={(e) => setSqmMax(e.target.value)} />
                </div>
              </th>
              <th className="px-2 py-2 border-b">
                <div className="flex gap-2">
                  <input className="border rounded px-2 py-1 w-full" placeholder="Min" value={leaseMin} onChange={(e) => setLeaseMin(e.target.value)} />
                  <input className="border rounded px-2 py-1 w-full" placeholder="Max" value={leaseMax} onChange={(e) => setLeaseMax(e.target.value)} />
                </div>
              </th>
              <th className="px-2 py-2 border-b">
                <div className="flex gap-2">
                  <input className="border rounded px-2 py-1 w-full" placeholder="Min" value={saleMin} onChange={(e) => setSaleMin(e.target.value)} />
                  <input className="border rounded px-2 py-1 w-full" placeholder="Max" value={saleMax} onChange={(e) => setSaleMax(e.target.value)} />
                </div>
              </th>
              <th className="px-2 py-2 border-b">
                <input className="border rounded px-2 py-1 w-full" placeholder="Search…" value={parkingQ} onChange={(e) => setParkingQ(e.target.value)} />
              </th>
              <th className="px-2 py-2 border-b">
                <select className="border rounded px-2 py-1 w-full" value={availability} onChange={(e) => setAvailability(e.target.value)}>
                  <option value="">All</option>
                  {options.availability.map((v) => (<option key={v} value={v}>{v}</option>))}
                </select>
              </th>
              <th className="px-2 py-2 border-b" />
            </tr>
          </thead>

          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td className="px-3 py-4 text-gray-600" colSpan={18}>
                  No listings match your filters.
                </td>
              </tr>
            ) : (
              sorted.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b">{r.code ?? ""}</td>
<td className="px-3 py-2 border-b whitespace-pre-line min-w-[420px]">
  {r.caption ?? ""}
</td>                  <td className="px-3 py-2 border-b">{r.category ?? ""}</td>
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
