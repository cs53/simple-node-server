var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');


var app = express();

// view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')))
app.get('/', function(req, res){
	res.render('index', {title:  'Enter your title'});
});

app.get('/about', function(req, res){
	res.render('about');
});

app.get('/contact', function(req, res){
	res.render('contact');
});

app.post('/contact/send', function(req, res){
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			//type: 'login',
			user: 'tarshishey@gmail.com',
			pass: '513694np@mF$j'
		}
	});
  var mailOptions = {
		from: "tarshishey@gmail.com",
		to: ''+req.body.email,
		subject: 'Website Submission',
		text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+'Message: '+req.body.message +'phone: '+req.body.Phone,
		html: '<p>You have a submission with the following details...</p><ul><li>'+req.body.name+'</li><li>'+req.body.file+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li><li>Phone: '+req.body.phone+'</li></ul>'
	};  

  transporter.sendMail(mailOptions, function(error,info){
        if(error){
          res.redirect('/');
        }
         else{
           res.redirect('/')
         }
        });

  
});


app.listen(3000);
console.log("server is running");



