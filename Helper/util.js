(function() {
'use strict';

var express = require('express'),
	portal = require('../Model/portal');

const fs = require('fs');
	
var configSettings = portal.settings();

function validateSettings() {
	let data = null;

	data = {};

	if (configSettings.ClientId == "")
	{
		console.log("ClientId Cannot be blank");
		data.result=false;
	}
	else if (configSettings.ClientSecret == "")
	{
		console.log("ClientSecret Cannot be blank");
		data.result=false;
	}
	else if (configSettings.Scope == "")
	{
		console.log("Scope Cannot be blank. It should be 'all' ");
		data.result=false;
	}
	else if (configSettings.GrantType == "")
	{
		console.log("GrantType Cannot be blank. It should be 'client_credentials' ");
		data.result=false;
	}
	else if (configSettings.ServiceURL == "")
	{
		console.log("OAuth2URL and ServiceURL Cannot be blank");  
		data.result=false;
	}
	else if (configSettings.CourseType == "")
	{
		console.log('Missing configuration of CourseType. It should be either session or event.');
		data.result=false;
	}
	else{
		data.result=true;
	}
	
	return data;
}

function createHttpRequestDataJSON(){
	let data = null;
	
	data = {};
	
	data.body=  "{\"clientId\":\""+configSettings.ClientId+ "\", \"clientSecret\":\""+configSettings.ClientSecret+"\", \"grantType\":\""+configSettings.GrantType+"\", \"scope\":\""+configSettings.Scope+"\"}";; 

	return data;
}

function getOAuth2URL(){
	let data = null;

	data = {};
	
	data.URL = configSettings.OAuth2URL
	
	return data;	
}

function getServiceURL(){
	let data = null;

	data = {};
	
	data.URL = configSettings.ServiceURL
	
	return data;	
}

function getCourseType(){
	let data = null;

	data = {};
	
	data.CourseType = configSettings.CourseType
	
	return data;	
}

function getTemplatePath(){
	let data = null;

	data = {};
	
	data.CourseType = configSettings.CourseType
	
	data.jsonFilePath = "";
	
	if(data.CourseType == 'event'){
		data.jsonFilePath  = '.\\Templates\\event.json';
	}
	else if(data.CourseType == 'session'){
		data.jsonFilePath  = '.\\Templates\\session.json';
	}
	else{
		console.log('Missing configuration of CourseType. It should be either session or event.');
	}
	
	
	return data;	
}

module.exports = {
	validateSetting:validateSettings,
	createHttpRequestData:createHttpRequestDataJSON,
	oAuthEndpoint: getOAuth2URL,
	readFromJsonFile: (filepath)=> {
									let data = null;

									data = {};
									
									let rawdata = fs.readFileSync(filepath); 
									data.eventPayload = JSON.parse(rawdata);
									
									return data;
								},
	serviceURL: getServiceURL,
	CourseType: getCourseType,
	templatePath:getTemplatePath
};

})(this);