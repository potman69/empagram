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
app.use(bodyParser.urlencoded({
  extended: false
}));
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
app.engine('hbs', expressHandlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'hbs');

const lightRoutes = LightRoutes();

app.get('/login/:username', function(req, res) {
  req.session.username = req.params.username;
  res.redirect('/')
});

app.get('/who', function(req, res) {
  //req.session.username = req.params.username;
  res.send(req.session.username);
});


//app.post('/light', lightRoutes.light);

app.get('/', function(req, res) {
  //req.session.username = req.params.username;
  res.render('index', {
    username: req.session.username
  });
});


var stories = [{
    id: "1",
    heading: "",
    content: "",
    likeCount: 0
  },
  {
    id: "2",
    heading: "",
    content: "",
    likeCount: 0
  },
  {
    id: "3",
    heading: "",
    content: "",
    likeCount: 0
  },
  {
    id: "4",
    heading: "",
    content: "",
    likeCount: 0
  },
  {
    id: "5",
    heading: "",
    content: "",
    likeCount: 0
  },
  {
    id: "6",
    heading: "",
    content: "",
    likeCount: 0
  },  

];

var userLikes = {
};

app.get('/stories.html', function(req, res) {
  //req.session.username = req.params.username;
  res.render('stories', {
    username: req.session.username,
    stories: stories
  });
});

app.get('/likes', function(req, res){
  res.send({
    stories,
    userLikes
  });
})

app.get('/likeOrUnlike/:storyId', function(req, res) {

  var username = req.session.username;

  if (!username) {
    return res.send('you should be logged in')
  }

  var myLikes = userLikes[username];
  var storyId = req.params.storyId;

  var currentStory = stories.find(function(story) {
    return story.id === storyId;
  })

  if (myLikes === undefined) {
    userLikes[username] = {}
  }
  myLikes = userLikes[username];

  var userStoryInterAction = myLikes[storyId];

  //liking
  if (userStoryInterAction === undefined || !userStoryInterAction) {
    myLikes[storyId] = true;
    currentStory.likeCount++;
  } else { //unliking
    myLikes[storyId] = false;
    currentStory.likeCount--;
  }

  res.redirect('/stories.html')

});

var port = process.env.port || 3007;
http.listen(port, function() {
  console.log('running at port :', port)
});
