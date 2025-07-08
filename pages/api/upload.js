import cloudinary from '@/lib/cloudinary';

export const config = {
  api: {
    bodyParser: false,
  },
};

import { IncomingForm } from 'formidable';
import fs from 'fs';

export default async function handler(req, res) {
  const form = new IncomingForm();
  form.uploadDir = '/tmp';
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Filuppladdning misslyckades' });

    const file = files.file;
    const result = await cloudinary.uploader.upload(file.filepath, {
      resource_type: 'video',
    });

    res.status(200).json({ url: result.secure_url });
  });
}
