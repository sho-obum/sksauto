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
      {/* Sticky Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-900 hover:text-blue-600 transition-colors"
              >
                <Image src={logo} alt="SKS logo" height={40} />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link
                href="/#products"
                className="text-sm font-medium transition-colors duration-200 hover:text-blue-600 text-gray-700"
              >
                Product Catalogue
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium transition-colors duration-200 hover:text-blue-600 text-gray-700"
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

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 animate-in slide-in-from-top duration-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {[
                  { id: "home", label: "Home" },
                  {
                    id: "products",
                    label: "Product Catalogue",
                    href: "/#products",
                  }, // Link to products section
                  { id: "blog", label: "Blogs", href: "/blog" },
                  { id: "about", label: "About" },
                  { id: "legacy", label: "Legacy" },
                  { id: "clients", label: "Clients" },
                  { id: "testimonials", label: "Testimonials" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      item.href
                        ? (window.location.href = item.href)
                        : scrollToSection(item.id)
                    }
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-base font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg mt-2"
                >
                  Get in Touch
                </Button>
              </div>
            </div>
          )}
        </div>
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
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  India's Trusted
                  <span className="text-blue-600 block">Manufacturer</span>
                  of Auto Parts
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Delivering premium quality automotive fasteners and components
                  to India's leading manufacturers for over 25 years. Based in
                  Ludhiana, serving nationwide.
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
                <AnimatedStat end={25} suffix="+" label="Years Experience" />
                <AnimatedStat end={500} suffix="+" label="Happy Clients" />
                <AnimatedStat end={100} suffix="%" label="Quality Assured" />
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right duration-1000 delay-300">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=600"
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
                        ISO Certified
                      </div>
                      <div className="text-sm text-gray-600">
                        Quality Manufacturing
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section (Moved here) */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to discuss your automotive component requirements? Contact
              us today for a personalized quote.
            </p>
          </div>

          {/* Quick Contact Options */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                Quick Contact Options
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {/* WhatsApp Button */}
                <Button
                  onClick={() => {
                    const phoneNumber = "919205144611";
                    const message = encodeURIComponent(
                      `Hi SKS Auto Industries! 👋

I found your website and I'm interested in your automotive fasteners and components.

Could you please share more details about your products and services?

Thank you!`
                    );
                    window.open(
                      `https://wa.me/${phoneNumber}?text=${message}`,
                      "_blank"
                    );
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 text-base font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.90-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700" />
                  </svg>
                  <span>WhatsApp Inquiry</span>
                </Button>

                {/* IndiaMART Button */}
                <Button
                  onClick={() => {
                    window.open(
                      "https://www.indiamart.com/s-k-s-auto-industries/",
                      "_blank"
                    );
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 text-base font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>View on IndiaMART</span>
                </Button>

                {/* Direct Call Button */}
                <Button
                  onClick={() => {
                    window.open("tel:+919205144611", "_self");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 text-base font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </Button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Business Hours:</span> Monday -
                  Saturday, 9:00 AM - 6:00 PM IST
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Response Time:</span> Within 2
                  hours during business hours
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form (part of contact section) */}
        </div>
      </section>

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
                  Established in 1998 in the industrial heart of Ludhiana,
                  Punjab, SKS Auto Industries has grown from a small workshop to
                  one of India's most trusted manufacturers of automotive
                  fasteners and components.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our state-of-the-art factory spans over 50,000 sq ft, equipped
                  with modern machinery and operated by skilled craftsmen who
                  understand the precision required in automotive manufacturing.
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
                      Quality Assured
                    </h4>
                    <p className="text-sm text-gray-600">
                      ISO certified manufacturing processes
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Trusted Partner
                    </h4>
                    <p className="text-sm text-gray-600">
                      500+ satisfied clients nationwide
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      25+ Years Experience
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
                src="/placeholder.svg?height=500&width=600"
                alt="SKS Auto Industries Factory"
                width={600}
                height={500}
                className="rounded-xl shadow-lg"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                Since 1998
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Product Lineup
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive range of automotive fasteners and components,
              manufactured to the highest standards of quality and precision.
            </p>
          </div>

          {/* Product Carousel */}
          <Carousel itemClassName="w-full px-2 sm:w-1/2 lg:w-1/3">
            {products.map((product, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 h-full flex flex-col"
              >
                <CardContent className="p-8 text-center flex-1 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      {product.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      className="group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors duration-300 bg-transparent"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Carousel>
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
              25+ Years of Manufacturing Excellence
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              A legacy built on trust, innovation, and unwavering commitment to
              quality in the Indian automotive industry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <AnimatedLegacyStat
              end={1998}
              label="Founded"
              description="Started our journey in Ludhiana with a vision to serve India's automotive industry"
            />
            <AnimatedLegacyStat
              end={50}
              suffix="K+"
              label="Sq Ft Factory"
              description="State-of-the-art manufacturing facility with modern machinery and equipment"
            />
            <AnimatedLegacyStat
              end={500}
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
                src="/placeholder.svg?height=400&width=500"
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
              Trusted by Industry Leaders
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
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Address</h4>
                      <p className="text-gray-600">
                        Industrial Area, Phase-II
                        <br />
                        Ludhiana, Punjab 141003, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Phone</h4>
                      <p className="text-gray-600">+91 92051 44611</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">
                        info@sksautoindustries.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 text-white p-4 sm:p-6 rounded-xl">
                <h4 className="text-base sm:text-lg font-semibold mb-2">
                  Business Hours
                </h4>
                <div className="space-y-1 text-blue-100 text-sm sm:text-base">
                  <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
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
                <Factory className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-bold">SKS Auto Industries</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                India's trusted manufacturer of premium automotive fasteners and
                components. Serving the industry with excellence since 1998.
              </p>
              <div className="text-sm text-gray-400">
                <p>Industrial Area, Phase-II</p>
                <p>Ludhiana, Punjab 141003, India</p>
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
                <p>Nut Bolts</p>
                <p>U Bolts</p>
                <p>Clamps</p>
                <p>Washers</p>
                <p>Custom Fasteners</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} SKS Auto Industries. All rights
              reserved. | Designed for excellence in automotive manufacturing.
            </p>
          </div>
        </div>
      </footer>
      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
