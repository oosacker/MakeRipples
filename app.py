from flask import *
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


if __name__ == '__main__':
    app.run()
