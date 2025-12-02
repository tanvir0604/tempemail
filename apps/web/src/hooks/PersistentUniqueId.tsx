import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

export const usePersistentUniqueId = () => {
    const [uniqueId, setUniqueId] = useState<string | null>(null);

    useEffect(() => {
        try {
            let id = localStorage.getItem('__temp_email_user');
            if (!id) {
                id = nanoid();
                localStorage.setItem('__temp_email_user', id);
            }
            setUniqueId(id);
        } catch (error) {
            console.log(error);
        }
    }, []);

    return uniqueId;
};
