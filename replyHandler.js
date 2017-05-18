var twilio = require('twilio');
var _ = require('lodash');

module.exports = function(context, request, response) {
  var messageBody = _.get(context, 'body.Body', '');
  var SID = _.get(context, 'secrets.SID');
  var TOKEN = _.get(context, 'secrets.TOKEN');
  var FROM = _.get(context, 'secrets.FROM');

  var client = new twilio(SID, TOKEN);
  var body;

  switch (messageBody.toLowerCase()) {
    case 'done':
      body = 'got done keyword';
      break;
    default:
      body = 'received no keywords';
  }

  client.messages.create({
    body: body,
    to: context.body.From,
    from: FROM
  })
  .then(function(message) {
    response.end(message.toString());
  });
}
