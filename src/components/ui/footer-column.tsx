import {
  Instagram,
  Youtube,
  MessageCircle,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import logo from '@/assets/logo.jpeg';
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";
import { defaultFooterConfig } from "@/lib/firebase";

const aboutLinks = [
  { text: 'About Us', href: '/about' },
  { text: 'Meet the Team', href: '/about' },
  { text: 'Weekly Rhythm', href: '/about' },
  { text: 'Contact Us', href: '/contact' },
];

const serviceLinks = [
  { text: 'Sermons & Word', href: '/sermons' },
  { text: 'Camps & Gatherings', href: '/events' },
  { text: 'Devotionals', href: '/resources' },
  { text: 'Media Gallery', href: '/gallery' },
];

const helpfulLinks = [
  { text: 'FAQs', href: '/resources' },
  { text: 'Support Portal', href: '/contact' },
  { text: 'Live Prayer Chat', href: '/contact', hasIndicator: true },
];

export default function Footer4Col() {
  const configs = useFirestoreCollection("footer_config", [defaultFooterConfig]);
  const footer = configs[0] || defaultFooterConfig;

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: footer.instagram_link || '#' },
    { icon: Youtube, label: 'YouTube', href: footer.youtube_link || '#' },
    { icon: MessageCircle, label: 'WhatsApp', href: footer.whatsapp_link || '#' },
  ];

  const contactInfo = [
    { icon: Mail, text: footer.contact_email || 'info@youthonfire.org' },
    { icon: Phone, text: footer.contact_phone || '+1 (555) 123-4567' },
    { icon: MapPin, text: footer.contact_address || 'Main Sanctuary, City Church', isAddress: true },
  ];

  return (
    <footer className="border-t border-white/5 mt-24 bg-[#090909] text-neutral-200 z-[10] w-full rounded-t-xl relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-primary flex justify-center gap-3 sm:justify-start items-center">
              <img
                src={logo}
                alt="logo"
                className="h-10 w-10 rounded-full border border-primary/20"
              />
              <span className="font-display text-xl tracking-[0.15em] uppercase text-neutral-200">
                {footer.company_name || 'Youth on Fire'}
              </span>
            </div>

            <p className="text-neutral-400 mt-6 max-w-md text-center leading-relaxed text-xs sm:max-w-xs sm:text-left tracking-wider">
              {footer.company_description}
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-neutral-400 hover:text-primary transition-colors duration-[1000ms]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-6 font-semibold">About Us</p>
              <ul className="mt-4 space-y-4 text-xs">
                {aboutLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      className="link-quiet text-neutral-400 hover:text-white tracking-wider"
                      to={href}
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-6 font-semibold">Explorations</p>
              <ul className="mt-4 space-y-4 text-xs">
                {serviceLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      className="link-quiet text-neutral-400 hover:text-white tracking-wider"
                      to={href}
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-6 font-semibold">Portals</p>
              <ul className="mt-4 space-y-4 text-xs">
                {helpfulLinks.map(({ text, href, hasIndicator }) => (
                  <li key={text}>
                    <Link
                      to={href}
                      className={`${
                        hasIndicator
                          ? 'group flex justify-center gap-1.5 sm:justify-start text-neutral-400 hover:text-white'
                          : 'link-quiet text-neutral-400 hover:text-white tracking-wider'
                      }`}
                    >
                      <span className={hasIndicator ? "text-neutral-400 hover:text-white tracking-wider" : ""}>
                        {text}
                      </span>
                      {hasIndicator && (
                        <span className="relative flex size-2 self-center">
                          <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                          <span className="bg-primary relative inline-flex size-2 rounded-full" />
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-6 font-semibold">Contact Us</p>
              <ul className="mt-4 space-y-4 text-xs">
                {contactInfo.map(({ icon: Icon, text, isAddress }) => (
                  <li key={text}>
                    <a
                      className="flex items-center justify-center gap-1.5 sm:justify-start group text-neutral-400 hover:text-white transition-all duration-[600ms]"
                      href="#"
                    >
                      <Icon className="text-primary size-4 shrink-0 shadow-sm transition-transform duration-[600ms] group-hover:scale-110" />
                      {isAddress ? (
                        <address className="text-neutral-400 group-hover:text-white flex-1 not-italic transition-colors duration-[600ms]">
                          {text}
                        </address>
                      ) : (
                        <span className="text-neutral-400 group-hover:text-white flex-1 transition-colors duration-[600ms]">
                          {text}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500">
              <span className="block sm:inline">All rights reserved.</span>
            </p>

            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mt-4 sm:order-first sm:mt-0">
              &copy; {new Date().getFullYear()} {footer.company_name || 'Youth on Fire'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
