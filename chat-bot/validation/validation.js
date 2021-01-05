
const question = require('./questions');
const logger = require('../lib/logger');
const candidates = require('../models/candidates');
const feedback = require('../models/feedback');
const constants = require('./constants');
const { updateCandidateDetails } = require('../models/candidates');
const LastQuestion = require('../models/lastquestion');

function Validation() {
    return {}
};


/**
* function to validate date
* @name isValidDate
* @param input - User input
* @param io - socket listener
* @returns True/False
* @author tamilselvan.p
*/
Validation.isValidDate = ( input) => {
    var regex = /^([0-9]{4})-([0-1]{1})([0-9]{1})-([0-3]{1})([0-9]{1})$/
    input = input.trim();
    //Validate input value against the Regex.
    var isValid = regex.test(input);   
    return isValid;
};


/**
* function to validate alphabets only
* @name isAlphabets
* @param input - User input
* @param io - socket listener
* @returns True/False
* @author tamilselvan.p
*/
Validation.isAlphabets = (input) => {
    var regex = /^[A-Za-z]+$/
    input = input.trim();
    //Validate input value against the Regex.
    var isValid = regex.test(input);
    return isValid;
};

/**
* function to validate the email
* @param input - User input
* @param io - socket listener
* @returns True/False
* @author tamilselvan.p
*/
Validation.isValidEmail = ( input ) => {
    var regex = /\S+@\S+\.\S+/
    input = input.trim();
    //Validate input value against the Regex.
    var isValid = regex.test(input);
    return isValid;
};

/**
* function to validate confirmation option
* @name isValidConfirmation
* @param input - User input
* @param io - socket listener
* @returns True/False
* @author tamilselvan.p
*/
Validation.isValidConfirmation = ( input ) => {
    var enums = ["YES", "NO"];
    input = input.trim();
    var isValid = (enums.indexOf(input.toUpperCase()) >= 0);
    return isValid;
};

/**
* function to validate user selection
* @name isValidSelection
* @param input - User input
* @param io - socket listener
* @returns True/False
* @author tamilselvan.p
*/
Validation.isValidSelection = ( input) => {
    var enums = [1, 2, 3, 4];
    input = input.trim();
    var isValid = (enums.indexOf(input.toUpperCase()) < 0);
    return isValid;
};


/**
* function to validate user inputs
* @name validateMessageAndMoveNext
* @param msg - User input
* @param io - socket listener
* @returns String - next question
* @author tamilselvan.p
*/
Validation.validateMessageAndMoveNext = (msg, io) => {
    switch(LastQuestion.get()){
      case 'Q1':
                if(Validation.isValidDate(msg)) {
                  LastQuestion.store(question.Q1.next);
                  io.emit('message', question[LastQuestion.get()].question);
                }else{
                  io.emit("message", question.Q1.error);
                }
                break;
      case 'Q2':
                if(Validation.isAlphabets(msg)) {
                  LastQuestion.store(question.Q2.next);
                  io.emit('message', question[LastQuestion.get()].question);
                }else{
                  io.emit("message", question.Q2.error);
                }
                break;
      case 'Q3':
                if(Validation.isValidEmail(msg)) {
                  feedback.storeLocalUserInput({email:msg.trim()});
                  candidates.getCandidateDetails(feedback.getLocalUserInput(), function(err, result){
                    if(!err){
                      LastQuestion.store(question.Q3.next);
                      io.emit('message', question[LastQuestion.get()].question + "\n" + result);  
                    }else{
                      io.emit('message', result); 
                    }
                   });
                }else{
                  io.emit("message", question.Q3.error);
                }
                break;
      case 'Q4':
                if(Validation.isValidConfirmation(msg)) {
                    if (msg.toUpperCase() === "NO"){
                        io.emit('message', 'Thank you very much for taking the time to interview the candidate.');
                        io.emit('message', 'Request you to give your valuable feedback so that the best-qualified applicant gets the job.');
                        io.emit('message', question.Q1.question);
                        LastQuestion.reset();
                    }else{
                        LastQuestion.store(question.Q4.next);
                        io.emit('message', question[LastQuestion.get()].question);
                    }
                }else{
                  io.emit("message", question.Q4.error);
                }
                break;
      case 'Q5':
                if(Validation.isValidSelection(msg)) {
                  feedback.storeLocalUserInput({[question.Q5.key]: constants.Selection[msg]});
                  LastQuestion.store(question.Q5.next);
                  io.emit('message', question[LastQuestion.get()].question);
                }else{
                  io.emit("message", question.Q5.error);
                }
                break;    
      case 'Q6':
                if(Validation.isValidSelection(msg)) {
                  feedback.storeLocalUserInput({[question.Q6.key]: constants.Selection[msg]});
                  LastQuestion.store(question.Q6.next);
                  io.emit('message', question[LastQuestion.get()].question);
                }else{
                  io.emit("message", question.Q6.error);
                }
                break;
      case 'Q7':
                if(Validation.isValidSelection(msg)) {
                  feedback.storeLocalUserInput({[question.Q7.key]: constants.Selection[msg]});
                  LastQuestion.store(question.Q7.next);
                  io.emit('message', question[LastQuestion.get()].question);
                }else{
                  io.emit("message", question.Q7.error);
                }
                break;
      case 'Q8':
                if(Validation.isValidSelection(msg)) {
                  feedback.storeLocalUserInput({[question.Q8.key]: constants.Selection[msg]});
                  feedback.insertCandidateFeedbackDetails(function(err, id){
                    LastQuestion.store(question.Q8.next);
                    io.emit('message', question[LastQuestion.get()].question);
                  })
                }else{
                  io.emit("message", question.Q8.error);
                }
                break;
      default:
              LastQuestion.reset();
              io.emit('message', question[LastQuestion.get()].question);

    }
  }

 
module.exports = Validation;
