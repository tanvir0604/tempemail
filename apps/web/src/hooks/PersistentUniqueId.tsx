import { useState } from 'react';
import { nanoid } from 'nanoid';

export const usePersistentUniqueId = () => {
    const [uniqueId] = useState<string | null>(() => {
        try {
            const storage = safeLocalStorage();
            if (!storage) return null;

            let id = storage.getItem('__temp_email_user');
            if (!id) {
                id = nanoid();
                storage.setItem('__temp_email_user', id);
            }
            return id;
        } catch (error) {
            console.error(error);
            return null;
        }
    });

    return uniqueId;
};

function safeLocalStorage() {
    try {
        if (typeof window === 'undefined') return null;
        const test = '__storage_test__';
        window.localStorage.setItem(test, test);
        window.localStorage.removeItem(test);
        return window.localStorage;
    } catch {
        return null;
    }
}
