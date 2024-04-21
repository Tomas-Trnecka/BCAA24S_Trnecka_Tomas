const Ajv = require("ajv");
const ajv = new Ajv();

const hardwareDao = require("../../dao/hardware-dao.js");

const cpuSchema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
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
  required: ["id", "name", "type", "price", "ranking", "singleCore", "multiCore", "frequency", "cores", "cache", "basePower", "maxPower", "memoryType", "comments"],
  additionalProperties: false,
};

const gpuSchema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
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
  required: ["id", "name", "type", "price", "ranking", "vram", "memoryType", "frequency", "bus", "power", "comments"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let dtoIn = req.body;
    let type = dtoIn.properties.type;
    let valid;

    if (type === "cpu") {
      valid = ajv.validate(cpuSchema, dtoIn);
    } else {
      valid = ajv.validate(gpuSchema, dtoIn);
    }

    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const hwExists = hardwareDao.get(dtoIn.id);
    if (!hwExists) {
      res.status(404).json({
        code: "hardwareNotFound",
        message: `Hardware ${dtoIn.userId} not found`,
      });
      return;
    }

    let hardware = hardwareDao.get(dtoIn.id);
    hardware = { ...(hardware || {}), ...dtoIn };

    res.json(hardware);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
