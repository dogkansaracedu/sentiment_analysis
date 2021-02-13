import pickle
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'app_db'
app.config['MYSQL_PORT'] = 6033
mysql = MySQL(app)

# load the TR model and vectorizer
tr_model = pickle.load(open('tr_model.sav', 'rb'))
tr_vectorizer = pickle.load(open('tr_vectorizer', 'rb'))

# load the EN model and vectorizer
en_model = pickle.load(open('en_model.sav', 'rb'))
en_vectorizer = pickle.load(open('en_vectorizer', 'rb'))


@app.route('/', methods=['POST', 'GET'])
def hello_world():
    if request.method == 'POST':
        content = request.get_json(silent=True)
        text = content['text']
        language = content['language']['value']

        if language == 'TR':
            pred = tr_model.predict(tr_vectorizer.transform([text]))
        elif language == 'EN':
            pred = en_model.predict(en_vectorizer.transform([text]))
        else:
            return jsonify({'result': 'A problem occurred.'})

        if pred == 1:
            result = "Positive"
        else:
            result = "Negative"

        # adding to database
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO mytable VALUES(%s,%s,%s,%s)", (None, language, text, result))
        mysql.connection.commit()
        cur.close()

        response = jsonify({"result": result})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM mytable ORDER BY ID DESC LIMIT 10")
        history = cur.fetchall()
        mysql.connection.commit()
        cur.close()

        response = jsonify({"history": history})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


if __name__ == '_main_':
    app.run(debug=True)
