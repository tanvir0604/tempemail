'use client';

import { useEffect, useState } from 'react';
import { TempEmailType } from '@repo/validation';
import { checkEmail, generateTempEmail, getTempEmail } from '@/lib/actions';
import TempEmail from './TempEmail';
import Inbox from './Inbox';

export default function EmailContainer({ id }: { id?: string }) {
    const [emailData, setEmailData] = useState<TempEmailType>();
    const [generatingEmail, setGeneratingEmail] = useState(false);

    const generateTempEmailAction = async () => {
        setGeneratingEmail(true);
        const getEmail = localStorage.getItem('temp_email');
        if (getEmail) {
            console.log('getting temp email from localstorage');
            const getEmailData = JSON.parse(getEmail);

            if (
                new Date().getTime() -
                    new Date(getEmailData.expiredAt).getTime() >
                24 * 60 * 60 * 1000
            ) {
                localStorage.removeItem('temp_email');
                setGeneratingEmail(false);
                return generateTempEmailAction();
            }

            if (id) {
                if (getEmailData.id && id === getEmailData.id) {
                    const isValid = await checkEmail(getEmailData.email);
                    if (!isValid || isValid.statusCode !== 200) {
                        localStorage.removeItem('temp_email');
                        setGeneratingEmail(false);
                        return generateTempEmailAction();
                    }
                    setEmailData({
                        ...getEmailData,
                        expiredAt: new Date(getEmailData.expiredAt),
                    });
                    setGeneratingEmail(false);
                    return;
                }
            } else {
                setEmailData({
                    ...getEmailData,
                    expiredAt: new Date(getEmailData.expiredAt),
                });
                setGeneratingEmail(false);
                return;
            }
        }

        console.log('generating temp email');
        const response = await generateTempEmail();
        if (response && response.statusCode == 200) {
            setEmailData({
                ...response.data,
                expiredAt: new Date(response.data.expiredAt),
            });
            localStorage.setItem('temp_email', JSON.stringify(response.data));
            setGeneratingEmail(false);
            return response.data;
        }
        setTimeout(() => generateTempEmailAction(), 2000);
    };

    const getEmailInfo = async (id: string) => {
        const response = await getTempEmail(id);
        if (response && response.statusCode == 200) {
            setEmailData({
                ...response.data,
                expiredAt: new Date(response.data.expiredAt),
            });
            return response.data;
        }
    };

    useEffect(() => {
        if (id) {
            getEmailInfo(id);
        } else {
            generateTempEmailAction();
        }
    }, []);

    return (
        <>
            <TempEmail
                emailData={emailData}
                generateNewEmail={generateTempEmailAction}
                generatingEmail={generatingEmail}
            />
            <Inbox emailData={emailData} generatingEmail={generatingEmail} />
        </>
    );
}
