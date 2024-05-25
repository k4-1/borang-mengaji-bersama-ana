import { RegisterSchema } from "@/schema";
import { google } from "googleapis";

export async function POST(req: Request) {
  const reqJson = await req.json();
  const body = RegisterSchema.parse(reqJson);

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: "k41-578@ngaji-form.iam.gserviceaccount.com",
        private_key:
          "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7/BtL15wcVzuP\n9jE/wtN1eeAP9jaEtHRLsqaB1zmUcvAhjCrI5x38qWMVZMwkPnjAwup/IUrjsJZG\nY0afrVhAP1NvYgJdjr5oij5N5ontAcfceg0JFuFmgrFftwI9Ya1sLn8J0cjhTFgB\n/Ejs1U/79N8XErEG6noASL+HRywtsUw8L4jDgJSVW8vLGPJamnU2UQCDj0Jqmk4k\n8v7D4iETIfOscPrL6zNxB6kPYWqWguZZg1sVBg6eHMVJHm0usPjiUjIgCSRnxfjP\nA2BBOr3UDBeKxepntS4w/2A4/oXYj3LaZsvmz75O34gwfMXpoIZAfsIKoQDbA91x\nBj4wpRD1AgMBAAECggEADFEaYL/BxMGab3ZMB8d2H25a1fDl5ZAFRqhv7HXzmdxm\nC2ypqPwrpNBcY5x1G7LUKp0azDWcOIrrbbU3fWLYM21yxAuB6CtgIm1cY7JFOzgw\npiuBCyVqo1LQ2FqfVPI/cKUjQbtzE//yjD7BcHMRiIqky1g4LSHT2Izrr6tkI6Ir\ng0zpy2L9Fp0fEqYVQymSoFQaSPPDH9yYj9+3A435rK6jvFcNWiz4DC+Ix6bOv7Th\nPKzu4ehM9fY/9PyqIGJKJTDc+d1sU5wTCWm2FBeAuD6Wncbe2RlGR3h/yiEoFany\nocVMyrtJCk1/MXNidTA9oeQhIAefp5jChLHO2ZybCQKBgQDbq1qUFH0/cT4FZs0y\n6bLnRAxbEclvszPYoWZ3uQMBJpIIyKigzhldROPmoxUPmYcfyahjE1nfcaOSr0kS\npuUUIXte7uVJufuPrVP4Slyl6uxgfbBn8y6T9XmMheOm+o3syPQaUgloIGrYtGF6\nVG6fD1D0ZEKaLZRozmcIcQ/GbwKBgQDbE0Az+ut1ADa2yRnLDUrkCm38EPM/XOqq\nqki/mpyEhSpsM9zCXoBEChAlrRFty//khEeAAT6N82gIUU0AFkJDdS7uNxP8AN/V\nqsMcQtiPZnt5vfEa9cU9EI0k+y+5YM5akFHAPs0HCIG2WBAXrk/m05e+YM83oCzq\nPA8zKOaw2wKBgQCN/Ldiic/fRxo4sZcnNomOFJ0L7HZQvftgJgsujabUgpLYHKNq\ntW0NrW7F8Fm3qJv/vwAZcjOgSzrYoHZSGRBvL6kn1rDcM9vXpchl7+Ls1+mMARIa\nTsSnnH7BhvV8Q+2ixM2LicVMyc9mXUm4oYSTSXohTgEC2T1ZdTiB61qv/wKBgA1n\njiQgFEwiaTah82wTMiPl53jm6JtV6h3rMWxX33/UThY0zisucRa4rug/QLPBKbUn\nyuAwM02oORNZNibtNby+7NIymIxw2UFPo4SVKn8LvD5kut31b84etyQuImtrWvT7\no6Tpss3dXWJ03Pc1+TmcdMp3TfaPXHAwoJV2yTbFAoGAc0WK9MpIWuyoxrF9L7K9\nDt0hluULc0FcdRNLp3+sIypKJnmpqIK6pFiynOfrlEnngQZ8nPi7SBANxaRkcnJl\np2NZcMIlMvoatG2z0uKyD+2EphSQS4kYrEeoCf5ZhkrnmUyMmt0MObdeWOEHYzTD\n38ZMIhvVuoo/90wRy0uyaCM=\n-----END PRIVATE KEY-----\n"!.replace(
            /\\n/g,
            "\n"
          ),
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
      spreadsheetId: "1SVHtHDUHa5OLRjsYrTh1b65de_UNGLJ-MOcQHBzx-MU",
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
