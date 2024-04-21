const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const myPCDao = require("../../dao/mypc-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    userId: { type: "string", minLength: 32, maxLength: 32 },
    cpu: { type: "string", minLength: 3 },
    gpu: { type: "string", minLength: 3 },
    ramType: { type: "string", minLength: 3 },
    ram: { type: "string", minLength: 3 },
  },
  required: ["id", "userId", "cpu", "gpu", "ramType", "ram"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
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

    const updatedCfg = myPCDao.update(myPCCfg);
    if (!updatedCfg) {
      res.status(404).json({
        code: "myPCNotFound",
        message: `My PC ${myPCCfg.id} not found`,
      });
      return;
    }

    res.json(updatedCfg);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
