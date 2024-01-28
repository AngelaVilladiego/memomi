import React from "react";
import "./SummaryTable.css";

const SummaryTable = ({memos}) => {
    const tableClasses = "w-full table-fixed border-collapse border-t-2 border-b-2 border-off-blue bg-off-white"
    const redirect =() => {
        console.log("redirecting...");
    };

    return (
        <div className="flex items-center justify-top top-0 h-screen font-sans m=0">
            <table className={`top ${tableClasses}`}>
                <th className="font-semibold">Title</th>
                <th className="font-semibold border-2 border-memoblue-400 border-r-transparent">Date</th>
                {memos["Titles"].map((Title, index) => (
                    <tr className="hover:cursor-pointer hover:font-semibold hover:bg-memoyellow-100" onClick={redirect}>
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