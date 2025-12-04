"use client"

import { useState } from "react"
import Image from "next/image"

interface AppScreenshotProps {
  src: string
  alt: string
  label?: string
}

export function AppScreenshot({ src, alt, label }: AppScreenshotProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-full aspect-[9/19.5] rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
        {isLoading && !hasError && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-neutral-200 to-neutral-300" />
        )}
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-400 text-xs">
            No image
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100px, 120px"
            className={`object-cover transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true)
              setIsLoading(false)
            }}
          />
        )}
      </div>
      {label && (
        <span className="mt-1 text-xs text-neutral-500">{label}</span>
      )}
    </div>
  )
}
