import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import wordnet

# from firebase import firebase
# firebase = firebase.FirebaseApplication('https://your_storage.firebaseio.com', None)
# result = firebase.get('/users', None)
# print(result)
# {'1': 'John Doe', '2': 'Jane Doe'}
# # sentence = 'I decided to volunteer with my local community centre and we have made a new community garden!'
# # sentence = 'I built a worm farm in my back yard'
# # sentence = 'My friends and I talked about going to clean the local stream.'
# # sentence = 'The Black Eyed Peas are the greatest band of 2003'
library1 = []
library4 = []
library8 = []
library10 = []


# def synonymTests():
#     syns = wordnet.synsets("learn")
#
#     print(syns[0].name())
#
#     print(syns[0].lemmas()[0].name())
#
#     print(syns[0].definition())
#
#     print(syns[0].examples())
#
#     synonyms = []
#     for syn in syns:
#         for l in syn.lemmas():
#             synonyms.append(l.name())
#
#     print(set(synonyms))
#
#     actSyns = wordnet.synsets("act")
#
#     actSynonyms = []
#     for aSyn in actSyns:
#         for l in aSyn.lemmas():
#             actSynonyms.append(l.name())
#
#     print(set(actSynonyms))
#
#     both = []
#     for word in synonyms:
#         if actSynonyms.__contains__(word):
#             both.append(word.name())
#
#     print("Learn synonyms = ", len(synonyms))
#     print("Act synonyms = ", len(synonyms))
#     print("Overlapping = ", len(both))

#tagged = nltk.pos_tag(word_tokenize(sentence))
#print(tagged)

# nouns = list(filter(lambda x: x[1] == 'NN', tagged))
# nounsplural = list(filter(lambda x: x[1] == 'NNS', tagged))
# verbs = list(filter(lambda x: x[1].__contains__('VB'), tagged))
# verbs_past = list(filter(lambda x: x[1] == 'VBD', tagged))
# this will only get base forms, not past tense etc.
#includedwords = list(sentence)

# print("Nouns Singular: ", set(nouns))
# print("Nouns Plural: "), set(nounsplural)
# print("Verbs: ", set(verbs))
# print("Verbs (past): ", set(verbs_past))

def makeLibraryOnetoThree():
    # make a list of keywords to identify something at level one to three
    keywords = ['clicked', 'saw', 'read', 'viewed', 'watched', 'looked', 'heard', 'view', 'watch', 'hear', 'click',
                'liked', 'felt', 'understood', 'my', 'family', 'whanau', 'whānau', 'knew']
    # make library of synonyms for these words
    global library1
    for keyword in keywords:
        library1.append(keyword)

    # syns = wordnet.synsets(keyword)
    # for syn in syns:
    #     for lem in syn.lemmas():
    #         library1.append(lem.name())
    #         print(lem.name)
    # # May end up with duplicates, so would need to get rid of those.

    print("Made library of ", len(library1), "words for level one")


def makeLibraryFourtoSeven():
    # make a list of keywords to identify something at level four to seven
    keywords = ['learnt', 'learn', 'learned', 'find', 'questioned', 'understood', 'changed', 'found', 'change',
                'question', 'differently', 'changed',
                'talked', 'told', 'understood', 'discussed', 'lectured', 'lectured', 'discuss', 'discussion',
                'debate', 'hui', 'felt', 'discussion', 'confident', 'consider', 'represent']

    global library4
    for keyword in keywords:
        library4.append(keyword)

    # make library of synonyms for these words

    # for keyword in keywords:
    #     syns = wordnet.synsets(keyword)
    #     for syn in syns:
    #         for lem in syn.lemmas():
    #             library4.append(lem.name())
    # # May end up with duplicates, so would need to get rid of those.

    print("Made library of ", len(library4), "words for level four")

def makeLibraryEighttoNine():
    # make a list of keywords to identify something at eight and nine
    keywords = ['contacted', 'shared', 'visited', 'installed', 'prepared', 'wrote', 'write', 'posted', 'post',
                'prepare', 'talked', 'created', 'community', 'friends', 'friend', 'club', 'group', 'town', 'city',
                'local']

    for keyword in keywords:
        library8.append(keyword)

    # make library of synonyms for these words

    # for keyword in keywords:
    #     syns = wordnet.synsets(keyword)
    #     for syn in syns:
    #         for lem in syn.lemmas():
    #             library8.append(lem.name())
    # # May end up with duplicates, so would need to get rid of those.

    print("Made library of ", len(library8), "words for level one")


def makeLibrary10():
    # make a list of keywords to identify something at level ten
    keywords = ['zealand', 'parliament', 'interviews', 'interview', 'nationally', 'national', 'aotearoa', 'nz', 'nzl',
                'pm']

    for keyword in keywords:
        library10.append(keyword)

    # make library of synonyms for these words

    # for keyword in keywords:
    #     syns = wordnet.synsets(keyword)
    #     for syn in syns:
    #         for lem in syn.lemmas():
    #             library10.append(lem.name())
    # # May end up with duplicates, so would need to get rid of those.

    print("Made library of ", len(library10), "words for level one")


def returnnlprating(message):
    count1 = 0
    count4 = 0
    count8 = 0
    count10 = 0

    makeLibraryOnetoThree()
    makeLibraryFourtoSeven()
    makeLibraryEighttoNine()
    makeLibrary10()
    for noun in word_tokenize(message):
        if library1.__contains__(noun):
            count1 += 1
            print("Enter Word - 1:", noun)
        if library4.__contains__(noun):
            count4 += 1
            print("Enter Word - 4:", noun)
        if library8.__contains__(noun):
            count8 += 1
            print("Enter Word - 8:", noun)
        if library10.__contains__(noun):
            count10 += 1
            print("Enter Word - 10:", noun)

    if count10 > 0:
        return 9
    elif count8 > 0:
        return 8
    elif count4 > 0:
        return 4
    elif count1 > 0:
        return 1
    else:
        return 0
