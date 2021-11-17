const express = require('express');

const shortId = require('shortid');
const router = express.Router();
const Amplify = require('aws-amplify');

Amplify.default.configure({
    Auth: {
        region: 'xx',
        userPoolId: 'xx',
        userPoolWebClientId: 'xx'
    }
});


router.post('/', function (req, res, next) {
    const {phoneNumber, password} = req.body;
    Amplify.Auth.signUp({
        username: shortId.generate(),
        password: password,
        attributes: {
            phone_number: phoneNumber
        }
    })
        .then(data => {
            console.log(data)
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(401).json(err);
        });

});

// function makeLogSafe(password) {
//     return password.replace(/./g, "*");
// }


router.post('/signin', function (req, res, next) {
    const {username, password} = req.body;
    Amplify.Auth.signIn({
        username,
        password
    })
        .then(async (data) => {
            // console.log(data)
            const session = await Amplify.Auth.currentSession();
            console.log('session', session.getIdToken().getJwtToken());
            res.json(data.signInUserSession.idToken.jwtToken)
        })
        .catch(err => {
            console.log(err);
            res.status(401).json(err);
        });

});


router.post('/reset', function (req, res, next) {
    const {username, password, code} = req.body;
    Amplify.Auth.forgotPasswordSubmit(username, code, password)
        .then(async (data) => {
            // console.log(data)

            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(401).json(err);
        });

});

router.get('/current', function (req, res, next) {
    Amplify.Auth.currentSession()
        .then(data => {
            console.log(data)
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(401).json(err);
        });

});
module.exports = router;
