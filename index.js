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

// app.get('/', function(req, res) {
//   //req.session.username = req.params.username;
//   res.render('index', {
//     username: req.session.username
//   });
// });


var stories = [{
    id: "1",
    heading: "Thandekile Mbele",
    content: "Hello, My name is Thandekile Mbele. I am 48 years Old. I Live in Tanzania. I worked as a Pre School Teacher in the nearby village.I have five children, 2 Sons and 3 Daughters. I am a single parent and i am Responsible for all my children. It was not easy, because there was a time where i would just break into tears, not knowing what to do and not do, sometimes my children would get kicked out of school because school fees. Sometimes they would sleep on a empty stomach. We sometimes use the plants to help with our meals, but its not always enough. Through it all i always made sure that i send my children to shool no matter what... One day i was in a taxi to work, when heard my fellow mates talking about a company called Jumo that has been assisting them with Loans, at first i was scared to take the loan just incase i lose the little bit that i have currently until my friend told me how reasonable it is, I decided to apply for the loan because my elder daughter had Matriculated and she needed to go to varsity, she needed textbooks and Tuition fees.. Jumo gave me the Loan, My daughter just graduated with her Masters in Science and Technology. She has found a Job in New york City.. I would really like to thank Jumo for the extra Hand, and i would encourage anyOne to take the loan in time of need, it was really worth it.",
    likeCount: 0,
    photoName : "storypic1"
  },
  {
    id: "2",
    heading: "Siyabonga Khumalo",
    content: "Graduation is a pivotal moment in the life of a student. It’s the point at which they leave behind something that has defined them for years. Their time at university has come to a seemingly abrupt end, and their lives could now be taking a dramatically different turn. With all the other things on their mind, does their university still fit into that new life? Hello, My name is Siyabonga Khumalo. I am 30 years old. I come from KZN. At first my parents were evicted from their house, I was a junior in high school.  It was the Monday after junior prom, and I came home to the yellow eviction notice on our front door. My mom was crying, and our living room was filled with boxes. Shortly after that, we moved into a back house in my Uncles House. We lived there for two months, we all Know how uncles can be, especially when they see you have fallen. Until that point, I had always been a good student. I got good grades, was involved with extracurriculars and had good relationships with friends and teachers. But the minute I saw that eviction notice, I was filled with fear. Due to all the stress and pain, my Mother passed away, I was all Alone.  What am i going to do? How would I ever be able to afford college/University.. This is where I came to learn about Jumo Loans, They helped me survive. Luckily, I inherited my parents stubbornness and a steel resolve to finish high school and ultimately go to college. But I also had something else, something I never would have survived without: dance, and the network of teachers, friends, parents and mentors I met as a result. Dancing quickly became my escape. Dance was always there for me, and I have seen it do the same for other kids. I know the risk of me not getting to college or maybe even finishing high school would have been that much higher. And I would not be where I am now. This past May, I graduated with my Bachelor of Arts in Political Science from the Durban University of Technology. This past August, I started a masters program in Public Administration at the School of Government at the University of the Witwatersrand. It has been five years since the first eviction.I now live in my own apartment. Thanks to Jumo.",
    likeCount: 0,
    photoName : "storypic2"
  },
  {
    id: "3",
    heading: "Varsity students",
    content: "Like the very many people before me, my high school years are coming to an end; in fact next week, I’ll have my last few lessons, clear out my locker one last time, say my final goodbyes to classmates and teachers and eventually matriculate with all my peers. I know there are a lot of students going through the same thing, welcome aboard this scary ride: destination unknown. Perhaps some people think that matriculating from high school is just a tiny chapter in our big book called Life, and there are more important events to come, but to me, it’s a pretty huge milestone. That was me Two years Ago! Good Day, I am Nonkwenkwezi Macanda, 20 years of age, I reside in the rural Areas of Limpompo. I come from a family of 3, My father that was the breadwinner of the Family Passed away in when i was doing my grade 5, It was not easy because my Mother is disabled, and we have been living through her disability Grant! .. As the years kept going, It kept getting hard because we had More needs as the Family, Our real struggles is Going for days without food and knowing that you have to walk for killometers everyday, No textbooks, Raggy school uniforms, you name it. All that made success my Top Priority because depending on my Mom would be a step Back thinking she might leave us anytime. My friend told me how his Mother had taken a Loan from a Company called Jumo, So i decided to apply for it so i dont stress my Mom with tuition money and all the requirements, I am now able to provide for my family and still meet my needs for unversity. I am now Studing towards my Degree in Medicine, So far so good. When i graduate i want to give back to my community by building better schools and providing JObs for people in the surrounding areas so that they will be able to  get the opportunity i did not get, but before i do that i would like to thank Jumo for bring there for us.",
    likeCount: 0,
    photoName : "storypic3"
  },
  {
    id: "4",
    heading: "The success story of Eric Muthomi ",
    content: "Like maize, rice and wheat, fruit and vegetables are one of the most important and widely eaten food staples in East Africa. Kenya, Uganda, Tanzania, Rwanda and Burundi are among the world’s largest producers and people in my country eat approximately up to 400 kilograms of fruit and vegetables every year – the highest consumption rate in the world..Thanks to Jumo for taking part on building and bringing my idea to reality. Now I can see my business growing and employing more people in my area and taking my business to the next level. Thanks again, JUMO",
    likeCount: 0,
    photoName : "storypic4"
  },
  {
    id: "5",
    heading: "Football Gear",
    content: "Thanks to Jumo we were able to buy new football kits for our under 15 Africa boys football league. Without you guys this would not have been possible. I would like to give you some feedback about the accomplishments that was achieved this year. One of our strongest and most competitive leagues is the Under 15 All Out Africa boys football league. The annual league has been running since 2011 and has gained momentum ever since. Competing in a double-round-robin format,  12 teams compete in this highly competitive environment. Important life skills including respect, teamwork and communication are encouraged in this fair play competitive football league. Jumo you rock.",
    likeCount: 0,
    photoName : "storypic5"
  },
  {
    id: "6",
    heading: "Grade 3 students got textbooks",
    content: "My Name is Martin Koopman, I was teaching at a school called Rusthof secondary school, but I have retired. I am very familiar with the issue of scarcity of books at the  townships. While I was waiting for my pension I took a loan with Jumbo they were very helpful and I managed to sponsor a primary school with grade 3 textbooks, I am very grateful I could be of help. Thank you Jumo.",
    likeCount: 0,
    photoName : "storypic6"
  },

];

var userLikes = {
};

app.get('/', function(req, res) {
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

  res.redirect('/')

});

var port = process.env.PORT || 3007;
http.listen(port, function() {
  console.log('running at port :', port)
});
