import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files, File } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success?: boolean; file?: string; error?: string }>
) {
  const uploadDir: string = path.join(process.cwd(), 'public/uploads');
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
  });

  form.parse(req, (err: Error | null, fields: Fields, files: Files) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'Upload failed' });
    }

    const file: File | File[] | undefined = files.file;
    let uploadedFile: File | undefined;

    if (Array.isArray(file)) {
      uploadedFile = file[0];
    } else {
      uploadedFile = file;
    }

    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileName: string = path.basename(
      uploadedFile.filepath || uploadedFile.originalFilename || ''
    );
    return res.status(200).json({ success: true, file: fileName });
  });
}
