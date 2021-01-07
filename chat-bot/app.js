const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const nconf = require('nconf').file({file: 'config/config.json'});
const logger = require('./lib/logger');
const db = require('./lib/db');
const question = require('./validation/questions');
const validation = require('./validation/validation');
const feedback = require('./models/feedback');
const lastQuestion = require('./models/lastquestion');

logger.config(nconf.get('loggerConfig'));
db.config(nconf.get("dbConfig").url, nconf.get("dbConfig").dbname);
app.use(express.static(path.join(__dirname,'./public')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  feedback.clearLocalUserInput();
  lastQuestion.reset();
  socket.on('joining msg', () => {
  	io.emit('message', 'Thank you very much for taking the time to interview the candidate. \n Request you to give your valuable feedback so that the best-qualified applicant gets the job.');
    io.emit('message', question.Q1.question);
  });

  socket.on('message', (msg) => {
    botReply(msg);
  });
});

botReply = (msg) => {
  logger.msg('INFO', 'Input from user' + msg);
  validation.validateMessageAndMoveNext(msg, io);
}

server.listen(nconf.get('port'), () => {
  console.log("Express server listening on port " + nconf.get('port'));
  logger.msg("INFO","Express server listening on port " + nconf.get('port'))
});


