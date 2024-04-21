const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const eventDao = require("../../dao/mypc-dao.js");

const schema = {
  type: "object",
  properties: {
    userId: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["userId"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    const reqParams = req.query?.id ? req.query : req.body;

    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const myPCCfg = eventDao.get(reqParams.id);
    if (!myPCCfg) {
      res.status(404).json({
        code: "eventNotFound",
        message: `Event ${reqParams.id} not found`,
      });
      return;
    }
    res.json(myPCCfg);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
