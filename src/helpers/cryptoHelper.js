let aesKey = null;

// Fungsi untuk generate kunci AES statis (di-generate hanya sekali)
async function getStaticAESKey() {
    if (!aesKey) {
        const keyString = "abcdefghijklmnopqrstuvwxyzaaaaaa"; // Kunci statis 256 bit
        const keyBuffer = new TextEncoder().encode(keyString);

        aesKey = await crypto.subtle.importKey(
            "raw",
            keyBuffer,
            { name: "AES-GCM" },
            false,
            ["encrypt", "decrypt"]
        );
    }
    return aesKey;
}

// Fungsi untuk hashing plaintext dan menghasilkan IV konsisten
async function generateIVFromPlaintext(plaintext) {
    const msgBuffer = new TextEncoder().encode(plaintext);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    return new Uint8Array(hashBuffer).slice(0, 12); // Ambil 12 byte pertama sebagai IV
}

// Fungsi untuk mengubah ke URL safe Base64
function toUrlSafeBase64(base64) {
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Fungsi untuk mengubah dari URL safe Base64
function fromUrlSafeBase64(base64) {
    base64 = base64.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
        base64 += '=';
    }
    return base64;
}

// Fungsi untuk enkripsi teks
export async function encryptText(plaintext) {
    const key = await getStaticAESKey();
    const iv = await generateIVFromPlaintext(plaintext); // IV konsisten berdasarkan hash plaintext

    const encoded = new TextEncoder().encode(plaintext);
    const ciphertext = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        encoded
    );

    const ciphertextBase64 = btoa(String.fromCharCode(...new Uint8Array(ciphertext)));
    return toUrlSafeBase64(ciphertextBase64);
}

// Fungsi untuk dekripsi teks
export async function decryptText(encryptedText) {
    const key = await getStaticAESKey();
    const base64Ciphertext = fromUrlSafeBase64(encryptedText);

    const ciphertextArray = Uint8Array.from(atob(base64Ciphertext), c => c.charCodeAt(0));
    const iv = await generateIVFromPlaintext(atob(base64Ciphertext)); // IV yang sama dari hash plaintext

    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        ciphertextArray
    );

    return new TextDecoder().decode(decrypted);
}
