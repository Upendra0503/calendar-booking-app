const userService = require("../service/user.service");

async function createUser(req, res) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getUser(req, res) {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
}

module.exports = { createUser, getUser };
