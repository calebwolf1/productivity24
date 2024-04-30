function buildSimpleCard(e) {
  var accessToken = e.gmail.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);
  var messageId = e.gmail.messageId;
  var message = GmailApp.getMessageById(messageId).getPlainBody();

  var generateButton = CardService.newImage()
    .setAltText('Regenerate')
    .setImageUrl("https://i.postimg.cc/FKFv43nt/Screen-Shot-2024-04-28-at-3-01-33-PM.png");

  var composeAction = CardService.newAction()
    .setFunctionName('createReplyDraft');
  var composeButton = CardService.newTextButton()
    .setText('<div style="border-radius: 20px; color: white; padding: 10px;">Generate</div>')
    .setBackgroundColor('#4285F4')
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
    .setComposeAction(
        composeAction,
        CardService.ComposedEmailType.REPLY_AS_DRAFT);
  var textParagraph = CardService.newTextParagraph()
    .setText(message);
  var exampleCard = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader()
      .setTitle('Whoosh')
      .setSubtitle('Send confidently.')
      .setImageStyle(CardService.ImageStyle.SQUARE)
      .setImageUrl('https://i.postimg.cc/g2Z4N2Vf/Whoosh-48x48.png'))
    .addSection(CardService.newCardSection()
      .addWidget(textParagraph))
    .addSection(CardService.newCardSection()
      .addWidget(composeButton)
      .addWidget(generateButton))
    .build();
  return [exampleCard];
}


function createReplyDraft(e) {
  // Activate temporary Gmail scopes, in this case to allow
  // a reply to be drafted.
  var accessToken = e.gmail.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);
  // Creates a draft reply.
  var messageId = e.gmail.messageId;
  var message = GmailApp.getMessageById(messageId);
  var threadId = e.gmail.threadId;
  var thread = GmailApp.getThreadById(threadId);
  var latestMessage = thread.getMessages()[thread.getMessageCount() - 1].getPlainBody();
  var params = {
    'method': 'post',
    'headers': {'Content-Type': 'application/json'},
    'payload': JSON.stringify({
        'input-email': latestMessage
    })
  }
  var response = UrlFetchApp.fetch("https://matttolea-test-5dd2469e5b8b.herokuapp.com/generate-response", params);
  var draft = message.createDraftReply('',
    {
      htmlBody: response,
    }
  );
  //#0F0E10 color
  // Return a built draft response. This causes Gmail to present a
  // compose window to the user, pre-filled with the content specified
  // above.
  return CardService.newComposeActionResponseBuilder()
    .setGmailDraft(draft).build();
}
