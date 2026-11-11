import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.2, 0.7, 0.2, 1];

export const Reveal = ({ children, delay = 0, y = 28, className = "", as = "div" }) => {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </M>
  );
};

export const ImageReveal = ({ src, alt, className = "", imgClassName = "", testId }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      data-testid={testId}
      className={`relative overflow-hidden ${className}`}
      initial={reduce ? false : { clipPath: "inset(12% 0% 12% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
        initial={reduce ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE }}
      />
    </motion.div>
  );
};

export const SectionHead = ({ label, title, text, dark = false, className = "", testId }) => (
  <div className={`max-w-3xl ${className}`} data-testid={testId}>
    <Reveal>
      <span className={`eyebrow ${dark ? "text-gold" : "text-gold-deep"}`}>{label}</span>
    </Reveal>
    <Reveal delay={0.08}>
      <h2 className={`h-display mt-6 text-[2.1rem] sm:text-5xl lg:text-[3.6rem] ${dark ? "text-white" : "text-navy"}`}>
        {title}
      </h2>
    </Reveal>
    {text && (
      <Reveal delay={0.16}>
        <p className={`mt-6 max-w-xl text-base md:text-lg leading-relaxed ${dark ? "text-slate2" : "text-navy/65"}`}>
          {text}
        </p>
      </Reveal>
    )}
  </div>
);

export const Logo = ({ variant = "white", className = "h-9", testId = "brand-logo" }) => (
  <img
    data-testid={testId}
    src={`/brand/logo-${variant}.png`}
    alt="Apna Travels — Your New Life Begins"
    className={`w-auto select-none ${className}`}
    width="896"
    height="193"
  />
);
