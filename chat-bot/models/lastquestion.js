const logger = require("../lib/logger");

var lastQuestionAsked = "Q1";
function LastQuestion() {
    return {}
};

/**
* function to store the chat bot last question details
* @name store
* @param input - question
* @author tamilselvan.p
*/
LastQuestion.store = (input) => {
    
    lastQuestionAsked = input;
    logger.msg('INFO', 'last question asked '+ lastQuestionAsked);
}

/**
* function to get the chat bot last question
* @name get
* @param input - feeback inputs
* @author tamilselvan.p
*/
LastQuestion.get = () => {
    return lastQuestionAsked;
}

/**
* function to clear the chat bot last question
* @name clear
* @param input - question
* @author tamilselvan.p
*/
LastQuestion.reset = () => {
    lastQuestionAsked = "Q1";
}

module.exports = LastQuestion;