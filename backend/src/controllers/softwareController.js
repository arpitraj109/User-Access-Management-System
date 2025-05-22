const { AppDataSource } = require("../config/datasource");
const softwareRepo = AppDataSource.getRepository("Software");

const createSoftware = async (req, res) => {
  try {
    const { name, description, accessLevels } = req.body;
    const software = softwareRepo.create({ name, description, accessLevels });
    await softwareRepo.save(software);
    res.status(201).json({ message: "Software created", software });
  } catch (err) {
    res.status(500).json({ message: "Failed to create software", error: err.message });
  }
};
const getAllSoftware = async (req, res) => {
  try {
    const software = await softwareRepo.find();
    res.json(software);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch software", error: err.message });
  }
};


module.exports = { createSoftware ,getAllSoftware};
