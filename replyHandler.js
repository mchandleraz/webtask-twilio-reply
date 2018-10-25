const twilio = require('twilio');
const _ = require('lodash');

const handleReply = (context, request, response) => {
  const SID   = _.get(context, 'secrets.SID');
  const TOKEN = _.get(context, 'secrets.TOKEN');
  const FROM  = _.get(context, 'secrets.FROM');

  if (!SID) {
    response.end('Missing SID')
  }

  if (!TOKEN) {
    response.end('Missing TOKEN')
  }

  try {
    const client = new twilio(SID, TOKEN);
  } catch (e) {
    response.end(e.toString())
  }
  
  client.messages.create({
    body: 'response text',
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

module.exports = handleReply;
