const Ajv = require("ajv");
const ajv = new Ajv();

const hardwareDao = require("../../dao/hardware-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
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

    const hardware = hardwareDao.get(reqParams.id);
    if (!hardware) {
      res.status(404).json({
        code: "hardwareNotFound",
        message: `Hardware ${reqParams.id} not found`,
      });
      return;
    }

    res.json(hardware);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
