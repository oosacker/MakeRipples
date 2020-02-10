import nlptest

# Unit Tests using built in Python test kit.
assert nlptest.returnnlprating("my friends and I cleaned a stream") == 8, "Should be 8"
assert nlptest.returnnlprating("I liked the idea of pest control") == 1, "Should be 1"
assert nlptest.returnnlprating("the trees waved slowly in the wind") == 0, "Should be 0"
assert nlptest.returnnlprating("I learnt about a new concept") == 4, "Should be 4"
assert nlptest.returnnlprating("Met with the pm to discuss making Hugh Grant the patron saint of film in new zealand")\
       == 9
