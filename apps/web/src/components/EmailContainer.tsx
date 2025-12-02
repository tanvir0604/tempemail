'use client';

import { useEffect, useState } from 'react';
import { TempEmailType } from '@repo/validation';
import { checkEmail, generateTempEmail, getTempEmail } from '@/lib/actions';
import TempEmail from './TempEmail';
import Inbox from './Inbox';
import { usePersistentUniqueId } from '@/hooks/PersistentUniqueId';
import { toast } from 'sonner';
import { isIncognito } from '@/lib/utils';

export default function EmailContainer({ id }: { id?: string }) {
    const [emailData, setEmailData] = useState<TempEmailType>();
    const [generatingEmail, setGeneratingEmail] = useState(false);
    const userID = usePersistentUniqueId();

    const generateTempEmailAction = async () => {
        if (await isIncognito()) {
            toast.error("Please don't use incognito mood!!");
            return;
        }

        if (!userID) {
            toast.error("Please don't use incognito mood!!");
            return;
        }
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
                        waitTille: new Date(getEmailData.waitTill),
                    });
                    setGeneratingEmail(false);
                    return;
                }
            } else {
                setEmailData({
                    ...getEmailData,
                    expiredAt: new Date(getEmailData.expiredAt),
                    waitTille: new Date(getEmailData.waitTill),
                });
                setGeneratingEmail(false);
                return;
            }
        }

        console.log('generating temp email');
        const response = await generateTempEmail(userID ?? undefined);
        if (response && response.statusCode == 200) {
            console.log('response', response);
            setEmailData({
                ...response.data,
                expiredAt: new Date(response.data.expiredAt),
                waitTille: new Date(response.data.waitTill),
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
                waitTille: new Date(response.data.waitTill),
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
