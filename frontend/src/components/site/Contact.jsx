import { MapPin, Phone, MessageCircle, Globe2 } from "lucide-react";
import { COMPANY } from "@/data/content";
import { waLink } from "@/lib/enquiry";
import { Reveal, SectionHead } from "./primitives";
import { EmployerForm } from "./EmployerForm";
import { CandidateForm } from "./CandidateForm";

const Info = ({ icon: Icon, label, children, testId }) => (
  <div data-testid={testId} className="border-t border-navy/15 pt-5">
    <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-deep">
      <Icon className="h-3.5 w-3.5" /> {label}
    </p>
    <div className="mt-3 text-[15px] leading-relaxed text-navy">{children}</div>
  </div>
);

export const Contact = () => (
  <section id="contact" data-testid="contact-section" className="bg-mist py-24 md:py-36">
    <div className="container-x">
      <SectionHead
        label="Let's Work Together"
        title="Let's Discuss Your Manpower Needs."
        text="Whether you are looking to recruit skilled professionals or exploring overseas employment opportunities, our team is ready to assist."
        testId="contact-heading"
      />

      <Reveal className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <Info icon={MapPin} label="Mumbai Head Office" testId="contact-address">{COMPANY.address}</Info>
        <Info icon={Phone} label="Phone" testId="contact-phone">
          <a href={COMPANY.phoneHref} data-testid="contact-phone-link" className="font-semibold hover:text-gold-deep">{COMPANY.phone}</a>
        </Info>
        <Info icon={MessageCircle} label="WhatsApp" testId="contact-whatsapp">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" data-testid="contact-whatsapp-link" className="font-semibold hover:text-gold-deep">{COMPANY.whatsapp}</a>
        </Info>
        <Info icon={Globe2} label="Branches" testId="contact-branches">
          <p><span className="text-navy/55">India:</span> Lucknow · Gorakhpur · Jaipur · Patna · Delhi</p>
          <p><span className="text-navy/55">Saudi Arabia:</span> Riyadh · Dammam</p>
          <p><span className="text-navy/55">Also:</span> UAE · Nepal</p>
        </Info>
      </Reveal>

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <Reveal className="h-full"><EmployerForm /></Reveal>
        <Reveal delay={0.1} className="h-full"><CandidateForm /></Reveal>
      </div>
    </div>
  </section>
);
