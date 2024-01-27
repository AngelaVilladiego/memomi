import os
from dotenv import load_dotenv
import cohere
import re

load_dotenv()
API_KEY = os.getenv('COHERE_API_KEY')

co = cohere.Client(API_KEY)

PROMPT_COMMAND = "Extract a list of important topic nouns and key phrases from the following text. Without changing or adding anything, give me a list of the 10 that are most likely to be the title of new note and wrap each one in quotes."
WORD_NUM = 54
RANDOMNESS = 0.2
TOPK = 14

def removeExistingLinks(suggestions, linksToMemos):
    cleanedSuggestions = []
    for sug in suggestions:
        sStartIdx = sug["suggestionIndexes"]["startIdx"]
        sEndIdx = sug["suggestionIndexes"]["endIdx"]
        isValid = True
        for link in linksToMemos:
            lStartIdx = link["linkIndexes"]["startIdx"]
            lEndIdx = link["linkIndexes"]["endIdx"]

            dodgeRange = range(lStartIdx, lEndIdx + 1)

            if sStartIdx in dodgeRange or sEndIdx in dodgeRange:
                isValid = False
                break

        if (isValid):
            cleanedSuggestions.append(sug)

    return cleanedSuggestions


def getSuggestionIndexes(text, topics):
    newMemoSuggestions = []
    topics = set(topics)
    for topic in topics:
        startIdxs = [m.start() for m in re.finditer(topic.lower(), text.lower())]
        startIdxs = startIdxs
        for startIdx in startIdxs:
            suggestion = {"suggestedTitle": topic}
            endIdx = startIdx + len(topic)
            suggestion["suggestionIndexes"] = {"startIdx": startIdx, "endIdx": endIdx}
            newMemoSuggestions.append(suggestion)

    return newMemoSuggestions


def generateTopicKeywords(text):
    response = co.generate(  
        model='command',  
        prompt = PROMPT_COMMAND + "\n\n" + text,  
        max_tokens=WORD_NUM * 3,
        k=TOPK, # This parameter is optional. 
        temperature=RANDOMNESS,)

    return response.generations[0].text

def getMemoSuggestionsList(text):
    response = generateTopicKeywords(text)
    topics = re.findall(r'"([^"]*)"', response)
    newMemoSuggestions = getSuggestionIndexes(text, topics)
    return newMemoSuggestions

p = "Subject: Project Update Meeting Summary\nDate: January 27, 2024\nParticipants:\n    Alex Thompson\n    Emily Rodriguez\n    Jason Miller\n    Sarah Anderson (Manager)\nMeeting Highlights:\n    Project Status:\n        Confirmed completion of Phase 1 milestones, including successful implementation of the user authentication module.\n        Discussed outstanding issues with the database optimization.\n    Upcoming Deadlines:\n        Set a revised deadline for finalizing the user interface redesign by February 5, 2024.\n        Agreed on a priority list for pending deliverables, with emphasis on the API integration due by February 15, 2024.\n    Challenges:\n        Addressed issues with server response time during peak hours.\n        Proposed solutions, with Jason assigned to conduct a performance analysis and provide recommendations by January 31, 2024.\n    Resource Allocation:\n        Identified the need for additional support in quality assurance testing.\n        Ensured Emily has access to the necessary testing environments and resources.\n    Client Communication:\n        Shared positive client feedback on the prototype's usability.\n        Discussed plans to enhance communication channels, including scheduling a client demo on February 10, 2024.\n    Action Items:\n        Emily Rodriguez: Finalize the user interface redesign by February 5, 2024.\n        Jason Miller: Conduct a performance analysis and provide recommendations by January 31, 2024.\n        Alex Thompson: Coordinate with the testing team to ensure comprehensive coverage for the upcoming API integration.\n    Next Meeting:\n        Scheduled the next project update meeting for February 3, 2024, at 10:00 AM.\n        Agreed to focus on reviewing the finalized user interface and addressing any outstanding issues with the database optimization.\nPlease review, and feel free to provide any additional details or clarifications.\nBest,\nAlex Thompson\nLead Developer"
