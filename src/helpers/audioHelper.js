import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ElevenLabsClient } from 'elevenlabs';


export const playAudioFromStream = async (audio) => {
    try {
        const reader = audio.reader;
        const chunks = [];

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
        }

        const blob = new Blob(chunks, { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(blob);

        // Memainkan audio
        const audioElement = new Audio(audioUrl);
        audioElement.play();
    } catch (error) {
        console.error("Error playing audio:", error);
    }
};

const eleven = new ElevenLabsClient({
    apiKey: "sk_f38b9be20f8ca7fba8a6a2013b841394dcd2b2de2cc72cf5",
});

// sk_5703b68cfb73fd1f95f01fa23f32a5a9b6077a42b3101a0f
// sk_f38b9be20f8ca7fba8a6a2013b841394dcd2b2de2cc72cf5
// sk_037c6c2b2b2fd8c502724bbb474f1ad83c8c7b96456eec2c

export const getAudioFromText = async (text) => {
    try {
        const audioStream = await eleven.textToSpeech.convert(
            "LcvlyuBGMjj1h4uAtQjo",
            {
                text: text,
                model_id: "eleven_multilingual_v2",
                output_format: "mp3_44100_128",
            }
        );
        return audioStream;
    } catch (error) {
        console.error("Error getting audio from text:", error);
    }
};

const genAI = new GoogleGenerativeAI("AIzaSyCMZoLNkDoL6Gc-1Ae1gt8sIeBoqYkZBqM");

export const geminiChat = async (input, wilayah) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const systemMessage = "Anda adalah sistem yang memberikan pengetahuan tentang budaya dan kesenian. Jawablah setiap pertanyaan dengan ramah menggunakan bahasa Indonesia. Hindari sapaan dan jawaban yang terlalu panjang. Fokuslah pada jawaban yang informatif dan mudah dipahami. Jangan jawab pertanyaan jika tidak berkaitan dan berhubungan dengan seni dan budaya di indonesia terutama di wilayah " + wilayah + ". Jawab dengan jawaban yang friendly dan ramah bagi anak anak.";
        const result = await model.generateContent(systemMessage + input);
        const response = result.response;
        const text = response.text();
        return text

    } catch (error) {
        console.error("Error getting response for given prompt:", error);
    }
}
