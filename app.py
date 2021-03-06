from flask import *
import pyrebase
import nlptest
import time
from datetime import datetime

app = Flask(__name__)

count = 0
message = 'Begin!!!!'

config = {
    "apiKey": "",
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


def get_nlp_rating(message):
    nlprating = nlptest.returnnlprating(message)
    print(message)
    print(nlprating)
    return nlprating


def flag_for_moderation(user_rating, nlp_rating, other):
    # print("started flag for mod")
    if other:
        # print("is other")
        return 1
    if user_rating > 6 or user_rating < 2:
        return 1
    if nlp_rating > 0 and abs(nlp_rating - user_rating) > 3:
        return 1
    return 0


@app.route('/', methods=['POST', 'GET'])
def index():
    return render_template('index.html')


# # This is for the javascript app to fetch the high score.
# @app.route("/fetch_data", methods=['GET'])
# def fetch_data():
#     if request.method == 'GET':
#         data = {'data': '1234567890'}
#         return jsonify(data)  # serialize and use JSON headers
#     else:
#         print('Invalid request')


@app.route('/user_dashboard', methods=['POST', 'GET'])
def user_dash():
    ripples = get_all_ripples()
    print(ripples)
    return render_template('user_dashboard.html', ripples=ripples)


@app.route('/organiser_dashboard', methods=['POST', 'GET'])
def organiser_dash():
    ripples = get_all_ripples()
    print(ripples)
    return render_template('organiser_dashboard.html', ripples=ripples)


@app.route('/ripple_review', methods=['POST', 'GET'])
def ripple_review():
    ripples = get_all_ripples()
    print(ripples)
    return render_template('ripple_review.html', ripples=ripples)


@app.route('/add_ripple', methods=['POST', 'GET'])
def add_ripple():
    if request.method == 'POST':
        if request.is_json:
            data_receive = json.loads(request.get_data())
            print('Received JSON data_receive from user object')
            print(data_receive)
            now = datetime.now().strftime("%d%m%Y%H%M%S")
            if '_id' in data_receive:
                ripple_id = data_receive["_id"]
            else:
                ripple_id = "Ripple" + now
            if data_receive['_source'] == "user":
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

                nlp = get_nlp_rating(data_receive["_message"])
                if flag_for_moderation(data_receive["_userRating"], nlp, data_receive["_other"]) == 0:
                    flag = 'no'
                else:
                    flag = 'yes'

                data = {
                    "source": data_receive["_source"],
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
                        "nlpRating": nlp,
                    },
                    "moderate": flag,
                }
            elif data_receive["_source"] == "organiser":
                nlp = get_nlp_rating(data_receive["_message"])
                data = {
                    "source": data_receive["_source"],
                    "date": data_receive["_date"],
                    "message": data_receive["_message"],
                    "rating": {
                        "userRating": 0,
                        "orgRating": data_receive["_orgRating"],
                        "nlpRating": get_nlp_rating(data_receive["_message"]),
                    },
                }

            # print(ripple_id, data)
            db.child("users").child("stream").child(ripple_id).set(data)
            # print('sent to database(hopefully)')

            # print(db.child("users").child("stream").child(ripple_id).get().val())

            # print('rendering index')

            # return render_template('result.html')
            return 'success'

        else:
            # print(request.form['myData'])
            print('Did not receive JSON')
            # return render_template('result.html')
            return 'failed'


def get_all_ripples():
    stream_keys = db.child("users").child("stream").get()
    ripples = {}
    counter = 0
    for key in stream_keys.each():
        if key.key().__contains__(
                "Ripple") and 'date' in key.val() and 'message' in key.val() and 'source' in key.val():
            label = "r" + str(counter)
            # source = 'untagged'
            moderate = 'untagged'
            # if 'source' in key.val():
            #     source = key.val()["source"]
            if 'moderate' in key.val():
                moderate = key.val()["moderate"]
            # date = str(key.val()["date"])[0:10]
            tldata = {
                "ripple_id": key.key(),
                "date": key.val()["date"],
                "message": key.val()["message"],
                "source": key.val()["source"],
                "moderate": moderate,
                "user_rating": key.val()["rating"]["userRating"],
            }
            ripples.update({label: tldata})
            counter += 1
    return ripples


def get_ripple(ripple_id):
    ripple_data = db.child("users").child(stream).child(ripple_id).get()
    return ripple_data


def update_ripple_mod(ripple_id, orgRating, orgComment):
    db.child("users").child("stream").child(ripple_id).update({"moderate":"completed"})
    db.child("users").child("stream").child(ripple_id).update({"orgComment": orgComment})
    db.child("users").child("stream").child(ripple_id).child("rating").update({"orgRating": orgRating})

    print("updated (maybe)")


@app.route('/moderate_ripple', methods=['POST', 'GET'])
def moderate_ripple():
    if request.method == 'POST':
        if request.is_json:
            data_receive = json.loads(request.get_data())
            print('Received JSON data_receive from user object')
            print(data_receive)
            update_ripple_mod(data_receive["_id"],data_receive["_orgRating"],data_receive["_orgComment"])
            return 'succeeded'
        else:
            print('Did not receive JSON')
            return 'failed'


@app.route('/remove_ripple', methods=['POST', 'GET'])
def remove_ripple():
    if request.method == 'POST':
        if request.is_json:
            data_receive = json.loads(request.get_data())
            print('Received JSON data_receive from user object')
            print(data_receive)
            ripple_id = data_receive["_id"]
            db.child("users").child("stream").child(ripple_id).remove()
            print("removed?")
            return 'success'
        else:
            print('Did not receive JSON')
            return 'failed'


# get_all_ripples()

if __name__ == '__main__':
    app.run()
