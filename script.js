// JavaScript to create the Chatbot interface with embedded CSS and HTML

// Inject CSS into the page
const style = document.createElement('style');
style.textContent = `
    /* Universal Box Sizing */
    * {
        box-sizing: border-box;
    }

    /* Chat Icon Styling */
    .chat-icon {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #956fd6, #8b5fd4);
        color: white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 30px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .chat-icon i {
        font-size: 28px;
        color: white;
        transition: transform 0.3s ease;
    }

    .chat-icon:hover {
        background: linear-gradient(135deg, #8b5fd4, #7231a5);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }

    .chat-icon:hover i {
        transform: scale(1.1);
    }

    /* Chat Container Styling */
    .chat-container {
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 350px;
        max-width: 90%;
        height: fit-content;
        background-color: #ffffff;
        border-radius: 15px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        display: none;
        flex-direction: column;
        z-index: 1001;
    }

    /* Chat Header Styling */
    .chat-header {
        background-color: white;
        padding: 15px;
        color: black;
        border-radius: 15px 15px 0 0;
        font-weight: 600;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
    }

    .chat-header .close-btn {
        font-size: 27px;
        cursor: pointer;
        color: #956fd6;
    }

    /* Chat Box Styling */
    .chat-box {
        flex-grow: 1;
        padding: 15px;
        overflow-y: auto;
        background-color: #f9f9f9;
        height: 300px; /* Set a fixed height */
    }

    /* Chat Input Styling */
    .chat-input {
        display: flex;
        padding: 10px;
        background-color: #f1f1f1;
        border-top: 1px solid #ddd;
        border-radius: 0 0 15px 15px;
    }

    .chat-input input {
        flex: 1;
        border: none;
        padding: 10px;
        outline: none;
        font-size: 14px;
        border-radius: 20px;
        background-color: #fff;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .chat-input button {
        background-color: #956fd6;
        color: #fff;
        border: none;
        padding: 10px 20px;
        margin-left: 10px;
        border-radius: 20px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .chat-input button i {
        font-size: 16px;
    }

    .chat-input button:hover {
        background-color: #8b5fd4;
        color: white;
    }

    /* Message Styling */
    .message {
        display: flex;
        align-items: flex-start;
        margin: 10px 0;
    }

    .message.user-message {
        justify-content: flex-end;
    }

    .message.ai-message {
        justify-content: flex-start;
    }

    .message-content {
        max-width: 75%;
        padding: 10px;
        font-size: 14px;
        line-height: 1.4;
        word-wrap: break-word;
        border-radius: 15px;
        position: relative;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .message.user-message .message-content {
        background: linear-gradient(135deg, #956fd6, #8b5fd4);
        color: #fff;
        border-radius: 15px 15px 0 15px;
    }

    .message.ai-message .message-content {
        background-color: #f1f1f1;
        color: #333;
        border-radius: 15px 15px 15px 0;
    }

    .timestamp {
        font-size: 12px;
        color: #999;
        margin-top: 5px;
        text-align: right;
    }

    a {
        color: #0d6efd;
        text-decoration: none;
        font-size: 14px;
        word-break: break-all;
    }

    /* Enhanced Predefined Input Buttons */
    .predefined-inputs {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 10px;
    }

    .predefined-btn {
        background: #956fd6;
        color: white;
        padding: 10px;
        border-radius: 15px;
        cursor: pointer;
        font-size: 14px;
        border: 1px solid transparent;
        transition: all 0.3s ease;
        text-align: left;
        width: fit-content;
        max-width: 80%;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
    }

    .predefined-btn::after {
        content: '';
        position: absolute;
        top: 0;
        left: -50px;
        width: 200%;
        height: 100%;
        background: rgb(149,111,214);
        color: black;
        transform: skewX(-45deg);
        transition: all 0.3s ease;
        opacity: 0;
    }

    .predefined-btn:hover::after {
        left: 100%;
        opacity: 0.3;
    }

    .predefined-btn:hover {
        background-color: #d3d3d3;
        border: 1px solid #aaa;
        color: black;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }
`;
document.head.appendChild(style);

// Inject HTML into the page
const chatHTML = `
    <div class="chat-icon" id="chat-icon">
        <i class="fas fa-comments"></i>
    </div>

    <div class="chat-container" id="chat-container">
        <div class="chat-header">
            <center><img src="static/idea_pad.png" style="width: 120px; text-align: center;" alt=""></center>
            <span class="close-btn" id="close-btn">&times;</span>
        </div>
        <div id="chat-box" class="chat-box">
            <!-- Predefined Inputs -->
            <div class="predefined-inputs" id="predefined-inputs">
                <div class="predefined-btn" data-message="What are your hours?">What are your hours?</div>
                <div class="predefined-btn" data-message="What services do you offer?">What services do you offer?</div>
                <div class="predefined-btn" data-message="Can I make a reservation?">Can I make a reservation?</div>
            </div>
        </div>
        <div class="chat-input">
            <input type="text" id="user-input" placeholder=" Type your message...">
            <button id="send-btn">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
    </div>
`;
document.body.insertAdjacentHTML('beforeend', chatHTML);

// JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatIcon = document.getElementById('chat-icon');
    const chatContainer = document.getElementById('chat-container');
    const closeBtn = document.getElementById('close-btn');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');

    chatIcon.addEventListener('click', function() {
        chatContainer.style.display = chatContainer.style.display === 'none' ? 'flex' : 'none';
        if (chatContainer.style.display === 'flex') {
            userInput.focus();
            scrollToBottom();
        }
    });

    closeBtn.addEventListener('click', function() {
        chatContainer.style.display = 'none';
    });

    sendBtn.addEventListener('click', function() {
        sendMessage(userInput.value.trim());
    });

    userInput.addEventListener('keypress', function(e) {
        if (e.which === 13) {
            sendMessage(userInput.value.trim());
            return false;
        }
    });

    document.querySelectorAll('.predefined-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            sendMessage(message);
            document.getElementById('predefined-inputs').remove();
        });
    });

    function sendMessage(message) {
        if (message === "") return;
        userInput.value = '';

        appendMessage('user', message);

        // Simulate an AJAX request (for demonstration purposes)
        setTimeout(function() {
            const response = "This is a response from the AI.";
            appendMessage('ai', response);
            scrollToBottom();
        }, 500);
    }

    function appendMessage(sender, content) {
        const chatBox = document.getElementById('chat-box');
        const messageClass = sender === 'user' ? 'user-message' : 'ai-message';
        const timestamp = new Date().toLocaleString();

        const messageHTML = `
            <div class="message ${messageClass}">
                <div class="message-content">
                    ${content}
                    ${sender === 'ai' ? `<div class="timestamp">${timestamp}</div>` : ''}
                </div>
            </div>
        `;
        chatBox.insertAdjacentHTML('beforeend', messageHTML);

        scrollToBottom();
    }

    function scrollToBottom() {
        const chatBox = document.getElementById('chat-box');
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});