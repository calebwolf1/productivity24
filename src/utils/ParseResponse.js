
// Returns all messages with replies in a 2d array
async function getMessages() {
  let response = await getResponse();
  let msgsWithReplies = await getMessagesWithReplies(response);
  let decodedMsgs = await decodeMessages(msgsWithReplies);
  return decodedMsgs;
}

// Gets a list of threads maxResults long
async function getResponse() {
  let response;
  try {
    response = await window.gapi.client.gmail.users.threads.list({
      userId: 'me',
      q: "!has:attachment",
      maxResults: 30
    })
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
  return response;
}

// Returns a single thread for a given thread id
async function getThread(id) {
  return await window.gapi.client.gmail.users.threads.get({
    userId: 'me',
    id: id
  })
}

// Returns whether this thread has at least one reply
function replyExists(thread) {
  let currentMessages = thread.result.messages;
  return currentMessages && currentMessages.length >= 2;
}

// Returns a list of messages that have replies, given a list of threads
async function getMessagesWithReplies(response) {
  const threads = response.result.threads;
    if (!threads || threads.length == 0) {
      document.getElementById('content').innerText = 'No Threads found.';
      return;
    }

    let msgsWithReplies = [];
    for(let i = 0; i < threads.length; i++) {
      if(threads[i]) {
        let thread = await getThread(threads[i]['id'])
        if(replyExists(thread)) {
          msgsWithReplies.push(thread.result.messages);
        }
      }
    }
    return msgsWithReplies;
}

async function decodeMessages(msgsWithReplies) {
  let decodedMsgs = [];
  let MsgsHeaderAndRecipients = [];
  let counterN = 0;
  for(let i = 0; i < msgsWithReplies.length; i++) {
    let subCountArr = [];
    let subArr2 = [];
    for(let j = 0; j < msgsWithReplies[i].length; j++) {
        let currentMsg = "";
        try {
          currentMsg = await window.gapi.client.gmail.users.messages.get({
            userId: 'me',
            id: msgsWithReplies[i][j]["id"]
          });
          var parts = currentMsg.result.payload.parts;
          var actualPart;
          if(parts) {
            for(let k = 0; k < parts.length; k++) {
            if(parts[k]["mimeType"] == 'text/plain') {
              actualPart = parts[k]["body"]["data"];
              }
            }
            let decodedPart = atob( actualPart.replace(/-/g, '+').replace(/_/g, '/') ); 
            subCountArr[j] = decodedPart;
            if(j < 1) {
              subArr2[0] = currentMsg.result.snippet;
              subArr2[1] = currentMsg.result.payload.headers.value;
            }
            // console.log(decodedPart);
          }
        } catch (err) {
            document.getElementById('content').innerText = err.message;
            return;
        }
      }
      if(subCountArr) {
        decodedMsgs[counterN] = subCountArr;
        counterN++;
        MsgsHeaderAndRecipients[counterN] = subArr2;
      }
  }
  return decodedMsgs, MsgsHeaderAndRecipients;
  // console.log(decodedMsgs);
  // Flatten to string to display
  // const output = threads.reduce(
  //     (str, threads) => `${str}${threads.id}\n`,
  //     'Messages:\n');
  // document.getElementById('content').innerText = output;
}

export default getMessages;