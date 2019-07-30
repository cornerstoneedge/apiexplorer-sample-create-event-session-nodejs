(function() {
'use strict';

var nconf = require('nconf');
const url = require('url');

nconf.file({ file: './Configuration/config.json' });

function getSettings() {
	
	let config_data = null;

	if(config_data != null && config_data != undefined) {
			return config_data
	}

	config_data = {};

	config_data.ClientId = nconf.get('ClientId');
	config_data.ClientSecret = nconf.get('ClientSecret');
	config_data.GrantType = nconf.get('GrantType');
	config_data.Scope = nconf.get('Scope');
	
	config_data.ServiceURL = nconf.get('ServiceURL');
	config_data.CourseType = nconf.get('CourseType');

	const sUrl = url.parse(config_data.ServiceURL);
	config_data.OAuth2URL = 'https://' + sUrl.host + '/services/api/oauth2/token';

	return config_data;
}

module.exports = {
	settings:getSettings
};


})(this);