import { FileUploadBox } from "@/components/review/write/FileUploadBox";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { ProfileImgFieldsProps } from "@/types/my-page";

export default function ProfileImgFields({
  previewImg,
  handleImgChange,
  handleImgClear,
}: ProfileImgFieldsProps) {
  return (
    <Field>
      <Label htmlFor="file">프로필 이미지</Label>
      <FileUploadBox value={previewImg} onFileChange={handleImgChange} onClick={handleImgClear} />
    </Field>
  );
}
