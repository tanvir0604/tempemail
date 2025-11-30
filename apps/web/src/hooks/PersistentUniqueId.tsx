import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

export const usePersistentUniqueId = () => {
    const [uniqueId, setUniqueId] = useState<string | null>(null);

    useEffect(() => {
        let id = localStorage.getItem('__temp_email_user');
        if (!id) {
            id = nanoid(); // generate a new unique ID
            localStorage.setItem('__temp_email_user', id);
        }
        setUniqueId(id);
    }, []);

    return uniqueId;
};
