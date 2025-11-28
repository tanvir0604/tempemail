import { getFile } from "@/lib/actions";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { filename } = req.query;

    if (!filename || typeof filename !== "string") {
        res.status(400).send("Invalid filename");
        return;
    }
    const file = await getFile(filename);
    if (file.statusCode !== 200 || !file.data?.data) {
        res.status(400).send("File not found");
        return;
    }

    console.log(file.data.data);

    const fileBuffer = Buffer.from(file.data.data, "base64");

    const mimeTypes: Record<string, string> = {
        // Images
        webp: "image/webp",
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        gif: "image/gif",
        svg: "image/svg+xml",
        bmp: "image/bmp",
        ico: "image/x-icon",
        tiff: "image/tiff",
        tif: "image/tiff",

        // Documents
        pdf: "application/pdf",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        xls: "application/vnd.ms-excel",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ppt: "application/vnd.ms-powerpoint",
        pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        odt: "application/vnd.oasis.opendocument.text",
        ods: "application/vnd.oasis.opendocument.spreadsheet",
        odp: "application/vnd.oasis.opendocument.presentation",

        // Text
        txt: "text/plain",
        csv: "text/csv",
        html: "text/html",
        htm: "text/html",
        css: "text/css",
        js: "application/javascript",
        json: "application/json",
        xml: "application/xml",
        rtf: "application/rtf",

        // Archives
        zip: "application/zip",
        rar: "application/vnd.rar",
        "7z": "application/x-7z-compressed",
        tar: "application/x-tar",
        gz: "application/gzip",

        // Audio
        mp3: "audio/mpeg",
        wav: "audio/wav",
        ogg: "audio/ogg",
        m4a: "audio/mp4",

        // Video
        mp4: "video/mp4",
        avi: "video/x-msvideo",
        mov: "video/quicktime",
        wmv: "video/x-ms-wmv",
        flv: "video/x-flv",
        webm: "video/webm",
        mkv: "video/x-matroska",

        // Other
        eml: "message/rfc822",
        ics: "text/calendar",
        vcf: "text/vcard",
    };

    const extension = filename.split(".").pop()?.toLowerCase();
    const contentType =
        mimeTypes[extension || ""] || "application/octet-stream";
    res.setHeader("Content-Type", contentType);
    res.send(fileBuffer);
}
