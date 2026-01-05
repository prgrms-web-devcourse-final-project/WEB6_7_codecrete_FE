import React, { useState } from "react";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { PhotoUploadSectionProps } from "@/types/community/concert-review";
import { toast } from "sonner";
import ImagePreview from "@/components/review/write/ImageReview";

const MAX_IMAGES = 5;
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export default function PhotoUploadSection({ images, onChangeImages }: PhotoUploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = (newFiles: File[]) => {
    const oversizedFiles = newFiles.filter((file) => file.size > MAX_SIZE);
    if (oversizedFiles.length > 0) {
      toast.error("5MB 이하의 이미지만 업로드할 수 있어요.");
    }

    const sizeValidFiles = newFiles.filter((file) => file.size <= MAX_SIZE);

    const deduplicatedFiles = sizeValidFiles.filter(
      (newFile) =>
        !images.some(
          (existing) =>
            existing.name === newFile.name &&
            existing.size === newFile.size &&
            existing.lastModified === newFile.lastModified
        )
    );

    const availableSlots = MAX_IMAGES - images.length;
    if (availableSlots <= 0) return;

    const filesToAdd = deduplicatedFiles.slice(0, availableSlots);
    if (filesToAdd.length > 0) {
      onChangeImages([...images, ...filesToAdd]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    processFiles(Array.from(e.target.files));
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(Array.from(e.dataTransfer.files));
  };

  const handleRemove = (index: number) => {
    const next = images.filter((_, i) => i !== index);
    onChangeImages(next);
  };

  return (
    <CardContent className="flex flex-col gap-3">
      <CardTitle>사진 업로드 (선택)</CardTitle>

      <label
        className={`flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed px-6 py-25 text-sm text-gray-500 transition ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        {images.length >= MAX_IMAGES
          ? "사진은 최대 5장까지 업로드할 수 있어요"
          : "사진을 선택하거나 드래그하세요"}
      </label>

      <CardDescription className="text-xs">
        공연 사진은 선택 사항이며, 최대 5장까지 업로드할 수 있어요.
      </CardDescription>

      {images.length > 0 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((file, index) => (
            <ImagePreview
              key={`${file.name}-${file.lastModified}-${index}`}
              file={file}
              onRemove={() => handleRemove(index)}
            />
          ))}
        </div>
      )}
    </CardContent>
  );
}
