import React, { useState, useEffect } from "react";
import MemoHeader from "./MemoHeader";
import "./Memo.css";
import DropdownButton from "../DropdownButton/DropdownButton";
import MemoFooter from "./MemoFooter";
import Editable from "../Editable/Editable";

const Memo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [memoBody, setMemoBody] = useState("");

  useEffect(() => {
    setMemoBody(demoText);
  }, []);

  useEffect(() => {
    if (memoBody) {
      setIsLoading(false);
    }
  }, [memoBody]);

  const handleSave = () => {
    console.log("saving");
  };
  const handlePrevious = () => {
    console.log("previous");
  };
  const handleNext = () => {
    console.log("next");
  };

  const onSetContent = (newContent) => {
    console.log("setNewContent");
  };

  return (
    <div className="flex flex-col myMemo mx-auto rounded-lg border-memoblue-400 border-2 h-full grow aspect-[5/7] font-sans py-2 px-6">
      <MemoHeader
        onEdit={() => console.log("clickedEdit")}
        onDelete={() => console.log("clickedDelete")}
        iconName="save"
        onIconClick={handleSave}
      />
      <div className="pt-4 w-5/12 ms-auto self-end border-b-2 border-memoblue-400 font-sans font-semibold text-xs text-memoblue-400">
        <span>Date</span>
        <span className="font-handwriting text-xl align-baseline text-memoneutral-800 ps-8">
          Jan 27, 2023
        </span>
      </div>
      <div className="text-memoblue-400 font-black font-sans text-2xl w-6/12">
        <p className="text-wrap line-clamp-2">Morning Team Meeting</p>
      </div>
      <div className="py-4 text-xs">"tags go here"</div>
      <DropdownButton />
      <Editable
        className="bg-none font-handwriting text-sm text-memoneutral-800 overflow-y-scroll grow my-4"
        content={memoBody}
        onSetContent={(newContent) => onSetContent(newContent)}
      />
      <MemoFooter
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrev={false}
        hasNext={true}
      />
    </div>
  );
};

export default Memo;

let demoText =
  'Subject: <span style="color:red;">Project Update Meeting</span> Summary\nDate: January 27, 2024\nParticipants:\n    Alex Thompson\n    Emily Rodriguez\n    Jason Miller\n    Sarah Anderson (Manager)\nMeeting Highlights:\n    Project Status:\n        Confirmed completion of Phase 1 milestones, including successful implementation of the user authentication module.\n        Discussed outstanding issues with the database optimization.\n    Upcoming Deadlines:\n        Set a revised deadline for finalizing the user interface redesign by February 5, 2024.\n        Agreed on a priority list for pending deliverables, with emphasis on the API integration due by February 15, 2024.\n    Challenges:\n        Addressed issues with server response time during peak hours.\n        Proposed solutions, with Jason assigned to conduct a performance analysis and provide recommendations by January 31, 2024.\n    Resource Allocation:\n        Identified the need for additional support in quality assurance testing.\n        Ensured Emily has access to the necessary testing environments and resources.\n    Client Communication:\n        Shared positive client feedback on the prototype\'s usability.\n        Discussed plans to enhance communication channels, including scheduling a client demo on February 10, 2024.\n    Action Items:\n        Emily Rodriguez: Finalize the user interface redesign by February 5, 2024.\n        Jason Miller: Conduct a performance analysis and provide recommendations by January 31, 2024.\n        Alex Thompson: Coordinate with the testing team to ensure comprehensive coverage for the upcoming API integration.\n    Next Meeting:\n        Scheduled the next project update meeting for February 3, 2024, at 10:00 AM.\n        Agreed to focus on reviewing the finalized user interface and addressing any outstanding issues with the database optimization.\nPlease review, and feel free to provide any additional details or clarifications.\nBest,\nAlex Thompson\nLead Developer';
