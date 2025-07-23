// app/api/vendor-auth/route.js

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import formidable from 'formidable';
import fs from 'fs';
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { Readable } from 'stream';
import db from '@/lib/db';

// Disable default body parsing in Next.js API
export const config = {
  api: {
    bodyParser: false,
  },
};

// AWS S3 Client
const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

// Upload file to S3
async function uploadToS3(file, folder = 'uploads/made_in_korea/vendor_details') {
  const fileContent = fs.readFileSync(file.filepath);
  const filename = `${folder}/${uuidv4()}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: filename,
    Body: fileContent,
    ContentType: file.mimetype,
  });

  await s3.send(command);
  return `${filename}`;
}

// Parse form-data using formidable in App Router
async function parseForm(req) {
  const form = formidable({ multiples: true, keepExtensions: true });

  const contentType = req.headers.get('content-type');
  const contentLength = req.headers.get('content-length');

  const bodyBuffer = Buffer.from(await req.arrayBuffer());
  const stream = Readable.from(bodyBuffer);

  // Important: simulate Node.js IncomingMessage
  stream.headers = {
    'content-type': contentType,
    'content-length': contentLength,
  };

  return new Promise((resolve, reject) => {
    form.parse(stream, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

// POST handler
export async function POST(req) {
  try {
    const { fields, files } = await parseForm(req);

    const certFields = ['incorp_cert', 'gst_cert', 'pan_card', 'msme_cert', 'iso_cert', 'other_cert'];
    const uploadedCerts = {};

    for (const key of certFields) {
      if (files[key]) {
        const file = Array.isArray(files[key]) ? files[key][0] : files[key];
        const url = await uploadToS3(file);
        uploadedCerts[key] = url;
      } else {
        uploadedCerts[key] = null;
      }
    }

  

    const sql = `
      INSERT INTO vendors (
        business_name, email, password, primary_contact, title, phone,
        business_type, year_established, tin, gst_number, pan_number, website,
        street, city, state, postal_code, country,
        products_offered, client1, client2,
        incorp_cert, gst_cert, pan_card, msme_cert, iso_cert, other_cert
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const getField = (name) => (Array.isArray(fields[name]) ? fields[name][0] : fields[name] ?? null);

    const values = [
      getField('business_name'), getField('email'), getField('password'),
      getField('primary_contact'), getField('title'), getField('phone'),
      getField('business_type'), getField('year_established'), getField('tin'),
      getField('gst_number'), getField('pan_number'), getField('website'),
      getField('street'), getField('city'), getField('state'),
      getField('postal_code'), getField('country'),
      getField('products_offered'), getField('client1'), getField('client2'),
      uploadedCerts.incorp_cert, uploadedCerts.gst_cert, uploadedCerts.pan_card,
      uploadedCerts.msme_cert, uploadedCerts.iso_cert, uploadedCerts.other_cert,
    ];

    await db.execute(sql, values);


    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Upload error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
