var express = require('express'),
	utility = require('./Helper/util'),
	helper = require('./Helper/axiosHelper');;

var validate = utility.validateSetting();

if(validate.result == true){
	helper.callApi();
}