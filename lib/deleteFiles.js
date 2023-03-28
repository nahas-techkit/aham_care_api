const fs = require("fs");

const deleteFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
    return console.log("File deleted!");;
  });
};

module.exports = deleteFile;
