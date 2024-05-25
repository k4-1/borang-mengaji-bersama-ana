import { RegisterSchema } from "@/schema";
import { google } from "googleapis";
import { NextApiRequest } from "next";

type SheetForm = {
  nama: string;
  umur: number;
  alamat: string;
  tahap: string;
};

export async function POST(req: Request) {
  const reqJson = await req.json();
  const body = RegisterSchema.parse(reqJson);

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A2:D2",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            body.nama,
            body.nomborIc,
            body.umur,
            body.nomborTel,
            body.negeri,
            body.tahap,
          ],
        ],
      },
    });

    return Response.json({
      data: response.data,
    });
  } catch (e) {
    return Response.json({ message: e });
  }
}
