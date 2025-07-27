const { getDB } = require('../config/db');

const getUserCollection = () => getDB().collection('users');

module.exports = {
  // 创建用户
  async createUser(user) {
    return await getUserCollection().insertOne(user);
  },
  // 查询用户
  async findUserByName(name) {
    return await getUserCollection().findOne({ name });
  },
  // 更新用户
  async updateUser(name, updates) {
    return await getUserCollection().updateOne({ name }, { $set: updates });
  },
  // 删除用户
  async deleteUser(name) {
    return await getUserCollection().deleteOne({ name });
  },
  // 查询所有用户
  async getAllUsers() {
    return await getUserCollection().find({}).toArray();
  }
};