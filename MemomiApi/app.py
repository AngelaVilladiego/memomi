from flask import Flask, request, jsonify
from FindIndexesOfQuery import findIndexesOfQuery
from ExtractTopicKeywords import getMemoSuggestionsList, removeExistingLinks
from ApiHelpers import *
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask_cors import CORS

# Use a service account.
if not firebase_admin._apps:
    cred = credentials.Certificate('firebase_credentials.json')
    default_app = firebase_admin.initialize_app(cred)

db = firestore.client()

app = Flask(__name__)
CORS(app)

@app.route("/getUser", methods=["GET"])
def getUser():
    userId = request.args.get('userId')
    user = h_getUserById(userId)

    return user

@app.route("/getMemo", methods=["GET"])
def getMemo():
    memoId = request.args.get("memoId")
    memo = h_getMemoById(memoId)

    return memo

@app.route("/getUserFirstMemo", methods=["GET"])
def getUserFirstMemo():
    userId = request.args.get("userId")
    user = h_getUserById(userId)

    memoIds = user.get('memoIds')


    if not memoIds:
        return {}
    
    memoId = memoIds[0]
    memo = h_getMemoById(memoId)
    
    return memo.to_dict()

@app.route("/addLinksToExistingMemos", methods=["POST"])
def addLinksToExistingMemos():
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

    h_updateMemo(currMemoId, "linksToMemos", linksToNotes)


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

@app.route("/getUserMemos", methods=["GET"])
def getUserMemos():
    userId = request.args.get("userId")
    user = h_getUserById(userId)

    memos = []
    for memoId in user.get('memoIds'):
        memos.append(h_getMemoById(memoId).to_dict())

    return memos

@app.route("/getUserMemoIds", methods=["GET"])
def getUserMemoIds():
    userId = request.args.get("userId")
    user = h_getUserById(userId)

    memoIds = user.get('memoIds')

    return memoIds
    

@app.route("/getNewMemoSuggestions", methods=["POST"])
def getNewMemoSuggestions():
    reqData = request.json
    memoId = reqData.get('memoId')
    memo = h_getMemoById(memoId)
    body = memo.get("body")
    memoSuggestionsList = getMemoSuggestionsList(body)
    linksToMemos = memo.get("linksToMemos")
    cleanMemoSuggestionsList = removeExistingLinks(memoSuggestionsList, linksToMemos)
    #check if list contains indexes in range of already existing notes, if so remove it
    h_updateMemo(memoId, "newMemoSuggestions", cleanMemoSuggestionsList)

    return memoSuggestionsList

@app.route("/realizeSuggestion", methods=["POST"])
def realizeSuggestion():
    reqData = request.json
    userId = reqData.get('userId')
    sourceMemoId = reqData.get('memoId')
    realizeTitle = reqData.get('suggestedTitle')

    user = h_getUserById(userId)
    sourceMemo = h_getMemoById(sourceMemoId)
    suggestions = sourceMemo.get("newMemoSuggestions")
    linksToMemos = sourceMemo.get("linksToMemos")
    
    suggestionsToRealize = [sug for sug in suggestions if sug['suggestedTitle'] == realizeTitle]

    cleanedSuggestions = [sug for sug in suggestions if sug['suggestedTitle'] != realizeTitle]

    newMemoId = h_getNewMemoId()
    memoIds = user.get("memoIds")
    memoIds.append(newMemoId)
    h_updateUser(userId, "memoIds", memoIds)
    h_updateMemo(newMemoId, "title", realizeTitle)

    for sug in suggestionsToRealize:
        newLink = {"linkIndexes": sug["suggestionIndexes"], "linkedMemoId": newMemoId}
        linksToMemos.append(newLink)

    h_updateMemo(sourceMemoId, "linksToMemos", linksToMemos)
    h_updateMemo(sourceMemoId, "newMemoSuggestions", cleanedSuggestions)

    return {"newMemoId":newMemoId, "newMemoSuggestions":cleanedSuggestions, "linksToMemos": linksToMemos}

    # update memoId to add indexes and the id of the newly created memo
    # return modified suggestions list and modified links list