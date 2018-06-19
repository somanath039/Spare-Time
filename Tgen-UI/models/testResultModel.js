var mongoose = require('mongoose');
var schema = mongoose.Schema;
var testResultModel = new schema({
	tester : { type :String},
	traffic_gen : { type :String},
	test_name : { type :String}, 
	data : {
		frameSizes : { type :Array}, 
		mpps :  { type :Array},
		splitRx :  { type :Array}, 
		Tx :  { type :Array},
		splitTx :  { type :Array}, 
		TxCom :  { type :Array}, 
		Rx :  { type :Array}, 
		throughput :  { type :Array},
	}, 
	time_stamp :{
		type : Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('TestData', testResultModel,'testdata');