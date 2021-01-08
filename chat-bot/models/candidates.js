const mongodb = require("../lib/db");
const logger = require("../lib/logger");
const Feedback = require("./feedback");

function Candidates() {
    return {}
};
/**
* function to get candidate info basedon user input
* @name getCandidateDetails
* @param query - candidate search object
* @param callback - callback function to execute the next action
* @author tamilselvan.p
*/
Candidates.interviewDateExists = (query, callback) => {
    var dbo = mongodb.getConnection();
        dbo.collection("candidates").countDocuments(query,function(err, res) {
            if(err || res === null){
                logger.msg("INFO", err);
                callback(true, "The email address not found in the list");
            }else{
                Feedback.clearLocalUserErrorCount();
                Feedback.storeLocalUserInput(query);
                logger.msg( "INFO", `Data Exists for the ${JSON.stringify(query)} : ${res}`)
                callback(false, res);
            }
        });
}


/**
* function to get candidate info basedon user input
* @name getCandidateDetails
* @param query - candidate search object
* @param callback - callback function to execute the next action
* @author tamilselvan.p
*/
Candidates.getCandidateDetails = (query, callback) => {
    var dbo = mongodb.getConnection();
        dbo.collection("candidates").findOne(query,function(err, res) {
            if(err || res === null){
                logger.msg("ERROR", err);
                callback(true, "The email address not found in the list");
            }else if(res.feedback !== undefined && res.feedback == true){
                logger.msg("INFO", "The feedback has already posted")
                callback(true, "The feedback has already posted");
            }else{
                Feedback.clearLocalUserErrorCount();
                Feedback.storeLocalUserInput(query);
                callback(false, res);
            }
        });
}


module.exports = Candidates;