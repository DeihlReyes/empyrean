import React from "react";

interface ContentCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function ContentCard({
  title,
  description,
  children,
  className,
}: ContentCardProps) {
  return (
    <div
      className={`border border-gray-300 rounded-lg p-8 md:p-12 ${className}`}
    >
      <div className="flex flex-col md:items-start gap-6">
        <div className="flex relative items-center justify-start gap-4 w-full">
          <div>
            <div className="bg-gray-200 rounded-full min-w-[60px] h-[60px]"></div>
          </div>
          <div className="absolute left-[20px] md:text-xl font-bold uppercase text-wrap w-full">
            {title}
          </div>
        </div>

        {/* ONLY CHANGE IS HERE */}
        <div className="text-[14px] md:text-base text-gray-800 text-justify">
          {children ? children : description}
        </div>
      </div>
    </div>
  );
}
