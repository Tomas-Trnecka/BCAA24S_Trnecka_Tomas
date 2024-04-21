const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const commentDao = require("../../dao/comment-dao.js");

const schema = {
  type: "object",
  properties: {
    rating: { type: "string" },
    text: { type: "string" },
    hwId: { type: "string", minLength: 32, maxLength: 32 },
    userId: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["rating", "text", "hwId", "userId"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let comment = req.body;

    const valid = ajv.validate(schema, comment);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    comment = commentDao.create(comment);
    res.json(comment);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
