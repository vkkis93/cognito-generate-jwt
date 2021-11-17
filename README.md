# Cognito Generate JWT

An incredibly tiny project that helps you generate locally cognito jwt for cognito user by phone number

## Documentation
- [Install](#install)
- [Requirements](#requirements) 
- [Confgure](#configure)
- [Use](#Use) 


# Install
In root of project need to run
```bash
npm install
```
# Requirements
On your PC you should have installed
- ```Node.js >= 14.10```
- ```NPM >= 6.14```

# Configure
You simple have to provide your cognito credentials in section ```Amplify.default.configure({})``` in file ```routes/cognito.js```

# Usage
Start project
```bash
npm start
```
Call POST API Endpoint  http://localhost:3000/cognito/signin with body data 
```bash
{
    "username":"+380111111111",
    "password": "NiceNice"
}
 ```
 As a result you receive JWT token.
 
