var express = require('express');
var router = express.Router();

var request = require('request')

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
});

router.post('/', function (req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = req.body.entry[0].messaging[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
		}
	}
	res.sendStatus(200)
});

function sendTextMessage(sender, text) {
	let messageData = { text:text }
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
	json: {
			recipient: {id:sender},
		message: messageData,
	}
}, function(error, response, body) {
	if (error) {
			console.log('Error sending messages: ', error)
	} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

const token = "EAAZAbW4KTlUcBAOFFoyFeuLoEnOTuZAPPrjZBg6o0A7HkomOkwkfXbTSUpJb6Q29rhZCt3ctUh7Qab4jLgZB5C0ycsU73IyWRnRxd1W657eBRYdpPVzQQZASYj6EN3zkz4YmmKijGvEZAF6KWZA0Jxwlj8Xwb6xOwG2l1gR91fqc1AZDZD"

module.exports = router;
