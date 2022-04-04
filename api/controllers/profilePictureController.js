const User = require("../models/User");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary to our account information
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Configure storage information of the image we are saving
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "messenger",
  },
});
const upload = multer({ storage: storage });

// Update users profilePicture by providing file in form data fields.
exports.update_profilePicture_put = [
  // Pull the token received and add it to the request.
  (req, res, next) => {
    // Pull the bearerHeader
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.status(403).json({
        message: "Protected route - not authorized",
      });
    }
  },
  // Intercepts image and adds it to the request parameter.
  upload.single("image"),
  (req, res, next) => {
    // Authenticate user with provided
    jwt.verify(req.token, process.env.SECRET_STRING, (err, authData) => {
      if (err) next(err);

      User.findByIdAndUpdate(authData._id, {
        $set: { profilePicture: req.file.path },
      }).exec((err) => {
        if (err) next(err);

        res.status(201).json({ msg: "Profile picture updates" });
      });
    });
  },
];
