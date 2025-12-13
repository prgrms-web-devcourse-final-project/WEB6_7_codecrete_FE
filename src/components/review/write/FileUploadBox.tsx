import { Upload } from "lucide-react";

export function FileUploadBox() {
  return (
    <label
      htmlFor="file-upload"
      className="border-border hover:bg-bg-sub flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-12 text-center transition"
    >
      <Upload className="text-muted-foreground h-6 w-6" />

      <p className="text-sm font-medium">Click to upload or drag and drop</p>

      <p className="text-muted-foreground text-xs">PNG, JPG up to 10MB (Max 5 photos)</p>

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
