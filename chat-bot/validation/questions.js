'use strict';


module.exports = {
    "Q1" : {
        "question"   : "To start with, please mention the date (YYYY-MM-DD) of the interview.\n So, that we can cross check it with our interview schedule.",
        "key"       : "validateDate",
        "error"      : "Please, enter a valid date in the format of YYYY-MM-DD",
        "next"       : "Q2"
    },
    "Q2" : {
        "question"   : "And can I have candidate name please? ",
        "key"       : "validateString",
        "error"      : "Please, enter a valid name",
        "next"       : "Q3"
    },
    "Q3" : {
        "question"   : "And lastly can I have candidate email address?",
        "key"       : "validateEmail",
        "error"      : "Please, enter a valid email",
        "next"       : "Q4"
    },
    "Q4" : {
        "question"   : "Please, confirm the candidate details below with Yes/No \n",
        "key"       : "confirmCandidate",
        "error"      : "Please, enter only Yes/No",
        "next"       : "Q5"
    },
    "Q5" : {
        "question"   : "Does the candidate have the appropriate educational qualifications or training for this position? \n 1. Exceptional \n 2. Good \n 3. Average \n 4. Bad",
        "key"       : "EducationalAndTraining",
        "error"      : "Please, enter only the number from 1 to 4",
        "next"       : "Q6"
    },
    "Q6" : {
        "question"   : "And does the candidate have the technical skills necessary for this position? \n 1. Exceptional \n 2. Good \n 3. Average \n 4. Bad",
        "key"       : "TechnicalSkills",
        "error"      : "Please, enter only the number from 1 to 4",
        "next"       : "Q7"
    },
    "Q7" : {
        "question"   : "How were the candidate’s communication skills during the interview? \n 1. Exceptional \n 2. Good \n 3. Average \n 4. Bad",
        "key"       : "CommunicationSkills",
        "error"      : "Please, enter only the number from 1 to 4",
        "next"       : "Q8"
    },
    "Q8" : {
        "question"   : "So, what are your final ratings for this candidate?\n 1. Exceptional \n 2. Good \n 3. Average \n 4. Bad",
        "key"        : "Overall",
        "error"      : "Please, enter only the number from 1 to 4",
        "next"       : "Q9"
    },
    "Q9" : {
        "question"   : "Thank you for your time and effort. \n Your feedback is really valuable to us. \n Have a nice day",
        "key"        : "ThankYouNote",
        "next"       : ""
    }
}