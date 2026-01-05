"use client";

import React, { startTransition, useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

export default function ImagePreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    startTransition(() => {
      setPreview(url);
    });

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!preview) return null;

  return (
    <div className="relative aspect-square overflow-hidden rounded-md border">
      <Image src={preview} alt="preview" className="h-full w-full object-cover" fill />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 cursor-pointer rounded-full bg-black/60 p-1 text-white hover:opacity-80"
      >
        <X size={14} />
      </button>
    </div>
  );
}
