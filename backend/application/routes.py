from flask import request, jsonify
from application import app
from application.embedmodel.embedmodel import get_next_word, get_start_words


@app.route('/ping', methods=['GET'])
def response_ping():
    return jsonify({"status": "ok"}), 200


@app.route('/apply', methods=['POST'])
def apply_to_model():
    task_word = request.json['taskWord']
    word1 = request.json['word1']
    word2 = request.json['word2']
    method = request.json['method']
    result, possibility = get_next_word(task_word, word1, word2, method)
    return jsonify({"result": result, "possibility": possibility}), 200


@app.route('/startgame', methods=['GET'])
def start_game():
    startword, taskword, possibility = get_start_words()
    return jsonify({"startword": startword, "taskword": taskword, "possibility": possibility}), 200
