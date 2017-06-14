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
    heading: "Story 1",
    content: "Hello, My name is Thandekile Mbele. I am 48 years Old. I Live in Tanzania. I worked as a Pre School Teacher in the nearby village.I have five children, 2 Sons and 3 Daughters. I am a single parent and i am Responsible for all my children. It was not easy, because there was a time where i would just break into tears, not knowing what to do and not do, sometimes my children would get kicked out of school because school fees. Sometimes they would sleep on a empty stomach. We sometimes use the plants to help with our meals, but its not always enough. Through it all i always made sure that i send my children to shool no matter what... One day i was in a taxi to work, when heard my fellow mates talking about a company called Jumo that has been assisting them with Loans, at first i was scared to take the loan just incase i lose the little bit that i have currently until my friend told me how reasonable it is, I decided to apply for the loan because my elder daughter had Matriculated and she needed to go to varsity, she needed textbooks and Tuition fees.. Jumo gave me the Loan, My daughter just graduated with her Masters in Science and Technology. She has found a Job in New york City.. I would really like to thank Jumo for the extra Hand, and i would encourage anyOne to take the loan in time of need, it was really worth it.",
    likeCount: 0,
    photoName : "storypic1"
  },
  {
    id: "2",
    heading: "Story 2",
    content: "",
    likeCount: 0,
    photoName : "storypic2"
  },
  {
    id: "3",
    heading: "Story 3",
    content: "",
    likeCount: 0,
    photoName : "storypic3"
  },
  {
    id: "4",
    heading: "",
    content: "",
    likeCount: 0,
    photoName : "storypic4"
  },
  {
    id: "5",
    heading: "",
    content: "",
    likeCount: 0,
    photoName : "storypic5"
  },
  {
    id: "6",
    heading: "",
    content: "",
    likeCount: 0,
    photoName : "storypic6"
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
