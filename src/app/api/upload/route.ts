import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import uniqid from "uniqid";

import { s3Client } from "@/libs/awsS3Client";

export async function POST(req: Request) {
  const formData = await req.formData();

  if (formData.has("file")) {
    const file = formData.get("file") as File;

    if (file.size === 0) {
      return NextResponse.json({
        error: "No audio file provided",
      });
    }

    const ext = file.name.split(".").pop();

    if (!ext) {
      return NextResponse.json({
        error: "Incorrect file type.",
      });
    }

    const uniqueId = uniqid();

    const newFileName = `${uniqueId}${"." + ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const imageFile = new Uint8Array(arrayBuffer);

    const bucketName = process.env.BUCKET_NAME;

    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: newFileName,
          ACL: "public-read",
          Body: imageFile,
          ContentType: file.type,
        })
      );

      const imageUrl = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;

      return NextResponse.json(imageUrl, { status: 200 });
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      return NextResponse.json(
        { error: "Error uploading file to S3" },
        { status: 500 }
      );
    }
  }
}
