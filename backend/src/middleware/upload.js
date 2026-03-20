const multer = require("multer");
const fs = require("fs");
const path = require("path");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("branch", file);

    const filePath = path.join("public",file.fieldname)

  console.log(filePath);

  fs.mkdir(filePath,{recursive:true},(error) => {
    console.log(error)
  })

    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    console.log("destination", file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
