import Image from "next/image";


export function Avatar({url, size = 40, rounded = "full"}: {
  url?: string,
  size?: number,
  rounded?: 'xl' | 'full'
}) {
  return (
    <Image
      src={url ?? "/impersonator.webp"}
      alt={"impersonator head"}
      width={size}
      height={size}
      className={`rounded-${rounded}`}
      placeholder="empty"
    />
  );
}
