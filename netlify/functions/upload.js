const cloudinary = require('cloudinary').v2;
   const formidable = require('formidable');

   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
   });

   exports.handler = async (event, context) => {
     if (event.httpMethod !== 'POST') {
       return { statusCode: 405, body: 'Method Not Allowed' };
     }

     return new Promise((resolve, reject) => {
       const form = new formidable.IncomingForm();

       form.parse(event, async (err, fields, files) => {
         if (err) {
           return resolve({
             statusCode: 500,
             body: JSON.stringify({ error: 'Failed to parse form data' })
           });
         }

         try {
           const result = await cloudinary.uploader.upload(files.image.path);
           resolve({
             statusCode: 200,
             body: JSON.stringify({ url: result.secure_url })
           });
         } catch (error) {
           console.error('Upload error:', error);
           resolve({
             statusCode: 500,
             body: JSON.stringify({ error: 'Upload failed' })
           });
         }
       });
     });
   };