// Utility functions

/**
* @param {number} length - The length of user id.
* @returns {string} A random string generated
*/
generateRandomString = (length)=>{
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}


function getUsername(){
  user_name = prompt("Please enter your name:");
  if (!user_name) {
  getUsername(); // Keep prompting until a valid username is provided
  }
  _id = generateRandomString(6);
}

//---------------------------------************************-----------------------//
/**
* @param {number} msg - message object sent by server to all clients
*/

function handleMessage(msg) {
    // Create the main div with class "msg-bubble"
    const msgBubble = document.createElement('div');
    msgBubble.classList.add('msg-bubble');

    // checking whether the message sent by server was sent by me or not
    // If sent by then adding a class called right-msg to msgBubble
    if (msg.user_id === _id) {
      msgBubble.classList.add('right-msg');
    }
    // If not sent by me then adding a class called left-msg to msgBubble
    else{
      msgBubble.classList.add('left-msg');
    }

    // Create the "msg-info" div
    const msgInfo = document.createElement('div');
    msgInfo.classList.add('msg-info');

    // Create the "msg-text" div
    const msgText = document.createElement('div');
    msgText.classList.add('msg-text');
    msgText.textContent = msg.text;

    // Create the "msg-info-name" span
    const msgInfoName = document.createElement('span');
    msgInfoName.classList.add('msg-info-name');
    msgInfoName.textContent = msg.username; // Set the name text (you can replace with your data)

    // Create the "msg-info-time" span
    const msgInfoTime = document.createElement('span');
    msgInfoTime.classList.add('msg-info-time');
    today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
   
    msgInfoTime.textContent = time;
    msgInfo.appendChild(msgInfoName);
    msgInfo.appendChild(msgInfoTime);
    msgBubble.appendChild(msgInfo);
    msgBubble.appendChild(msgText);
    messages.appendChild(msgBubble);
    const scrollableDiv = document.getElementById('messages');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;

    }


    // assigning variables
    var socket = io('/');
    console.log(socket);
    var user_name;
    var _id;
    var messages = document.getElementById('messages');
    var form = document.getElementById('form');
    var input = document.getElementById('input');

    // When the window loads, run the get username function
    window.onload = getUsername;

    //  When we submit the file, then emit 
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (input.value) {
        const message = {
          username: user_name,
          text: input.value,
          user_id: _id,
        };
        socket.emit('chat message', message);
        input.value = '';
      }
});

socket.on('chat message', handleMessage);
