var express = require('express'),
	utility = require('../Helper/util'),
	  axios = require('axios');


function CallEventSessionApi(){
  let accessdata = null;
	
  accessdata = {};
  
  var httpRequestData = utility.createHttpRequestData();
  var oAuth2 = utility.oAuthEndpoint();
  var oAuth2RequestBody = JSON.parse(httpRequestData.body);
  var tempPath = utility.templatePath();
  
  let config = {
	headers: { 'Cache-Control': 'no-cache' }
  };
  
  axios.post(oAuth2.URL, oAuth2RequestBody, config)
	 .then((response) => {
							accessdata.bearertoken = response.data.access_token;
							if(tempPath != ""){
								CallApi(tempPath.jsonFilePath);
							}
						})
	 .catch((error) => {
						console.log(error.response.data);
					   });

 function CallApi(jsonFilePath){
	var sURL = utility.serviceURL();
	let aConfig = {
		headers: { 'Authorization': 'Bearer '.concat(accessdata.bearertoken), 'Accept': 'application/json','Content-Type': 'application/json'  }
	};
	
	var payload = utility.readFromJsonFile(jsonFilePath);
	
	axios.post(sURL.URL, 
			  payload.eventPayload,
			  aConfig
	  )
	  .then((response) => {
		console.log(response.data);
	  })
	  .catch((error) => {
		console.log(error.response.data);
	  });
 }
 
}

module.exports = {
	callApi:CallEventSessionApi	
};