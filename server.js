const cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var cars = ["欢迎", "Welcome", "ยินดีตอนรับ", "어서 오십시오", "ようこそ"];
var i = 0;
const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'public')));
app.get('/cool', (req, res) => res.send(cool()))
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/HtmlPage.html');
    //__dirname : It will resolve to your project folder.
});
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/a.html');
    console.log('about');
    //__dirname : It will resolve to your project folder.
});
io.sockets.on('connection', (socket) => {
    console.log("clinet connect");
    sendData(socket);
});
http.listen(PORT, function () {
    console.log('listening on *3000');

});
function sendData(socket) {
    if (i == cars.length)
    {
        i = 0;
    }
    socket.emit('name', cars[i]);
    setTimeout(() => {
        sendData(socket);
    }, 1000);
    i++;
}
