"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  duration?: string // e.g., "30s"
  reverse?: boolean
  pauseOnHover?: boolean
}

export function Marquee({
  children,
  className,
  duration = "30s",
  reverse = false,
  pauseOnHover = true,
  ...props
}: MarqueeProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = React.useState(0)

  React.useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth)
    }
  }, [children])

  const animationStyle: React.CSSProperties = {
    animationDuration: duration,
    animationDirection: reverse ? "reverse" : "normal",
    animationPlayState: pauseOnHover ? "running" : "paused", // Default to running, pause on hover handled by CSS
  }

  return (
    <div ref={containerRef} className={cn("relative w-full overflow-hidden", className)} {...props}>
      <div
        ref={contentRef}
        className={cn("flex whitespace-nowrap animate-marquee", pauseOnHover && "hover:animation-pause")}
        style={animationStyle}
      >
        {children}
        {/* Duplicate children for seamless loop */}
        {children}
      </div>
    </div>
  )
}
