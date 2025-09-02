import React from "react";
import { MapPin, Phone, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const TrustBadge = () => (
  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-50/80 text-emerald-700 px-3 py-1 text-xs font-semibold shadow-sm">
    <BadgeCheck className="w-4 h-4" /> IndiaMART Verified Supplier
  </div>
);

export default function ContactSectionEnhanced() {
  const address =
    "Plot No B-5 Street No 1 Anand Parbat Industrial Area Near association office New Delhi-110005";

  const openWhatsApp = () => {
    const phoneNumber = "919810910389";
    const message = encodeURIComponent(
      `Hi SKS Auto Industries! 👋\n\nI found your website and I'm interested in your automotive fasteners and components.\n\nCould you please share more details about your products and services?\n\nThank you!`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const callNow = () => {
    window.open("tel:+919810910389", "_self");
  };

  const openMaps = () => {
    const url = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 via-white to-white" />
      <div className="absolute inset-0 -z-10 [background:radial-gradient(60%_40%_at_50%_0%,rgba(59,130,246,0.10),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to discuss your automotive component requirements? Contact us
            today for a personalized quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left */}
          <div className="space-y-6">
            <div className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Address
                    </h4>
                    <p className="text-gray-600">{address}</p>
                  </div>
                </div>

                {/* Static map with black overlay + breathing pulse, click opens Maps */}
                <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-sm group">
                  <iframe
                    title="Map preview"
                    className="w-full h-64 pointer-events-none select-none"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      address
                    )}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    {/* outer wave (slower, larger) */}
                    <span className="absolute h-12 w-12 rounded-full bg-blue-400 opacity-40 animate-[ping_2.8s_ease-out_infinite] [animation-delay:200ms]" />
                    {/* inner wave (faster) */}
                    <span className="absolute h-9 w-9 rounded-full bg-blue-400 opacity-50 animate-[ping_2s_ease-out_infinite]" />
                    {/* core dot */}
                    <span className="relative h-3.5 w-3.5 rounded-full bg-blue-500 ring-2 ring-white shadow" />
                  </div>
                  <button
                    aria-label="Open in Google Maps"
                    onClick={openMaps}
                    className="absolute inset-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-rows-[auto,1fr] gap-6">
            <div className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Quick Contact
                </h3>
                <TrustBadge />
              </div>

              <Button
                onClick={openWhatsApp}
                className="w-full justify-center gap-3 rounded-xl px-6 py-5 text-base font-semibold bg-green-500 hover:bg-green-600 hover:shadow-green-500/30 shadow-md hover:shadow-xl transition-transform hover:scale-[1.01] text-white"
                aria-label="Open WhatsApp with pre-filled message"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                </svg>
                WhatsApp Inquiry
              </Button>

              <Button
                onClick={callNow}
                className="w-full justify-center gap-3 rounded-xl px-6 py-5 text-base font-semibold bg-blue-600 hover:bg-blue-700 hover:shadow-blue-600/30 shadow-md hover:shadow-xl transition-transform hover:scale-[1.01] text-white"
                aria-label="Call now"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </Button>
            </div>

            {/* Banner: fills remaining height; clickable to call */}
            <div
              onClick={callNow}
              className="relative rounded-2xl overflow-hidden cursor-pointer border border-gray-100 shadow-lg group h-full min-h-54"
            >
              <img
                src="https://i.ibb.co/7N11MDtL/b1f10d26-c070-4c52-96cd-71accd414399.png"
                alt="Call Now Banner"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <p className="text-white text-2xl md:text-3xl font-bold tracking-wide drop-shadow-lg flex items-center gap-2">
                  Call Us Now!
                </p>
                <p className="text-white/90 text-base md:text-lg drop-shadow-md">
                  Instant Quotes • Expert Advice • No Wait
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
