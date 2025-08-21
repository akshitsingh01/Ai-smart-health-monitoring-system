from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://singhakshit78:PUy4HSHYNBF3P3rt@cluster0.0aqq6.mongodb.net/"
client = MongoClient(uri)

try:
    client.user.command('ping')
    print("you sucessfully connected to DB")
except Exception as e:
    print("something occured")
    print(e)

db = client.SmartHealth
collection_name = db["user"]

