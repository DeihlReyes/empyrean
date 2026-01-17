// src/components/PREITable.tsx
import PublicListingsTable from "@/components/PublicListingsTable";

export default function PREITable() {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            Philippine Real Estate Inventory
          </h1>
          <p className="text-gray-600 mt-2">
            Browse public listings in a sheet-like view. (Encoders can log in to
            add/update listings.)
          </p>
        </div>

        <PublicListingsTable />
      </div>
    </section>
  );
}
