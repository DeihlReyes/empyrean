interface ServiceCardProps {
  title: string;
  description: string;
}

export function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors">
      <div className="flex flex-col items-start justify-center gap-6">
        <div className="flex relative items-center justify-start gap-4 w-full mb-2">
          <div>
            <div className="bg-gray-200 rounded-full min-w-[60px] h-[60px]"></div>
          </div>
          <div className="absolute left-[20px] md:text-xl font-bold uppercase text-wrap w-full text-left">
            {title}
          </div>
        </div>

        <p className="text-gray-700 text-justify">
          {description}
        </p>
      </div>
    </div>
  );
}
