import { NextResponse,  NextRequest } from "next/server";
import { pinata } from "../../../../lib/pinata-config";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const fileData = data.get("file");
    const fileName = data.get("name");
    const file: File | null = fileData as unknown as File;
    const keyValues = data.get("keyValues");
    const { cid, id, keyvalues  } = await pinata.upload.public.file(file).name(fileName as string).keyvalues(keyValues);
    const url = await pinata.gateways.public.convert(cid);
    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}