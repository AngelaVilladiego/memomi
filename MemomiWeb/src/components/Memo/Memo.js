import React, { useState, useEffect } from "react";
import MemoHeader from "./MemoHeader";
import "./Memo.css";
import TechretaryButton from "../TechretaryButton/TechretaryButton";
import MemoFooter from "./MemoFooter";
import Editable from "../Editable/Editable";
import sanitizeHtml from "sanitize-html";
import {
  GetMemo,
  GetUserMemos,
  GetUserFirstMemo,
  GetUserMemoIds,
} from "../../services/endpoints";
import { GLOBALS } from "../../globals";
import { formatDate } from "../../services/helpers";

const Memo = () => {
  const [state, setState] = useState({
    isEditable: false,
    isLoading: true,
    memoIds: [],
    memo: {},
    canSave: false,
    lastSavedBody: "",
  });
  // const [isLoading, setIsLoading] = useState(true);
  // const [memoIds, setMemoIds] = useState([]);
  // const [memo, setMemo] = useState({});
  // const [canSave, setCanSave] = useState(false);
  // let lastSavedBody = "";

  useEffect(() => {
    console.log("useeffecting");
    Promise.all([
      GetUserFirstMemo(GLOBALS.TEST_USER_ID),
      GetUserMemoIds(GLOBALS.TEST_USER_ID),
    ]).then((values) => {
      var memoData = values[0];
      var memoIdsData = values[1];
      setState({
        ...state,
        isLoading: false,
        memoIds: memoIdsData,
        memo: memoData,
        canSave: false,
        lastSavedBody: memoData.body,
      });
    });
  }, []);

  const handleSave = () => {
    setState({
      ...state,
      lastSavedBody: { ...state.memo.body },
      canSave: false,
    });
    console.log("saving");
  };
  const handlePrevious = () => {
    console.log("previous");
  };
  const handleNext = () => {
    console.log("next");
  };

  const onSetContent = (e) => {
    setState({
      ...state,
      memo: {
        ...state.memo,
        body: e,
      },
      canSave: { ...state.lastSavedBody } != e,
    });
  };

  const onClickLink = (linkId) => {
    GetMemo(linkId, GLOBALS.TEST_USER_ID).then((data) => {
      if (data !== -4) {
        setState({
          ...state,
          memo: data,
          isLoading: false,
        });
      }
    });
  };

  const handleEdit = () => {
    setState({
      ...state,
      isEditable: true,
    });
  };

  return (
    <div className="flex flex-col myMemo mx-auto rounded-lg border-memoblue-400 border-2 h-full grow aspect-[5/7] font-sans py-2 px-6">
      {state.isLoading ? (
        <div className="p-8 flex flex-col gap-3 items-center max-w-6/12 h-screen text-gray-800">
          <div className="h-full flex flex-col justify-center items-center">
            <span className="text-gray-800 text-lg pb-3 font-fancy">
              Loading...
            </span>
            <div className="pb-48" role="status">
              <svg
                aria-hidden="true"
                className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-memoblue-400"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <MemoHeader
            isEditable={state.isEditable}
            onEdit={handleEdit}
            onDelete={() => console.log("clickedDelete")}
            iconName="save"
            onIconClick={handleSave}
            canSave={state.canSave}
          />
          <div className="pt-4 w-5/12 ms-auto self-end border-b-2 border-memoblue-400 font-sans font-semibold text-xs text-memoblue-400">
            <span>Date</span>
            <span className="font-handwriting text-xl align-baseline text-memoneutral-800 ps-8">
              {formatDate(new Date(state.memo["dateCreated"]))}
            </span>
          </div>
          <div className="text-memoblue-400 font-black font-sans text-2xl w-6/12">
            <p className="text-wrap line-clamp-2">{state.memo["title"]}</p>
          </div>
          <div className="py-4 text-xs"></div>
          <TechretaryButton />
          <Editable
            isEditable={state.isEditable}
            className="bg-none font-handwriting text-sm text-memoneutral-800 overflow-y-scroll grow my-4"
            content={state.memo["body"]}
            onSetContent={(e) => onSetContent(e)}
            onClickLink={(link) => onClickLink(link)}
          />
          <MemoFooter
            onPrevious={handlePrevious}
            onNext={handleNext}
            hasPrev={false}
            hasNext={true}
          />
        </>
      )}
    </div>
  );
};

export default Memo;
