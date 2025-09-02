//src/common/helper/generatekeys.ts

import { randomBytes } from 'crypto';

/**
 * class GenerateKeys.genAlphaNum4
 */
export class GenerateKeys {

    public static genAlphaNum16(): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length: 16 }, () =>
            chars[Math.floor(Math.random() * chars.length)]
        ).join('');
    };//end

    public static genAlphaNum4(): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length: 4 }, () =>
            chars[Math.floor(Math.random() * chars.length)]
        ).join('');
    };//end

    // 16 fixed chars: Hexadecimal (más rápido)
    public static genHexadecimal16(): string {
        return Array.from({ length: 16 }, () =>
            Math.floor(Math.random() * 16).toString(16)
        ).join('');
    };//end 

    public static geneCryptoId16(): string {
        return randomBytes(8).toString('hex'); // 8 bytes = 16 hex chars
    };//end 


    public static genUUId16(): string {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID().replace(/-/g, '').substring(0, 16);
        }
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        return Array.from(array, byte =>(byte % 16).toString(16) ).join('');
    };//end

    public static genimestampId16(): string {
        const timestamp = Date.now().toString(36); // Base 36
        const randomPart = Math.random().toString(36).substring(2);
        const combined = (timestamp + randomPart).substring(0, 16);
        return combined.padEnd(16, '0');
    };//end

    public static gentTimestampKey(): string {
        const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
        const randomNum = Math.floor(Math.random() * 1000000).toString(36); // Random number in base-36
        return `${timestamp}-${randomNum}`;
    };//end

}//end class