"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Scissors,
  Crown,
  HeartHandshake,
  ShieldCheck,
  Star,
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clock,
  Check,
  MapPin,
  Calendar,
  Phone,
  ChevronRight,
  Sparkle,
} from "lucide-react";
import Navbar from "./components/Navbar";
import BookingModal from "./components/BookingModal";

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Bespoke Balayage & Highlights");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Video playback & sound controls
  const [isPlayingVideo2, setIsPlayingVideo2] = useState(true);
  const [isMutedVideo2, setIsMutedVideo2] = useState(true);
  const video2Ref = useRef<HTMLVideoElement>(null);

  // Load and apply theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("aura_theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      if (saved === "light") {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      }
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("aura_theme", next);
    if (next === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  };

  const toggleVideo2Play = () => {
    if (video2Ref.current) {
      if (isPlayingVideo2) {
        video2Ref.current.pause();
      } else {
        video2Ref.current.play();
      }
      setIsPlayingVideo2(!isPlayingVideo2);
    }
  };

  const toggleVideo2Mute = () => {
    if (video2Ref.current) {
      video2Ref.current.muted = !isMutedVideo2;
      setIsMutedVideo2(!isMutedVideo2);
    }
  };

  const openBookingForService = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  // Real services with exact matching photos from public/
  const services = [
    {
      id: "balayage",
      category: "color",
      title: "Bespoke Balayage & Highlights",
      tagline: "Dimensional Radiance & Seamless Root Melting",
      price: "from $185",
      duration: "180 MIN",
      badge: "MOST POPULAR",
      image: "/hair-balayage.jpg",
      desc: "Freehand French balayage and precision foil highlights crafted for fluid dimension, soft natural transitions, and liquid shine using bond-protective formulas.",
      features: ["Customized contouring technique", "High-gloss French toning gloss", "Nourishing bond repair & finish"],
    },
    {
      id: "bridal-updo",
      category: "styling",
      title: "Bridal Glamour & Haute Updo",
      tagline: "High-Fashion Coiffure for Life's Great Celebrations",
      price: "from $120",
      duration: "75 MIN",
      badge: "PREMIUM STYLING",
      image: "/hair-bridal-updo.jpg",
      desc: "From romantic woven half-updos with sculpted Hollywood waves to timeless chignons. Engineered to hold flawlessly throughout your celebration.",
      features: ["24-hour ultra-hold technique", "Sash & accessory placement", "Consultation & mini touch-up kit"],
    },
    {
      id: "silk-blonde",
      category: "color",
      title: "Full Color & Platinum Ice Gloss",
      tagline: "High-Pigment Depth & Mirror Reflection",
      price: "from $165",
      duration: "150 MIN",
      badge: "COLOR SPECIALIST",
      image: "/hair-silk-blonde.jpg",
      desc: "From cool Scandinavian ice-blonde transitions to rich mocha tones. Ammonia-free luxury formulas that strengthen bonds and leave hair feeling like liquid silk.",
      features: ["Gentle lift & lightening", "Color correction & gloss bath", "Deep restorative moisture mask"],
    },
    {
      id: "precision-cut",
      category: "cut",
      title: "Precision Haircut & Blowout",
      tagline: "Sculpted Volume & Fluid Movement",
      price: "from $65",
      duration: "60 MIN",
      badge: "SIGNATURE CUT",
      image: "/hair-transformation-cut.jpg",
      desc: "One-on-one consultation tailored to your facial geometry and hair texture. Includes an indulgent botanical scalp massage and round-brush blowout.",
      features: ["Personalized structural consultation", "Scalp massage & botanical wash", "Round-brush blow-dry & styling"],
    },
    {
      id: "scalp-spa",
      category: "treatments",
      title: "Oncare Scalp & Hair Repair Ritual",
      tagline: "Deep Cellular Rebirth & Sensory Wellness",
      price: "from $80",
      duration: "45 MIN",
      badge: "HAIR WELLNESS",
      image: "/scalp-spa-ritual.jpg",
      desc: "An intensive spa cure utilizing Oncare Scalp marine scrub, botanical serums, and protein infusions. Rebalances moisture and awakens vital hair growth.",
      features: ["Exfoliating marine scalp scrub", "Intensive botanical protein mask", "Aromatherapy acupressure massage"],
    },
    {
      id: "modern-haircut",
      category: "cut",
      title: "Modern Haircut & Grooming",
      tagline: "Razor-Sharp Precision & Tailored Texture",
      price: "from $50",
      duration: "45 MIN",
      badge: "BARBER & STYLE",
      image: "/hair-modern-cut.jpg",
      desc: "Contemporary scissor cuts, skin fades, and tailored styling executed with millimeter precision in our dedicated boutique barber lounge.",
      features: ["Precision scissor & clipper fade", "Premium matte/gloss pomade styling", "Hot towel finish"],
    },
  ];

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  // Lookbook items from public folder
  const lookbook = [
    {
      img: "/hair-transformation-blonde.jpg",
      title: "Platinum Ice Blonde Transformation",
      desc: "From brassy copper to an even, cool, and silky Scandinavian blonde balayage.",
      tag: "BEFORE & AFTER",
    },
    {
      img: "/hair-transformation-cut.jpg",
      title: "Volume Sculpt & Silk Blowout",
      desc: "Eliminating damaged ends to craft a bouncy, full-bodied straight finish.",
      tag: "PRECISION CUT",
    },
    {
      img: "/hair-textured-updo.jpg",
      title: "Textured Romantic Chignon",
      desc: "Soft, ethereal woven locks gathered in a timeless bridal celebration updo.",
      tag: "BRIDAL UPDO",
    },
    {
      img: "/hair-silver-fade.jpg",
      title: "Silver Chrome Fade & Undercut",
      desc: "High-fashion metallic tone paired with millimeter-accurate skin fade.",
      tag: "TREND COLOR",
    },
  ];

  return (
    <div
      className={`relative min-h-screen ${
        theme === "dark" ? "bg-[#09080b] text-[#f4efe6]" : "bg-[#faf7f2] text-[#1c1822]"
      } overflow-x-hidden selection:bg-[#e61c5d] selection:text-white transition-colors duration-500`}
    >
      {/* Navigation */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultService={selectedService}
      />

      {/* ========================================================================= */}
      {/* HERO SECTION: High-Color Vibrant Banner + Real Salon Photography */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-center overflow-hidden pt-32 sm:pt-36 lg:pt-40 pb-16 lg:pb-20">
        {/* Background Ambient Video Layer - Increased Visibility & Vivid Color */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              theme === "dark" ? "opacity-75 saturate-125" : "opacity-45 saturate-110"
            }`}
          >
            <source src="/saloon hero.mp4" type="video/mp4" />
          </video>

          {/* Clean Gradient Scrim for crisp text legibility without dimming the whole video */}
          <div
            className={`absolute inset-0 transition-colors duration-500 ${
              theme === "dark"
                ? "bg-gradient-to-r from-[#09080b]/95 via-[#09080b]/65 to-transparent"
                : "bg-gradient-to-r from-[#faf7f2]/95 via-[#faf7f2]/60 to-transparent"
            }`}
          />
          <div
            className={`absolute bottom-0 left-0 right-0 h-32 ${
              theme === "dark"
                ? "bg-gradient-to-t from-[#09080b] to-transparent"
                : "bg-gradient-to-t from-[#faf7f2] to-transparent"
            }`}
          />

          {/* Subtle warm rose-gold accent lights */}
          <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#e61c5d]/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#dfb15b]/20 rounded-full blur-[110px] pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center py-6 sm:py-8">
          {/* Left Column: Bold Empowering Typography & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Salon Badge */}
            <div
              className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border w-fit mb-6 backdrop-blur-md ${
                theme === "dark"
                  ? "bg-[#1c1822]/80 border-[#e8a598]/35 shadow-md"
                  : "bg-white/90 border-[#b87364]/30 shadow-sm"
              }`}
            >
              <Crown className="w-4 h-4 text-[#e8a598]" />
              <span
                className={`text-[11px] uppercase tracking-[0.25em] font-semibold ${
                  theme === "dark" ? "text-[#f7e7ce]" : "text-[#1c1822]"
                }`}
              >
                Kungsbacka&apos;s Exclusive Beauty Sanctuary • Est. 2022
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className={`font-serif text-4xl sm:text-6xl xl:text-7xl font-light leading-[1.08] tracking-tight mb-6 ${
                theme === "dark" ? "text-[#f7e7ce]" : "text-[#1c1822]"
              }`}
            >
              UNLEASH YOUR{" "}
              <span className="font-normal italic text-gradient-rose block sm:inline">
                CONFIDENCE.
              </span>
              <span
                className={`block font-serif font-light text-2xl sm:text-4xl xl:text-5xl mt-2 tracking-wide ${
                  theme === "dark" ? "text-white/95" : "text-[#2b2532]"
                }`}
              >
                Your Hair. Your Crown.
              </span>
            </h1>

            {/* Subheading */}
            <p
              className={`font-sans text-sm sm:text-base max-w-xl font-light leading-relaxed mb-8 ${
                theme === "dark" ? "text-[#f4efe6]/85" : "text-[#3d3744]"
              }`}
            >
              Welcome to <strong className="font-semibold text-[#e8a598]">Natalie Sax Hair & Beauty</strong> located at{" "}
              <strong>Rosengatan 19 C in Kungsbacka</strong>. We craft bespoke color alchemy, 
              precision haircuts, and luxurious scalp treatments in an empowering, glamorous salon setting.
            </p>

            {/* Glowing Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="crimson-neon-button px-8 py-4 rounded-full text-xs uppercase tracking-[0.22em] font-bold text-white flex items-center justify-center gap-3 cursor-pointer shadow-xl"
              >
                <Sparkles className="w-4 h-4 text-[#ffd166]" />
                <span>Book Your Transformation</span>
              </button>

              <a
                href="#services"
                className={`px-7 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-medium border transition-all flex items-center justify-center gap-2 ${
                  theme === "dark"
                    ? "text-[#f7e7ce] border-[#e8a598]/40 hover:border-[#e8a598] hover:bg-[#e8a598]/10"
                    : "text-[#1c1822] border-[#b87364]/40 hover:border-[#b87364] hover:bg-white shadow-sm"
                }`}
              >
                <span>Explore Services</span>
                <ChevronRight className="w-4 h-4 text-[#e8a598]" />
              </a>
            </div>

            {/* Key Facts */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/10 dark:border-white/10 max-w-lg">
              <div>
                <div
                  className={`font-serif text-2xl sm:text-3xl font-semibold ${
                    theme === "dark" ? "text-[#f7e7ce]" : "text-[#1c1822]"
                  }`}
                >
                  Est. 2022
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#e8a598] font-sans font-semibold">
                  Kungsbacka Atelier
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#e8a598]">
                  20% Off
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#e8a598] font-sans font-semibold">
                  New Salon Privilege
                </div>
              </div>
              <div>
                <div
                  className={`font-serif text-2xl sm:text-3xl font-semibold flex items-center gap-1 ${
                    theme === "dark" ? "text-[#f7e7ce]" : "text-[#1c1822]"
                  }`}
                >
                  5.0 <Star className="w-4 h-4 fill-[#dfb15b] text-[#dfb15b]" />
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#e8a598] font-sans font-semibold">
                  Verified Client Reviews
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Real Salon High-Res Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#e61c5d]/25 via-[#e8a598]/20 to-transparent rounded-3xl blur-2xl -z-10" />

            <div className="relative rounded-3xl overflow-hidden border border-[#e8a598]/40 shadow-[0_20px_60px_rgba(0,0,0,0.7)] group">
              <img
                src="/salon-interior.jpg"
                alt="Natalie Sax Hair & Beauty Salon Interior Kungsbacka"
                className="w-full h-[380px] sm:h-[440px] lg:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#e8a598]/30 text-[11px] uppercase tracking-wider text-[#f7e7ce] font-medium flex items-center gap-1.5 shadow-lg">
                <MapPin className="w-3.5 h-3.5 text-[#e61c5d]" />
                <span>Rosengatan 19 C</span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl glass-panel border border-[#e8a598]/30 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-[#e61c5d] font-bold">
                      OUR NEW SANCTUARY
                    </div>
                    <div className={`font-serif text-2xl font-semibold ${theme === "dark" ? "text-[#f7e7ce]" : "text-[#1c1822]"}`}>
                      Natalie Sax Atelier
                    </div>
                    <div className={`text-xs mt-0.5 ${theme === "dark" ? "text-[#f4efe6]/80" : "text-[#4a434d]"}`}>
                      Gilded mirrors • Private barber suite • Shampoo lounge
                    </div>
                  </div>
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="champagne-button px-4 py-2 rounded-full text-[11px] uppercase tracking-wider font-bold shrink-0 cursor-pointer"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SHIMMER MARQUEE */}
      {/* ========================================================================= */}
      <div
        className={`relative py-4 border-y overflow-hidden transition-colors ${
          theme === "dark"
            ? "bg-[#121016] border-[#e8a598]/15 text-[#f7e7ce]/90"
            : "bg-[#f2ece2] border-[#b87364]/20 text-[#2b221a]"
        }`}
      >
        <div className="flex whitespace-nowrap animate-shimmer">
          <div className="flex items-center gap-8 text-[11px] uppercase tracking-[0.35em] font-semibold">
            <span>• NATALIE SAX HAIR & BEAUTY</span>
            <span>• BESPOKE BALAYAGE & HIGHLIGHTS</span>
            <span>• HAUTE BRIDAL UPDO</span>
            <span>• ONCARE SCALP WELLNESS</span>
            <span>• BARBER & GROOMING SUITE</span>
            <span>• ROSENGATAN 19 C KUNGSBACKA</span>
            <span>• BOOK YOUR TRANSFORMATION</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SERVICES SECTION: Grid With Real Hair Photos */}
      {/* ========================================================================= */}
      <section id="services" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8a598]/15 border border-[#e8a598]/30 text-[#e8a598] text-[11px] tracking-[0.22em] uppercase font-semibold mb-3">
            <Scissors className="w-3.5 h-3.5 text-[#e61c5d]" />
            Curated Menu of Services
          </div>
          <h2
            className={`font-serif text-3xl sm:text-5xl font-light tracking-tight mb-4 ${
              theme === "dark" ? "text-[#f7e7ce]" : "text-[#1c1822]"
            }`}
          >
            HAUTE ARTISTRY & <span className="italic text-gradient-rose font-normal">TRANSFORMATION</span>
          </h2>
          <p
            className={`text-sm leading-relaxed font-light ${
              theme === "dark" ? "text-[#f4efe6]/75" : "text-[#4a434d]"
            }`}
          >
            Explore our collection of customized color rituals, precision haircuts, and restorative hair spa 
            experiences. Real client results featured below.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {[
              { id: "all", label: "All Offerings" },
              { id: "color", label: "Color & Balayage" },
              { id: "cut", label: "Haircut & Barber" },
              { id: "styling", label: "Updo & Styling" },
              { id: "treatments", label: "Spa & Wellness" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.16em] transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-[#e8a598] to-[#f7e7ce] text-[#09080b] font-bold shadow-[0_0_20px_rgba(232,165,152,0.4)]"
                    : theme === "dark"
                    ? "bg-[#14121a] text-[#f4efe6]/70 border border-white/10 hover:border-[#e8a598]/40 hover:text-white"
                    : "bg-white text-[#2a2430] border border-black/10 hover:border-[#b87364] shadow-sm"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid with Matching Photos */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, idx) => (
            <motion.div
              layout
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl glass-panel flex flex-col justify-between border-rose-glow transition-all duration-300 overflow-hidden"
            >
              {/* Image Header with Badge */}
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="text-[10px] tracking-[0.18em] font-bold uppercase px-3 py-1 rounded-full bg-[#e61c5d]/90 text-white shadow-md">
                    {service.badge}
                  </span>
                </div>

                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-[#f7e7ce] font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#e8a598]" />
                  <span>{service.duration}</span>
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-serif text-2xl font-normal text-white drop-shadow-md">
                    {service.title}
                  </h3>
                  <div className="text-[11px] uppercase tracking-wider text-[#e8a598] font-medium">
                    {service.tagline}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <p
                  className={`text-xs leading-relaxed font-light mb-5 ${
                    theme === "dark" ? "text-[#f4efe6]/75" : "text-[#4a434d]"
                  }`}
                >
                  {service.desc}
                </p>

                <ul className="space-y-2 mb-6 border-t border-black/10 dark:border-white/10 pt-4">
                  {service.features.map((feat, fIdx) => (
                    <li
                      key={fIdx}
                      className={`flex items-center gap-2.5 text-xs ${
                        theme === "dark" ? "text-[#f4efe6]/85" : "text-[#2a2430]"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-[#e8a598]/20 flex items-center justify-center text-[#e8a598] shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider opacity-60 block">
                      Investment
                    </span>
                    <span
                      className={`font-serif text-2xl sm:text-3xl font-semibold ${
                        theme === "dark" ? "text-[#f7e7ce]" : "text-[#1c1822]"
                      }`}
                    >
                      {service.price}
                    </span>
                  </div>

                  <button
                    onClick={() => openBookingForService(service.title)}
                    className="champagne-button px-5 py-2.5 rounded-full text-[11px] uppercase tracking-[0.16em] font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Reserve</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* LOOKBOOK & TRANSFORMATIONS: Real Before & After Gallery */}
      {/* ========================================================================= */}
      <section
        id="transformations"
        className={`relative py-24 border-y transition-colors duration-500 scroll-mt-28 ${
          theme === "dark" ? "bg-[#0c0b10] border-[#e8a598]/15" : "bg-[#f5efe8] border-[#b87364]/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e61c5d]/15 border border-[#e61c5d]/30 text-[#e61c5d] text-[11px] tracking-[0.22em] uppercase font-bold mb-3">
              <Sparkle className="w-3.5 h-3.5 text-[#e61c5d]" />
              Client Transformations
            </div>
            <h2
              className={`font-serif text-3xl sm:text-5xl font-light ${
                theme === "dark" ? "text-[#f7e7ce]" : "text-[#1c1822]"
              }`}
            >
              AUTHENTIC RESULTS BY <span className="italic text-gradient-rose">NATALIE SAX</span>
            </h2>
            <p
              className={`text-sm font-light mt-3 ${
                theme === "dark" ? "text-[#f4efe6]/75" : "text-[#4a434d]"
              }`}
            >
              Real before & after transformations, lived-in blonde balayage, and haute updos created at Rosengatan 19 C.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lookbook.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl overflow-hidden glass-panel border-rose-glow"
              >
                <div className="relative h-80 w-full overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] tracking-widest font-bold uppercase px-2.5 py-1 rounded-full bg-black/70 border border-[#e8a598]/40 text-[#ffd166]">
                      {item.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="font-serif text-lg font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#f4efe6]/80 font-light mt-1 line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SENSORY SANCTUARY: Salon Collage + Film Showcase */}
      {/* ========================================================================= */}
      <section id="experience" className="relative py-28 max-w-7xl mx-auto px-6 md:px-12 scroll-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Real Salon Collage */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#e61c5d]/20 to-[#e8a598]/20 rounded-3xl blur-2xl -z-10" />
            <div className="rounded-3xl overflow-hidden border border-[#e8a598]/40 shadow-2xl group">
              <img
                src="/salon-collage.jpg"
                alt="Natalie Sax Salon Reception, Shampoo Stations and Products"
                className="w-full h-[540px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="p-5 glass-panel border-t border-[#e8a598]/25 flex items-center justify-between">
                <div>
                  <div className="font-serif text-xl text-[#f7e7ce]">
                    Welcome to Our Sanctuary
                  </div>
                  <div className="text-xs text-[#e8a598]">
                    Reception • Shampoo Lounge • Product Boutique • Velvet Lounge
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-wider text-[#e61c5d] font-bold">
                    Rosengatan 19 C
                  </div>
                  <div className="text-xs text-[#f4efe6]/70">434 43 Kungsbacka</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Atelier Video & Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e61c5d]/15 border border-[#e61c5d]/30 text-[#e61c5d] text-[11px] tracking-[0.22em] uppercase font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#e61c5d]" />
              The Salon Experience
            </div>

            <h2
              className={`font-serif text-3xl sm:text-5xl font-light leading-tight ${
                theme === "dark" ? "text-[#f7e7ce]" : "text-[#1c1822]"
              }`}
            >
              A SANCTUARY FOR YOUR HAIR & <span className="italic text-gradient-rose font-normal">WELL-BEING</span>
            </h2>

            <p
              className={`text-sm font-light leading-relaxed ${
                theme === "dark" ? "text-[#f4efe6]/85" : "text-[#4a434d]"
              }`}
            >
              In our newly designed atelier at Rosengatan 19 C in Kungsbacka, you enter a warm, 
              glamorous ambiance adorned with gilded vanity mirrors, plush shampoo loungers, and curated 
              professional hair care collections. Here, we dedicate uninterrupted time exclusively to you.
            </p>

            {/* Video Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-[#e8a598]/30 shadow-xl aspect-video group mt-4">
              <video
                ref={video2Ref}
                autoPlay
                loop
                muted={isMutedVideo2}
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/saloon hero 2.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <button
                  onClick={toggleVideo2Play}
                  className="w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-[#e61c5d] transition-colors cursor-pointer"
                  aria-label="Play or Pause film"
                >
                  {isPlayingVideo2 ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 translate-x-0.5" />}
                </button>
                <button
                  onClick={toggleVideo2Mute}
                  className="w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-[#e8a598] hover:text-black transition-colors cursor-pointer"
                  aria-label="Sound on/off"
                >
                  {isMutedVideo2 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="crimson-neon-button px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-bold text-white cursor-pointer"
              >
                Book Your Appointment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOUNDER / OWNER SECTION: "Meet Natalie Sax" */}
      {/* ========================================================================= */}
      <section
        id="founder"
        className={`relative py-28 border-t transition-colors duration-500 scroll-mt-28 ${
          theme === "dark" ? "bg-[#0b0a0e] border-[#e8a598]/15" : "bg-[#f7f2ea] border-[#b87364]/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Stylist In Action Portrait */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#e61c5d]/20 to-[#e8a598]/20 rounded-3xl blur-2xl -z-10" />
            <div className="relative rounded-3xl overflow-hidden border border-[#e8a598]/40 shadow-2xl group">
              <img
                src="/founder.jpg"
                alt="Natalie Sax styling customer hair in salon"
                className="w-full h-[520px] sm:h-[600px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-panel border border-[#e8a598]/30 backdrop-blur-xl">
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#e61c5d] font-bold mb-1">
                  FOUNDER & MASTER STYLIST
                </div>
                <div className="font-serif text-2xl text-[#f7e7ce] font-semibold">
                  Natalie Sax
                </div>
                <div className="text-xs text-[#f4efe6]/80 mt-0.5">
                  Founder of Natalie Sax Hair & Beauty • Passion for Artistry & Perfection
                </div>
              </div>
            </div>
          </div>

          {/* Story & Philosophy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8a598]/15 border border-[#e8a598]/30 text-[#e8a598] text-[11px] tracking-[0.22em] uppercase font-semibold">
              <Crown className="w-3.5 h-3.5 text-[#e61c5d]" />
              Meet The Founder
            </div>

            <h2
              className={`font-serif text-3xl sm:text-5xl font-light leading-[1.12] ${
                theme === "dark" ? "text-[#f7e7ce]" : "text-[#1c1822]"
              }`}
            >
              &ldquo;HAIR IS YOUR CROWN. <br />
              <span className="italic text-gradient-rose font-normal">WE MAKE IT SHINE UNAPOLOGETICALLY.&rdquo;</span>
            </h2>

            <div
              className={`space-y-4 text-sm font-light leading-relaxed ${
                theme === "dark" ? "text-[#f4efe6]/80" : "text-[#4a434d]"
              }`}
            >
              <p>
                Since opening in 2022, our core vision at <strong className="font-semibold text-[#e8a598]">Natalie Sax Hair & Beauty</strong> has 
                been to provide a warm, intimate salon where every guest feels celebrated, pampered, and truly heard. 
                With the expansion into our new atelier at <strong>Rosengatan 19 C in Kungsbacka</strong>, we have created an 
                even more breathtaking environment for transformative hair results.
              </p>
              <p>
                &ldquo;To me, hairdressing is so much more than styling hair—it is about elevating self-worth, 
                confidence, and natural beauty through master craftsmanship and personal connection.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3">
              <div
                className={`p-4 rounded-2xl border ${
                  theme === "dark"
                    ? "bg-[#121016] border-[#e8a598]/15"
                    : "bg-white border-[#b87364]/20 shadow-sm"
                }`}
              >
                <ShieldCheck className="w-5 h-5 text-[#e8a598] mb-2" />
                <h4
                  className={`font-serif text-base ${
                    theme === "dark" ? "text-[#f7e7ce]" : "text-[#1c1822]"
                  }`}
                >
                  Curated Formulas
                </h4>
                <p className={`text-[11px] mt-1 ${theme === "dark" ? "text-[#f4efe6]/60" : "text-[#5e5663]"}`}>
                  Only meticulously selected, gentle, and bond-repairing luxury lines.
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border ${
                  theme === "dark"
                    ? "bg-[#121016] border-[#e8a598]/15"
                    : "bg-white border-[#b87364]/20 shadow-sm"
                }`}
              >
                <HeartHandshake className="w-5 h-5 text-[#e61c5d] mb-2" />
                <h4
                  className={`font-serif text-base ${
                    theme === "dark" ? "text-[#f7e7ce]" : "text-[#1c1822]"
                  }`}
                >
                  Personal Devotion
                </h4>
                <p className={`text-[11px] mt-1 ${theme === "dark" ? "text-[#f4efe6]/60" : "text-[#5e5663]"}`}>
                  Generous time allocated for in-depth consultation and serene pampering.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openBookingForService("Consultation with Natalie")}
                className="crimson-neon-button px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold text-white cursor-pointer"
              >
                Request Consultation with Natalie
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section className="relative py-24 px-6 md:px-12 overflow-hidden text-center">
        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-b from-[#09080b] via-[#141018] to-[#09080b]"
              : "bg-gradient-to-b from-[#faf7f2] via-[#ede5da] to-[#faf7f2]"
          }`}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#e61c5d]/15 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div
            className={`w-12 h-12 rounded-full border border-[#e8a598]/40 mx-auto flex items-center justify-center ${
              theme === "dark" ? "bg-[#1c1822]" : "bg-white shadow-sm"
            }`}
          >
            <Crown className="w-6 h-6 text-[#e8a598]" />
          </div>

          <h2
            className={`font-serif text-4xl sm:text-6xl font-light ${
              theme === "dark" ? "text-[#f7e7ce]" : "text-[#1c1822]"
            }`}
          >
            READY FOR YOUR TRANSFORMATION? <br />
            <span className="italic text-gradient-rose font-normal">CLAIM YOUR APPOINTMENT TODAY.</span>
          </h2>

          <p
            className={`text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto ${
              theme === "dark" ? "text-[#f4efe6]/80" : "text-[#4a434d]"
            }`}
          >
            Visit us at Rosengatan 19 C in Kungsbacka or book your session seamlessly online. 
            We look forward to honoring you and your hair.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="crimson-neon-button px-10 py-4 rounded-full text-xs uppercase tracking-[0.24em] font-bold text-white shadow-2xl cursor-pointer"
            >
              Book Online via Bokadirekt
            </button>
            <a
              href="tel:+46700000000"
              className={`px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-semibold border transition-colors flex items-center gap-2 ${
                theme === "dark"
                  ? "text-[#f7e7ce] border-[#e8a598]/30 hover:border-[#e8a598]"
                  : "text-[#1c1822] border-[#b87364]/40 hover:border-[#b87364] bg-white shadow-sm"
              }`}
            >
              <Phone className="w-4 h-4 text-[#e61c5d]" />
              <span>Call Salon Concierge</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER */}
      {/* ========================================================================= */}
      <footer
        id="contact"
        className="relative bg-[#060507] text-[#f4efe6] border-t border-[#e8a598]/20 pt-20 pb-12 px-6 md:px-12 scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[#e8a598]/40 flex items-center justify-center bg-[#1c1822]">
                <Scissors className="w-4 h-4 text-[#e8a598]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-[#f7e7ce]">
                  NATALIE SAX
                </span>
                <span className="text-[9px] tracking-[0.35em] uppercase text-[#e8a598] -mt-1 font-sans">
                  HAIR & BEAUTY • EST. 2022
                </span>
              </div>
            </div>

            <p className="text-xs text-[#f4efe6]/65 leading-relaxed font-light">
              Kungsbacka&apos;s premier destination for bespoke balayage, precision haircuts, 
              and empowering styling. Welcome to Rosengatan 19 C!
            </p>

            <div className="text-[11px] uppercase tracking-widest text-[#e61c5d] font-semibold">
              Kungsbacka, Sweden
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-base text-[#f7e7ce] uppercase tracking-wider mb-2">
              Atelier Location
            </h4>
            <div className="flex items-start gap-2 text-xs text-[#f4efe6]/70">
              <MapPin className="w-4 h-4 text-[#e8a598] shrink-0 mt-0.5" />
              <span>Rosengatan 19 C, 434 43 Kungsbacka, Sweden</span>
            </div>
            <div className="pt-2 text-xs text-[#e8a598]">
              <div className="font-medium">Monday – Friday: 09:00 AM – 6:00 PM</div>
              <div className="text-[11px] text-[#f4efe6]/50">Saturday: By Private Appointment</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-serif text-base text-[#f7e7ce] uppercase tracking-wider mb-2">
              Quick Portals
            </h4>
            <ul className="space-y-2 text-xs uppercase tracking-widest text-[#f4efe6]/70">
              <li><a href="#services" className="hover:text-[#e8a598] transition-colors">Services</a></li>
              <li><a href="#transformations" className="hover:text-[#e8a598] transition-colors">Lookbook</a></li>
              <li><a href="#experience" className="hover:text-[#e8a598] transition-colors">The Sanctuary</a></li>
              <li><a href="#founder" className="hover:text-[#e8a598] transition-colors">Meet Natalie</a></li>
              <li>
                <button onClick={() => setIsBookingOpen(true)} className="hover:text-[#e61c5d] transition-colors cursor-pointer text-left uppercase">
                  Book via Bokadirekt
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-base text-[#f7e7ce] uppercase tracking-wider mb-2">
              The Inner Circle
            </h4>
            <p className="text-xs text-[#f4efe6]/65 font-light">
              Receive private invitations to seasonal color previews, priority booking releases, and bespoke client offers.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing to the Inner Circle!");
              }}
              className="space-y-2"
            >
              <input
                type="email"
                required
                placeholder="Your email address..."
                className="w-full bg-[#121016] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#e8a598]"
              />
              <button
                type="submit"
                className="w-full champagne-button py-2.5 rounded-xl text-[10px] uppercase tracking-[0.2em] font-bold cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#f4efe6]/50">
          <div>
            © {new Date().getFullYear()} NATALIE SAX HAIR & BEAUTY. All rights reserved.
          </div>

          <div className="flex items-center gap-5 text-sm">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f4efe6]/60 hover:text-[#e8a598] transition-colors flex items-center gap-1.5"
            >
              <svg
                className="w-4 h-4 stroke-current fill-none stroke-[1.5]"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>@nataliesax</span>
            </a>
            <span className="text-white/20">•</span>
            <span className="text-[#e8a598] font-semibold tracking-wider text-[11px] uppercase">
              Rosengatan 19 C, Kungsbacka
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
