from flask import request, jsonify
from application import app
from application.model.LLM import apply, start


@app.route('/ping', methods=['GET'])
def response_ping():
    return jsonify({"status": "ok"}), 200


@app.route('/apply', methods=['POST'])
def apply_to_model():
    word1 = request.json['word1']
    word2 = request.json['word2']
    method = request.json['method']
    return jsonify({"result": apply(word1, word2, method)}), 200


@app.route('/startgame', method=['GET'])
def start_game():
    startword, taskword, possibility = start()
    return jsonify({"startword": startword, "taskword": taskword, "possibility": possibility}), 200
