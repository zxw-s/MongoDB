# 一、MongoDB 是什么

MongoDB 是**文档型 NoSQL 数据库**，用 C++ 编写，数据以**文档（Document）**存储，结构类似 JSON（内部是 BSON：二进制JSON）。 schema 灵活，适合快速迭代、存储嵌套数据、大数据场景，和 MySQL 这类关系型数据库区别很大。

## 核心概念（对比 MySQL）：

| MySQL         | MongoDB        | 说明                               |
| ------------- | -------------- | -------------------------------- |
| Database（数据库） | Database       | 数据库                              |
| Table（表）      | Collection（集合） | 文档的容器，是一组文档的集合，无固定表结构，不需要预先定义表结构 |
| Row（行）        | Document（文档）   | 一条数据，BSON结构，自带主键 _id             |
| Column（字段）    | Field（域/字段）    | 文档里的键值对                          |
| Primary Key   | `_id`          | 文档默认主键，自动生成                      |

## ✅ 特点

1.**无固定Schema**：同一个集合内文档结构可以不一样，灵活。

2.BSON支持多种类型：JSON 二进制存储，支持字符串、数字、日期、数组、嵌套对象、内嵌文档。

3.原生支持数组、嵌套对象，不用联表查询

4.支持索引、聚合查询、事务（新版）、分片集群。

5.适合：日志存储、用户画像、内容管理、物联网数据；**不适合强事务金融核心系统**。

6.无强制表结构，字段可随意增减

7.自带 ObjectId 作为唯一主键，自动生成

> 默认端口：**27017**

## ✅ MongoDB官网文档链接（中文 + 速查表）

mongosh 是新版shell（取代旧的mongo），下面都是官方原版文档 

1. 📄 mongosh 官方速查表（Cheat Sheet，强烈推荐，就是官网整理的常用指令）

https://www.mongodb.com/docs/mongodb-shell/reference/cheatsheet/

2. 📘 中文：mongosh 执行命令入门

https://www.mongodb.com/zh-cn/docs/mongodb-shell/run-commands/

3. 📘 中文：mongosh CRUD增删改查

https://www.mongodb.com/zh-cn/docs/mongodb-shell/crud/

4. 📚 所有数据库命令总目录

https://www.mongodb.com/docs/manual/reference/command/

5. 📚 mongosh所有方法参考手册

https://www.mongodb.com/docs/mongodb-shell/reference/methods/

## 官网文档小提示

- 文档版本可以在页面左上角切换（6.0 /7.0 /8.0），尽量和你本地MongoDB版本保持一致

- 中文文档翻译偶尔滞后，复杂查询建议切英文原版

- 速查表页面可以直接浏览器保存PDF，适合随时翻看

# 二、安装（Docker最简学习方式）

3种安装方式（新手优先选Docker/Atlas）

## Docker 一键部署（强烈推荐，环境干净）

先安装 Docker Desktop，终端执行：

```bash
# 拉取最新镜像
docker pull mongo

# 启动容器 mongodb，映射端口27017，持久化数据
docker run -d mongo --name mongo -p 27017:27017 mongo:7 -v mongo-data:/data/db

# 进入mongo shell交互终端
docker exec -it mongo mongosh
```

> mongosh 是新版命令行客户端，旧版叫 mongo。

验证：进入shell后输入

```js
show dbs
```

能列出数据库即成功。

## 本地原生安装

- Windows：官网下载 MSI 安装包，创建  C:\data\db  数据目录，安装并配置环境变量，安装完成后启动服务。

- macOS：Homebrew 安装

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

- Linux：apt/yum 安装官方源，systemctl 管理服务

## 安装 mongosh

[MongoDB Shell (mongosh)](https://www.runoob.com/mongodb/mongodb-shell.html)

**MongoDB Shell (mongosh)** 是 MongoDB 提供的交互式命令行工具，用于与 MongoDB 数据库交互。MongoDB Shell使用它来测试查询并交互 MongoDB 数据库中的数据。它基于 JavaScript 和 Node.js，支持执行查询、管理数据库以及运行脚本。

MongoDB 6.0及以上版本，服务器安装包不再自带mongosh命令行客户端，需要单独下载安装，同时配置环境变量。

### 在 macOS 上

通过 Homebrew 安装：

```bash
brew tap mongodb/brew
brew install mongodb-community-shell
```

或者从 [MongoDB 官网](https://www.runoob.com/mongodb/mongodb-shell.html) 下载并手动安装，将 *mongosh* 二进制文件复制到系统路径中。

### 在 Linux 上

使用包管理器安装（以 Ubuntu 为例）：

```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install mongodb-shell
```

或者从 [MongoDB 官网](https://www.runoob.com/mongodb/mongodb-shell.html) 下载并手动安装。

### 在 Windows 上

从 [MongoDB 官网](https://www.runoob.com/mongodb/mongodb-shell.html) 下载适用于 Windows 的安装程序，运行并按照提示完成安装，同时配置环境变量。

### 使用 mongosh

**启动 MongoDB Shell**

在命令行中输入以下命令启动：

```bash
mongosh
```

默认连接到本地 MongoDB 实例（端口 27017）。若需连接远程服务器：

```bash
mongosh --host <hostname>:<port>
```

## MongoDB Atlas 云托管（免安装，免费学习）

官网注册账号，创建免费M0集群，设置账号密码、IP白名单，直接拿到连接字符串，浏览器+客户端就能用，适合新手快速上手。

# 三、可视化工具（新手必备，不用敲命令）

1. MongoDB Compass：官方免费GUI，可视化浏览数据、执行查询、查看索引

2. Navicat、DBeaver：通用数据库工具，支持MongoDB连接

3. NoSQL Booster：轻量好用的MongoDB客户端

# 四、连接 & 基础信息

```js
// 连接到本地 MongoDB 实例（默认端口 27017）
mongosh "mongodb://localhost:27017"

// 连接到本地 MongoDB 实例，指定数据库（默认端口 27017）：
mongosh "mongodb://localhost/mydatabase"

// 用户认证登录。启用认证后，连接时需指定用户名、密码及认证数据库：
mongosh --host 127.0.0.1 -u admin -p --authenticationDatabase admin
```

> MongoDB的每个数据库都可以管理账号（除了local数据库），每个数据库之间的账号都是独立的，使用哪个数据库的账号取决于登入时--authenticationDatabase后指定的数据库（不指定时默认使用admin，即默认为--authenticationDatabase admin）。

# 五、数据库操作

> 语法是JS风格；数据库/集合不存在时，插入数据会自动创建。

进入  `mongosh`  后执行：

## 1. 数据库操作

```js
show dbs // 查看所有数据库
use testdb // 切换/创建数据库 testdb（不存在自动新建）
db // 查看当前所在库
db.dropDatabase() // 删除当前数据库
```

## 2.用户管理

```js
use admin
// 创建root账号（admin库下执行）
db.createUser({
  user: "admin",
  pwd: passwordPrompt(),
  roles:["root"]
})
db.auth("admin","密码") // 开启认证后登录验证

// 创建普通用户
use mydb
db.createUser({
 user: "appuser",
 pwd: "appPassword",
 roles: [{ role: "dbOwner", db: "mydb" }]
})

// 查看当前数据库下的用户
show users
// 查看现有所有用户（要切换到admin数据中）
db.system.users.find()
// 删除用户
db.dropUser("appuser")
```

> root是MongoDB内置最高权限角色，需要手动在admin库中创建用户绑定该角色，拥有root角色的账号俗称root超级管理员账号。
> 
> 常用角色包括：
> 
> - **read**：只读
> 
> - **readWrite**：读写
> 
> - **dbOwner**：当前库所有权限
> 
> - **userAdminAnyDatabase**：管理所有库用户。

## 3.执行原始数据库命令

```js
db.runCommand(command, [options])
// 示例:
db.runCommand({hello:1})
```

> 提供运行指定[数据库命令](https://mongodb.ac.cn/docs/manual/reference/command/#std-label-database-commands)的辅助工具。这是发出数据库命令的首选方法，因为它为shell和驱动程序之间提供了一致的用户界面。

# 六、集合操作

```js
show collections // 查看当前库所有集合
db.createCollection("user") // 显式创建集合（一般不需要）
db.user.drop() // 删除集合 user
```

# 七、基础CRUD命令

## 1. 插入文档 insert

```js
// 插入单条
db.user.insertOne({
name:"zhangsan",
age:20,
hobby:["basketball","coding"]
})
// 插入多条
db.user.insertMany([
{name:"lisi",age:22},
{name:"wangwu",age:18}
])
```

自动生成 `_id` 唯一主键。

## 2. 查询 find

```js
// 查询集合全部，{}代表无条件，默认不格式化
db.user.find()
// 格式化输出
db.user.find().pretty()
// 条件查询：age=20
db.user.find({age:20})
// 大于 $gt，小于 $lt
db.user.find({age:{$gt:20}}) // age >20
db.user.find({age:{$lt:20}}) // age <20
// 多条件 and：name=lisi 并且 age=22
db.user.find({name:"lisi",age:22})
// or 查询
db.user.find({$or:[{age:19},{age:20}]})
// 投影：只返回name、age字段，_id:0表示不返回_id
db.user.find({age:{$gt:18}},{name:1,age:1,_id:0})
// 分页：skip跳过，limit取几条
db.user.find().skip(0).limit(2)
// 排序 sort:1升序，-1降序
db.user.find().sort({age:-1})
// 去重
db.user.distinct("name")
// 查询第一条匹配数据
db.user.findOne({name:"张三"})
```

> 常用查询操作符（官网MQL）:
> 
>  `$gt` `$gte` `$lt` `$lte` `$eq` `$ne` `$in` `$nin` `$and` `$or` `$exists` `$regex`

## 3. 更新 update

```js
// 更新匹配的第一条，$set 修改指定字段
db.user.updateOne(
{name:"zhangsan"},
{$set:{age:21}}
)
// 更新多条匹配文档
db.user.updateMany(
{age:{$gt:18}},
{$set:{status:1}}
)
```

> ⚠️ 不加`$set`会直接**覆盖整个文档**，这是新手高频踩坑点！

## 4. 删除 delete

```js
// 删除匹配的第一条
db.user.deleteOne({name:"wangwu"})
// 删除所有匹配
db.user.deleteMany({age:{$lt:20}})
// 删除集合全部文档（慎用）
db.user.deleteMany({})
```

# 八、索引

```js
// 创建单字段索引
db.user.createIndex({name:1})
// 查看索引
db.user.getIndexes()
// 删除索引
db.user.dropIndex({name:1})
```

> `_id`字段默认自带索引。

# 九、聚合管道 Aggregate（重点）

类似MySQL group by / join，`aggregate` 接收数组，管道依次处理数据。

```js
db.user.aggregate([
{$match:{age:{$gt:18}}}, // 第一步：过滤
{$group:{_id:"$status", total:{$sum:1}}}, // 分组统计
{$sort:{total:-1}}
])
```

- `$match`：过滤

- `$group`：分组聚合

- `$sort`：排序

- `$project`：投影（字段筛选）

- `$limit` / `$skip`：分页

# 十、MongoDB 学习计划（3天）

`基础CRUD → 索引优化 → 聚合管道（Aggregation）→ 事务 → 副本集 → 分片集群 → 数据建模最佳实践`

## Day1

1. Docker启动，mongosh连接

2. 掌握数据库、集合操作

3. CRUD基础命令，重点理解`$gt/$lt/$or/$set`

✅ 习题：

1. 新建集合 `product`，插入3条商品文档（名称、价格、分类）

2. 查询价格大于100的商品，只显示名称和价格

3. 修改其中一条商品价格

## Day2

- 索引概念，创建索引，理解索引作用

- 聚合管道 aggregate，分组统计

- 内嵌文档、数组字段查询
  ✅ 习题：统计每个分类下商品数量

## Day3

- 数据模型设计思路：内嵌文档 vs 引用文档

- 副本集（高可用）基础概念

- 驱动示例（Python/Java连接MongoDB）

# 十一、常见坑

1. MongoDB 默认端口： 27017 

2.  _id  是自动生成的唯一主键，不要手动随意修改

3. 集合名、字段名不要用特殊字符，区分大小写

4. 生产环境必须开启账号密码认证，禁止裸奔外网访问

5. 复杂多表关联场景慎用MongoDB，关系型数据库更合适

6.更新不加`$set`会覆盖整条文档！

7.查询大数据量时**没有索引会全表扫描**，性能差

8.MongoDB事务只适合副本集环境，单节点不支持事务

9.文档大小上限16MB，不适合超大单条数据

# 十二、代码层面简单接入

## Node.js示例

使用 `Mongoose ODM` 库

确保在项目目录中安装了 *mongoose* 模块。运行以下命令：

```bash
npm install mongoose
```

此命令会将 *mongoose* 添加到项目的依赖项中。

简化操作：

```js
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
```

## Python示例：

pip install pymongo

```python
from pymongo import MongoClient
client = MongoClient("mongodb://127.0.0.1:27017")
db = client["testdb"]
col = db["user"]
# 插入
col.insert_one({"name":"test","age":25})
# 查询
res = col.find({"age":{"$gt":20}})
for row in res:
    print(row)
```

# 十三、MongoDB 常用命令速查表

| 命令                                   | 作用      |
| ------------------------------------ | ------- |
| `show dbs`                           | 查看所有数据库 |
| `use dbname`                         | 切换数据库   |
| `db`                                 | 当前数据库   |
| `show collections`                   | 查看集合    |
| db.hello()                           | 查看实例信息  |
| db.version()                         | 版本号     |
| `db.coll.insertOne({...})`           | 插入单条文档  |
| `db.coll.insertMany([...])`          | 插入多条    |
| `db.coll.find()`                     | 查询全部    |
| `db.coll.find().pretty()`            | 格式化输出   |
| `db.coll.find({age:{$gt:20}})`       | 条件查询 >  |
| `db.coll.updateOne(query,{$set:{}})` | 更新单条    |
| `db.coll.deleteOne(query)`           | 删除单条    |
| `db.coll.createIndex({name:1})`      | 创建索引    |
| `db.coll.aggregate([...])`           | 聚合管道    |
| `db.coll.drop()`                     | 删除集合    |
| `db.dropDatabase()`                  | 删除数据库   |

# 十四、Redis vs MongoDB 简单对比

|      | Redis       | MongoDB      |
| ---- | ----------- | ------------ |
| 类型   | 内存KV，多种数据结构 | 文档型数据库，BSON  |
| 存储   | 内存为主，持久化兜底  | 磁盘为主         |
| 使用场景 | 缓存、分布式锁、排行榜 | 业务数据存储，日志、内容 |
| 查询能力 | 简单命令        | 丰富查询、聚合、索引   |

# 十五、MongoDB 脚本项目

> 仓库存放 MongoDB 的集合创建、索引、文档初始化、聚合脚本、JS脚本。
> **不提交数据库数据快照、备份文件、真实业务数据与账号密码。**

## 📖 项目简介

本仓库维护 MongoDB 的数据库变更脚本，使用 `mongosh` JS脚本管理集合、索引、验证规则、基础数据。
脚本可在 mongosh、MongoDB Compass、DBeaver 执行。

## 🧰 环境依赖

- MongoDB：5.0+ / 6.0 / 7.0
- 客户端：mongosh、MongoDB Compass、DBeaver

## 📂 目录结构

```
.
├── collections/ -- 集合创建、集合校验规则
├── indexes/ -- 索引创建脚本
├── init_data/ -- 基础字典、测试数据
├── migrations/ -- 版本迁移脚本（结构/索引变更）
├── .gitignore
└── README.md
```

## 🚀 脚本执行顺序

1. 连接目标 MongoDB 实例，切换至业务数据库
2. 按版本号升序执行 `migrations` 目录下所有 `V*.js` 增量迁移脚本（一次性执行）
3. 全部V脚本执行完成后，执行 `migrations` 目录下 `R*.js` 可重复脚本（重建索引、基础字典数据）
4. 【测试环境可选】执行 `init_data` 测试数据脚本，生产环境禁止执行

> 规则：
> 
> - V开头脚本：提交后不可修改，出错新建更高版本脚本修复
> - R开头脚本：修改后会重新执行，创建索引前先判断索引是否存在，保证重复执行安全

## 📌 迁移脚本命名规范（Flyway风格，和前面所有数据库保持一致）

### 命名格式

V<主版本>.<次版本>.<修订号>__<描述文本>.js

- `V`：Version，一次性执行的版本迁移脚本，只会执行一次
- 版本号：语义化版本 `x.y.z`
- `__`：两个下划线，分隔版本号与描述
- 描述：英文小写，单词下划线连接，禁止中文、空格

示例：

V1.0.0__init_user_collection.js
V1.0.1__add_user_email_index.js
V1.0.2__create_order_collection.js
V1.1.0__add_product_validation.js

### R可重复脚本

R__<描述>.js

每次修改脚本，都会重新执行。适合索引、基础字典数据。
示例：`R__rebuild_base_indexes.js`

### 脚本头部注释模板

```javascript
/*
 * Version: V1.0.0
 * Date: 2026-09-26
 * Description: 创建用户集合，添加校验规则
 */
```

## 📌 开发规范

1. 仓库只保留 mongosh JS脚本，**禁止提交 bson 数据备份、mongodump 导出文件**
2. 脚本内**禁止写真实账号、密码、内网IP、敏感业务数据**
3. 脚本编码推荐 UTF-8
4. 迁移脚本放入 `migrations` 目录，变更新增脚本，不修改已经提交的历史脚本
5. 创建索引前建议判断索引是否存在，避免重复创建报错；大批量索引创建避开业务高峰

## ❗ 重要提醒

- 上线执行脚本前，务必在测试实例完整验证
- 生产环境执行前，做好备份（mongodump）
- MongoDB 无传统DDL表结构，变更重点是集合、索引、文档校验规则
- 生产环境慎用大量数据更新脚本，防止锁库、性能抖动

## ✅ GitHub提交自查清单

提交代码前逐项检查：

1. 没有提交数据库备份、导出文件
2. 脚本内不存在真实密码、密钥、内网IP、敏感业务数据
3. 迁移脚本命名规范，V脚本提交后没有修改历史脚本
4. 文件编码统一 UTF-8
5. 本地脚本执行验证通过
6. .gitignore 配置生效，检查待提交文件列表

## 📜 License

MIT

## ✅ R脚本示例（MongoDB migrations/R__rebuild_base_indexes.js）

```
/*
 * Repeatable Script: R__rebuild_base_indexes.js
 * Description: 用户集合基础索引
 */
const coll = db.user;
// 判断索引是否存在，不存在则创建
if (!coll.indexExists("email_1")) {
    coll.createIndex({ email: 1 }, { unique: true });
}
if (!coll.indexExists("user_name_1")) {
    coll.createIndex({ user_name: 1 });
}
```
