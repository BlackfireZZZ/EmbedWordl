from flask import Flask
from pymystem3 import Mystem
import gensim

app = Flask(__name__)
mystem = Mystem()
model_path = '/app/application/embedmodel/cc.ru.300.bin.gz'
model = gensim.models.fasttext.load_facebook_vectors(model_path)

from application import routes
