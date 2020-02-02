import pyrebase

from datetime import date
today = date.today()

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


count = len(db.child("users").child("stream").get().val())

def database_set(root, child, data):
    results = db.child(root).child(child).set(data)
    print(results)


def database_get(root):
    users = db.child(root).get()
    print(users.val())


def database_update(root, child, data):
    db.child(root).child(child).update(data)

currentDay = today.strftime("%B %d, %Y")

def database_add(rippleID):

    data ={
        "date": currentDay,
        "type": "action",
        "answer": {"reach": "self",
                   "shared": "yes",
                   "perspective": "changed",
                   "personalConnection": "yes",
                   },
        "rating": {"user":"userRate",
                   "organizer": "organizerRate",
                   "nltk":"nltkRate",},
    }

    db.child("users").child("stream").child(rippleID).update(data)

@app.route('/', methods=['POST', 'GET'])
def index():
    return render_template('index.html')


@app.route('/check_in', methods=['POST', 'GET'])
def check_in():
    global count
    if request.method == 'POST':
        submit = request.form['text-input']
        rippleNum = "ripple" + str(count)
        database_add(rippleNum)
        count += 1
        print(rippleNum)
        print(len(db.child("users").child("stream").get().val()))
        return render_template('form.html', message=submit)
    else:
        return render_template('form.html')

@app.route('/user_dashboard', methods=['POST', 'GET'])
def user_dash():
    return render_template('user_dashboard.html')

if __name__ == '__main__':
    app.run()