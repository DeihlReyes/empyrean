import Image from "next/image";

interface PartnerLogoProps {
  name?: string;
  imageSrc?: string;
  hideName?: boolean;
}

export default function PartnerLogo({ name, imageSrc, hideName }: PartnerLogoProps) {
  return (
    <div className="flex flex-col items-center">
      {imageSrc ? (
        <div className="rounded-full overflow-hidden w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={name || "Partner Logo"}
            width={176}
            height={176}
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <div className="bg-gray-300 rounded-full w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
          <span className="text-xl font-bold">LOGO</span>
        </div>
      )}

      {!hideName && name && (
        <span className="mt-2 text-sm font-medium text-center">{name}</span>
      )}
    </div>
  );
}
