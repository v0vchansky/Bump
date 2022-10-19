import EncryptedStorage from 'react-native-encrypted-storage';

const fallback = new Map();

export const safeEncryptedStorage: Pick<typeof EncryptedStorage, 'setItem' | 'getItem' | 'removeItem'> = {
    async getItem(key) {
        try {
            return await EncryptedStorage.getItem(key);
        } catch (e) {
            return fallback.has(key) ? fallback.get(key) : null;
        }
    },

    async setItem(key, val) {
        try {
            await EncryptedStorage.setItem(key, val);
        } catch (e) {
            fallback.set(key, val);
        }
    },

    async removeItem(key) {
        try {
            await EncryptedStorage.removeItem(key);
        } catch (e) {
            fallback.delete(key);
        }
    },
};

export default safeEncryptedStorage;
