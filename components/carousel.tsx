"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  itemClassName?: string // This will define the responsive width and spacing of each item
  showArrows?: boolean // This prop will now control overall arrow visibility, responsive classes will handle desktop/mobile
}

export function Carousel({ children, className, itemClassName, showArrows = true, ...props }: CarouselProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const childrenArray = React.Children.toArray(children)

  const checkScrollability = () => {
    if (scrollRef.current) {
      // Left arrow is visible only if not at the very beginning
      setCanScrollLeft(scrollRef.current.scrollLeft > 0)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current && childrenArray.length > 0) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      // Get the computed width of the first item to determine scroll amount
      // This assumes all items have the same width, which they should with the itemClassName
      const itemElement = scrollRef.current.children[0] as HTMLElement
      const itemWidth = itemElement ? itemElement.offsetWidth : clientWidth // Fallback if no items

      if (direction === "right") {
        // If at the end or near the end, loop back to the beginning
        if (scrollLeft + clientWidth >= scrollWidth - itemWidth / 2) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          scrollRef.current.scrollBy({ left: itemWidth, behavior: "smooth" })
        }
      } else {
        // direction === "left"
        // If at the beginning, do not loop to the end, just disable the button (handled by canScrollLeft)
        // Otherwise, scroll left
        if (scrollLeft > 0) {
          scrollRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" })
        }
      }
    }
  }

  React.useEffect(() => {
    const currentRef = scrollRef.current
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScrollability)
      // Initial check
      checkScrollability()
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScrollability)
      }
    }
  }, [])

  return (
    <div className={cn("relative", className)} {...props}>
      <div ref={scrollRef} className="flex overflow-x-scroll scroll-smooth snap-x snap-mandatory no-scrollbar">
        {childrenArray.map((child, index) => (
          <div
            key={index}
            className={cn(
              "flex-shrink-0 snap-start",
              itemClassName, // Apply the responsive width and spacing here
            )}
          >
            {child}
          </div>
        ))}
      </div>
      {showArrows && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft} // Disable left arrow if at the beginning
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-md",
              "hidden md:flex", // Hide on desktop, show on mobile
            )}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("right")}
            // Right arrow is always enabled for looping behavior
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-md",
              "hidden md:flex", // Hide on desktop, show on mobile
            )}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}
    </div>
  )
}
