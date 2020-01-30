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


@app.route('/check_in', methods=['POST', 'GET'])
def check_in():
    global count
    if request.method == 'POST':
        submit = request.form['text-input']
        database_update("mydata", "texts", {count: submit})
        count += 1
        return render_template('form.html', message=submit)
    else:
        return render_template('form.html')


@app.route('/user_dashboard', methods=['POST', 'GET'])
def user_dash():
    return render_template('user_dashboard.html')


@app.route('/form', methods=['POST', 'GET'])
def form():
    return render_template('form.html')

if __name__ == '__main__':
    app.run()
