import { useState } from 'react';
import { nanoid } from 'nanoid';

export const usePersistentUniqueId = () => {
    const [uniqueId] = useState<string | null>(() => {
        // This function only runs once on mount
        try {
            let id = localStorage.getItem('__temp_email_user');
            if (!id) {
                id = nanoid();
                localStorage.setItem('__temp_email_user', id);
            }
            return id;
        } catch (error) {
            console.error(error);
            return null;
        }
    });

    return uniqueId;
};
