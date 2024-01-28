const LOCAL_API = "http://127.0.0.1:5000/";
const testing_env = true;
var BASE_URL = testing_env ? LOCAL_API : "";
var TEST_USER_ID = "vh7FzafzJPjAQdqO3cTh";

export const GLOBALS = {
  BASE_URL: BASE_URL,
  ADD_EXISTING_LINKS: "/addLinksToExistingMemos",
  GET_USERS: "/getUsers",
  GET_NEW_MEMO_SUGGESTIONS: "/getNewMemoSuggestions",
  REALIZE_SUGGESTION: "/realizeSuggestion",
};
