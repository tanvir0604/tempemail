import { Scale } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service - TempEmail | Temporary Email Terms",
    description:
        "Read TempMail's Terms of Service. Understand the acceptable use policies, service limitations, and legal terms for using our temporary email service.",
    keywords: [
        "tempmail terms",
        "terms of service",
        "temporary email terms",
        "disposable email legal",
        "email service agreement",
        "tempmail legal",
    ],
    authors: [{ name: "TempMail" }],
    openGraph: {
        title: "Terms of Service - TempMail",
        description:
            "TempMail Terms of Service - Legal terms and conditions for using our free temporary email service.",
        url: "https://tempmail.com/terms",
        siteName: "TempMail",
        images: [
            {
                url: "/og-terms.png",
                width: 1200,
                height: 630,
                alt: "TempMail - Terms of Service",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Terms of Service - TempMail",
        description:
            "Read the terms and conditions for using TempMail's free temporary email service.",
        images: ["/twitter-terms.png"],
        creator: "@tempmail",
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
        canonical: "https://tempmail.com/terms",
    },
};

export default async function TermsPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <div className="p-4 bg-zinc-800 rounded-2xl">
                        <Scale className="w-12 h-12 text-blue-500" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-zinc-100">
                    Terms of Service
                </h1>
                <p className="text-zinc-400">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
            </div>

            <div className="prose prose-invert max-w-none space-y-8">
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        1. Acceptance of Terms
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        By accessing and using TempMail's services, you accept
                        and agree to be bound by the terms and provisions of
                        this agreement. If you do not agree to these terms,
                        please do not use our service.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        2. Service Description
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        TempMail provides temporary, disposable email addresses
                        for receiving emails. These email addresses are
                        temporary by nature and may expire after a certain
                        period. We reserve the right to modify, suspend, or
                        discontinue any aspect of the service at any time.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        3. Acceptable Use
                    </h2>
                    <p className="text-zinc-300 leading-relaxed mb-4">
                        You agree to use TempMail only for lawful purposes. You
                        may not use our service to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
                        <li>Engage in illegal activities or fraud</li>
                        <li>Harass, abuse, or harm others</li>
                        <li>Distribute spam, malware, or viruses</li>
                        <li>Violate intellectual property rights</li>
                        <li>
                            Attempt to gain unauthorized access to our systems
                        </li>
                        <li>
                            Use the service for any commercial purpose without
                            authorization
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        4. Privacy and Data
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        Temporary email addresses and received emails are
                        automatically deleted after expiration. We do not
                        permanently store email content or associate temporary
                        addresses with user identities. Please refer to our
                        Privacy Policy for detailed information.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        5. No Warranty
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        TempMail is provided "as is" without any warranties,
                        express or implied. We do not guarantee that the service
                        will be uninterrupted, secure, or error-free. Use of the
                        service is at your own risk.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        6. Limitation of Liability
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        TempMail shall not be liable for any indirect,
                        incidental, special, consequential, or punitive damages
                        resulting from your use or inability to use the service,
                        including but not limited to lost data, lost profits, or
                        service interruptions.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        7. Changes to Terms
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        We reserve the right to modify these terms at any time.
                        Continued use of the service after changes constitutes
                        acceptance of the new terms. We encourage you to review
                        these terms periodically.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        8. Contact
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        If you have any questions about these Terms of Service,
                        please contact us through our support channels.
                    </p>
                </section>
            </div>
        </div>
    );
}
