import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await req.formData();
    const files = data.getAll("files") as Blob[]; // Pegando todos os arquivos

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const uploadedImages: string[] = [];

    for (const file of files) {

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadPromise = new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "campanhas" },
          (error, result) => {
            if (error || !result) {
              console.error("🚨 Erro no upload para Cloudinary:", error);
              reject("Erro no upload");
            } else {
              resolve(result.secure_url);
            }
          }
        ).end(buffer);
      });

      uploadedImages.push(await uploadPromise);
    }

    return NextResponse.json({ urls: uploadedImages }, { status: 200 });
  } catch (error) {
    console.error("❌ Erro no servidor ao fazer upload:", error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
