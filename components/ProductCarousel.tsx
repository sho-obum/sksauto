// components/ProductCarousel.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";
import { Carousel } from "@/components/carousel";

export type ProductCard = {
  id: string;
  title: string;
  subtitle: string;
  image: string;   // 1:1 preferred
  href?: string;
  tag?: string;
};

type Props = {
  items?: ProductCard[];   // optional; falls back to defaults below
  className?: string;
};

// quick square placeholder builder (uses your existing placeholder.svg)
const ph = (label: string) =>
  `/placeholder.svg?height=800&width=800&text=${encodeURIComponent(label)}`;

const defaultItems: ProductCard[] = [
  { id: "oil-seal",      title: "Oil Seal",      subtitle: "High-temp NBR, leak-proof",        image: ph("Oil Seal") },
  { id: "o-ring",        title: "O-Ring",        subtitle: "Precision elastomer rings",        image: ph("O-Ring") },
  { id: "injector-seal", title: "Injector Seal", subtitle: "Tight fit, consistent flow",       image: ph("Injector Seal") },
  { id: "bushes",        title: "Bushes",        subtitle: "Durable wear resistance",          image: ph("Bushes") },
  { id: "rubber-boot",   title: "Rubber Boot",   subtitle: "Protective bellows, OEM spec",     image: ph("Rubber Boot") },
  { id: "fuel-valve",    title: "Fuel Valve",    subtitle: "Reliable sealing performance",     image: ph("Fuel Valve") },
  { id: "fuel-injector", title: "Fuel Injector", subtitle: "Consistent atomization",           image: ph("Fuel Injector") },
];

export default function ProductCarousel({ items = defaultItems, className }: Props) {
  return (
    <div className={clsx("w-full", className)}>
      <Carousel itemClassName="w-full px-2 sm:w-1/2 lg:w-1/3">
        {items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </Carousel>
    </div>
  );
}

function Card({ item }: { item: ProductCard }) {
  const Wrapper: any = item.href ? Link : "div";
  const wrapperProps = item.href ? { href: item.href } : {};

  return (
    <Wrapper {...wrapperProps} className="group block h-full" aria-label={item.title}>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm ring-1 ring-gray-200 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        {/* Image */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Optional tag chip */}
        {item.tag && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-white/85 px-2.5 py-1 text-xs font-semibold text-blue-700 shadow-sm ring-1 ring-blue-100 backdrop-blur">
            {item.tag}
          </span>
        )}

        {/* Bottom overlay */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-4">
          <div className="pointer-events-none absolute inset-0 -top-28 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_65%,rgba(0,0,0,0.75)_100%)]" />
          <div className="relative flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-white text-lg font-semibold leading-tight truncate">
                {item.title}
              </h3>
              <p className="text-white/85 text-sm leading-snug line-clamp-2">
                {item.subtitle}
              </p>
            </div>
            <ChevronRight className="shrink-0 w-5 h-5 text-white/80 opacity-0 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
