import Replicate from "replicate";

export default async function handler(req, res) {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  console.log(req.body.prompt);
  console.log(req.body.qr_code_content);
  try {
    const output = await replicate.run(
      "nateraw/qrcode-stable-diffusion:9cdabf8f8a991351960c7ce2105de2909514b40bd27ac202dba57935b07d29d4",
      {
        input: {
          prompt: req.body.prompt || "...",
          qr_code_content: req.body.qr_code_content || "",
        },
      }
    );

    res.status(200).json({ qr_code: output });
  } catch (error) {
    console.error("AI QR code generation failed:", error);
    res.status(500).json({ error: "AI QR code generation failed" });
  }
}