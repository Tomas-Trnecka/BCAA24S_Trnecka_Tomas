const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const userFolderPath = path.join(__dirname, "storage", "comments");

// Method to read a comment from a file
function get(id) {
  try {
    const filePath = path.join(userFolderPath, `${id}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadComment", message: error.message };
  }
}

// Method to create a new comment file
function create(comment) {
  try {
    comment.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(userFolderPath, `${comment.id}.json`);
    const fileData = JSON.stringify(comment);
    fs.writeFileSync(filePath, fileData, "utf8");
    return comment;
  } catch (error) {
    throw { code: "failedToCreateComment", message: error.message };
  }
}

module.exports = {
  get,
  create
};
