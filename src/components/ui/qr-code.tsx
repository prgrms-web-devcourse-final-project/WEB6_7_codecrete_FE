import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { QRCodeCanvas } from "qrcode.react";

export default function QrCode({
  address,
  size = 108,
  bgColor = null,
  className,
}: {
  address: string;
  size?: number;
  bgColor?: string | null;
  className?: string;
}) {
  const theme = useTheme();

  return (
    <div
      className={cn("flex h-20 w-20 items-center justify-center rounded-xl bg-white", className)}
    >
      <div className="relative">
        <QRCodeCanvas
          value={address}
          size={size}
          bgColor={bgColor ?? (theme.resolvedTheme === "dark" ? "#1A1A1A" : "#FFFFFF")}
          fgColor={theme.resolvedTheme === "dark" ? "#FFFFFF" : "#000000"}
        />
      </div>
    </div>
  );
}
