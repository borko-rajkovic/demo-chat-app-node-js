# Demo chat app built in Node.JS and React.JS

Demo chat application is using websockets library **Socket.io**

# Run app

To run application, you need to do following:
-	Into root folder of the app run: `npm install`
-	Into subfolder **client** run: `npm install`
-	Install **nodemon** globaly `npm install nodemon -g`
-	Run app with the command `npm run dev`

# First load
On first load, change name of the connected user

[![first_load](https://github.com/borko-rajkovic/demo-chat-app-node-js/raw/master/docs/First%20load.png)](https://github.com/borko-rajkovic/demo-chat-app-node-js/blob/master/docs/First%20load.png)

# Three people logged in
Each connected user will apear on the left side in blue color if active, or black if disconnected

[![three_people_logined](https://github.com/borko-rajkovic/demo-chat-app-node-js/raw/master/docs/Three%20people%20logined.png)](https://github.com/borko-rajkovic/demo-chat-app-node-js/blob/master/docs/Three%20people%20logined.png)

# Peek typing
When one user is typing, other user can check box ***Peek typing*** to get user typed text even before it's sent

[![peek_typing](https://github.com/borko-rajkovic/demo-chat-app-node-js/raw/master/docs/Peek%20typing.png)](https://github.com/borko-rajkovic/demo-chat-app-node-js/blob/master/docs/Peek%20typing.png)

# Send messages
Messages sent by user will apear on right and received will appear on left in the chat window

[![reply](https://github.com/borko-rajkovic/demo-chat-app-node-js/raw/master/docs/Reply.png)](https://github.com/borko-rajkovic/demo-chat-app-node-js/blob/master/docs/Reply.png)

# Unread messages
If there are unread messages for connection, there will be number of unread messages in parentheses

[![unread_messages](https://github.com/borko-rajkovic/demo-chat-app-node-js/raw/master/docs/Unread%20messages.png)](https://github.com/borko-rajkovic/demo-chat-app-node-js/blob/master/docs/Unread%20messages.png)

# Unread messages opened
Once you open chat window with unread messages, it will show no longer number of unread messages. Also, if you receive message for currently opened connection, they will not appear as unread messages.

[![unread_messages_opened](https://github.com/borko-rajkovic/demo-chat-app-node-js/raw/master/docs/Unread%20messages%20opened.png)](https://github.com/borko-rajkovic/demo-chat-app-node-js/blob/master/docs/Unread%20messages%20opened.png)

# User disconnected
If user disconnects, it will be presented in black color. Still you can open that connection to inspect all messages exchanged so far.

[![user_disconnected](https://github.com/borko-rajkovic/demo-chat-app-node-js/raw/master/docs/User%20disconnected.png)](https://github.com/borko-rajkovic/demo-chat-app-node-js/blob/master/docs/User%20disconnected.png)

# Connection-specific typings
If you are typing message to one connection, but navigate to another, the original typing is not lost.

In example bellow, we can see that in action.
First, Borko is writing to Milos.

[![writing_to_milos](https://github.com/borko-rajkovic/demo-chat-app-node-js/raw/master/docs/Writing%20to%20Milos.png)](https://github.com/borko-rajkovic/demo-chat-app-node-js/blob/master/docs/Writing%20to%20Milos.png)

Then, Borko navigates to Nikola and sends a message.

[![sending_message_to_nikola](https://github.com/borko-rajkovic/demo-chat-app-node-js/raw/master/docs/Sending%20message%20to%20Nikola.png)](https://github.com/borko-rajkovic/demo-chat-app-node-js/blob/master/docs/Sending%20message%20to%20Nikola.png)

When Borko navigates back to Milos, it's typing is still preserved until it's finally send or erased by user.

[![writing_to_milos](https://github.com/borko-rajkovic/demo-chat-app-node-js/raw/master/docs/Writing%20to%20Milos.png)](https://github.com/borko-rajkovic/demo-chat-app-node-js/blob/master/docs/Writing%20to%20Milos.png)

#  TODO list:
- user login
- prevent user duplicate names
- keep history of messages
- allow reconnect
- instead of typing, send characters changed
- instead of message sending, commit typing
