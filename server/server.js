require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
      controller = require('./controller'),
      massive = require('massive'),
      session = require('express-session'),
      Auth0Strategy = require('passport-auth0'),
      axios = require('axios'),
      cors = require('cors');


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)
app.use(cors());
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then( db => {
        app.set('db', db);
}).catch('err', err => console.log(err))

app.post('/api/addQuestion', controller.addQuestion);
app.get('/api/getquestions', controller.getQuestions);
app.post('/api/help', controller.help);
app.post('/api/remove', controller.remove);
app.get('/api/highscores', controller.getHighscores);
app.post('/api/updatescore',controller.updateScore);
app.get('/api/getuserscore/:name', controller.getUserScore);

const PORT = 3212;
server.listen(PORT, () => console.log("I'm listenin' brotha' on port ", PORT));

io.on('connection', function(socket){
    console.log('a user connected')

    socket.on('mentor', () => {
        socket.join('mentor')
        console.log('someone joined mentor')
    })

    socket.on('student', () => {
        socket.join('student')
        console.log('someone joined studen')
    })

    socket.on('leavementor', () => {
        socket.leave('mentor')
        console.log('some one left mentor')
    })

    socket.on('leavestudent', () => {
        socket.leave('student')
        console.log('some one left student')
    })

    socket.on('question', function(test){
        console.log('successful test');
        io.emit('go')
    })

    socket.on('helper', function(name){
        console.log('successful help');
        console.log(name);
        io.in('student').emit('helped', name)
    })

    socket.on('donezo', function(name){
        console.log('donneee');
        console.log(name);
        io.in('student').emit('doneyo', name)
    })

    socket.on('disconnect', function(socket) {
        console.log('a user disconnected'); 
    });

    
    
})


