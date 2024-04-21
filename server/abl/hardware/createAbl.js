const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const hardwareDao = require("../../dao/hardware-dao.js");

const cpuSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3 },
    type: { type: "string", minLength: 3, maxLength: 3 },
    price: { type: "string" },
    ranking: { type: "string" },
    singleCore: { type: "string" },
    multiCore: { type: "string" },
    frequency: { type: "string" },
    cores: { type: "string" },
    cache: { type: "string" },
    basePower: { type: "string" },
    maxPower: { type: "string" },
    memoryType: { type: "string", minLength: 4 },
    comments: { type: "array" }
  },
  required: ["name", "type", "price", "ranking", "singleCore", "multiCore", "frequency", "cores", "cache", "basePower", "maxPower", "memoryType", "comments"],
  additionalProperties: false,
};

const gpuSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3 },
    type: { type: "string", minLength: 3, maxLength: 3 },
    price: { type: "string" },
    ranking: { type: "string" },
    vram: { type: "string" },
    memoryType: { type: "string" },
    frequency: { type: "string" },
    bus: { type: "string" },
    power: { type: "string" },
    comments: { type: "array" }
  },
  required: ["name", "type", "price", "ranking", "vram", "memoryType", "frequency", "bus", "power", "comments"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let hardware = req.body;
    let type = hardware.properties.type;
    let valid;

    if (type === "cpu") {
      valid = ajv.validate(cpuSchema, hardware);
    } else {
      valid = ajv.validate(gpuSchema, hardware);
    }

    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    hardware = hardwareDao.create(hardware);
    res.json(hardware);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
