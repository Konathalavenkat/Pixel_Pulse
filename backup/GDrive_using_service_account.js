require('dotenv').config();
const fs = require('fs');
const { google } = require('googleapis');
const { googleClientEmail, googlePrivateKey } = require('../config/keys');
const generateCode = require('../utils/generateCode');
const { Readable } = require('stream');
// Load the credentials from the .env file
const auth = new google.auth.JWT(
  googleClientEmail,
  null,
  googlePrivateKey.replace(/\\n/g, '\n'), // Handle newline in the private key
  ['https://www.googleapis.com/auth/drive']
);

// Google Drive API setup
const drive = google.drive({ version: 'v3', auth });

/**
 * Upload a file to Google Drive
 * @param {Object} file - The file object containing buffer and mimetype.
 * @param {String} ext - The file extension.
 * @returns {String} File ID on Google Drive
 */
const bufferToStream = (buffer) => {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null); // Signal the end of the stream
  return readable;
};

const uploadFileToDrive = async ({ file, ext }) => {
  const fileName = `${generateCode(12)}_${Date.now()}${ext}`;
  console.log(fileName);
  const fileMetadata = {
    name: fileName,
  };

  const media = {
    mimeType: file.mimetype,
    body: bufferToStream(file.buffer), // Use file.buffer for stream
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });
    return response.data.id;
  } catch (error) {
    console.error('Error uploading to Google Drive:', error.message);
  }
};

/**
 * Generate a signed URL for the file on Google Drive
 * @param {String} fileId - The Google Drive file ID.
 * @returns {String} Signed URL
 */
const makeFilePublic = async (fileId) => {
  try {
    // Create permission
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader', // 'reader' for view-only access
        type: 'anyone', // Anyone on the internet with the link can view the file
      },
    });
    console.log(`File ID ${fileId} is now public.`);
  } catch (error) {
    console.error('Error making file public:', error.message);
  }
};

// Function to generate the web view link for a file
const generateWebViewLink = async (fileId) => {
  try {
    const file = await drive.files.get({
      fileId,
      fields: 'webViewLink',
    });
    return file.data.webViewLink; // URL to view the file
  } catch (error) {
    console.error('Error generating web view link:', error.message);
  }
};

// Function to generate the signed URL for the file (make it public if not)
const generateSignedUrl = async (fileId) => {
  // First, make the file public
  await makeFilePublic(fileId);
  
  // Then, retrieve the web view link
  const webViewLink = await generateWebViewLink(fileId);
  
  return webViewLink;
};

/**
 * Delete a file from Google Drive
 * @param {String} fileId - The Google Drive file ID.
 */
const deleteFileFromDrive = async (fileId) => {
  try {
    await drive.files.delete({ fileId });
    console.log('File deleted successfully');
  } catch (error) {
    console.error('Error deleting file from Google Drive:', error.message);
  }
};

module.exports = { uploadFileToDrive, generateSignedUrl, deleteFileFromDrive };