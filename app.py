from flask import *
import nltk
from nltk.corpus import treebank
import pyrebase

app = Flask(__name__)

count = 0

config = {
    "apiKey": "AIzaSyBFWvJWUtv_AM8NhBXG231jxint9IbXKio",
    "authDomain": "makeripple.firebaseapp.com",
    "databaseURL": "https://makeripple.firebaseio.com",
    "storageBucket": "makeripple.appspot.com"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()


def database_set(root, child, data):
    results = db.child(root).child(child).set(data)
    print(results)


def database_get(root):
    users = db.child(root).get()
    print(users.val())


def database_update(root, child, data):
    db.child(root).child(child).update(data)


@app.route('/', methods=['POST', 'GET'])
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
