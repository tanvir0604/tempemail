import { LockIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - TempEmail | Your Data Protection & Privacy",
  description:
    "TempEmail's Privacy Policy explains how we protect your data. We don't collect personal information and automatically delete temporary emails. Complete transparency.",
  keywords: [
    "tempemail privacy",
    "privacy policy",
    "temporary email privacy",
    "data protection",
    "email privacy",
    "anonymous email policy",
    "no data collection",
    "email security",
  ],
  authors: [{ name: "TempEmail" }],
  openGraph: {
    title: "Privacy Policy - TempEmail",
    description:
      "Learn how TempEmail protects your privacy. We don't collect personal data and automatically delete all temporary emails. Your privacy is our priority.",
    url: "https://temp-email.dev/privacy",
    siteName: "TempEmail",
    images: [
      {
        url: "/og-privacy.png",
        width: 1200,
        height: 630,
        alt: "TempEmail - Privacy Policy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - TempEmail",
    description:
      "TempEmail's commitment to your privacy: no data collection, automatic deletion, complete anonymity.",
    images: ["/twitter-privacy.png"],
    creator: "@tempEmail",
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
    canonical: "https://temp-email.dev/privacy",
  },
};

export default async function PrivacyPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-zinc-800 rounded-2xl">
            <LockIcon className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-zinc-100">Privacy Policy</h1>
        <p className="text-zinc-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100">
            1. Introduction
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            At TempEmail, we take your privacy seriously. This Privacy Policy
            explains how we handle information when you use our temporary email
            service. Our core principle is simple: we collect minimal data and
            prioritize your anonymity.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100">
            2. Information We Don't Collect
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            We are committed to not collecting personal information.
            Specifically, we do not collect:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li>Your name, email address, or contact information</li>
            <li>Account credentials (we don't require accounts)</li>
            <li>Payment information (our service is free)</li>
            <li>Persistent identifiers that track you across sessions</li>
            <li>Your browsing history outside our service</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100">
            3. Information We Temporarily Process
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            To provide our service, we temporarily process:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li>Generated temporary email addresses</li>
            <li>Emails received at those temporary addresses</li>
            <li>
              Technical data necessary for email delivery (sender, timestamp,
              subject)
            </li>
            <li>
              Basic analytics to maintain service performance (anonymous usage
              statistics)
            </li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mt-4">
            All this data is automatically deleted when your temporary email
            expires or is manually deleted by you.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100">
            4. Data Retention
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Temporary email addresses and their contents are stored only for the
            duration of the session or the extended time period you select. Once
            expired, all data is permanently deleted from our servers. We do not
            maintain backups of expired email content.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100">
            5. Cookies and Tracking
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            We use minimal cookies solely for service functionality (such as
            maintaining your temporary email session). We do not use tracking
            cookies or third-party advertising cookies. You can use our service
            without accepting cookies, though some features may be limited.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100">
            6. Third-Party Services
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            We do not share your data with third parties for marketing or
            advertising purposes. We may use essential third-party services for
            infrastructure (such as hosting providers), but these services are
            contractually bound to protect your data and not use it for their
            own purposes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100">7. Security</h2>
          <p className="text-zinc-300 leading-relaxed">
            We implement industry-standard security measures to protect the
            temporary data we process. This includes encryption in transit
            (HTTPS), secure server configurations, and regular security audits.
            However, no method of transmission over the internet is 100% secure,
            and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100">
            8. Content Warnings
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Our content safety feature analyzes incoming emails for potentially
            harmful content (phishing attempts, malware links, explicit
            content). This analysis is performed automatically and does not
            involve human review of your emails.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100">
            9. Your Rights
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            You have the right to delete your temporary email and all associated
            data at any time by simply closing or clearing your session. Since
            we don't collect personal information, there is no personal data to
            request, modify, or delete beyond the temporary email content
            itself.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100">
            10. Children's Privacy
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Our service is not directed at children under 13. We do not
            knowingly collect information from children. If you believe a child
            has used our service, please contact us.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100">
            11. International Users
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            TempEmail is accessible globally. By using our service, you consent
            to the processing of data in the country where our servers are
            located. We comply with applicable data protection laws and
            regulations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100">
            12. Changes to This Policy
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify
            users of significant changes by posting a notice on our service.
            Continued use after changes constitutes acceptance of the updated
            policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100">
            13. Contact Us
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            If you have questions or concerns about this Privacy Policy or our
            privacy practices, please contact us through our support channels.
            We are committed to addressing your concerns promptly.
          </p>
        </section>
      </div>
    </div>
  );
}
