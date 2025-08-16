"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "../components/ContactForm.jsx";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Factory,
  Award,
  Users,
  Wrench,
  Settings,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useCountUp } from "@/hooks/useCountUp";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { Carousel } from "@/components/carousel"; // Import Carousel
import { Marquee } from "@/components/marquee"; // Import Marquee
import Link from "next/link"; // Import Link for navigation
import logo from "../public/sks.svg";
import ContactSectionEnhanced from "@/components/Contact-Section";
import ProductCarousel from "@/components/ProductCarousel";
import ProductShowcase from "@/components/ProductShowcase";
import HeroImg from "../public/1.jpeg";
import HeroImg2 from "../public/2.jpeg";
import HeroImg3 from "../public/heroImg3.png";
import HeroImg4 from "../public/hero4.png";

function AnimatedStat({
  end,
  suffix = "",
  label,
}: {
  end: number;
  suffix?: string;
  label: string;
}) {
  const { count, elementRef } = useCountUp(end, 2000);

  return (
    <div className="text-center" ref={elementRef}>
      <div className="text-3xl font-bold text-blue-600">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

function AnimatedLegacyStat({
  end,
  suffix = "",
  label,
  description,
}: {
  end: number;
  suffix?: string;
  label: string;
  description: string;
}) {
  const { count, elementRef } = useCountUp(end, 2500);

  return (
    <div className="text-center" ref={elementRef}>
      <div className="text-5xl font-bold text-yellow-400 mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-lg font-semibold mb-2">{label}</div>
      <p className="text-blue-100">{description}</p>
    </div>
  );
}

export default function SKSAutoIndustries() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "contact",
        "about",
        "products",
        "legacy",
        "clients",
        "testimonials",
        "contact-form",
      ]; // Updated order
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const products = [
    {
      name: "Nut Bolts",
      description: "High-grade steel nut bolts for automotive applications",
      icon: <Settings className="w-8 h-8" />,
    },
    {
      name: "U Bolts",
      description: "Durable U bolts for suspension and mounting systems",
      icon: <Wrench className="w-8 h-8" />,
    },
    {
      name: "Clamps",
      description: "Precision-engineered clamps for secure fastening",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      name: "Washers",
      description: "Premium quality washers for optimal load distribution",
      icon: <Shield className="w-8 h-8" />,
    },
    {
      name: "Custom Fasteners",
      description: "Bespoke fastening solutions tailored to your needs",
      icon: <Factory className="w-8 h-8" />,
    },
  ];

  const clients = [
    "Tata Motors",
    "Mahindra & Mahindra",
    "Bajaj Auto",
    "Hero MotoCorp",
    "TVS Motor",
    "Ashok Leyland",
    "Eicher Motors",
    "Force Motors",
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      position: "Procurement Manager",
      company: "Leading Auto Manufacturer",
      testimonial:
        "SKS Auto Industries has been our trusted partner for over 15 years. Their consistent quality and on-time delivery have been crucial to our production success.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      position: "Quality Head",
      company: "Major OEM Supplier",
      testimonial:
        "The custom fasteners developed by SKS perfectly met our unique requirements. Their engineering team's expertise and responsiveness are exceptional.",
      rating: 5,
    },
    {
      name: "Amit Patel",
      position: "Supply Chain Director",
      company: "Automotive Components Ltd",
      testimonial:
        "What sets SKS apart is their commitment to continuous improvement. They consistently deliver value beyond just the products - true partnership.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
     <nav
  className="fixed top-0 w-full z-50 transition-all duration-300
  bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-200"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-20">
      {/* Brand */}
      <Link href="/" className="flex items-center space-x-3 group">
        <div
          className="flex items-center justify-center w-11 h-11
          bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-full text-white font-extrabold shadow-sm"
        >
          SKS
        </div>
        <div className="leading-tight">
          <div
            className="font-black tracking-wide
            text-black md:text-gray-900 text-2xl md:text-3xl"
          >
            SKS
          </div>
          <div
            className="uppercase tracking-normal text-[10px] md:text-base
            text-gray-800 md:text-black"
          >
            Auto <span className="text-blue-600">Industries</span>
          </div>
        </div>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          href="/#products"
          className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
        >
          Product Catalogue
        </Link>
        <Link
          href="/blog"
          className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
        >
          Blogs
        </Link>
        <Button
          onClick={() => scrollToSection("contact")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-base font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Get in Touch
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          className="text-gray-900 hover:text-blue-600 transition-colors p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Sheet */}
  {isMenuOpen && (
    <div className="md:hidden">
      {/* dim background */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setIsMenuOpen(false)} />
      {/* panel */}
      <div
        id="mobile-menu"
        className="absolute top-20 inset-x-0 mx-3 rounded-2xl bg-white shadow-2xl
        ring-1 ring-gray-200 overflow-hidden animate-in slide-in-from-top-2 duration-200"
      >
        <div className="px-4 py-4">
          {[
            { id: "home", label: "Home", href: "/" },
            { id: "products", label: "Product Catalogue", href: "/#products" },
            { id: "blog", label: "Blogs", href: "/blog" },
            { id: "about", label: "About" },
            { id: "legacy", label: "Legacy" },
            { id: "clients", label: "Clients" },
            { id: "testimonials", label: "Testimonials" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.href) {
                  window.location.href = item.href;
                } else {
                  scrollToSection(item.id);
                }
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-3 py-3 rounded-lg text-base font-medium
              text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
            >
              {item.label}
            </button>
          ))}

          <Button
            onClick={() => {
              scrollToSection("contact");
              setIsMenuOpen(false);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base font-semibold rounded-xl transition-all duration-300 mt-2 hover:shadow-lg"
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  )}
</nav>


      {/* Hero Section */}
      <section
        id="home"
        className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-1000">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
                  SKS Auto <span className="text-blue-600">Industries</span>
                </h1>
                <span className=" font-bold tracking-wide text-2xl  ">
                  | India's Most trusted
                </span>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Established in 1981, SKS Auto Industries is a trusted name in
                  manufacturing and trading premium rubber parts, oil seals,
                  O-rings, and bushes. With decades of expertise and a modern
                  facility in Delhi, we deliver reliable, competitively priced
                  components tailored to customer needs.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("products")}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300"
                >
                  View Products
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <AnimatedStat end={44} suffix="+" label="Years Experience" />
                <AnimatedStat end={1500} suffix="+" label="Happy Clients" />
                <AnimatedStat end={100} suffix="%" label="Quality Assured" />
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right duration-1000 delay-300">
              <div className="relative">
                <Image
                  src={HeroImg2}
                  alt="SKS Auto Industries Manufacturing"
                  width={600}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <Award className="w-8 h-8 text-yellow-500" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Industry-Trusted
                      </div>
                      <div className="text-sm text-gray-600">Brand</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSectionEnhanced />

      {/* Products Section */}
      <ProductShowcase />

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              About SKS Auto Industries
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on trust, driven by quality, and powered by innovation - we
              are your reliable partner in automotive manufacturing.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Our Story
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Founded in 1981 in Delhi by Late Mr. Sukhdev Sharma, SKS Auto
                  Industries began as a modest 8-person operation and has grown
                  into a trusted manufacturer and trader of high-quality rubber
                  parts, oil seals, bushes, and O-rings. With over four decades
                  of manufacturing excellence, our facility is equipped with the
                  latest machinery and technology to ensure precision,
                  durability, and quality in every component we produce. Our
                  products are widely supplied across India and trusted by major
                  exporters for their reliability and performance.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Factory className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Factory-Based Supply
                    </h4>
                    <p className="text-sm text-gray-600">
                      Direct from our manufacturing facility
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Industry trusted
                    </h4>
                    <p className="text-sm text-gray-600">Brand</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Trusted Partner
                    </h4>
                    <p className="text-sm text-gray-600">
                      1500+ satisfied clients nationwide
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      44+ Years Experience
                    </h4>
                    <p className="text-sm text-gray-600">
                      Quarter-century of excellence
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src={HeroImg}
                alt="SKS Auto Industries Factory"
                width={600}
                height={500}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section
        id="legacy"
        className="py-20 bg-blue-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              44+ Years of Manufacturing Excellence
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              A legacy built on trust, innovation, and unwavering commitment to
              quality in the Indian automotive industry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <AnimatedLegacyStat
              end={1981}
              label="Founded"
              description="Started our journey in Ludhiana with a vision to serve India's automotive industry"
            />
            <AnimatedLegacyStat
              end={2000}
              suffix="+"
              label="Products Developed"
              description="Diverse range of automotive components tailored for various industry needs."
            />
            <AnimatedLegacyStat
              end={2500}
              suffix="+"
              label="Clients Served"
              description="Trusted by leading automotive manufacturers across India"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Manufacturing Heritage</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h4 className="font-semibold">Quality First Approach</h4>
                    <p className="text-blue-100">
                      Every product undergoes rigorous quality checks before
                      dispatch
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h4 className="font-semibold">Innovation & Technology</h4>
                    <p className="text-blue-100">
                      Continuous investment in modern manufacturing technology
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h4 className="font-semibold">Skilled Workforce</h4>
                    <p className="text-blue-100">
                      Team of experienced craftsmen and quality engineers
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h4 className="font-semibold">Pan-India Presence</h4>
                    <p className="text-blue-100">
                      Serving automotive manufacturers across all major Indian
                      cities
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src={HeroImg4}
                alt="Manufacturing Heritage"
                width={500}
                height={400}
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Premium Products Available for these Brands
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're proud to supply premium automotive components to India's
              most respected manufacturers.
            </p>
          </div>

          {/* Mobile Marquee */}
          <div className="md:hidden mb-16">
            <Marquee duration="40s">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="px-6 py-3 text-lg font-semibold text-gray-900 flex-shrink-0"
                >
                  {client}
                </div>
              ))}
            </Marquee>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {clients.map((client, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-lg font-semibold text-gray-900">
                  {client}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Leading Manufacturers Choose Us
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-700">
                      Consistent quality and on-time delivery
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-700">
                      Competitive pricing with bulk order discounts
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-700">
                      Custom manufacturing capabilities
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-700">
                      Dedicated customer support team
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  Client Retention Rate
                </div>
                <p className="text-gray-600">
                  Our clients trust us for repeat orders year after year
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what industry leaders say
              about our products and services.
            </p>
          </div>

          {/* Testimonial Carousel (for both mobile and desktop) */}
          <Carousel itemClassName="w-full px-2 sm:w-1/2 lg:w-1/3">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
              >
                <CardContent className="p-0 flex-1 flex flex-col">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic flex-1">
                    {testimonial.testimonial}
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.position}
                    </div>
                    <div className="text-sm text-blue-600">
                      {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div
            id="contact-form"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mt-8 lg:mt-12"
          >
            <div className="space-y-6 sm:space-y-8">
              <div className="">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="SKS Auto Industries Factory"
                  width={600}
                  height={200}
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>

            <Card className="p-4 sm:p-6 lg:p-8">
              <ContactForm />
            </Card>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl font-bold">SKS Auto Industries</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                India's trusted manufacturer of premium automotive fasteners and
                components. Serving the industry with excellence since 1998.
              </p>
              <div className="text-sm text-gray-400">
                <p>Anand Parvat Industrial Area</p>
                <p> New Delhi-110005, Delhi, India</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection("about")}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("products")}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Products
                </button>
                <button
                  onClick={() => scrollToSection("legacy")}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Legacy
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Products</h4>
              <div className="space-y-2 text-gray-400">
                <p>Oil Seal</p>
                <p>O-Ring</p>
                <p>Injector Seal</p>
                <p>Bushes</p>
                <p>Rubber Boot</p>
                <p>Fuel Valve</p>
                <p>Fuel Injector</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} SKS Auto Industries. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
