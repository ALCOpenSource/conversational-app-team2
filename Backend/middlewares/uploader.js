const multer = require("multer");
const filename = (req, file, next) => {
  //file format
  let lastIndexOf = file.originalname.lastIndexOf(".");
  let ext = file.originalname.substring(lastIndexOf);
  next(null, `img.${Date.now()} ${ext}`);
};

const imagePath = (req, file, next) => {
  next(null, `${__dirname}/../uploads`);
};

const upload = multer({
  storage: multer.diskStorage({
    imagePath,
    filename,
  }),
});

module.exports = upload;
