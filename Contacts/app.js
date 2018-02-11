var express = require('express');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = global.promise;
mongoose.connect('mongodb://localhost/Contacts');
// Create a Schema and a Model
const LoginSchema = new Schema({
   username: {'type':String, 'unique': true, 'required' : true},
//  username: String,
    password: {'type':String, 'required' : true}
});

const ContactSchema = new Schema({
    contactName: {'type':String, 'unique': true, 'required' : true,index: true},
    phoneNumber: {'type':Number, 'unique': true, 'required' : true},

});

const  UserCredentials = mongoose.model('userCredentials',LoginSchema );

//const UserData = mongoose.model('rahul', ContactSchema);
app = express();
//
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
    res.render('loginpage');
    else {
    //  var user = new UserCredentials(data);
    //  user.save();
  //    console.log('item saved');
  console.log(req.body.username);
//  mongoose.connect('mongodb://localhost/'+req.body.username);
//mongoose.connection.close();
//mongoose.connect('mongodb://localhost/userContact');
  const Contact = mongoose.model(req.body.username, ContactSchema);
  var contactData = {
    contactName: 'raj',
    phoneNumber: '9177590065'
  };

  var contact = new Contact(contactData);
  Contact.create(contact);
      res.render('home', {results:[]});

  //  res.send(resdata);
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
         res.render('loginpage');
   //  res.send(resdata);
    }


 });
}
else {
//  alert('Invalid details');
  res.render('loginpage');
}
  //res.render('homepage',{results:{}});
});

app.get('/login',function(req, res) {
  res.render('loginpage');
//res.sendFile(__dirname + '/loginpage.html');
});

/*app.get('/search', function (req, res) {
  console.log(req.query);
var data={username: req.query.username};*/
app.post('/search', urlencodedParser, function (req, res) {
  //var data={username: "/^"+req.body.username+"/"};
  //  console.log(data);
    UserCredentials.find(req.body,function(err, resdata){
      if(err) throw err;
      console.log(resdata);
      res.render('home',{results: resdata});
});
});
