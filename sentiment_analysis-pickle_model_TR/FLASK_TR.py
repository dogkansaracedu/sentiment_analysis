from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import time


app = Flask(__name__)
CORS(app)

# load the model
loaded_model = pickle.load(open('/home/stajyer1/PycharmProjects/pythonProject/final_model.sav', 'rb'))
# load the vectorizer
loaded_vectorizer = pickle.load(open('/home/stajyer1/PycharmProjects/pythonProject/vector.pickle', 'rb'))



@app.route('/', methods=['POST', 'GET'])
def hello_world():
    content = request.get_json(silent=True)
    pred = loaded_model.predict(loaded_vectorizer.transform([content['language']]))
    if pred == 1:
        retVal = "Pozitif"
    else:
        retVal = "Negatif"

    # time.sleep(3)
    response = jsonify({'result': retVal})
    return response


if __name__ == '__main__':
    app.run(debug=True)
