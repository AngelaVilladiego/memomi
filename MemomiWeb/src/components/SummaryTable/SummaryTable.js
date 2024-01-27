import React from "react";
import "./SummaryTable.css";

const SummaryTable = () => {
    const tableClasses = "ml-10 mr-10 w-full table-fixed border-collapse border-t-2 border-b-2 border-off-blue bg-off-white"
    const memos = {Titles:["Title1", "Title2", "Title3"], Dates:["Date1", "Date2", "Date3"]}

    const redirect =() => {
        console.log("redirecting...");
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <table className={`top ${tableClasses}`}>
                <th>Title</th>
                <th>Date</th>
                {memos["Titles"].map((Title, index) => (
                    <tr className="hover:cursor-pointer hover:bg-memoyellow-100" onClick={redirect}>
                        <td>
                            {Title}
                        </td>
                        <td>
                            {memos["Dates"][index]}
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default SummaryTable;