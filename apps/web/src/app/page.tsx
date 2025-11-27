import EmailContainer from "@/components/EmailContainer";
import GenerateTempEmailButton from "@/components/GenerateTemporaryEmailButton";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Clock, Eye, Globe, QrCode, Shield, Zap } from "lucide-react";
import { Suspense } from "react";

export default async function HomePage() {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <section className="text-center space-y-2 mb-8">
                <h1 className="text-4xl font-bold text-zinc-50">
                    Free Temporary Email Address
                </h1>
                <p className="text-zinc-400">
                    Get an instant disposable email address. Protect your
                    privacy and avoid spam with our free temporary email
                    service. No registration required.
                </p>
            </section>

            <section className="py-16 space-y-6">
                <Suspense
                    fallback={
                        <div>
                            <Skeleton className="h-22 w-full" />
                            <Skeleton className="h-22 w-full" />
                            <Skeleton className="h-22 w-full" />
                            <Skeleton className="h-22 w-full" />
                            <Skeleton className="h-22 w-full" />
                        </div>
                    }
                >
                    <EmailContainer />
                </Suspense>
            </section>

            <section className="py-16 px-4 bg-zinc-900/50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        What is a Temporary Email Address?
                    </h2>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-zinc-300 text-lg leading-relaxed mb-4">
                            A <strong>temporary email address</strong> (also
                            known as disposable email, throwaway email, or
                            burner email) is a service that allows you to
                            receive emails at a temporary address that
                            self-destructs after a certain time period. TempMail
                            provides instant, anonymous temporary email
                            addresses that protect your real inbox from spam,
                            advertising mailings, and malicious emails.
                        </p>
                        <p className="text-zinc-300 text-lg leading-relaxed">
                            Our <strong>disposable email service</strong> is
                            perfect for online registrations, downloading files,
                            accessing free trials, or any situation where you
                            need an email address but don't want to use your
                            personal one. With TempMail, you can create
                            unlimited temporary email addresses instantly
                            without any registration.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">
                        Why Choose TempMail?
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Instant Generation
                            </h3>
                            <p className="text-zinc-400">
                                Create a temporary email address instantly. No
                                sign-up, no passwords, no personal information
                                required. Start receiving emails in seconds.
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Complete Privacy
                            </h3>
                            <p className="text-zinc-400">
                                Protect your real email address from spam and
                                unwanted messages. We don't collect personal
                                data or track your activities. Your privacy is
                                our priority.
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Clock className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Time Extension
                            </h3>
                            <p className="text-zinc-400">
                                Need more time? Extend the lifetime of your
                                temporary email address with a single click.
                                Keep it active as long as you need.
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <QrCode className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                QR Code Sync
                            </h3>
                            <p className="text-zinc-400">
                                Seamlessly access your temporary email on
                                multiple devices using our QR code feature. Sync
                                between desktop and mobile instantly.
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Eye className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Safe Email Viewing
                            </h3>
                            <p className="text-zinc-400">
                                Advanced content warnings protect you from
                                phishing attempts, malicious links, and
                                inappropriate content before you open emails.
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Globe className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                100% Free
                            </h3>
                            <p className="text-zinc-400">
                                Our temporary email service is completely free
                                with no hidden charges, premium tiers, or
                                limitations. Everyone deserves email privacy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="py-16 px-4 bg-zinc-900/50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        When to Use a Temporary Email?
                    </h2>

                    <div className="space-y-4">
                        <div className="flex gap-4 bg-zinc-900 p-5 rounded-lg border border-zinc-800">
                            <Check className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg mb-2">
                                    Online Registrations
                                </h3>
                                <p className="text-zinc-400">
                                    Sign up for websites, forums, or services
                                    without exposing your real email address to
                                    potential spam.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 bg-zinc-900 p-5 rounded-lg border border-zinc-800">
                            <Check className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg mb-2">
                                    Free Trials & Downloads
                                </h3>
                                <p className="text-zinc-400">
                                    Access free trials, download content, or get
                                    resources without committing your personal
                                    email.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 bg-zinc-900 p-5 rounded-lg border border-zinc-800">
                            <Check className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg mb-2">
                                    Testing & Development
                                </h3>
                                <p className="text-zinc-400">
                                    Developers can test email functionality
                                    without creating multiple real email
                                    accounts.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 bg-zinc-900 p-5 rounded-lg border border-zinc-800">
                            <Check className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg mb-2">
                                    Avoiding Spam
                                </h3>
                                <p className="text-zinc-400">
                                    Keep your primary inbox clean by using
                                    temporary emails for one-time verifications
                                    and confirmations.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 bg-zinc-900 p-5 rounded-lg border border-zinc-800">
                            <Check className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg mb-2">
                                    Privacy Protection
                                </h3>
                                <p className="text-zinc-400">
                                    Protect your identity when participating in
                                    online discussions or accessing content from
                                    untrusted sources.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">
                        How Does TempMail Work?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-500">
                                <span className="text-2xl font-bold text-blue-500">
                                    1
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Generate
                            </h3>
                            <p className="text-zinc-400">
                                Click to instantly generate a random temporary
                                email address. No account creation needed.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-500">
                                <span className="text-2xl font-bold text-blue-500">
                                    2
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Use It
                            </h3>
                            <p className="text-zinc-400">
                                Copy your temporary email and use it wherever
                                you need. All emails will appear in your inbox
                                automatically.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-500">
                                <span className="text-2xl font-bold text-blue-500">
                                    3
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Auto-Delete
                            </h3>
                            <p className="text-zinc-400">
                                Your temporary email and all messages are
                                automatically deleted after expiration. Stay
                                anonymous and clean.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4 bg-zinc-900/50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-6">
                        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                            <h3 className="text-lg font-semibold mb-3">
                                Is TempMail really free?
                            </h3>
                            <p className="text-zinc-400">
                                Yes! TempMail is 100% free with no hidden costs,
                                premium features, or limitations. We believe
                                everyone deserves access to email privacy
                                protection.
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                            <h3 className="text-lg font-semibold mb-3">
                                How long does a temporary email last?
                            </h3>
                            <p className="text-zinc-400">
                                By default, temporary email addresses remain
                                active for a set period. You can extend the
                                lifetime with our time extension feature to keep
                                it active longer.
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                            <h3 className="text-lg font-semibold mb-3">
                                Can I send emails from my temporary address?
                            </h3>
                            <p className="text-zinc-400">
                                TempMail is designed for receiving emails only.
                                This helps maintain anonymity and prevents abuse
                                of the service.
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                            <h3 className="text-lg font-semibold mb-3">
                                Is it safe to use temporary email for important
                                registrations?
                            </h3>
                            <p className="text-zinc-400">
                                Temporary emails are perfect for services you
                                don't plan to use long-term. For important
                                accounts that need password recovery, we
                                recommend using your permanent email address.
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                            <h3 className="text-lg font-semibold mb-3">
                                Do you store my emails?
                            </h3>
                            <p className="text-zinc-400">
                                We only store emails temporarily during the
                                active session. Once your temporary email
                                expires or is deleted, all associated data is
                                permanently removed from our servers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h2 className="text-4xl font-bold">
                        Start Protecting Your Privacy Today
                    </h2>
                    <p className="text-xl text-zinc-400">
                        Join millions who trust TempMail to keep their inboxes
                        clean and their identities private. Create your free
                        temporary email address now.
                    </p>
                    <GenerateTempEmailButton />
                </div>
            </section>

            {/* Trust Signals */}
            <section className="py-12 px-4 border-t border-zinc-800">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-blue-500 mb-2">
                                100%
                            </div>
                            <div className="text-zinc-400">Free Forever</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-500 mb-2">
                                0
                            </div>
                            <div className="text-zinc-400">
                                Registration Required
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-500 mb-2">
                                ∞
                            </div>
                            <div className="text-zinc-400">
                                Unlimited Addresses
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-500 mb-2">
                                24/7
                            </div>
                            <div className="text-zinc-400">
                                Always Available
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
