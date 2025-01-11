document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.querySelector('.send-btn');
    const chatMessages = document.getElementById('chatMessages');
    const fileInput = document.getElementById('fileInput');

    // 發送訊息的函數
    function sendMessage(message, isImage = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';

        if (isImage) {
            const img = document.createElement('img');
            img.src = message;
            img.className = 'image-message';
            messageDiv.appendChild(img);
        } else {
            messageDiv.textContent = message;
        }

        chatMessages.appendChild(messageDiv);
        
        // 機器人回覆
        setTimeout(() => {
            const botDiv = document.createElement('div');
            botDiv.className = 'message bot-message';
            botDiv.textContent = isImage ? '已收到圖片！' : '已收到訊息！';
            chatMessages.appendChild(botDiv);
            scrollToBottom();
        }, 500);

        scrollToBottom();
    }

    // 自動滾動到底部
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 處理文字訊息發送
    function handleMessageSend() {
        const message = messageInput.value.trim();
        if (message) {
            sendMessage(message);
            messageInput.value = ''; // 清空輸入框
        }
    }

    // 處理圖片上傳
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // 檢查文件類型
            if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
                alert('只能上傳 jpg/jpeg/png 格式的圖片！');
                return;
            }

            // 檢查文件大小（5MB = 5 * 1024 * 1024 bytes）
            if (file.size > 5 * 1024 * 1024) {
                alert('圖片大小不能超過 5MB！');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                sendMessage(event.target.result, true);
            };
            reader.readAsDataURL(file);
        }
    });

    // 按鈕點擊事件
    sendButton.addEventListener('click', handleMessageSend);

    // Enter 鍵事件
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleMessageSend();
        }
    });
});
