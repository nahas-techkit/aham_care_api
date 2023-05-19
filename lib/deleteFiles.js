const fs = require("fs");

const deleteFile = (path) => {
 try {
  fs.unlink(path, (err) => {
    if (err) throw err;
    return true ;
  });
 } catch (error) {
  console.log(error);
  return false
 }
};

module.exports = deleteFile;


