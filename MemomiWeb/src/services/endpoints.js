import { GLOBALS as g } from "../globals";

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
      console.log("Response", r);
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
      console.log("Response", r);
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
      console.log("Response", r);
      return r;
    })
    .catch((error) => console.error("Error:", error));

  return res;
};
