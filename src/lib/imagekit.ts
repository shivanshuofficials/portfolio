import crypto from "crypto";

export function getAuthParams() {
  const token = crypto.randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 60 * 10;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || "";
  const signature = crypto.createHmac("sha1", privateKey).update(token + expire).digest("hex");
  return {
    token,
    expire,
    signature,
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  };
}

export async function uploadBuffer(buffer: Buffer, fileName: string, folder: string = "/blog"): Promise<string> {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) throw new Error("Missing IMAGEKIT_PRIVATE_KEY in environment");

  const fd = new FormData();
  fd.append("file", new Blob([new Uint8Array(buffer)]), fileName);
  fd.append("fileName", fileName);
  fd.append("folder", folder);

  const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(privateKey + ":").toString("base64"),
    },
    body: fd,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`ImageKit upload failed: ${errorText}`);
  }

  const data = await res.json();
  return data.url;
}
