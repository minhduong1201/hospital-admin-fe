import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Popover,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import io from 'socket.io-client';

const ChatPopover = (props) => {
  const { visible, onClose, hospital, user } = props;
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");


  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Lắng nghe sự kiện 'message' từ server và thêm tin nhắn mới vào danh sách
    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (e) => {
    if(e.which != 13) return;
    handleSendMessage();
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      hospitalId: hospital._id,
      customerId: user._id,
      sender: "hospital", // or 'hospital' for messages from the hospital
      content: inputValue,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
  };

  return (
    <div onKeyDown={(e) => handleKeyDown(e)}>
      <Popover
        open={visible}
        onClose={onClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            width: 800,
            height: 700,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
          width="95%"
        >
          <Box p={2}>
            <Typography
              variant="h6"
              style={{ borderBottom: "1px solid #5a5a5c" }}
            >
              Chat với ...
            </Typography>
            <Box mt={2} style={{ height: 550, overflow: "auto" }}>
              {messages.map((message, index) => (
                <Box
                  key={index}
                  display="flex"
                  flexDirection={
                    message.sender === "user" ? "row-reverse" : "row"
                  }
                  alignItems="flex-end"
                  mt={1}
                >
                  <Box
                    bgcolor={message.sender === "user" ? "#f3f3f3" : "#e1f5fe"}
                    color={message.sender === "user" ? "inherit" : "#1976d2"}
                    borderRadius="10px"
                    py={1}
                    px={2}
                  >
                    <Typography variant="body1">{message.content}</Typography>
                    <Typography variant="caption">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            p={1}
            style={{ borderTop: "1px solid #5a5a5c" }}
          >
            <TextField
              value={inputValue}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Nhập tin nhắn..."
            />
            <IconButton onClick={handleSendMessage}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default ChatPopover;
