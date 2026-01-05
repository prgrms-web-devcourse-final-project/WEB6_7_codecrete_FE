import { Upload } from "lucide-react";
import Image from "next/image";

type FileUploadBoxProps = {
  value?: string;
  onFileChange: (file: File | null) => void;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export function FileUploadBox({ value, onFileChange, onClick }: FileUploadBoxProps) {
  return (
    <label
      htmlFor="file-upload"
      className={`border-border hover:bg-bg-sub relative cursor-pointer rounded-lg border-2 border-dashed text-center transition ${value ? "overflow-hidden" : ""}`}
      onClick={onClick}
    >
      <div className={value ? "hover:opacity-50 hover:blur-sm" : ""}>
        {value ? (
          <Image
            src={value}
            alt="Preview"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 px-6 py-12">
            <Upload className="text-muted-foreground h-6 w-6" />
            <p className="text-sm font-medium">클릭해서 사진을 업로드하세요</p>
            <p className="text-muted-foreground text-xs">PNG, JPG 형식 · 파일당 최대 10MB</p>
          </div>
        )}
      </div>

      <input
        id="file-upload"
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          onFileChange(file);
        }}
      />
    </label>
  );
}
