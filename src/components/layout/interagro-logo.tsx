import Image from "next/image";
import { cn } from "@/lib/utils";

type InteragroLogoProps = {
  className?: string;
};

export function InteragroLogo({ className }: InteragroLogoProps) {
  return (
    <Image
      src="/logointeragro.png"
      alt="Interagro"
      width={420}
      height={140}
      priority
      className={cn("h-auto w-36 sm:w-44", className)}
    />
  );
}
