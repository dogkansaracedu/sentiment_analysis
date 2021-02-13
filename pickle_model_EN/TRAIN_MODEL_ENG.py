import pandas as pd
import pickle
import re

df2 = pd.read_csv('training.txt', sep=',')
df2['text'] = df2['text'].map(lambda x: re.sub('[^A-Za-z ]+', '', x).lower())

def remove_stopwordsEng(df_fon):
    stopwords = pd.read_csv("stopwords.txt")
    df_fon['stopwords_removed'] = list(map(lambda doc:
                                           [word for word in doc if word not in stopwords], df_fon['text']))

remove_stopwordsEng(df2)
df2['Positivity'] = 1
df2.Positivity.iloc[3997:] = 0

from sklearn.model_selection import train_test_split
X = df2['text']
y = df2['Positivity']

from sklearn.feature_extraction.text import TfidfVectorizer
vect = TfidfVectorizer(min_df=5).fit(X)

pickle.dump(vect, open('vectorizerEng', 'wb'))

from sklearn.linear_model import LogisticRegression
X_vectorized = vect.transform(X)
model2 = LogisticRegression()
model2.fit(X_vectorized, y)

# save the model to disk
filename = 'modelEng.sav'
pickle.dump(model2, open(filename, 'wb'))