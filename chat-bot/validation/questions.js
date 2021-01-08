'use strict';

module.exports = {
    
    "Q0" : {
        "question"   : "Do you want to begin again? Yes/No",
        "key"       : "Begin",
        "error"      : "Please, enter Yes/No",
        "next"       : "Q1"
    },
    "Q1" : {
        "question"   : "To start with, please mention the date (YYYY-MM-DD) of the interview.\n So, that we can cross check it with our interview schedule.",
        "key"       : "validateDate",
        "error"      : "Please, enter a valid date in the format of YYYY-MM-DD",
        "next"       : "Q2"
    },
    "Q2" : {
        "question"   : "Can you enter the candidate name to verify?",
        "key"       : "validateString",
        "error"      : "Please, enter a valid name",
        "next"       : "Q3"
    },
    "Q3" : {
        "question"   : "Can you enter the candidate email address to verify?",
        "key"       : "validateEmail",
        "error"      : "Please, enter a valid email",
        "next"       : "Q4"
    },
    "Q4" : {
        "question"   : "Please, confirm the candidate details below with Yes/No \n",
        "key"        : "confirmCandidate",
        "error"      : "Please, enter only Yes/No",
        "next"       : "Q5"
    },
    "Q5" : {
        "question"   : "Does the candidate have the appropriate educational qualifications or training for this position? \n 1. Exceptional \n 2. Good \n 3. Average \n 4. Bad",
        "key"        : "EducationalAndTraining",
        "error"      : "Please, enter only the number from 1 to 4",
        "next"       : "Q6"
    },
    "Q6" : {
        "question"   : "And does the candidate have the technical skills necessary for this position? \n 1. Exceptional \n 2. Good \n 3. Average \n 4. Bad",
        "key"        : "TechnicalSkills",
        "error"      : "Please, enter only the number from 1 to 4",
        "next"       : "Q7"
    },
    "Q7" : {
        "question"   : "How were the candidate’s communication skills during the interview? \n 1. Exceptional \n 2. Good \n 3. Average \n 4. Bad",
        "key"        : "CommunicationSkills",
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
    },
    "Q10" : {
        "question"   : "Please, choose one of the below \n 1. Interview Feedback \n 2. Interview Status \n 3. Current Openings",
        "key"        : "Options",
        "error"      : "Please, enter only the number from 1 to 3",
        "next"       : {
            1   :   "Q1",
            2   :   "Q11",
            3   :   "Q13" 
        }
    },
    "Q11" : {
        "question"   : "Can you enter the candidate name to verify?",
        "key"        : "validateString",
        "error"      : "Please, enter a valid name",
        "next"       : "Q12"
    },
    "Q12" : {
        "question"   : "Can you enter the candidate email address to verify?",
        "key"        : "validateEmail",
        "error"      : "Please, enter a valid email",
        "next"       : "Q10"
    },
    "Q13" : {
        "question"   : "Below are the positions open in KGISL \n  1. Junior Node.js Developer \n 2. Senior Java Developer \n 3. Senior Web Developer \n 4. Senior Business Analyst",
        "key"        : "validateSelection",
        "error"      : "Please, enter only the number from 1 to 4",
        "next"       : "Q10"
    },
}