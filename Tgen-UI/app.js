var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	path = require('path');


var db = mongoose.connect('mongodb://localhost:27017/TestResult');
var testResult = require('./models/testResultModel')

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('src', path.join(__dirname, 'src'));
app.set('view engin', 'ejs');
app.engine('html', require('ejs').renderFile);

var apiRouter = require('./router/testerRouter')(testResult);

// Static folder for Angular
app.use(express.static(path.join(__dirname, 'src')))

app.use('/api/tester', apiRouter); 

app.get('/', function(req, res){
	res.send('TGen API');
});

app.listen(port, function(){
	console.log('Listening to the port: '+ port)
});