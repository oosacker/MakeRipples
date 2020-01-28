from flask import *
# import nltk
# from nltk.corpus import treebank

app = Flask(__name__)


@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        submit = request.form['text-input']
        return render_template('index.html', message=submit)
    else:
        return render_template('index.html')


if __name__ == '__main__':
    app.run()
