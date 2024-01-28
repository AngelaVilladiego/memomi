from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud.firestore_v1.base_query import FieldFilter
from datetime import datetime
from FindIndexesOfQuery import findIndexesOfQuery

if not firebase_admin._apps:
    cred = credentials.Certificate('firebase_credentials.json')
    default_app = firebase_admin.initialize_app(cred)

db = firestore.client()

def h_addLinksToExistingMemos(userId, currMemoId):
    otherMemos = []
    memoBody = h_getMemoById(currMemoId).get('body')
    print("HERE")
    linksToNotes = []

    user = h_getUserById(userId).to_dict()
    print("AFJREFJ", user)
    for memoId in user['memoIds']:
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

def h_getMemoById(memoId):
    memoRef = db.collection("memos").document(memoId)
    memo = memoRef.get()

    return memo

def h_getUserById(userId):
    userRef = db.collection("users").document(userId)
    user = userRef.get()
    

    return user

def h_updateMemo(memoId, field, data):
    memoRef = db.collection("memos").document(memoId)
    memoRef.update({field: data})

def h_updateUser(userId, field, data):
    userRef = db.collection("users").document(userId)
    userRef.update({field: data})

def h_getNewMemoId():
    updateTime, memoRef = db.collection("memos").add({"title": "", "body": "", "dateCreated": datetime.now().strftime('%Y/%m/%d'), "linksToMemos": [], "stickToIds": []})
    return memoRef.id

