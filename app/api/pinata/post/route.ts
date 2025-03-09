import { NextResponse, NextRequest } from "next/server";
import { pinata } from "../../../../lib/pinata-config";

export async function POST(request: NextRequest) {
  try {
    if (request.headers.get("Content-Type") === "application/json") {
      // Handle JSON metadata upload
      const metadata = await request.json();
      const { cid } = await pinata.upload.public.json(metadata);
      return NextResponse.json({ IpfsHash: cid }, { status: 200 });
    }

    // Handle Image Upload
    const data = await request.formData();
    const file = data.get("file") as File | null;
    const fileName = data.get("name") as string;
    const keyValues = data.get("keyValues");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const { cid } = await pinata.upload.public
      .file(file)
      .name(fileName)
      .keyvalues(keyValues ? JSON.parse(keyValues as string) : {});

    const url = await pinata.gateways.public.convert(cid);
    
    return NextResponse.json({ IpfsHash: cid, url }, { status: 200 });
  } catch (e) {
    console.error("Pinata Upload Error:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}