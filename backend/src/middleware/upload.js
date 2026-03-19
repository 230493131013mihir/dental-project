const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("dfvdf", file);
    
    cb(null, "/tmp/my-uploads");
  },
  filename: function (req, file, cb) {
    console.log("destination",file)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

module.exports = upload
