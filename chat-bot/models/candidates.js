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
Candidates.getCandidateDetails = (query, callback) => {
    var dbo = mongodb.getConnection();
        dbo.collection("candidates").findOne(query,function(err, res) {
            if(err || res === null){
                callback(true, "The email address not found in the list");
            }else if(res.feedback !== undefined && res.feedback == true){
                callback(true, "The feedback has already posted");
            }else{
                Feedback.storeLocalUserInput(query);
                Feedback.storeLocalUserInput({ candidateId: res._id});
                callback(false, `Candidate name: ${res.name} \n Job Title: ${res.jobTitle} \n Experience: ${res.experience} \n`);
            }
        });
}


/**
* function to get candidate info basedon user input
* @name updateCandidateDetails
* @param query - candidate search object
* @param callback - callback function to execute the next action
* @author tamilselvan.p
*/
Candidates.updateCandidateDetails = (query, callback) => {
    var dbo = mongodb.getConnection();
        dbo.collection("candidates").findOne(query,function(err, res) {
            if(err || res === null){
                callback(true, "The email address not found in the list");
            }else{
                Candidates.storeLocalUserInput({ candidateId: res._id});
                callback(false, `Candidate name: ${res.name} \n Job Title: ${res.jobTitle} \n Experience: ${res.experience} \n`);
            }
        });
}

module.exports = Candidates;