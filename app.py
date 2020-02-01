from flask import *
import nltk
from nltk.corpus import treebank
import pyrebase

app = Flask(__name__)

count = 0
message = 'Begin!!!!'

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


# @app.route('/check_in', methods=['POST', 'GET'])
# def check_in():
#     # global count
#     global message
#
#     print(message)
#
#     if request.method == 'POST':
#         # submit = request.form['text-input']
#         # database_update("mydata", "texts", {count: submit})
#         # count += 1
#         message = 'Got message!!!'
#         return render_template('form.html', message=message)
#     else:
#         message = 'None!!!'
#         return render_template('form.html', message=message)


@app.route('/user_dashboard', methods=['POST', 'GET'])
def user_dash():
    return render_template('user_dashboard.html')


@app.route('/form', methods=['POST', 'GET'])
def form():
    global message

    if request.method == 'POST':
        message = 'Got message!!!'
        print(message)
        return render_template('form.html', message=message)

    else:
        message = 'None!!!'
        print(message)
        return render_template('form.html', message=message)


if __name__ == '__main__':
    app.run()
