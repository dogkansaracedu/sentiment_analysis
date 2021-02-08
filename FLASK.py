from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import time


app = Flask(__name__)
CORS(app)

# load the model
loaded_model_TR = pickle.load(open('/home/stajyer1/PycharmProjects/pythonProject/final_model.sav', 'rb'))
# load the vectorizer
loaded_vectorizer_TR = pickle.load(open('/home/stajyer1/PycharmProjects/pythonProject/vector.pickle', 'rb'))


@app.route('/', methods=['POST', 'GET'])
def hello_world():
    content = request.get_json(silent=True)
    print(content['language']['value'])
    print(content['text'])
    if content['language']['value'] == 'TR':
        pred = loaded_model_TR.predict(loaded_vectorizer_TR.transform([content['language']]))
    else:
        pred = 0
    if pred == 1:
        retVal = "Pozitif"
    else:
        retVal = "Negatif"

    # time.sleep(3)
    response = jsonify({'result': retVal})
    return response



if __name__ == '__main__':
    app.run(debug=True)
