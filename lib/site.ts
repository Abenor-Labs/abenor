export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://abenor-v2.vercel.app";

export const CONTACT_EMAIL = "hello.abenor@gmail.com";

export const CALENDLY_URL = "https://calendly.com/hello-abenor/30min";

export const mailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Answers", href: "#answers" },
] as const;
