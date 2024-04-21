const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/user/getAbl");
const CreateAbl = require("../abl/user/createAbl");
const UpdateAbl = require("../abl/user/updateAbl");

router.get("/get", GetAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);

module.exports = router;
