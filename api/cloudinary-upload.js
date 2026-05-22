import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb', // Enforce limit to stay under Vercel's 4.5mb max
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { image, resource_type } = req.body;

    if (!image) {
      return res.status(400).json({ success: false, error: 'No image provided' });
    }

    const options = {
      resource_type: resource_type || 'auto',
      folder: 'asutosh_photography',
      use_filename: true,
      unique_filename: true,
    };

    // Upload base64 string to Cloudinary
    const result = await cloudinary.uploader.upload(image, options);

    return res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        resource_type: result.resource_type,
        bytes: result.bytes,
        format: result.format,
      },
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return res.status(500).json({ success: false, error: 'Upload failed', details: error.message });
  }
}
