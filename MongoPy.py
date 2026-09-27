# pip install pymongo

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