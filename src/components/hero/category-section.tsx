import CategoryCard from "./category-card";

export default function CategorySection() {
  const categories = [
    {
      title: "I AM A PROPERTY OWNER",
      href: "/services/property-owner",
      bgColor: "bg-[#494949]",
    },
    {
      title: "I AM A BUYER/TENANT/GUEST",
      href: "/services/buyer-tenant-guest",
      bgColor: "bg-[#595858]",
    },
    {
      title: "I AM A BUSINESS/PROFESSIONAL",
      href: "/services/business-professional",
      bgColor: "bg-[#9f9f9f]",
    },
    {
      title: "I NEED MORE HELP",
      href: "/contact-us",
      bgColor: "bg-[#cfcfcf]",
    },
  ];

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {categories.map((category, index) => (
        <CategoryCard
          key={index}
          title={category.title}
          href={category.href}
          bgColor={category.bgColor}
        />
      ))}
    </section>
  );
}
