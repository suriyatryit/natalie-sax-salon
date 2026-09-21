"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle2, GlassWater, Clock, Calendar as CalendarIcon } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  defaultService = "Liquid Silk Hair Ritual",
}: BookingModalProps) {
  const [step, setStep] = useState<"form" | "confirmed">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: defaultService,
    stylist: "Natalie Sax (Founder & Master Stylist)",
    date: "2026-09-25",
    time: "14:00",
    vipChampagne: true,
  });

  const services = [
    "Bespoke Balayage & Highlights",
    "Bridal Glamour & Haute Updo",
    "Full Color & Platinum Ice Gloss",
    "Precision Haircut & Blowout",
    "Oncare Scalp & Hair Repair Ritual",
    "Modern Haircut & Grooming",
  ];

  const stylists = [
    "Natalie Sax (Founder & Master Stylist)",
    "Senior Color Specialist",
    "Master Haircut & Updo Artist",
    "First Available Master Stylist",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmed");
  };

  const handleReset = () => {
    setStep("form");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-8 border border-[#e8a598]/30 shadow-[0_20px_70px_rgba(230,28,93,0.3)] z-10 my-8 overflow-hidden"
          >
            {/* Ambient Background Glow inside Modal */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#e61c5d]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#e8a598]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-[#f4efe6]/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {step === "form" ? (
              <div>
                <div className="mb-6 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8a598]/10 border border-[#e8a598]/20 text-[#e8a598] text-[11px] tracking-[0.2em] uppercase font-semibold mb-2">
                    <Sparkles className="w-3 h-3 text-[#e61c5d]" />
                    VIP Transformation Reservation
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-[#f7e7ce]">
                    CLAIM YOUR APPOINTMENT
                  </h3>
                  <p className="text-xs text-[#f4efe6]/70 mt-1">
                    Step into an exclusive sanctuary designed by women, exclusively for your radiance.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#e8a598] mb-1 font-semibold">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Victoria Sterling"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0d0b10] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#f4efe6] focus:outline-none focus:border-[#e8a598] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#e8a598] mb-1 font-semibold">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="victoria@luxury.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#0d0b10] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#f4efe6] focus:outline-none focus:border-[#e8a598] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#e8a598] mb-1 font-semibold">
                        Mobile Phone
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="(310) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#0d0b10] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#f4efe6] focus:outline-none focus:border-[#e8a598] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#e8a598] mb-1 font-semibold">
                      Select Haute Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#0d0b10] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#f4efe6] focus:outline-none focus:border-[#e8a598] transition-colors"
                    >
                      {services.map((s, idx) => (
                        <option key={idx} value={s} className="bg-[#121015]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#e8a598] mb-1 font-semibold">
                      Master Stylist
                    </label>
                    <select
                      value={formData.stylist}
                      onChange={(e) => setFormData({ ...formData, stylist: e.target.value })}
                      className="w-full bg-[#0d0b10] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#f4efe6] focus:outline-none focus:border-[#e8a598] transition-colors"
                    >
                      {stylists.map((s, idx) => (
                        <option key={idx} value={s} className="bg-[#121015]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#e8a598] mb-1 font-semibold flex items-center gap-1.5">
                        <CalendarIcon className="w-3 h-3 text-[#e61c5d]" /> Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#0d0b10] border border-white/10 rounded-xl px-3 py-2 text-sm text-[#f4efe6] focus:outline-none focus:border-[#e8a598]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#e8a598] mb-1 font-semibold flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#e61c5d]" /> Time
                      </label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-[#0d0b10] border border-white/10 rounded-xl px-3 py-2 text-sm text-[#f4efe6] focus:outline-none focus:border-[#e8a598]"
                      />
                    </div>
                  </div>

                  {/* VIP Suite & Champagne Experience */}
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-[#e61c5d]/10 to-[#e8a598]/10 border border-[#e8a598]/20 cursor-pointer hover:border-[#e8a598]/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.vipChampagne}
                      onChange={(e) =>
                        setFormData({ ...formData, vipChampagne: e.target.checked })
                      }
                      className="accent-[#e61c5d] w-4 h-4 rounded"
                    />
                    <div className="text-left">
                      <div className="text-xs font-semibold text-[#f7e7ce] flex items-center gap-1.5">
                        <GlassWater className="w-3.5 h-3.5 text-[#e8a598]" />
                        Complimentary Moët & Chandon Champagne Bar
                      </div>
                      <div className="text-[10px] text-[#f4efe6]/60">
                        Enjoy private suite seating and artisan chocolates during your appointment.
                      </div>
                    </div>
                  </label>

                  <button
                    type="submit"
                    className="w-full crimson-neon-button py-3.5 rounded-2xl text-xs uppercase tracking-[0.2em] font-bold text-white shadow-xl cursor-pointer mt-2"
                  >
                    Confirm VIP Booking
                  </button>
                </form>
              </div>
            ) : (
              /* Confirmation Success State */
              <div className="text-center py-6 space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-[#e61c5d] to-[#e8a598] mx-auto flex items-center justify-center shadow-[0_0_40px_rgba(230,28,93,0.7)]"
                >
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="font-serif text-3xl font-bold text-[#f7e7ce]">
                  YOU ARE CONFIRMED, QUEEN
                </h3>
                <p className="text-sm text-[#f4efe6]/80 max-w-md mx-auto">
                  Your transformation with <strong className="text-[#e8a598]">{formData.stylist}</strong> is reserved for{" "}
                  <strong className="text-white">{formData.date} at {formData.time}</strong>.
                </p>

                <div className="p-4 rounded-2xl bg-[#09080b] border border-[#e8a598]/20 text-left text-xs space-y-1.5 max-w-sm mx-auto">
                  <div className="flex justify-between">
                    <span className="text-[#f4efe6]/50">Service:</span>
                    <span className="text-[#f7e7ce] font-medium">{formData.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#f4efe6]/50">Guest:</span>
                    <span className="text-[#f7e7ce] font-medium">{formData.name || "VIP Guest"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#f4efe6]/50">Suite:</span>
                    <span className="text-[#e61c5d] font-semibold">Natalie Sax VIP Atelier 01</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#f4efe6]/50">Booking Ref:</span>
                    <span className="font-mono text-[#e8a598]">NS-8920</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#f4efe6]/60">
                  A concierge confirmation SMS and calendar invite have been dispatched. Champagne awaits.
                </p>

                <button
                  onClick={handleReset}
                  className="champagne-button px-8 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold cursor-pointer"
                >
                  Return to Atelier
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
