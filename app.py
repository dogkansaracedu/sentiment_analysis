import pickle
import time


from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import re
import os
from sklearn import svm

app = Flask(__name__)
CORS(app)


# load the TR model
tr_model = pickle.load(open('/home/berfin/PycharmProjects/flaskProject2/modelTr.sav', 'rb'))
# load the vectorizer
tr_vectorizer = pickle.load(open('/home/berfin/PycharmProjects/flaskProject2/vectorizerTr', 'rb'))
# load the ENG model
eng_model = pickle.load(open('/home/berfin/PycharmProjects/flaskProject2/modelEng.sav', 'rb'))
# load the vectorizer
eng_vectorizer = pickle.load(open('/home/berfin/PycharmProjects/flaskProject2/vectorizerEng', 'rb'))


@app.route('/', methods=['POST', 'GET'])
def hello_world():
    content = request.get_json(silent=True)
    #text = content['text']
    if content['language']['value'] == 'TR':
        pred = tr_model.predict(tr_vectorizer.transform([content['text']]))
    elif content['language']['value'] == 'EN':
        pred = eng_model.predict(eng_vectorizer.transform([content['text']]))
    else:
        return jsonify({'result': 'A problem occurred.'})

    if pred == 1:
        retVal = "Positive"
    else:
        retVal = "Negative"

    time.sleep(2)
    response = jsonify({"result": retVal})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '_main_':
    app.run(debug=True)