from flask import *
# import nltk
# from nltk.corpus import treebank

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
