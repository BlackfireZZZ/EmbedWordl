import random

from application import model, mystem


def normalized_cosine_similarity(word1, word2):
    cosine_similarity = model.similarity(word1, word2)
    # Преобразование значений для сжатия расстояний около 0.5
    adjusted_similarity = 4 * (cosine_similarity - 0.5) ** 2
    return adjusted_similarity


def is_noun(word):
    analysis = mystem.analyze(word)
    for token in analysis:
        if 'analysis' in token and token['analysis']:
            gram = token['analysis'][0]['gr']
            if 'S' in gram:
                return True
    return False


def normalize_word(word):
    analysis = mystem.analyze(word)
    for token in analysis:
        if 'analysis' in token and token['analysis']:
            return token['analysis'][0]['lex']
    return word


def get_most_similar_word(result, exclude_words):
    seen_lemmas = set()
    for similar_word, similarity in result:
        normalized_word = normalize_word(similar_word.lower())
        if normalized_word in exclude_words:
            continue
        if not is_noun(similar_word):
            continue
        if normalized_word not in seen_lemmas:
            seen_lemmas.add(normalized_word)
            return similar_word
    return None


def get_next_word(task_word, prev_word, cur_word, operation):
    prev_word = prev_word.lower()
    cur_word = cur_word.lower()

    if operation == 'plus':
        result = model.most_similar(positive=[prev_word, cur_word], topn=50)
    else:
        result = model.most_similar(positive=[prev_word], negative=[cur_word], topn=50)

    exclude_words = {normalize_word(prev_word), normalize_word(cur_word)}
    new_word = get_most_similar_word(result, exclude_words)

    if not new_word:
        return "ненашел", 0  # Если подходящее слово не найдено

    return new_word, normalized_cosine_similarity(task_word, new_word)


def get_start_words(num_words=2):
    vocab = list(model.index_to_key)
    nouns = []

    while len(nouns) < num_words:
        word = random.choice(vocab)
        if word.islower() and is_noun(word):
            nouns.append(word)

    return nouns[-2], nouns[-1], normalized_cosine_similarity(nouns[-2], nouns[-1])
