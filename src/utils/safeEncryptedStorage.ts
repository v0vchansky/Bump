import AsyncStorage from '@react-native-async-storage/async-storage';
const fallback = new Map();

export const safeEncryptedStorage: Pick<typeof AsyncStorage, 'setItem' | 'getItem' | 'removeItem'> = {
    async getItem(key) {
        try {
            return await AsyncStorage.getItem(key);
        } catch (e) {
            return fallback.has(key) ? fallback.get(key) : null;
        }
    },

    async setItem(key, val) {
        try {
            await AsyncStorage.setItem(key, val);
        } catch (e) {
            fallback.set(key, val);
        }
    },

    async removeItem(key) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            fallback.delete(key);
        }
    },
};

export default safeEncryptedStorage;
