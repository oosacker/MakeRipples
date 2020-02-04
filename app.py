from flask import *
import pyrebase
import time
from datetime import datetime

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


@app.route('/my_test', methods=['POST', 'GET'])
def my_test():
    if request.method == 'POST':
        if request.is_json:
            data_receive = json.loads(request.get_data())
            print('Received JSON data_receive from web app')
            print(data_receive)
            return 'ok'
        else:
            print(request.form['myData'])
            print('Did not receive JSON')
            return 'fail'


@app.route('/form', methods=['POST', 'GET'])
def form():
    if request.method == 'POST':

        return render_template('form.html',
                               text=request.form['text_input'],
                               option_1=request.form['radio_set1'],
                               option_2=request.form['radio_set2'])

    else:
        return render_template('form.html')


@app.route('/form2', methods=['POST', 'GET'])
def form2():
    # if request.method == 'POST':
    #
    #     return render_template('form2.html',
    #                            text=request.form['text_input'],
    #                            option_1=request.form['radio_set1'],
    #                            option_2=request.form['radio_set2'])
    #
    # else:
    return render_template('form2.html')


@app.route('/add_ripple', methods=['POST', 'GET'])
def add_ripple():
    if request.method == 'POST':
        if request.is_json:
            data_receive = json.loads(request.get_data())
            print('Received JSON data_receive from user object')
            print(data_receive)
            now = datetime.now().strftime("%d%m%Y%H%M%S")
            ripple_id = "Ripple" + now
            answer = {}
            if '_national' in data_receive:
                answer.update({"national": data_receive["_national"]})
            if '_community' in data_receive:
                answer.update({"community": data_receive["_community"]})
            if '_applied' in data_receive:
                answer.update({"applied": data_receive["_applied"]})
            if '_perspective' in data_receive:
                answer.update({"perspective": data_receive["_perspective"]})
            if '_personal' in data_receive:
                answer.update({"personal": data_receive["_personal"]})
            if '_other_desc' in data_receive:
                other_desc = data_receive["_other_desc"]

            data = {
                "date": data_receive["_date"],
                "action": data_receive["_action"],
                "learning": data_receive["_learning"],
                "resonate": data_receive["_resonate"],
                "message": data_receive["_message"],
                "other": data_receive["_other"],
                "other_description": other_desc,
                "answer": answer,
                "rating": {
                    "userRating": data_receive["_userRating"],
                    "orgRating": data_receive["_orgRating"],
                    "nlpRating": data_receive["_nlpRating"],
                }
            }
            print(ripple_id, data)
            db.child("users").child("stream").child(ripple_id).set(data)
            # print('sent to database(hopefully)')

            print(db.child("users").child("stream").child(ripple_id).get().val())

            return 'success'
        else:
            print(request.form['myData'])
            print('Did not receive JSON')
            return 'fail'


def get_all_ripples():
    stream_keys = db.child("users").child("stream").shallow().get()
    for key in stream_keys.val():
        if key.__contains__("Ripple"):
            ripple = db.child("users").child("stream").child(key).get()
            if 'date' in ripple.val():
                print(ripple.val())
            else:
                print("bad ripple to be deleted")

get_all_ripples()

if __name__ == '__main__':
    app.run()
