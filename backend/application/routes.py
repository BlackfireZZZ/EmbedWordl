from flask import request, jsonify
from application import app
from application.model.model import apply, start


@app.route('/ping', methods=['GET'])
def response_ping():
    return jsonify({"status": "ok"}), 200


@app.route('/apply', methods=['POST'])
def apply_to_model():
    word1 = request.json['word1']
    word2 = request.json['word2']
    method = request.json['method']
    result, possibility = apply(word1, word2, method)
    return jsonify({"result": result, "possibility": possibility}), 200


@app.route('/startgame', methods=['GET'])
def start_game():
    startword, taskword, possibility = start()
    return jsonify({"startword": startword, "taskword": taskword, "possibility": possibility}), 200
