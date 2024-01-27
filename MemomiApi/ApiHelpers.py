from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud.firestore_v1.base_query import FieldFilter

if not firebase_admin._apps:
    cred = credentials.Certificate('firebase_credentials.json')
    default_app = firebase_admin.initialize_app(cred)

db = firestore.client()

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