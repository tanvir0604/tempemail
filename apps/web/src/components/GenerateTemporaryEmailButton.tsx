'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function GenerateTempEmailButton() {
    const [visible, setVisible] = useState(false);
    const t = useTranslations('HomePage');

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollTop}
            className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors cursor-pointer`}
        >
            {t('generate_temp_email')}
        </button>
    );
}
