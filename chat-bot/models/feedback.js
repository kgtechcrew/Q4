const mongodb = require("../lib/db");
const logger = require("../lib/logger");
var _ = require('lodash');
var ObjectId = require('mongodb').ObjectID;

var currentCandidate = {};
var userErrorCount   = 0;
function Feedback() {
    return {}
};

/**
* function to store the chat bot feedback details
* @name storeLocalUserInput
* @param input - feeback inputs
* @author tamilselvan.p
*/
Feedback.storeLocalUserInput = (input) => {
    
    currentCandidate = Object.assign(currentCandidate, Feedback.replaceDotWithUnderscore(input));
    logger.msg('INFO', 'Current Candidate Feedback Captured '+ JSON.stringify(currentCandidate))
}

/**
* function to store the chat bot feedback details
* @name getLocalUserInput
* @param input - feeback inputs
* @author tamilselvan.p
*/
Feedback.getLocalUserInput = () => {
    return currentCandidate;
}

/**
* function to store the chat bot feedback details
* @name clearLocalUserInput
* @param input - feeback inputs
* @author tamilselvan.p
*/
Feedback.clearLocalUserInput = () => {
    currentCandidate = {};
}



/**
* function to store the user error count
* @name increamentLocalUserErrorCount
* @param input - feeback inputs
* @author tamilselvan.p
*/
Feedback.increamentLocalUserErrorCount = () => {
    
    userErrorCount++;
    logger.msg('INFO', 'User Error COunt : '+ userErrorCount)
}

/**
* function to get the user error count
* @name getLocalUserErrorCount
* @author tamilselvan.p
*/
Feedback.getLocalUserErrorCount = () => {
    return userErrorCount;
}

/**
* function to clear the user error count
* @name clearLocalUserErrorCount
* @author tamilselvan.p
*/
Feedback.clearLocalUserErrorCount = () => {
    userErrorCount = 0;
}

/**
* function to get candidate info basedon user input
* @name insertCandidateFeedbackDetails
* @param query - candidate search object
* @param callback - callback function to execute the next action
* @author tamilselvan.p
*/
Feedback.insertCandidateFeedbackDetails = (callback) => {
    var dbo = mongodb.getConnection();
    var _id;
    var candidateId = currentCandidate.candidateId;
    dbo.collection("feedback").insertOne(currentCandidate, function(err, res) {
        if(err){
            logger.msg("INFO", "Error inserting feedback document  "+err);
            callback(true, null);
        }else{        
            _id = currentCandidate._id;
            logger.msg("INFO", "feedback details inserted"+_id);
            var newvalues = { $set: { feedback: true, feedbackId: _id } };
            dbo.collection("candidates").updateOne({"_id": new ObjectId(candidateId)}, newvalues, function(err, res) {
                if(err){
                    logger.msg("INFO", "update interview failed "+err);
                    callback(true, null);
                }else{        
                   callback(false, _id);
                }
            });
        }
    });
}


Feedback.replaceDotWithUnderscore = (obj) => {
  _.forOwn(obj, (value, key) => {

    // if key has a period, replace all occurences with an underscore
    if (_.includes(key, '.')) {
      const cleanKey = _.replace(key, /\./g, '');
      obj[cleanKey] = value;
      delete obj[key];
    }

    // continue recursively looping through if we have an object or array
    if (_.isObject(value)) {
      return Feedback.replaceDotWithUnderscore(value);
    }
  });
  return obj;
}

module.exports = Feedback;