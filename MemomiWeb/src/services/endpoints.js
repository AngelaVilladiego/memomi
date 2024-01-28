import { GLOBALS as g } from "../globals";

export const GetNewMemoSuggestions = async (memoId) => {
  let reqBody = JSON.stringify({
    memoId: memoId,
  });

  let res = fetch(`${g.BASE_URL + g.GET_NEW_MEMO_SUGGESTIONS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: reqBody,
  })
    .then((r) => r.json())
    .then((r) => {
      console.log("Response", r);
      return r;
    })
    .catch((error) => console.error("Error:", error));

  return res;
};

export const GetUserMemos = async (userId) => {
  let url = new URL(`${g.BASE_URL + g.GET_USER_MEMOS}`);
  url.search = new URLSearchParams({ userId: userId });
  let res = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((r) => {
      //console.log("Response", r);
      return r;
    })
    .catch((error) => console.error("Error:", error));

  return res;
};

export const GetUserFirstMemo = async (userId) => {
  let url = new URL(`${g.BASE_URL + g.GET_USER_FIRST_MEMO}`);
  url.search = new URLSearchParams({ userId: userId });
  let res = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((r) => {
      //console.log("Response", r);
      return r;
    })
    .catch((error) => console.error("Error:", error));

  return res;
};

export const GetUserMemoIds = async (userId) => {
  let url = new URL(`${g.BASE_URL + g.GET_USER_FIRST_MEMO}`);
  url.search = new URLSearchParams({ userId: userId });
  let res = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((r) => {
      //console.log("Response", r);
      return r;
    })
    .catch((error) => console.error("Error:", error));

  return res;
};

export const GetMemo = async (memoId, userId) => {
  let url = new URL(`${g.BASE_URL + g.GET_MEMO}`);
  url.search = new URLSearchParams({ memoId: memoId, userId: userId });
  let res = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((r) => {
      //console.log("Response", r);
      return r;
    })
    .catch((error) => {
      //console.error("Error:", error);
      return -4;
    });

  return res;
};
