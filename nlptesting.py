import nlptest

# Unit Tests using built in Python test kit.
assert nlptest.returnnlprating("my friends and I cleaned a stream") == 8, "Should be 8"

# Should return one due word "liked", indicating an emotional response.
assert nlptest.returnnlprating("I liked the idea of pest control") == 1, "Should be 1"

# Should return zero as none words trigger
assert nlptest.returnnlprating("the trees waved slowly in the wind") == 0, "Should be 0"

# Should return four due to 'learnt', asserts that something was learnt, or demonstrates understanding
assert nlptest.returnnlprating("I learnt about a new concept") == 4, "Should be 4"

# Should return nine due to mention of 'pm' and 'zealand' - asserts national impact
assert nlptest.returnnlprating("Met with the pm to discuss making Hugh Grant the patron saint of film in new zealand")\
       == 9
