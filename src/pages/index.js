import { useState } from "react";

export default function Home() {
  const [qrCode, setQrCode] = useState("");
  const [prompt, setPrompt] = useState("");
  const [qrCodeContent, setQrCodeContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateQrCode = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/qr-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, qr_code_content: qrCodeContent }),
      });

      const { qr_code } = await response.json();
      setQrCode(qr_code);
    } catch (error) {
      console.error("Failed to generate QR code:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">AI QR Code Generator</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your QR code artwork prompt"
        className="px-4 py-2 text-black border border-gray-300 rounded-lg mb-4 w-80 text-center"
      />
      <input
        type="text"
        value={qrCodeContent}
        onChange={(e) => setQrCodeContent(e.target.value)}
        placeholder="Enter the web URL for the QR code"
        className="px-4 py-2 text-black border border-gray-300 rounded-lg mb-4 w-80 text-center"
      />
      <button
        onClick={generateQrCode}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate QR Code"}
      </button>
      {isLoading && (
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        </div>
      )}
      {qrCode && (
        <div className="mt-4">
          <img src={qrCode} alt="Generated QR Code" />
        </div>
      )}
    </div>
  );
}