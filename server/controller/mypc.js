const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/mypc/getAbl");
const CreateAbl = require("../abl/mypc/createAbl");
const UpdateAbl = require("../abl/mypc/updateAbl");

router.get("/get", GetAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);

module.exports = router;
