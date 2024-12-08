import random


def apply(word1: str, word2: str, method: str) -> (str, float):
    return "test" + str(random.randint(0, 100)), random.randint(0, 100) / 100


def start() -> (str, str, float):
    return "test" + str(random.randint(100, 200)), "test" + str(random.randint(200, 300)), random.randint(0, 100) / 100
