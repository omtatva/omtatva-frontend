"use client";

import { FormEvent, useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <p className="text-center text-lg text-ice">
        Thank you for reaching out. Our team will be in touch shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-xs tracking-[0.2em] text-muted uppercase">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3 font-semibold text-white focus:border-neon focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-xs tracking-[0.2em] text-muted uppercase">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3 font-semibold text-white focus:border-neon focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-xs tracking-[0.2em] text-muted uppercase">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full resize-none rounded-sm border border-white/15 bg-white/5 px-4 py-3 font-semibold text-white focus:border-neon focus:outline-none"
        />
      </div>
      <MagneticButton type="submit" variant="primary" className="w-full">
        Send Message
      </MagneticButton>
    </form>
  );
}
