const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const userFolderPath = path.join(__dirname, "storage", "mypc");

// Method to read a "My PC" configuration from a file
function get(userId) {
  try {
    const filePath = path.join(userFolderPath, `${userId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadMyPCConfig", message: error.message };
  }
}

// Method to write a new "My PC" config to a file
function create(mypc) {
  try {
    mypc.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(userFolderPath, `${mypc.id}.json`);
    const fileData = JSON.stringify(mypc);
    fs.writeFileSync(filePath, fileData, "utf8");
    return mypc;
  } catch (error) {
    throw { code: "failedToCreateMyPCConfig", message: error.message };
  }
}

// Method to update a "My PC" config file
function update(mypc) {
  try {
    const current = get(mypc.id);
    if (!current) return null;
    const newCfg = { ...current, ...mypc };
    const filePath = path.join(userFolderPath, `${mypc.id}.json`);
    const fileData = JSON.stringify(newCfg);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newCfg;
  } catch (error) {
    throw { code: "failedToUpdateMyPCConfig", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update
};
