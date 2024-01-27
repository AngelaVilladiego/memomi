from flask import Flask, request, jsonify
from FindIndexesOfQuery import findIndexesOfQuery
from ApiHelpers import *
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account.
if not firebase_admin._apps:
    cred = credentials.Certificate('firebase_credentials.json')
    default_app = firebase_admin.initialize_app(cred)

db = firestore.client()

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/memos/addLinksToExistingMemos", methods=["POST"])
def addLinksToExistingNotes():
    reqData = request.json
    currMemoId = reqData.get('memoId')
    userId = reqData.get('userId')
    otherMemos = []
    memoBody = h_getMemoById(currMemoId).get('body')

    linksToNotes = []

    user = h_getUserById(userId)
    for memoId in user.get('memoIds'):
        if memoId != currMemoId:
            otherMemos.append({'id':memoId, 'title': (h_getMemoById(memoId).get('title'))})

    for memo in otherMemos:
        print(f"finding index for {memo['title']}")
        linkIndexes = findIndexesOfQuery(memo['title'], memoBody)
        print("received: ", linkIndexes)
        if linkIndexes:
            for i in linkIndexes:
                linksToNotes.append({'linkIndexes':i, 'linkedMemoId':memo['id']})

    h_updateMemo(currMemoId, "linksToNotes", linksToNotes)


    return linksToNotes

@app.route("/getUsers", methods=["GET"])
def getUsers():
    usersRef = db.collection("users")
    users = usersRef.stream()
    response = {'users': []}

    for user in users:
        userDict = {'id': user.id}
        memoIds = []
        for memoId in user.get('memoIds'):
            memoIds.append(memoId)
        userDict['memoIds'] = memoIds
        response['users'].append(userDict)

    return response