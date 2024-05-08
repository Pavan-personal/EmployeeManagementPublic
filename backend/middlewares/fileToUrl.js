const { uploadFile } = require("../utils/cloudinaryTools");

const fileToUrl = (req, res, next) => {
  try {
    if (req.files) {
      const attachment = req.files.file;
      const supported = ["jpeg", "png", "jpg"];
      if (supported.includes(attachment.mimetype.split("/")[1].toLowerCase())) {
        uploadFile(attachment, "Temporary")
          .then((success) => {
            req.attachment = success.url;
            next();
          })
          .catch((err) => {
            res.json({ success: false, message: "something went wrong!" });
            return;
          });
      } else {
        res.json({ success: false, message: "file type not supported!" });
        return;
      }
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "something went wrong!" });
  }
};

module.exports = {
  fileToUrl,
};
