import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ElevenLabsClient } from 'elevenlabs';

function ChatbotPlayground() {
    // Eleven Labs API client
    const eleven = new ElevenLabsClient({
        apiKey: "sk_5703b68cfb73fd1f95f01fa23f32a5a9b6077a42b3101a0f",
    });

    const [inputValue, setInputValue] = useState('');
    const [promptResponses, setPromptResponses] = useState([]);
    const [loading, setLoading] = useState(false);
    const genAI = new GoogleGenerativeAI("AIzaSyCMZoLNkDoL6Gc-1Ae1gt8sIeBoqYkZBqM");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const playAudioFromStream = async (audio) => {
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



    const getResponseForGivenPrompt = async () => {
        try {
            setLoading(true);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const systemMessage = "Anda adalah sistem yang memberikan pengetahuan tentang budaya dan kesenian. Jawablah setiap pertanyaan dengan ramah menggunakan bahasa Indonesia. Hindari sapaan dan jawaban yang terlalu panjang. Fokuslah pada jawaban yang informatif dan mudah dipahami. Jangan jawab pertanyaan jika tidak berkaitan dan berhubungan dengan seni dan budaya di indonesia. Jawab dengan jawaban yang friendly dan ramah bagi anak anak.";
            const result = await model.generateContent(systemMessage + inputValue);
            setInputValue('');
            const response = result.response;
            const text = response.text();
            console.log(text);
            setPromptResponses([...promptResponses, text]);

            // Generate audio from ElevenLabs
            const audioStream = await eleven.textToSpeech.convert(
                "gmnazjXOFoOcWA59sd5m",
                {
                    text: text,
                    model_id: "eleven_multilingual_v2",
                    output_format: "mp3_44100_128",
                }
            );

            // Play audio
            playAudioFromStream(audioStream);

            console.log(audioStream);




            setLoading(false);
        } catch (error) {
            console.log(error);
            console.log("Something Went Wrong");
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Ask Me Something You Want"
                        className="form-control"
                    />
                </div>
                <div className="col-auto">
                    <button onClick={getResponseForGivenPrompt} className="btn btn-primary">Send</button>
                </div>
            </div>
            {loading ? (
                <div className="mt-3 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                promptResponses.map((promptResponse, index) => (
                    <div key={index}>
                        <div className={`response-text ${index === promptResponses.length - 1 ? 'fw-bold' : ''}`}>
                            {promptResponse}
                        </div>
                        <div className='w-full h-1 my-5 bg-red-500' />
                    </div>
                ))
            )}


        </div>
    );
}

export default ChatbotPlayground;
