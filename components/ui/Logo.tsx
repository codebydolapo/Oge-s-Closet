import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      src="/logo.png"
      alt="Brand logo"
      width={100}
      height={100}
      className="w-auto h-12 rounded-full filter invert text-red-500"
      priority
    />
  );
};
