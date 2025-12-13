import { Upload } from "lucide-react";

export function FileUploadBox() {
  return (
    <label
      htmlFor="file-upload"
      className="border-border hover:bg-bg-sub flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-12 text-center transition"
    >
      <Upload className="text-muted-foreground h-6 w-6" />

      <p className="text-sm font-medium">클릭해서 사진을 업로드하세요</p>

      <p className="text-muted-foreground text-xs">PNG, JPG 형식 · 파일당 최대 10MB / 최대 5장</p>

      <input
        id="file-upload"
        type="file"
        multiple
        accept="image/png,image/jpeg"
        className="hidden"
      />
    </label>
  );
}
