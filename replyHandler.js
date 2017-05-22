const twilio = require('twilio');
const _ = require('lodash');

const handleReply = (context, request, response) => {
  const SID   = _.get(context, 'secrets.SID');
  const TOKEN = _.get(context, 'secrets.TOKEN');
  const FROM  = _.get(context, 'secrets.FROM');

  // try-catch in case user didn't supply SID/TOKEN
  try {
    const client = new twilio(SID, TOKEN);
  } catch (e) {
    response.end(e.toString())
  }
  
  client.messages.create({
    body: getResponseBody(_.get(context, 'body.Body', '')),
    to: context.body.From,
    from: FROM
  })
  .then((message) => {
    response.end(message.toString());
  })
  .catch((error) => {
    response.end(error.toString());
  });
}

const getResponseBody = (responseBody) => {
  switch (responseBody.toLowerCase()) {
    case 'done':
      return `You did it!`;
    case 'start':
    case 'stop':
      // just bail, because the start/stop behavior
      // is handled by twilio before we get here
      // and we don't want to send a message in that case
      return;
    default:
      return 'Did you complete your task? If so, respond with "done".'
  }
}

module.exports = handleReply;
