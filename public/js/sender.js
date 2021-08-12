(function () {
    var Message;
    Message = function (arg) {
        this.username = arg.username;
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $message.addClass(_this.message_side).find('.username').html(_this.username);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        sendMessage = function (messageData) {
            var $messages, message;
            if (messageData.text.trim() === '') {
                return;
            }
            $messages = $('.messages');
            if (messageData.username == usernameGlobal) {message_side = 'right'} 
                else message_side = 'left';
            message = new Message({
                username: messageData.username,
                text: messageData.text,
                message_side: message_side
            });
            message.draw();
            if (messageData.username != usernameGlobal) {
                var sound = new Audio("../sound/message.mp3");
                sound.play();
            }
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        $('.send_message').click(function (e) {
            // return sendMessage(getMessageText());
            let message = {
                username: usernameGlobal,
                text: getMessageText()
            }
            document.getElementById('messageInput').value = ''
            socket.emit('sender', message)
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                // return sendMessage(getMessageText());
                let message = {
                    username: usernameGlobal,
                    text: getMessageText()
                }
                document.getElementById('messageInput').value = ''
                socket.emit('sender', message)
            }
        });
        // sendMessage({
        //     username: "quocthinhvo",
        //     text: "hello world"
        // })
        socket.on('sender', (dataInput) => {
            sendMessage(dataInput)
        })
    });
}.call(this));

