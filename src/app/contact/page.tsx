import type { Metadata } from "next";
import { SiteFrame } from "@/components/shell/SiteFrame";
import { ContactForm } from "@/components/lab/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact by intent.",
};

export default function ContactPage() {
  return (
    <SiteFrame world="paper">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="eyebrow text-[var(--mute)]">Contact</p>
          <h1 className="display display-lg mt-4">Reach by intent</h1>
          <p className="editorial mt-6 text-lg text-[var(--mute)]">
            Or email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </div>
        <ContactForm />
      </div>
    </SiteFrame>
  );
}
