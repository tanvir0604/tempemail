import {
  Clock,
  Eye,
  FileText,
  LockIcon,
  Mail,
  Shield,
  UserCheck,
  Users,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - TempEmail | Free Temporary Email Service",
  description:
    "Learn about TempEmail's mission to protect your privacy with free temporary email addresses. Instant generation, no registration, and complete anonymity.",
  keywords: [
    "about tempemail",
    "temporary email service",
    "disposable email about",
    "email privacy service",
    "anonymous email service",
    "free temp mail",
    "email protection",
  ],
  authors: [{ name: "TempEmail" }],
  openGraph: {
    title: "About TempEmail - Protecting Your Privacy",
    description:
      "Discover how TempEmail provides instant, secure temporary email addresses to protect your online privacy. No registration required.",
    url: "https://temp-email.dev/about",
    siteName: "TempEmail",
    images: [
      {
        url: "/og-about.png",
        width: 1200,
        height: 630,
        alt: "TempEmail - About Us",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About TempEmail - Free Temporary Email Service",
    description:
      "Learn how TempEmail protects your privacy with instant temporary email addresses. No registration, completely free.",
    images: ["/twitter-about.png"],
    creator: "@tempemail",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://temp-email.dev/about",
  },
};

export default async function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-zinc-800 rounded-2xl">
            <Mail className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-zinc-100">About TempEmail</h1>
        <p className="text-xl text-zinc-400">
          Protecting your privacy, one temporary email at a time
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-semibold text-zinc-100 m-0">
              Our Mission
            </h2>
          </div>
          <p className="text-zinc-300 leading-relaxed">
            TempEmail was created with a simple yet powerful vision: to give
            everyone the ability to protect their primary email address from
            spam, unwanted marketing, and potential security threats. In today's
            digital age, your email address is often the gateway to your online
            identity, and we believe you should have complete control over who
            has access to it.
          </p>
        </section>

        <section className="space-y-4 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-semibold text-zinc-100 m-0">
              What We Do
            </h2>
          </div>
          <p className="text-zinc-300 leading-relaxed">
            We provide instant, disposable email addresses that you can use
            whenever you need to sign up for a service, download content, or
            interact with websites without exposing your real email address. Our
            service is completely free, requires no registration, and respects
            your privacy above all else.
          </p>
        </section>

        <section className="space-y-6 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-semibold text-zinc-100 m-0">
              Key Features
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
              <Clock className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                Instant Generation
              </h3>
              <p className="text-zinc-400 text-sm">
                Get a temporary email address immediately without any signup
                process or personal information required.
              </p>
            </div>

            <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
              <Eye className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                Content Safety
              </h3>
              <p className="text-zinc-400 text-sm">
                Advanced warnings for potentially harmful content keep you safe
                while browsing your temporary inbox.
              </p>
            </div>

            <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
              <Mail className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                QR Code Sync
              </h3>
              <p className="text-zinc-400 text-sm">
                Easily sync your temporary email across devices using our
                convenient QR code feature.
              </p>
            </div>

            <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
              <LockIcon className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                Privacy First
              </h3>
              <p className="text-zinc-400 text-sm">
                We don't track, store, or share your data. Your privacy is our
                top priority.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <UserCheck className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-semibold text-zinc-100 m-0">
              Our Commitment
            </h2>
          </div>
          <p className="text-zinc-300 leading-relaxed">
            We are committed to maintaining a free, reliable, and user-friendly
            service that respects your privacy. TempEmail will always remain
            accessible to everyone, with no hidden fees or premium tiers that
            limit basic functionality. Your trust is our most valuable asset,
            and we work every day to earn and maintain it.
          </p>
        </section>
      </div>
    </div>
  );
}
