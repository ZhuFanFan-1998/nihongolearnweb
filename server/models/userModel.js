// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '名前を入力してください！'],
    unique: true,
    trim: true,
  },
  learnAmount: {
    type: Number,
    default: 0,
  },
  winAmount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// 操作方法
module.exports = {
  // 创建用户
  async createUser(user) {
    const newUser = new User(user);
    return await newUser.save();
  },
  // 查询用户
  async findUserByName(name) {
    return await User.findOne({ name });
  },
  // 更新用户
  async updateUser(name, updates) {
    return await User.updateOne({ name }, { $set: updates });
  },
  // 删除用户
  async deleteUser(name) {
    return await User.deleteOne({ name });
  },
  // 查询所有用户
  async getAllUsers() {
    return await User.find();
  },
  // 导出模型以供 RecordModel 引用
  User,
};