from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)


def remove_stopwords(df_fon):
    stopwords = open('turkce-stop-words', 'r').read().split()
    df_fon['stopwords_removed'] = list(map(lambda doc:
                                           [word for word in doc if word not in stopwords], df_fon['yorum']))
# SENTIMENT ANALYSIS PART
# Veri setinin eklenip başlığının belirlenmesi
column = ['yorum']
df = pd.read_csv('yorumlar.csv', encoding='iso-8859-9', sep='"')
df.columns = column
remove_stopwords(df)
df['Positivity'] = 1
df.Positivity.iloc[10003:] = 0

# Şimdi, verileri "yorum" ve "Positivity" sütunlarını kullanarak rastgele eğitim ve test alt kümelerini bölüştürelim ve
# ardından ilk girişi ve eğitim setinin şeklini yazalım.
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(df['yorum'], df['Positivity'], random_state=0)

# CountVectorizer'ı başlatıyoruz ve eğitim verilerimize uyguluyoruz.
from sklearn.feature_extraction.text import CountVectorizer

vect = CountVectorizer(encoding='iso-8859-9').fit(X_train)

# X_train'deki belgeleri bir belge terim matrisine dönüştürürüz
X_train_vectorized = vect.transform(X_train)

# Bu özellik matrisi X_ train_ vectorized'e dayanarak Lojistik Regresyon sınıflandırıcısını eğiteceğiz
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(X_train_vectorized, y_train)

# tf-idf vectorizer'ı başlatacağız ve eğitim verilerimize uygulayacağız.
# En az beş dokümanda görünen kelime dağarcığımızdaki kelimeleri kaldıracağımız min_df = 5 değerini belirtiyoruz.
from sklearn.feature_extraction.text import TfidfVectorizer

vect = TfidfVectorizer(min_df=5).fit(X_train)

X_train_vectorized = vect.transform(X_train)
model = LogisticRegression()
model.fit(X_train_vectorized, y_train)

# bigramlar, bitişik kelimelerin çiftlerini sayar ve bize kötü ve kötü olmayan gibi özellikler verebilir.
# Bu nedenle, minimum 5 belge sıklığını belirten ve 1 gram ve 2 gram ekstrakt eden eğitim setimizi yeniden yerleştiriyoruz.
vect = CountVectorizer(min_df=5, ngram_range=(1, 2)).fit(X_train)
X_train_vectorized = vect.transform(X_train)

model = LogisticRegression()
model.fit(X_train_vectorized, y_train)

@app.route('/', methods=['POST', 'GET'])
def hello_world():
    content = request.data
    pred = model.predict(vect.transform([content]))
    if pred == 1:
        retVal = "Pozitif"
    else:
        retVal = "Negatif"

    print(retVal)
    return retVal


if __name__ == '__main__':
    app.run(debug=True)
