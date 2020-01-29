import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import wordnet
# from firebase import firebase
# firebase = firebase.FirebaseApplication('https://your_storage.firebaseio.com', None)
# result = firebase.get('/users', None)
# print(result)
# {'1': 'John Doe', '2': 'Jane Doe'}
#
# sentence = 'I decided to volunteer with my local community centre and we have made a new community garden!'
# sentence = 'I built a worm farm in my back yard'
# sentence = 'My friends and I talked about going to clean the local stream.'
library = []
print("Enter sentence for analysis:")
sentence = input()
print(word_tokenize(sentence))

def synonymTests():
    syns = wordnet.synsets("learn")

    print(syns[0].name())

    print(syns[0].lemmas()[0].name())

    print(syns[0].definition())

    print(syns[0].examples())

    synonyms = []
    for syn in syns:
        for l in syn.lemmas():
            synonyms.append(l.name())

    print(set(synonyms))

    actSyns = wordnet.synsets("act")

    actSynonyms = []
    for aSyn in actSyns:
        for l in aSyn.lemmas():
            actSynonyms.append(l.name())

    print(set(actSynonyms))

    both = []
    for word in synonyms:
        if actSynonyms.__contains__(word):
            both.append(word.name())

    print("Learn synonyms = ", len(synonyms))
    print("Act synonyms = ", len(synonyms))
    print("Overlapping = ", len(both))


tagged = nltk.pos_tag(word_tokenize(sentence))
print(tagged)

nouns = list(filter(lambda x:x[1]=='NN',tagged))
verbs = list(filter(lambda x:x[1].__contains__('VB'),tagged))
verbs_past = list(filter(lambda x:x[1]=='VBD',tagged))
# this will only get base forms, not past tense etc.

print("Nouns: ", set(nouns))
print("Verbs: ", set(verbs))
print("Verbs (past): ", set(verbs_past))

def makeLibrary():
    # make a list of keywords to identify something at level 9
    keywords = ['community','family','friends','neighbours','local']
    # make library of synonyms for these words
    global library
    for keyword in keywords:
        syns = wordnet.synsets(keyword)
        for syn in syns:
            for lem in syn.lemmas():
                library.append(lem.name())
    # May end up with duplicates, so would need to get rid of those.

    print("Made library of ", len(library), "words for community")

makeLibrary()
count9 = 0
length = len(nouns)
print("found", length," nouns")
for noun in nouns:
    print(noun)
    if library.__contains__(noun[0]):
        count9 += 1

percentage = (count9/len(word_tokenize(sentence)))*100
percentnouns = (count9/length)*100
print("Sentence matches",count9,"words in community library making it ",percentage, "% related by all words or ",percentnouns,"% related by nouns")
