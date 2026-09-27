// 确保在项目目录中安装 npm i mongoose
const mongoose = require('mongoose');

// 连接本地数据库
mongoose.connect('mongodb://localhost:27017/testdb')
  .then(()=>console.log('连接成功'))
  .catch(err=>console.error(err));

// 定义Schema（数据结构约束）
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  createTime: {type: Date, default: Date.now}
});

// 定义模型，对应users集合
const User = mongoose.model('User', userSchema);

// 新增数据
async function addUser(){
  const user = new User({name:"赵六",age:24});
  await user.save();
}