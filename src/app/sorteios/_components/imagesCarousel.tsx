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
    <Carousel className="flex-1 items-center max-h-[400px]">
      <CarouselContent className="flex">
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <Card className="flex object-contain items-center justify-center">
              <CardContent className="flex max-h-[300px] aspect-square items-center justify-center">
                <Image
                  src={img}
                  alt={`Imagem ${index + 1}`}
                  width={300}
                  height={300}
                  className="object-contain max-h- w-full h-full"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
