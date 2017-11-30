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

const PORT = 3212;
server.listen(PORT, () => console.log("I'm listenin' brotha' on port ", PORT));

io.on('connection', function(socket){
    console.log('a user connected')

    socket.on('question', function(test){
        console.log('successful test');
        io.emit('render')
    })

    socket.on('helper', function(name){
        console.log('successful help');
        io.emit('helped', name)
    })

    socket.on('donezo', function(name){
        console.log('donneee');
        io.emit('doneyo', name)
    })
})

io.on('disconnect', function() {
    console.log('a user disconnected'); 
});