# Example CSOD Create Event/Session API code

## Introduction

This project provides sample code for authenticating and consuming Cornerstone OnDemand's (CSOD) [Event/Session API](https://apiexplorer.csod.com/apiconnectorweb/apiexplorer#/apidoc/59aa5211-b2c9-45af-97b1-0c0902dc4060).

It utilizes CSOD's OAuth 2.0 authentication to obtain an access token via provided ClientId and ClientSecret.

## Provisioning Access and Configuring the Project

1. Follow directions in the API documentation to [register an application with OAuth 2.0](https://apiexplorer.csod.com/apiconnectorweb/apiexplorer#/info).
    1. You will be provided with a *ClientId* and *ClientSecret*.
1. Next, modify `Configuration/config.json` file and replace:
    1. *ClientId* value with the value from step 1
    1. *ClientSecret* value with the value from Step 1
    1. The `[portal]` section of *ServiceURL* value with your client's portal URL
    1. The *GrantType* should be `"client_credentials"`
    1. The *Scope* should be `"all"`
    1. The *CourseType* should be either `"event"` or `"session"` depending on the data you're accessing

As an example, your modified config file would appear as follows:

```json
{
    "ClientId": "test",
    "ClientSecret": "asasdf3241234va",
    "GrantType": "client_credentials",
    "Scope": "all",
    "ServiceURL": "https://acme.csod.com/Services/api/LO/Create",
    "CourseType": "event"
}
```

## Building the Project

### Prerequisites

1. Install NodeJS
1. Open Node.js Command Prompt
1. `cd <path of the repository>`
1. Run `npm install nconf`
1. Run `npm install axios`

### Workflow

Open the repo with your Node.js IDE of choice and build the project.  `app.js` is the entry point of the application.

Running the project will then authenticate with CSOD's OAuth framework, call the Event/Session API, and print out the access token.

1. Open Node.js Command Prompt
1. `cd <path of the repository>`
1. `node app.js`

## Source file descriptions

* `app.js` - This is the execution class to call the OAuth2 Get Access Token and return the token and corresponding details.
* `Configuration/config.json` - This configuration file contains the values of the keys ClientId, ClientSecret, GrantType , Scope and ServiceURL. Users has to set the values according to the portal they are looking for.
* `Helper/util.js` - Contains functions like validateSettings, getOAuth2URL, getServiceURL, getCourseType and readFromJsonFile.
* `Helper/axiosHelper.js` - NPM module for making HTTP requests. It supports Promises by default. Contains to generate oauth2 token and create event and session.
* `Model/portal.js` - Read the configuration file and return config setings which has been used in the other classes.
* `Templates/event.json` - Payload for an Event object.
* `Templates/session.json` - Payload for a Session object.
