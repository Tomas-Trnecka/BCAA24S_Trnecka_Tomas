const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/hardware/createAbl");
const DeleteAbl = require("../abl/hardware/deleteAbl");
const UpdateAbl = require("../abl/hardware/updateAbl");
const GetAbl = require("../abl/hardware/getAbl");
const ListAbl = require("../abl/hardware/listAbl");

router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);
router.get("/get", GetAbl);
router.get("/list", ListAbl);

module.exports = router;
