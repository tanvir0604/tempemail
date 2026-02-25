import { getTranslations } from 'next-intl/server';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

function H2({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-2xl font-bold text-zinc-50 mt-12 mb-4 leading-snug">
            {children}
        </h2>
    );
}

function H3({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-base font-semibold text-zinc-200 mt-8 mb-2">
            {children}
        </h3>
    );
}

function P({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-base text-zinc-400 leading-relaxed mb-4">
            {children}
        </p>
    );
}

function Strong({ children }: { children: React.ReactNode }) {
    return <strong className="text-zinc-200 font-medium">{children}</strong>;
}

function UL({ items }: { items: string[] }) {
    return (
        <ul className="mt-2 mb-6 space-y-2">
            {items.map((item) => (
                <li
                    key={item}
                    className="flex gap-2.5 items-start text-base text-zinc-400"
                >
                    <span className="text-emerald-500 flex-shrink-0 mt-0.5 text-[10px]">
                        ●
                    </span>
                    {item}
                </li>
            ))}
        </ul>
    );
}

function OL({ items }: { items: string[] }) {
    return (
        <ol className="mt-2 mb-6 space-y-3">
            {items.map((item, i) => (
                <li
                    key={item}
                    className="flex gap-3 items-start text-base text-zinc-400"
                >
                    <span className="font-mono text-[10px] text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded px-1.5 py-0.5 flex-shrink-0 mt-0.5 leading-tight">
                        {String(i + 1).padStart(2, '0')}
                    </span>
                    {item}
                </li>
            ))}
        </ol>
    );
}

type CalloutColor = 'amber' | 'emerald' | 'blue';
const calloutStyles: Record<CalloutColor, string> = {
    amber: 'border-amber-500/20   bg-amber-500/5   text-amber-400',
    emerald: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400',
    blue: 'border-blue-500/20    bg-blue-500/5    text-blue-400',
};

function Callout({
    icon,
    color,
    label,
    children,
}: {
    icon: string;
    color: CalloutColor;
    label: string;
    children: string;
}) {
    return (
        <div className={`rounded-xl border p-4 my-6 ${calloutStyles[color]}`}>
            <div className="flex items-center gap-2 mb-1.5">
                <span>{icon}</span>
                <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">
                    {label}
                </span>
            </div>
            <p className="text-base text-zinc-400 leading-relaxed">
                {children}
            </p>
        </div>
    );
}

function Divider() {
    return <hr className="border-zinc-800/60 my-2" />;
}

export default async function TempMailOTPContent() {
    const t = await getTranslations('OTPContent');

    const steps = Array.from({ length: 4 }, (_, i) => t(`steps.${i}`));
    const benefits = Array.from({ length: 5 }, (_, i) =>
        t(`benefitItems.${i}`),
    );
    const onlineItems = Array.from({ length: 4 }, (_, i) =>
        t(`useCaseOnline.${i}`),
    );
    const appItems = Array.from({ length: 4 }, (_, i) => t(`useCaseApp.${i}`));
    const otpItems = Array.from({ length: 4 }, (_, i) => t(`useCaseOtp.${i}`));
    const faqs = Array.from({ length: 5 }, (_, i) => ({
        q: t(`faq.${i}.q`),
        a: t(`faq.${i}.a`),
    }));

    return (
        <article className="max-w-6xl mx-auto">
            {/* What is Temp Mail for OTP */}
            <H2>{t('whatIs.title')}</H2>
            <P>
                <Strong>{t('whatIs.boldOpener')}</Strong> {t('whatIs.p1')}
            </P>
            <P>{t('whatIs.p2')}</P>
            <P>{t('whatIs.p3')}</P>

            <Divider />

            {/* How It Works */}
            <H2>{t('howItWorks.title')}</H2>
            <P>{t('howItWorks.intro')}</P>
            <OL items={steps} />
            <P>{t('howItWorks.outro')}</P>
            <Callout icon="📱" color="emerald" label={t('callouts.qrLabel')}>
                {t('callouts.qrText')}
            </Callout>

            <Divider />

            {/* Benefits */}
            <H2>{t('benefits.title')}</H2>
            <P>{t('benefits.intro')}</P>

            <H3>{t('benefits.privacyTitle')}</H3>
            <P>{t('benefits.privacyText')}</P>

            <H3>{t('benefits.spamTitle')}</H3>
            <P>{t('benefits.spamText')}</P>

            <H3>{t('benefits.accessTitle')}</H3>
            <P>{t('benefits.accessText')}</P>

            <H3>{t('benefits.speedTitle')}</H3>
            <P>{t('benefits.speedText')}</P>

            <UL items={benefits} />

            <Divider />

            {/* Use Cases */}
            <H2>{t('useCases.title')}</H2>
            <P>{t('useCases.intro')}</P>

            <H3>{t('useCases.onlineTitle')}</H3>
            <P>{t('useCases.onlineText')}</P>
            <UL items={onlineItems} />

            <H3>{t('useCases.appTitle')}</H3>
            <P>{t('useCases.appText')}</P>
            <UL items={appItems} />

            <H3>{t('useCases.otpTitle')}</H3>
            <P>{t('useCases.otpText')}</P>
            <UL items={otpItems} />

            <Divider />

            {/* Safety Tips */}
            <H2>{t('safety.title')}</H2>
            <P>{t('safety.intro')}</P>

            <Callout icon="⚠️" color="amber" label={t('safety.warn1Label')}>
                {t('safety.warn1Text')}
            </Callout>
            <Callout icon="⏰" color="blue" label={t('safety.warn2Label')}>
                {t('safety.warn2Text')}
            </Callout>
            <Callout icon="🔒" color="emerald" label={t('safety.warn3Label')}>
                {t('safety.warn3Text')}
            </Callout>
            <Callout icon="🧹" color="blue" label={t('safety.warn4Label')}>
                {t('safety.warn4Text')}
            </Callout>

            <P>{t('safety.outro')}</P>

            <Divider />

            {/* FAQ */}
            <H2>{t('faq.title')}</H2>
            <P>{t('faq.intro')}</P>

            <Accordion
                type="single"
                collapsible
                defaultValue="shipping"
                className="w-full"
            >
                {faqs.map((f, i) => (
                    <AccordionItem value={i.toString()} key={i}>
                        <AccordionTrigger>{f.q}</AccordionTrigger>
                        <AccordionContent>{f.a}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </article>
    );
}
