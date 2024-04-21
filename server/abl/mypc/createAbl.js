const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const myPCDao = require("../../dao/mypc-dao.js");

const schema = {
  type: "object",
  properties: {
    userId: { type: "string", minLength: 32, maxLength: 32 },
    cpu: { type: "string", minLength: 3 },
    gpu: { type: "string", minLength: 3 },
    ramType: { type: "string", minLength: 3 },
    ram: { type: "string", minLength: 3 },
  },
  required: ["userId", "cpu", "gpu", "ramType", "ram"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let myPCCfg = req.body;

    const valid = ajv.validate(schema, myPCCfg);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    myPCCfg = myPCDao.create(myPCCfg);
    res.json(myPCCfg);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
