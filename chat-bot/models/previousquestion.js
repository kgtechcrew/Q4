const logger = require("../lib/logger");

var previousQuestionAsked = "";
function PreviousQuestion() {
    return {}
};

/**
* function to store the chat bot previous question details
* @name store
* @param input - question
* @author tamilselvan.p
*/
PreviousQuestion.store = (input) => {
    
    previousQuestionAsked = input;
    logger.msg('INFO', 'previous question asked '+ previousQuestionAsked);
}

/**
* function to get the chat bot previous question
* @name get
* @param input - feeback inputs
* @author tamilselvan.p
*/
PreviousQuestion.get = () => {
    return previousQuestionAsked;
}

/**
* function to clear the chat bot previous question
* @name clear
* @param input - question
* @author tamilselvan.p
*/
PreviousQuestion.reset = () => {
    previousQuestionAsked = "";
}

module.exports = PreviousQuestion;