const userModel = require('../models/userModel');

module.exports = {
  createUser: async (req, res) => {
    try {
      const { name, learnAmount, winAmount } = req.body;
      const result = await userModel.createUser({ name, learnAmount, winAmount });
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await userModel.findUserByName(req.params.name);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { learnAmount, winAmount } = req.body;
      const result = await userModel.updateUser(req.params.name, { learnAmount, winAmount });
      if (result.matchedCount === 0) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const result = await userModel.deleteUser(req.params.name);
      if (result.deletedCount === 0) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};