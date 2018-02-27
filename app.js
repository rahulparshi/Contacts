var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const schema = require('./schemas/schema');
const mongoose = schema.mongoose;

const UserCredentials = mongoose.model('userCredentials', schema.login);
const ContactSchema = schema.contact;
var UserData = null;

app = express();
app.set('view engine','ejs');
app.use( express.static('public'));

app.listen(3000,function(){
  console.log('Connected');
});

//to parse the body of a request
app.post('/login', urlencodedParser, function (req, res) {
  console.log(req.body);
  var data={
    username: req.body.username,
    password: req.body.password
  };

  UserCredentials.find(data,function(err, resdata){
    if(err) throw err;
    //console.log(resdata);
   if(resdata.length === 0)
   //ToDo: add some error msg through css
    res.render('login');
    else {
    console.log(req.body.username);
     UserData = mongoose.model(req.body.username, ContactSchema);
        res.render('home', {results:[]});
   }
});
});

app.post('/push', urlencodedParser, function (req, res) {
  console.log(req.body);
  var data={
     username: req.body.username,
     password: req.body.password
 };
 if(data.password == req.body.confirmPassword)
 {
   UserCredentials.find(data,function(err, resdata){
     if(err) throw err;
     //console.log(resdata);
    if(resdata.length === 0)
  {
      var user = new UserCredentials(data);
       user.save();
      console.log('item saved');
         res.render('login');
   //  res.send(resdata);
    }
 });
}
else {
//res.send('<script>alert('Invalid details');</script>')
  res.render('login');
}
  //res.render('homepage',{results:{}});
});

app.get('/',function(req, res) {
  res.render('login');
//res.sendFile(__dirname + '/loginpage.html');
});

/*app.get('/search', function (req, res) {
  console.log(req.query);
var data={username: req.query.username};*/
app.post('/search', urlencodedParser, function (req, res) {
  //var data={username: "/^"+req.body.username+"/"};
  //  console.log(data);
  console.log(req.body);
       UserData.find(req.body,function(err, resdata){
      if(err) throw err;
      console.log(resdata);
      res.render('home',{results: resdata});
});
});

app.post('/createNewContact', urlencodedParser, function (req, res) {
//  var contact = new UserData(contactData);
//ToDo:once duplicate error occurs show error msg
/*var small = new UserData(req.body);
small.save(function (err) {
  if (err) return handleError(err);
  // saved!
})
Tank.create({ size: 'small' }, function (err, small) {
  if (err) return handleError(err);
  // saved!
})*/
var err=0;
  UserData.create(req.body,function (err) {
    if (err)
    {
      err=1;
      return err;
    }
  });
  if(!Boolean(err))
  {
    console.log(Boolean(err));
    res.render('home',{results: []});
  }
  else
  {
    console.log(Boolean(err));
      // alertNode('Contact already exists');
      alert('super');
  }
  //  res.send(500,'');

});
app.get('/logout', function (req, res) {
  console.log(req.session);
    req.session.destroy(function () {
        console.log("User logged out.")
    });
    res.redirect('/login');
});
