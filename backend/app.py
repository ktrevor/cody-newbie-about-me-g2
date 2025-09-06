from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # allow React frontend to talk to backend

def init_db():
    conn = sqlite3.connect("data.db")
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, text TEXT)")
    conn.commit()
    conn.close()

init_db()

@app.route("/messages", methods=["GET"])
def get_messages():
    conn = sqlite3.connect("data.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM messages")
    rows = cur.fetchall()
    conn.close()
    return jsonify([{"id": r[0], "text": r[1]} for r in rows])

@app.route("/messages", methods=["POST"])
def add_message():
    data = request.json
    text = data.get("text", "")
    conn = sqlite3.connect("data.db")
    cur = conn.cursor()
    cur.execute("INSERT INTO messages (text) VALUES (?)", (text,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Message added!"}), 201

if __name__ == "__main__":
    app.run(debug=True)