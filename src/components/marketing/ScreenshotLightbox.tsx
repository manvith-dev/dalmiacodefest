"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ScreenshotLightboxProps = {
  title: string;
  image: string;
};

export function ScreenshotLightbox({ title, image }: ScreenshotLightboxProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="block w-full cursor-pointer text-left"
          aria-label={`View ${title} in full size`}
        >
          <Image
            src={image}
            alt={title}
            width={1600}
            height={1000}
            className="h-auto w-full object-cover transition-opacity hover:opacity-90"
          />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[80vw] border-0 bg-background/95 p-2 sm:max-w-[95vw]">
        <DialogTitle className="sr-only">{title}</DialogTitle>

        <div className="flex max-h-[90vh] items-center justify-center overflow-auto">
          <Image
            src={image}
            alt={title}
            width={2400}
            height={1600}
            className="h-auto max-h-[78vh] w-auto max-w-full object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
