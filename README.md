# Hello API

A simple API for calling a phone number and programatically saying "Hello!".
This was written for a technical assessment for [Ufonia](https://www.ufonia.co/).

## Getting Started

pre-requisites: Node.js 12

1. > npm install
2. Add [.env](https://github.com/motdotla/dotenv) file in the project root:

```
TWILIO_ACCOUNT_SID=<your-twilio-account-sid>
TWILIO_AUTH_TOKEN=<your-twilio-auth-token>
FROM_PHONE_NUMBER=<your-twilio-outgoing-phone-number>
```

3. > npm start

## Commands

- `npm start` - runs the project without optimising for production
- `npm run dev` - runs the project with live-reload for fast development
- `npm test` - runs the tests
- `npm run build` - builds the project for production
- `npm run prod` - runs the built project

## API Usage

Base URL: http://ufonia.joetindale.com/

- `GET /calls`  
  lists all created calls
- `GET /calls/:id`  
  returns a call by id, or 404 Not Found
- `POST /calls { "toPhoneNumber": "+44..." }`  
  creates an outgoing call to the phone number. The phone number must be  
  manually verified in Twilio as the account is in trial mode.
