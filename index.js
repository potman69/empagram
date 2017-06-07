const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');

const LightRoutes = require('./light-routes');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
  secret: '@pp Factori3',
  resave: false,
  saveUninitialized: true
}))

app.use(flash());

//setup handlebars
app.engine('hbs', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

const lightRoutes = LightRoutes();

app.get('/', lightRoutes.index);
app.post('/light', lightRoutes.light);

var port = process.env.port || 3007;
http.listen(port, function(){
    console.log('running at port :' , port)
});
