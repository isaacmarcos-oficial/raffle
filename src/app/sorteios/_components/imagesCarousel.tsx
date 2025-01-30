import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

type ImagesCarouselProps = {
  images: string[]
}

export default function ImagesCarousel({ images }: ImagesCarouselProps) {
  return (
    <Carousel className="w-full max-h-xs">
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex max-h-[200px] md:max-h-xs w-full h-full max-h-xs aspect-square items-center justify-center p-2 relative object-contain">
                  <Image
                    src={img}
                    alt={`Imagem ${index + 1}`}
                    width={300}
                    height={300}
                    className="object-contain w-full h-full "
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
