var twilio = require('twilio');
var _ = require('lodash');

module.exports = function(context, request, response) {
  var incomingMessage = _.get(context, 'body.Body', '');
  var SID = _.get(context, 'secrets.SID');
  var TOKEN = _.get(context, 'secrets.TOKEN');
  var FROM = _.get(context, 'secrets.FROM');

  var client = new twilio(SID, TOKEN);
  var responseBody;

  switch (incomingMessage.toLowerCase()) {
    case 'done':
      responseBody = 'got done keyword';
      break;
    default:
      responseBody = 'received no keywords';
  }

  client.messages.create({
    body: responseBody,
    to: context.body.From,
    from: FROM
  })
  .then(function(message) {
    response.end(message.toString());
  });
}
