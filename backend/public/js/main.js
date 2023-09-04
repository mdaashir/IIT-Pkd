
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


function handleMessage(msg) {
    // Create the main div with class "msg-bubble"
    const msgBubble = document.createElement('div');
    msgBubble.classList.add('msg-bubble');
    if (msg.user_id === _id) {
      msgBubble.classList.add('right-msg');
    }
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
    msgInfoTime.textContent = Date.now();
    msgInfo.appendChild(msgInfoName);
    msgInfo.appendChild(msgInfoTime);
    msgBubble.appendChild(msgInfo);
    msgBubble.appendChild(msgText);
    messages.appendChild(msgBubble);


    if (msg.fileName) {
  
      // This is a file message (an image in this case)
      var item1 = document.createElement('li');
      var imageElement = document.createElement('img');
      imageElement.src = msg.fileData;
      item1.appendChild(imageElement);
      item1.classList.add('.msg-img');
      if (msg.fileId === _id) {
        
      item1.classList.remove('left-msg');
      item1.classList.add('right-msg');
      
    }
    messages.appendChild(item1);
    } 

    const scrollableDiv = document.getElementsByClassName('msger');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;

    }


    function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
    const reader = new FileReader();
    console.log("file select");
    reader.onload = (e) => {
      const fileData = e.target.result;
      const message = {
              username: user_name,
              text: input.value,
              fileId: _id,
              fileData: fileData, 
              fileName: file.name, 
            };
    socket.emit('chat message', message);
    input.value = '';};

    reader.readAsDataURL(file); }
    }

    var socket = io();
    var user_name;
    var _id;
    var messages = document.getElementById('messages');
    var form = document.getElementById('form');
    var input = document.getElementById('input');

    // // var generateRandomString = utils.generateRandomString;
    // var getUsername = utils.getUsername;
    // var handleMessage = utils.handleMessage;
    // var handleFileSelect = utils.handleFileSelect;

    window.onload = getUsername;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (input.value) {
        const message = {
          username: user_name,
          text: input.value,
          user_id: _id,
          fileData: null, // Add the file data to the message
          fileName: null, // Add the file name to the message
        };
        socket.emit('chat message', message);
        input.value = '';
      }
});

const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', handleFileSelect);
    // Function to handle file selection


socket.on('chat message', handleMessage);
