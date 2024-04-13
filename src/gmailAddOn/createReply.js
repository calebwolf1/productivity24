export default function onGmailMessageOpen(e) {
    // Activate temporary Gmail scopes, in this case to allow
    // message metadata to be read.
    var accessToken = e.gmail.accessToken;
    GmailApp.setCurrentMessageAccessToken(accessToken);
    console.log(accessToken);
    var messageId = e.gmail.messageId;
    var message = GmailApp.getMessageById(messageId);
    var subject = message.getSubject();
    var sender = message.getFrom();

    // Create a card with a single card section and two widgets.
    // Be sure to execute build() to finalize the card construction.
    var exampleCard = CardService.newCardBuilder()
        .setHeader(CardService.newCardHeader()
            .setTitle('Example card'))
        .addSection(CardService.newCardSection()
            .addWidget(CardService.newKeyValue()
                .setTopLabel('Subject')
                .setContent(subject))
            .addWidget(CardService.newKeyValue()
                .setTopLabel('From')
                .setContent(sender)))
        .build();   // Don't forget to build the Card!
    return [exampleCard];
  }

/**
*  Creates a draft email (with an attachment and inline image)
*  as a reply to an existing message.
*  @param {Object} e An event object passed by the action.
*  @return {ComposeActionResponse}
*/
function createReplyDraft(e) {
// Activate temporary Gmail scopes, in this case to allow
// a reply to be drafted.
var accessToken = e.gmail.accessToken;
GmailApp.setCurrentMessageAccessToken(accessToken);

// Creates a draft reply.
var messageId = e.gmail.messageId;
var message = GmailApp.getMessageById(messageId);
var draft = message.createDraftReply('',
  {
      htmlBody: "Kitten! <img src='cid:kitten'/>",
  }
);

// Return a built draft response. This causes Gmail to present a
// compose window to the user, pre-filled with the content specified
// above.
return CardService.newComposeActionResponseBuilder()
  .setGmailDraft(draft).build();
}