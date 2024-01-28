const LOCAL_API = "http://127.0.0.1:5000/";
const testing_env = true;
var BASE_URL = testing_env ? LOCAL_API : "";
var TEST_USER_ID = "vh7FzafzJPjAQdqO3cTh";

export const GLOBALS = {
  BASE_URL: BASE_URL,
  ADD_EXISTING_LINKS: "/addLinksToExistingMemos",
  GET_NEW_MEMO_SUGGESTIONS: "/getNewMemoSuggestions",
  REALIZE_SUGGESTION: "/realizeSuggestion",
  GET_USER: "/getUser",
  GET_MEMO: "/getMemo",
  GET_USER_MEMOS: "/getUserMemos",
  GET_USER_FIRST_MEMO: "/getUserFirstMemo",
  GET_USER_MEMO_IDS: "/getUserMemoIds",
  TEST_USER_ID: TEST_USER_ID,
};
