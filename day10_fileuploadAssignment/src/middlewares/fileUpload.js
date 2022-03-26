const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../myuploads"));
  },
  filename: function (req, file, callback) {

    const uniquePrefix = Date.now();

    callback(null, uniquePrefix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {

  if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
    console.log(req.file);

    callback(null, true);
  } else {
    console.log("Helllo");
   
    callback(null, false);
  }
};

const uploads = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
});

module.exports = uploads;

