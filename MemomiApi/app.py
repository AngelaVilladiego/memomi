from flask import Flask, request, jsonify
from FindIndexesOfQuery import findIndexesOfQuery
from ExtractTopicKeywords import getMemoSuggestionsList, removeExistingLinks
from ApiHelpers import *
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask_cors import CORS
from BodyTagger import tagBody

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
    userId = request.args.get("userId")

    memo = h_getMemoById(memoId).to_dict()

    links = []
    try:
        links = memo["linksToMemos"]
        if len(links) == 0:
            links = h_addLinksToExistingMemos(userId, memoId)
    except KeyError:
        links = h_addLinksToExistingMemos(userId, memoId)

    try:
        suggs = memo["newMemoSuggestions"]
    except KeyError:
        suggs = []

    newBody = tagBody(memo["body"], links, suggs)
    memo["body"] = str(newBody)
    memo["id"] = memoId
    print(memo)
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
    memoId = memo.id
    memo = memo.to_dict()

    links = []
    try:
        links = memo["linksToMemos"]
    except KeyError:
        links = h_addLinksToExistingMemos("memoId", "userId")

    try:
        suggs = memo["newMemoSuggestions"]
    except KeyError:
        suggs = []

    newBody = tagBody(memo["body"], links, suggs)
    memo["body"] = str(newBody)
    memo["id"] = memoId
    return memo

@app.route("/addLinksToExistingMemos", methods=["POST"])
def addLinksToExistingMemos():
    reqData = request.json
    currMemoId = reqData.get('memoId')
    userId = reqData.get('userId')
    
    linksToNotes = h_addLinksToExistingMemos(userId, currMemoId)


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
    try:
        linksToMemos = memo.get("linksToMemos")
    except KeyError:
        linksToMemos = []

    cleanMemoSuggestionsList = removeExistingLinks(memoSuggestionsList, linksToMemos)
    #check if list contains indexes in range of already existing notes, if so remove it
    h_updateMemo(memoId, "newMemoSuggestions", cleanMemoSuggestionsList)

    taggedBody = tagBody(body, linksToMemos, memoSuggestionsList)

    return {"taggedBody": taggedBody}

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

    taggedBody = tagBody(sourceMemo.get("body"), linksToMemos, cleanedSuggestions)
    
    return {"taggedBody": taggedBody, "memoId": newMemoId, "title": realizeTitle}

    # update memoId to add indexes and the id of the newly created memo
    # return modified suggestions list and modified links list