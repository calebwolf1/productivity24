import json
from flask import Flask, jsonify, request
from knowledge_base import KnowledgeBase
app = Flask(__name__)
kb = KnowledgeBase()

@app.route('/hello', methods = ['GET'])
def hello():
    phrase = request.args.get('phrase')
    print(phrase)
    return phrase


@app.route('/receive-emails', methods = ['POST'])
def receive_emails():
    data = request.json
    emails = data.get('emails')
    kb.update_knowledge_base(emails)
    # figure out how to get the emails
    # add emails to the vector store
    return 'True'

@app.route('/generate-response', methods = ['POST'])
def generate_response():
    print('hello')
    data = request.json
    input_email = data.get('input-email') # input email must be string type
    print(input_email)
    return kb.generate_response(input_email)
    # get the email from the request
    # query and generate response from vector store




if __name__ == '__main__':
   app.run(port=5000)