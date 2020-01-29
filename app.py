from flask import *
# import nltk
# from nltk.corpus import treebank
import pyrebase

app = Flask(__name__)

config = {
    "apiKey": "AIzaSyBFWvJWUtv_AM8NhBXG231jxint9IbXKio",
    "authDomain": "makeripple.firebaseapp.com",
    "databaseURL": "https://makeripple.firebaseio.com",
    "storageBucket": "makeripple.appspot.com"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()


def test_firebase():
    print('begin pyrebase')

    # Get a reference to the auth service
    auth = firebase.auth()

    # Log the user in
    #  auth.create_user_with_email_and_password(email, password)
    # user = auth.sign_in_with_email_and_password("oosacker@gmail.com", "123456")

    # Get a reference to the database service
    # db = firebase.database()

    # data to save
    data = {
        "name": "natsuki rulz",
        "email": "oosacker@gmakil.com",
    }

    # Pass the user's idToken to the push method
    db = firebase.database()
    # db.child("users").child("nat")
    # results = db.child("users").push(data)
    results = db.child("users").child("natsuki").set(data)

    print(results)


# test_firebase()


def database_set(root, child, data):
    results = db.child(root).child(child).set(data)
    print(results)


def database_get(root):
    users = db.child(root).get()
    print(users.val())


database_set("mydata", "me", {"name": "me"})
database_get("mydata")


@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        submit = request.form['text-input']
        return render_template('index.html', message=submit)
    else:
        return render_template('index.html')


if __name__ == '__main__':
    app.run()
