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

const PORT = 3212;
server.listen(PORT, () => console.log("I'm listenin' brotha' on port ", PORT));

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });

    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
});