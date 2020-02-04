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
sentence = 'My friends and I talked about going to clean the local stream.'
# sentence = 'The Black Eyed Peas are the greatest band of 2007'
library1 = []
library2 = []
library3 = []
library4 = []
library5 = []
library6 = []
library7 = []
library8 = []
library9 = []
library10 = []
print("Enter sentence for analysis:")
# sentence = input()
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

# nouns = list(filter(lambda x: x[1] == 'NN', tagged))
# nounsplural = list(filter(lambda x: x[1] == 'NNS', tagged))
# verbs = list(filter(lambda x: x[1].__contains__('VB'), tagged))
# verbs_past = list(filter(lambda x: x[1] == 'VBD', tagged))
# this will only get base forms, not past tense etc.
includedwords = list()

# print("Nouns Singular: ", set(nouns))
# print("Nouns Plural: "), set(nounsplural)
# print("Verbs: ", set(verbs))
# print("Verbs (past): ", set(verbs_past))



def makeLibrary1():
    # make a list of keywords to identify something at level 9
    keywords = ['clicked', 'saw', 'read', 'viewed', 'watched', 'looked', 'heard', 'view', 'watch', 'hear', 'click']
    # make library of synonyms for these words
    global library1
    for keyword in keywords:
        syns = wordnet.synsets(keyword)
        for syn in syns:
            for lem in syn.lemmas():
                library1.append(lem.name())
    # May end up with duplicates, so would need to get rid of those.

    print("Made library of ", len(library1), "words for level one")


def makeLibrary2():
    # make a list of keywords to identify something at level 2
    keywords = ['liked', 'felt', 'understood']
    # make library of synonyms for these words
    global library2
    for keyword in keywords:
        syns = wordnet.synsets(keyword)
        for syn in syns:
            for lem in syn.lemmas():
                library2.append(lem.name())
    # May end up with duplicates, so would need to get rid of those.

    print("Made library of ", len(library2), "words for level two")


def makeLibrary3():
    # make a list of keywords to identify something at level three
    keywords = ['my', 'family', 'whanau', 'whānau', 'knew']
    # make library of synonyms for these words
    global library3
    for keyword in keywords:
        syns = wordnet.synsets(keyword)
        for syn in syns:
            for lem in syn.lemmas():
                library3.append(lem.name())
    # May end up with duplicates, so would need to get rid of those.

    print("Made library of ", len(library3), "words for level one")


def makeLibrary4():
    # make a list of keywords to identify something at level four
    keywords = ['learnt', 'learn', 'learned', 'find']
    # make library of synonyms for these words
    global library4
    for keyword in keywords:
        syns = wordnet.synsets(keyword)
        for syn in syns:
            for lem in syn.lemmas():
                library4.append(lem.name())
    # May end up with duplicates, so would need to get rid of those.

    print("Made library of ", len(library4), "words for level four")


def makeLibrary5():
    # make a list of keywords to identify something at level five
    keywords = ['questioned', 'understood', 'changed', 'found', 'change', 'question', 'differently']
    # make library of synonyms for these words
    global library5
    for keyword in keywords:
        syns = wordnet.synsets(keyword)
        for syn in syns:
            for lem in syn.lemmas():
                library5.append(lem.name())
    # May end up with duplicates, so would need to get rid of those.

    print("Made library of ", len(library5), "words for level one")


def makeLibrary6():
    # make a list of keywords to identify something at level six
    keywords = ['changed', 'talked', 'told', 'understood', 'discussed', 'lectured', 'lectured', 'discuss', 'discussion',
                'debate', 'hui']
    # make library of synonyms for these words
    global library6
    for keyword in keywords:
        syns = wordnet.synsets(keyword)
        for syn in syns:
            for lem in syn.lemmas():
                library6.append(lem.name())
    # May end up with duplicates, so would need to get rid of those.

    print("Made library of ", len(library6), "words for level one")


def makeLibrary7():
    # make a list of keywords to identify something at level seven
    keywords = ['felt', 'discussion', 'confident', 'consider', 'represent']
    # make library of synonyms for these words
    global library7
    for keyword in keywords:
        syns = wordnet.synsets(keyword)
        for syn in syns:
            for lem in syn.lemmas():
                library7.append(lem.name())
    # May end up with duplicates, so would need to get rid of those.

    print("Made library of ", len(library7), "words for level one")


def makeLibrary8():
    # make a list of keywords to identify something at level eight
    keywords = ['contacted', 'shared', 'visited', 'installed', 'prepared', 'wrote', 'write', 'posted', 'post',
                'prepare', 'talked']
    # make library of synonyms for these words
    global library8
    for keyword in keywords:
        syns = wordnet.synsets(keyword)
        for syn in syns:
            for lem in syn.lemmas():
                library8.append(lem.name())
    # May end up with duplicates, so would need to get rid of those.

    print("Made library of ", len(library8), "words for level one")


def makeLibrary9():
    # make a list of keywords to identify something at level three
    keywords = ['created', 'community', 'friends', 'friend', 'club', 'group']
    # make library of synonyms for these words
    global library9
    for keyword in keywords:
        syns = wordnet.synsets(keyword)
        for syn in syns:
            for lem in syn.lemmas():
                library9.append(lem.name())
    # May end up with duplicates, so would need to get rid of those.

    print("Made library of ", len(library9), "words for level one")


def makeLibrary10():
    # make a list of keywords to identify something at level three
    keywords = ['zealand', 'parliament', 'interviews', 'interview', 'nationally', 'national', 'aotearoa', 'nz', 'nzl',
                'pm']
    # make library of synonyms for these words
    global library10
    for keyword in keywords:
        syns = wordnet.synsets(keyword)
        for syn in syns:
            for lem in syn.lemmas():
                library10.append(lem.name())
    # May end up with duplicates, so would need to get rid of those.

    print("Made library of ", len(library10), "words for level one")

makeLibrary1()
makeLibrary2()
makeLibrary3()
makeLibrary4()
makeLibrary5()
makeLibrary6()
makeLibrary7()
makeLibrary8()
makeLibrary9()
makeLibrary10()

count9 = 0
# length = len(nouns) + len(nounsplural)
#print("found", length, " nouns")
for noun in word_tokenize(sentence):
    print(noun)
    if library8.__contains__(noun[0]):
        count9 += 1
for noun in includedwords:
    print(noun)
    if library8.__contains__(noun[0]):
        count9 += 1

percentage = (count9 / len(word_tokenize(sentence))) * 100
percentnouns = (count9 / len(word_tokenize(sentence))) * 100
print("Sentence matches", count9, "words in community library making it ", percentage, "% related by all words or ",
      percentnouns, "% related by nouns")
