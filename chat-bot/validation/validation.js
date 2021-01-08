
const question = require('./questions');
const logger = require('../lib/logger');
const candidates = require('../models/candidates');
const feedback = require('../models/feedback');
const constants = require('./constants');
const LastQuestion = require('../models/lastquestion');
const PreviousQuestion = require('../models/previousquestion');

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
    var regex = /^[A-Za-z0-9]+$/
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
    logger.msg("INFO", "isValidConfirmation  " + (enums.indexOf(input) >= 0))
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
Validation.isValidSelection = (input) => {
    var enums = ["1", "2", "3", "4"];
    input = input.trim();
    logger.msg("INFO", "Selection Creteria " + (enums.indexOf(input) >= 0))
    var isValid = (enums.indexOf(input) >= 0);
    return isValid;
};

/**
* function to validate user selection
* @name isStart
* @param input - User input
* @param io - socket listener
* @returns True/False
* @author tamilselvan.p
*/
Validation.isStart = (input) => {
  var enums = ["START"];
  input = input.trim();
  logger.msg("INFO", "is Start  " + (enums.indexOf(input.toUpperCase()) >= 0));
  var isValid = (enums.indexOf(input.toUpperCase()) >= 0);
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
      case 'Q0':
                if(Validation.isValidConfirmation(msg)) {
                  if (msg.toUpperCase() === "NO"){
                    if(PreviousQuestion.get() !== "Q1"){
                      LastQuestion.store(PreviousQuestion.get());
                      io.emit('message', question[LastQuestion.get()].question);
                    }else{
                      LastQuestion.store("Q9");
                      io.emit('message', "Thank you! See you again");
                    }
                  }else{
                      feedback.clearLocalUserErrorCount();
                      LastQuestion.reset();
                      io.emit('message', question[LastQuestion.get()].question);
                  }
                }else{
                  io.emit("message", question.Q0.error);
                }
                break;
      case 'Q1':
                if(Validation.isValidDate(msg)) {
                  feedback.clearLocalUserInput();
                  feedback.storeLocalUserInput({interview_date: msg.trim()});
                  candidates.interviewDateExists(feedback.getLocalUserInput(), function(err, result){
                    if(!err){
                      LastQuestion.store(question.Q1.next);
                      io.emit('message', question[LastQuestion.get()].question);  
                    }else{
                      feedback.increamentLocalUserErrorCount();
                      if(feedback.getLocalUserErrorCount() > constants.QUESTION_RESET_ON_ERROR_COUNT){
                        PreviousQuestion.store(LastQuestion.get());
                        LastQuestion.store("Q0");
                        io.emit('message', question[LastQuestion.get()].question)
                      }else{
                        io.emit('message', `We don't find any records for the ${JSON.stringify(feedback.getLocalUserInput())}. Please, enter valid data`); 
                      }
                    }
                   });
                }else{
                  io.emit("message", question.Q1.error);
                }
                break;
      case 'Q2':
                if(Validation.isAlphabets(msg)) {
                  feedback.storeLocalUserInput({name: msg.trim()});
                  candidates.getCandidateDetails(feedback.getLocalUserInput(), function(err, result){
                    if(!err){
                      LastQuestion.store(question.Q2.next);
                      io.emit('message', question[LastQuestion.get()].question);  
                    }else{
                      feedback.increamentLocalUserErrorCount();
                      if(feedback.getLocalUserErrorCount() > constants.QUESTION_RESET_ON_ERROR_COUNT){
                        PreviousQuestion.store(LastQuestion.get());
                        LastQuestion.store("Q0");
                        io.emit('message', question[LastQuestion.get()].question)
                      }else{
                        if(typeof result === "string"){
                          io.emit('message', result);
                        }else{
                          io.emit('message', `We don't find any records for the ${JSON.stringify(feedback.getLocalUserInput())}. Please, enter valid data`); 
                        }
                      }
                    }
                   });
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
                      feedback.storeLocalUserInput({ candidateId: result._id});
                      let info = `Candidate name: ${result.name} \n Job Title: ${result.jobTitle} \n Experience: ${result.experience} \n`;
                      io.emit('message', question[LastQuestion.get()].question + "\n" + info);  
                    }else{
                      feedback.increamentLocalUserErrorCount();
                      if(feedback.getLocalUserErrorCount() > constants.QUESTION_RESET_ON_ERROR_COUNT){
                        PreviousQuestion.store(LastQuestion.get());
                        LastQuestion.store("Q0");
                        io.emit('message', question[LastQuestion.get()].question)
                      }else{
                        io.emit('message', `We don't find any records for the ${JSON.stringify(feedback.getLocalUserInput())}. Please, enter valid data`); 
                      }
                    }
                   });
                }else{
                  io.emit("message", question.Q3.error);
                }
                break;
      case 'Q4':
                if(Validation.isValidConfirmation(msg)) {
                    if (msg.toUpperCase() === "NO"){
                        feedback.clearLocalUserInput();
                        io.emit('message', 'Thank you very much for taking the time to interview the candidate.');
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
      case 'Q9':
                if(Validation.isStart(msg)) {
                  feedback.clearLocalUserErrorCount();
                  LastQuestion.reset();
                  io.emit('message', question[LastQuestion.get()].question);
                }else{
                  io.emit("message", "Please, type 'start' to begin again");
                }
                break;
      case 'Q10':
                if(Validation.isValidSelection(msg)) {
                  LastQuestion.store(question.Q10.next[msg.trim()]);  
                  io.emit('message', question[LastQuestion.get()].question);
                }else{
                  io.emit("message", question.Q10.error);
                }
                break;
      case 'Q11':
                if(Validation.isAlphabets(msg)) {
                  feedback.clearLocalUserInput();
                  feedback.clearLocalUserErrorCount();
                  feedback.storeLocalUserInput({name: msg.trim()});
                  feedback.getFeedbackDetails(feedback.getLocalUserInput(), function(err, result){
                    if(!err){
                      LastQuestion.store(question.Q11.next);
                      io.emit('message', question[LastQuestion.get()].question);  
                    }else{
                      io.emit('message', `We don't find any records for the ${JSON.stringify(feedback.getLocalUserInput())}. Please, enter valid data`); 
                    }
                    });
                }else{
                  io.emit("message", question.Q11.error);
                }
                break;
      case 'Q12':
                if(Validation.isValidEmail(msg)) {
                  feedback.storeLocalUserInput({email:msg.trim()});
                  feedback.getFeedbackDetails(feedback.getLocalUserInput(), function(err, result){
                    if(!err){
                      LastQuestion.store(question.Q12.next);
                      let info = `Hi ${result.name}, You have cleared previous round of the interview, will get a call back from HR soon. Please contact HR department for more information`;
                      io.emit('message', info);  
                    }else{
                      io.emit('message', `We don't find any records for the ${JSON.stringify(feedback.getLocalUserInput())}. Please, enter valid data`); 
                    }
                    });
                }else{
                  io.emit("message", question.Q3.error);
                }
                break;            
      case 'Q13':
                if(Validation.isValidSelection(msg)) {
                  feedback.clearLocalUserInput();
                  feedback.clearLocalUserErrorCount();
                  LastQuestion.store(question.Q13.next);
                  io.emit("message", "Please, contact HR for further details and interview schedules");
                }else{
                  io.emit("message", question.Q13.error);
                }
                break;            
        default:
                LastQuestion.reset();
                io.emit('message', 'Thank you very much for taking the time to interview the candidate.');
                io.emit('message', question[LastQuestion.get()].question);
    }
  }

module.exports = Validation;