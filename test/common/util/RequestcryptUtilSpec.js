import {
    RSAEncrypt,
    AESGCMEncrypt,
    AESGCMDecrypt,
    generateAESRandomKey,
    generateAESRandomIV
} from '../../../src/common/util/RequestcryptUtil';

describe('RequestcryptUtil - node-forge version compatibility test', () => {
    // 测试用的 RSA 公钥（2048位）
    const testPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2BQweGm/+YpzPn/QaRvk
OYQQOwO0LI52NSdtJDehARLvFLfKfpaXs2Qks2VISYX8bl1aBRtS5m5/Z8mdo41k
2XM9sRUKldF5M0gTUqKWUnDkS6INnNfsW4VsHNizIiZY7YvQA2cwl/4eYm4YF5Qy
3KugPGrxt5KxZvh8O7b6si9JwLwIx53Y5oRbFttCHdjWR4mqFTzTR/yD4K1xYo/f
izdvqUmWLhfpirHQsWv3WLaUOdEj36nDGBxuqahQ5JbH3VeASdbJQRTp+0QQcfpZ
1x0GxXJWstemCrCUETQIQczYtj98qxSqknC8HZQhDz8F31NFV4341vrGKgOzrsq5
HQIDAQAB
-----END PUBLIC KEY-----`;

    // 测试用的公钥（不带 BEGIN/END 标记）
    const testPublicKeyRaw = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2BQweGm/+YpzPn/QaRvk
OYQQOwO0LI52NSdtJDehARLvFLfKfpaXs2Qks2VISYX8bl1aBRtS5m5/Z8mdo41k
2XM9sRUKldF5M0gTUqKWUnDkS6INnNfsW4VsHNizIiZY7YvQA2cwl/4eYm4YF5Qy
3KugPGrxt5KxZvh8O7b6si9JwLwIx53Y5oRbFttCHdjWR4mqFTzTR/yD4K1xYo/f
izdvqUmWLhfpirHQsWv3WLaUOdEj36nDGBxuqahQ5JbH3VeASdbJQRTp+0QQcfpZ
1x0GxXJWstemCrCUETQIQczYtj98qxSqknC8HZQhDz8F31NFV4341vrGKgOzrsq5
HQIDAQAB`;

    describe('generateAESRandomKey', () => {
        it('should generate 16 character key', () => {
            const key = generateAESRandomKey();
            expect(key).toBeDefined();
            expect(key.length).toBe(16);
            expect(typeof key).toBe('string');
        });

        it('should generate different keys each time', () => {
            const key1 = generateAESRandomKey();
            const key2 = generateAESRandomKey();
            expect(key1).not.toBe(key2);
        });

        it('should generate keys with valid characters', () => {
            const key = generateAESRandomKey();
            const validChars = /^[0-9a-zA-Z]+$/;
            expect(validChars.test(key)).toBe(true);
        });
    });

    describe('generateAESRandomIV', () => {
        it('should generate 12 character IV', () => {
            const iv = generateAESRandomIV();
            expect(iv).toBeDefined();
            expect(iv.length).toBe(12);
            expect(typeof iv).toBe('string');
        });

        it('should generate different IVs each time', () => {
            const iv1 = generateAESRandomIV();
            const iv2 = generateAESRandomIV();
            expect(iv1).not.toBe(iv2);
        });

        it('should generate IVs with valid characters', () => {
            const iv = generateAESRandomIV();
            const validChars = /^[0-9a-zA-Z]+$/;
            expect(validChars.test(iv)).toBe(true);
        });
    });

    describe('RSAEncrypt', () => {
        it('should encrypt message with PEM format public key', () => {
            const message = 'test message';
            const encrypted = RSAEncrypt(testPublicKey, message);

            expect(encrypted).toBeDefined();
            expect(encrypted).not.toBe(false);
            expect(typeof encrypted).toBe('string');
            expect(encrypted.length).toBeGreaterThan(0);
        });

        it('should encrypt message with raw public key', () => {
            const message = 'test message';
            const encrypted = RSAEncrypt(testPublicKeyRaw, message);

            expect(encrypted).toBeDefined();
            expect(encrypted).not.toBe(false);
            expect(typeof encrypted).toBe('string');
        });

        it('should generate different ciphertext for same message due to OAEP padding', () => {
            const message = 'test message';
            const encrypted1 = RSAEncrypt(testPublicKey, message);
            const encrypted2 = RSAEncrypt(testPublicKey, message);

            // RSA-OAEP 使用随机填充，所以每次加密结果都不同
            expect(encrypted1).not.toBe(encrypted2);
        });

        it('should encrypt empty string', () => {
            const encrypted = RSAEncrypt(testPublicKey, '');
            expect(encrypted).toBeDefined();
            expect(encrypted).not.toBe(false);
        });

        it('should encrypt Chinese characters', () => {
            const message = '测试中文加密';
            const encrypted = RSAEncrypt(testPublicKey, message);

            expect(encrypted).toBeDefined();
            expect(encrypted).not.toBe(false);
        });

        it('should encrypt special characters', () => {
            const message = '!@#$%^&*()_+-={}[]|:;"<>,.?/~`';
            const encrypted = RSAEncrypt(testPublicKey, message);

            expect(encrypted).toBeDefined();
            expect(encrypted).not.toBe(false);
        });

        it('should encrypt JSON string', () => {
            const message = JSON.stringify({ user: 'test', password: '123456' });
            const encrypted = RSAEncrypt(testPublicKey, message);

            expect(encrypted).toBeDefined();
            expect(encrypted).not.toBe(false);
        });
    });

    describe('AESGCMEncrypt and AESGCMDecrypt', () => {
        const testKey = 'abcd1234efgh5678'; // 16 characters
        const testIV = '123456789012'; // 12 characters

        it('should encrypt and decrypt simple message', () => {
            const originalMessage = 'Hello World';

            const encrypted = AESGCMEncrypt(testKey, testIV, originalMessage);
            expect(encrypted).toBeDefined();
            expect(encrypted).not.toBe(false);
            expect(typeof encrypted).toBe('string');

            const decrypted = AESGCMDecrypt(testKey, testIV, encrypted);
            expect(decrypted).toBe(originalMessage);
        });

        it('should encrypt and decrypt empty string', () => {
            const originalMessage = '';

            const encrypted = AESGCMEncrypt(testKey, testIV, originalMessage);
            expect(encrypted).toBeDefined();
            expect(encrypted).not.toBe(false);

            const decrypted = AESGCMDecrypt(testKey, testIV, encrypted);
            expect(decrypted).toBe(originalMessage);
        });

        it('should encrypt and decrypt Chinese characters', () => {
            const originalMessage = '测试中文加密解密功能';

            const encrypted = AESGCMEncrypt(testKey, testIV, originalMessage);
            expect(encrypted).not.toBe(false);

            const decrypted = AESGCMDecrypt(testKey, testIV, encrypted);
            expect(decrypted).toBe(originalMessage);
        });

        it('should encrypt and decrypt special characters', () => {
            const originalMessage = '!@#$%^&*()_+-={}[]|:;"<>,.?/~`\n\t\r';

            const encrypted = AESGCMEncrypt(testKey, testIV, originalMessage);
            expect(encrypted).not.toBe(false);

            const decrypted = AESGCMDecrypt(testKey, testIV, encrypted);
            expect(decrypted).toBe(originalMessage);
        });

        it('should encrypt and decrypt JSON object', () => {
            const originalMessage = JSON.stringify({
                user: 'testUser',
                password: 'P@ssw0rd!',
                data: {
                    nested: true,
                    values: [1, 2, 3]
                }
            });

            const encrypted = AESGCMEncrypt(testKey, testIV, originalMessage);
            expect(encrypted).not.toBe(false);

            const decrypted = AESGCMDecrypt(testKey, testIV, encrypted);
            expect(decrypted).toBe(originalMessage);

            // 验证解密后的 JSON 可以正常解析
            const parsedData = JSON.parse(decrypted);
            expect(parsedData.user).toBe('testUser');
            expect(parsedData.data.values).toEqual([1, 2, 3]);
        });

        it('should encrypt and decrypt long message', () => {
            const originalMessage = 'A'.repeat(1000);

            const encrypted = AESGCMEncrypt(testKey, testIV, originalMessage);
            expect(encrypted).not.toBe(false);

            const decrypted = AESGCMDecrypt(testKey, testIV, encrypted);
            expect(decrypted).toBe(originalMessage);
        });

        it('should encrypt and decrypt with random key and IV', () => {
            const randomKey = generateAESRandomKey();
            const randomIV = generateAESRandomIV();
            const originalMessage = 'Test with random key and IV';

            const encrypted = AESGCMEncrypt(randomKey, randomIV, originalMessage);
            expect(encrypted).not.toBe(false);

            const decrypted = AESGCMDecrypt(randomKey, randomIV, encrypted);
            expect(decrypted).toBe(originalMessage);
        });

        it('should fail to decrypt with wrong key', () => {
            const originalMessage = 'Secret message';
            const wrongKey = 'wrongkey12345678';

            const encrypted = AESGCMEncrypt(testKey, testIV, originalMessage);
            expect(encrypted).not.toBe(false);

            const decrypted = AESGCMDecrypt(wrongKey, testIV, encrypted);
            expect(decrypted).toBe(false); // 解密失败
        });

        it('should fail to decrypt with wrong IV', () => {
            const originalMessage = 'Secret message';
            const wrongIV = 'wrongiv12345';

            const encrypted = AESGCMEncrypt(testKey, testIV, originalMessage);
            expect(encrypted).not.toBe(false);

            const decrypted = AESGCMDecrypt(testKey, wrongIV, encrypted);
            expect(decrypted).toBe(false); // 解密失败
        });

        it('should fail to decrypt tampered ciphertext', () => {
            const originalMessage = 'Secret message';

            const encrypted = AESGCMEncrypt(testKey, testIV, originalMessage);
            expect(encrypted).not.toBe(false);

            // 篡改密文（改变最后一个字符）
            const tamperedEncrypted = encrypted.slice(0, -1) + 'X';

            const decrypted = AESGCMDecrypt(testKey, testIV, tamperedEncrypted);
            expect(decrypted).toBe(false); // 认证失败
        });

        it('should produce consistent encrypted length', () => {
            const message = 'Test message';

            const encrypted1 = AESGCMEncrypt(testKey, testIV, message);
            const encrypted2 = AESGCMEncrypt(testKey, testIV, message);

            // 相同的 key、IV 和消息会产生相同的密文
            expect(encrypted1).toBe(encrypted2);
            expect(encrypted1.length).toBe(encrypted2.length);
        });

        it('should handle Unicode emoji', () => {
            const originalMessage = '👋 Hello 🌍 World! 🚀';

            const encrypted = AESGCMEncrypt(testKey, testIV, originalMessage);
            expect(encrypted).not.toBe(false);

            const decrypted = AESGCMDecrypt(testKey, testIV, encrypted);
            expect(decrypted).toBe(originalMessage);
        });

        it('should verify tagLength is 128 bits (16 bytes)', () => {
            const originalMessage = 'Test message for tag length';

            const encrypted = AESGCMEncrypt(testKey, testIV, originalMessage);
            expect(encrypted).not.toBe(false);

            // Base64 解码后，密文长度应该等于原文长度 + 16字节的 tag
            const cipherBytes = atob(encrypted);
            const messageBytes = new TextEncoder().encode(originalMessage).length;

            // tag 长度应该是 16 字节（128 位）
            expect(cipherBytes.length).toBe(messageBytes + 16);
        });
    });

    describe('Complete workflow test', () => {
        it('should complete full encryption workflow: RSA + AES-GCM', () => {
            // 模拟完整的加密流程
            const originalData = JSON.stringify({
                username: 'admin',
                password: 'P@ssw0rd123',
                timestamp: Date.now()
            });

            // 1. 生成 AES key 和 IV
            const aesKey = generateAESRandomKey();
            const aesIV = generateAESRandomIV();

            // 2. 用 AES-GCM 加密数据
            const encryptedData = AESGCMEncrypt(aesKey, aesIV, originalData);
            expect(encryptedData).not.toBe(false);

            // 3. 用 RSA-OAEP 加密 AES key
            const encryptedKey = RSAEncrypt(testPublicKey, aesKey);
            expect(encryptedKey).not.toBe(false);

            // 4. 用 RSA-OAEP 加密 AES IV
            const encryptedIV = RSAEncrypt(testPublicKey, aesIV);
            expect(encryptedIV).not.toBe(false);

            // 5. 模拟解密过程（只测试 AES 部分，RSA 解密需要私钥）
            const decryptedData = AESGCMDecrypt(aesKey, aesIV, encryptedData);
            expect(decryptedData).toBe(originalData);

            // 6. 验证解密后的数据
            const parsedData = JSON.parse(decryptedData);
            expect(parsedData.username).toBe('admin');
            expect(parsedData.password).toBe('P@ssw0rd123');
        });

        it('should handle multiple encrypt/decrypt cycles with same key', () => {
            const key = generateAESRandomKey();
            const iv = generateAESRandomIV();

            const messages = [
                'First message',
                'Second message',
                'Third message',
                '第四条消息',
                'Fifth message with special chars !@#$%'
            ];

            messages.forEach(originalMessage => {
                const encrypted = AESGCMEncrypt(key, iv, originalMessage);
                expect(encrypted).not.toBe(false);

                const decrypted = AESGCMDecrypt(key, iv, encrypted);
                expect(decrypted).toBe(originalMessage);
            });
        });
    });

    describe('Edge cases and error handling', () => {
        it('should handle very short messages', () => {
            const key = generateAESRandomKey();
            const iv = generateAESRandomIV();
            const message = 'a';

            const encrypted = AESGCMEncrypt(key, iv, message);
            const decrypted = AESGCMDecrypt(key, iv, encrypted);
            expect(decrypted).toBe(message);
        });

        it('should handle messages with only whitespace', () => {
            const key = generateAESRandomKey();
            const iv = generateAESRandomIV();
            const message = '   \n\t\r   ';

            const encrypted = AESGCMEncrypt(key, iv, message);
            const decrypted = AESGCMDecrypt(key, iv, encrypted);
            expect(decrypted).toBe(message);
        });

        it('should handle messages with null bytes', () => {
            const key = generateAESRandomKey();
            const iv = generateAESRandomIV();
            const message = 'before\x00after';

            const encrypted = AESGCMEncrypt(key, iv, message);
            const decrypted = AESGCMDecrypt(key, iv, encrypted);
            expect(decrypted).toBe(message);
        });
    });
});
