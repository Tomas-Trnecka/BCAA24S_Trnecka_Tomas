const hardwareDao = require("../../dao/hardware-dao.js");

async function GetAbl(req, res) {
  try {
    const hardwareList = hardwareDao.list();
    res.json(hardwareList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
