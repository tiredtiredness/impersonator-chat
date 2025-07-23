import Image from "next/image";

export function Avatar() {
  return <Image
    src={"/impersonator.webp"}
    alt={"impersonator head"}
    width={40}
    height={40}
    className="rounded-full"
  />;
}