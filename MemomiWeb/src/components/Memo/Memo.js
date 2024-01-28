import React, { useState, useEffect } from "react";
import MemoHeader from "./MemoHeader";
import "./Memo.css";
import TechretaryButton from "../TechretaryButton/TechretaryButton";
import MemoFooter from "./MemoFooter";
import Editable from "../Editable/Editable";
import sanitizeHtml from "sanitize-html";
import {
  GetUserMemos,
  GetUserFirstMemo,
  GetUserMemoIds,
} from "../../services/endpoints";
import { GLOBALS } from "../../globals";
import { formatDate } from "../../services/helpers";

const Memo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [memoIds, setMemoIds] = useState([]);
  const [memo, setMemo] = useState({});
  const [canSave, setCanSave] = useState(false);
  let lastSavedBody = demoText;

  const removeTags = (tagged) => {
    return sanitizeHtml(tagged, { allowedTags: [], allowedAttributes: {} });
  };

  useEffect(() => {
    const requestPromise = GetUserFirstMemo(GLOBALS.TEST_USER_ID);
    requestPromise.then((data) => {
      console.log("got:", data);
      setMemo(data);
    });

    const idsRequestPromise = GetUserMemoIds(GLOBALS.TEST_USER_ID);
    idsRequestPromise.then((data) => {
      console.log("got:", data);
      setMemoIds(data);
    });
  }, []);

  useEffect(() => {
    console.log("efffect on memoy");
    if (memo && isLoading) {
      setIsLoading(false);
    }
    setCanSave(removeTags(memo["body"]) != lastSavedBody);
  }, [memo]);

  useEffect(() => {
    console.log("effect can save? ", canSave);
  }, [canSave]);
  const handleSave = () => {
    console.log("saving");
  };
  const handlePrevious = () => {
    console.log("previous");
  };
  const handleNext = () => {
    console.log("next");
  };

  const onSetContent = (e) => {
    setMemo({ ...memo, body: removeTags(e) });
  };

  return (
    <div className="flex flex-col myMemo mx-auto rounded-lg border-memoblue-400 border-2 h-full grow aspect-[5/7] font-sans py-2 px-6">
      {isLoading ? (
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
            onEdit={() => console.log("clickedEdit")}
            onDelete={() => console.log("clickedDelete")}
            iconName="save"
            onIconClick={handleSave}
            canSave={canSave}
          />
          <div className="pt-4 w-5/12 ms-auto self-end border-b-2 border-memoblue-400 font-sans font-semibold text-xs text-memoblue-400">
            <span>Date</span>
            <span className="font-handwriting text-xl align-baseline text-memoneutral-800 ps-8">
              {formatDate(new Date(memo["dateCreated"]))}
            </span>
          </div>
          <div className="text-memoblue-400 font-black font-sans text-2xl w-6/12">
            <p className="text-wrap line-clamp-2">{memo["title"]}</p>
          </div>
          <div className="py-4 text-xs"></div>
          <TechretaryButton />
          <Editable
            className="bg-none font-handwriting text-sm text-memoneutral-800 overflow-y-scroll grow my-4"
            content={memo["body"]}
            onSetContent={(e) => onSetContent(e)}
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

let demoText =
  "Subject: Project Update Meeting Summary\nDate: January 27, 2024\nParticipants:\n    Alex Thompson\n    Emily Rodriguez\n    Jason Miller\n    Sarah Anderson (Manager)\nMeeting Highlights:\n    Project Status:\n        Confirmed completion of Phase 1 milestones, including successful implementation of the user authentication module.\n        Discussed outstanding issues with the database optimization.\n    Upcoming Deadlines:\n        Set a revised deadline for finalizing the user interface redesign by February 5, 2024.\n        Agreed on a priority list for pending deliverables, with emphasis on the API integration due by February 15, 2024.\n    Challenges:\n        Addressed issues with server response time during peak hours.\n        Proposed solutions, with Jason assigned to conduct a performance analysis and provide recommendations by January 31, 2024.\n    Resource Allocation:\n        Identified the need for additional support in quality assurance testing.\n        Ensured Emily has access to the necessary testing environments and resources.\n    Client Communication:\n        Shared positive client feedback on the prototype's usability.\n        Discussed plans to enhance communication channels, including scheduling a client demo on February 10, 2024.\n    Action Items:\n        Emily Rodriguez: Finalize the user interface redesign by February 5, 2024.\n        Jason Miller: Conduct a performance analysis and provide recommendations by January 31, 2024.\n        Alex Thompson: Coordinate with the testing team to ensure comprehensive coverage for the upcoming API integration.\n    Next Meeting:\n        Scheduled the next project update meeting for February 3, 2024, at 10:00 AM.\n        Agreed to focus on reviewing the finalized user interface and addressing any outstanding issues with the database optimization.\nPlease review, and feel free to provide any additional details or clarifications.\nBest,\nAlex Thompson\nLead Developer";
