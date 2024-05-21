const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const crypto = require("crypto");

require("dotenv").config();

module.exports = {
  storage: multerS3({
    s3: new AWS.S3({
      // adicionar credencias validas (estou usando depreciadas)
    }),
    bucket: process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.filename = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.filename);
      });
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
}
