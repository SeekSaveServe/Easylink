# Import gensim modules.
# from gensim.test.utils import common_texts
from gensim.models.doc2vec import Doc2Vec, TaggedDocument
from gensim.test.utils import get_tmpfile

from app.apis.RecommendationSys.functions import *
# from functions import *
import pandas as pd
import json 

fnameUser = 'UserModel'
fnameProject = 'ProjectModel'

# Values for training model
# so far this seems optimal
vec_size = 60
alpha = 0.25
epochs = 300
# limits the number of results returned
topN = 10

def train_user_model():
    common_texts = dict(get_users())

    # Tagging documents. Each sentences(set of words) are mapped unique index.
    # Tagged documents are input for doc2vec model. 
    tagged_documents = []
    for uuid, doc in common_texts.items():
        tagged = TaggedDocument(doc.split(","), [uuid])
        tagged_documents.append(tagged)
    
    # Create doc2vec model.
    # so far this seems optimal
    model = Doc2Vec(tagged_documents, vector_size=vec_size,
                    alpha=alpha,
                    min_alpha=0.00025,
                    min_count=1,
                    dm=0,
                    epochs=epochs)
    # saves model (saved in the current directory in cld)
    model.save(fnameUser)

def train_project_model():
    common_texts = dict(get_projects())
    # Tagging documents. Each sentences(set of words) are mapped unique index.
    # Tagged documents are input for doc2vec model. 
    tagged_documents = []
    for uuid, doc in common_texts.items():
        tagged = TaggedDocument(doc.split(","), [uuid])
        tagged_documents.append(tagged)
    
    # Create doc2vec model.
    model = Doc2Vec(tagged_documents, vector_size=vec_size,
                    alpha=alpha,
                    min_alpha=0.00025,
                    min_count=1,
                    dm=0,
                    epochs=epochs)
    # saves model (saved in the current directory in cld)
    model.save(fnameProject)

def calculate_similarity_project(profile: list[str]) -> "json":
    return calculate_similarity_internal(profile, fnameProject)

def calculate_similarity_user(profile: list[str]) -> "json":
    return calculate_similarity_internal(profile, fnameUser)

def calculate_similarity_internal(profile: list[str], fname: str) -> "json":
    # model
    model = Doc2Vec.load(fname)
    # Create new sentence and vectorize it. 
    # new_sentence = ["Service", "Programming", "House", "Interest Groups"]
    new_sentence_vectorized = model.infer_vector(profile)
    # Calculate cosine similarity. 
    similar_sentences = model.dv.most_similar(positive=[new_sentence_vectorized], topn=topN)
    # Output
    similar_sentences = list(map(lambda x: (str(x[0]), x[1]), similar_sentences))
    return dict(similar_sentences)

# train_project_model()
# print(calculate_similarity(['Other Communities', 'GUI', 'USP'], fnameProject))