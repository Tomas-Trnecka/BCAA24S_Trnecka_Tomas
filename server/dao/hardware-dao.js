const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const userFolderPath = path.join(__dirname, "storage", "hardware");

// Method to read a hardware from a file
function get(id) {
  try {
    const filePath = path.join(userFolderPath, `${id}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadHardware", message: error.message };
  }
}

// Method to write a hardware to file
function create(hardware) {
  try {
    hardware.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(userFolderPath, `${hardware.id}.json`);
    const fileData = JSON.stringify(hardware);
    fs.writeFileSync(filePath, fileData, "utf8");
    return hardware;
  } catch (error) {
    throw { code: "failedToCreateHardware", message: error.message };
  }
}

// Method to update hardware
function update(hardware) {
  try {
    const current = get(hardware.id);
    if (!current) return null;
    const newHw = { ...current, ...hardware };
    const filePath = path.join(userFolderPath, `${hardware.id}.json`);
    const fileData = JSON.stringify(newHw);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newHw;
  } catch (error) {
    throw { code: "failedToUpdateHardware", message: error.message };
  }
}

// Method to remove a piece of hardware
function remove(hardware) {
  try {
    const filePath = path.join(userFolderPath, `${hardware}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveHardware", message: error.message };
  }
}

// Method to list all hardware
function list() {
  try {
    const files = fs.readdirSync(userFolderPath);
    const hwList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(userFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return hwList;
  } catch (error) {
    throw { code: "failedToListHardware", message: error.message };
  }
}

module.exports = {
  get,
  list,
  create,
  update,
  remove
};
