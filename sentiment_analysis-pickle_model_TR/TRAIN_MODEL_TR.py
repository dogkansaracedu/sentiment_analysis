import pandas as pd
import pickle
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

X = df['yorum']
y = df['Positivity']

# Bu özellik matrisi X_ train_ vectorized'e dayanarak Lojistik Regresyon sınıflandırıcısını eğiteceğiz
from sklearn.linear_model import LogisticRegression
# tf-idf vectorizer'ı başlatacağız ve eğitim verilerimize uygulayacağız.
# En az beş dokümanda görünen kelime dağarcığımızdaki kelimeleri kaldıracağımız min_df = 5 değerini belirtiyoruz.
from sklearn.feature_extraction.text import TfidfVectorizer
vect = TfidfVectorizer(min_df=5, ngram_range=(1, 2)).fit(X)

# save vectorizer to disk
pickle.dump(vect, open('vector.pickle', 'wb'))

X_vectorized = vect.transform(X)
model = LogisticRegression()
model.fit(X_vectorized, y)

# save the model to disk
filename = 'final_model.sav'
pickle.dump(model, open(filename, 'wb'))


