import React, { useEffect, useState } from 'react';
import './Chat.css'
import queryString from "query-string"
import io from 'socket.io-client'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ScrollToBottom from "react-scroll-to-bottom"
import capitalizeFirstLetter from '../Master/ToCapitalize/capitalizeFirstLetter';
import { faUser } from '@fortawesome/free-regular-svg-icons';

let socket;
const Chat = ({ location }) => {
    const { name, room } = queryString.parse(location.search);
    const conName = name.toLowerCase();
    const ENDPOINT = 'http://localhost:5000/'
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error)
            }
        })
        socket.on('message', (message, room, name) => {
            console.log('message :>> ', message);
            // const newMessage = [...messages, message];
            // console.log('newMessage :>> ', newMessage);
            // setMessages(newMessage);
            setMessages((existingMsgs) => (
                [...existingMsgs, message]
            ));
        });

        socket.on('userList', ({ roomUser }) => {
            setUsers(roomUser);
        })
        return () => {
            socket.emit('disconnect');
            socket.close();
        }
    }, [])

    const sendMessage = (e) => {
        if (e.key === "Enter" && e.target.value !== "") {
            socket.emit('message', e.target.value);
            e.target.value = ""
        }
    }
    console.log('users :>> ', users);
    return (
        <div className="container p-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6">
                    <div className="chat">
                        <div className="row">
                            <div className="col-4 user-list">
                                <h5>users-{users.length > 0 && users.length}</h5>
                                {/* <ScrollToBottom> */}
                                {
                                    users.length > 0 && users.map((item, index) => (
                                        < div className="single-user" key={item.id} >
                                            <FontAwesomeIcon icon={faUser} />
                                            <p> {capitalizeFirstLetter(item.name)}</p>
                                        </div>
                                    ))
                                }
                                {/* </ScrollToBottom> */}
                            </div>
                            <div className="col-8 chat-section">
                                <div className="chat-heading d-flex justify-content-between">
                                    <h4>{`${room.toUpperCase()} Group Chat`}</h4>
                                    <Link to='/' className="chat-close text-decoration-none">X</Link>
                                </div>
                                <div className="chat-box">
                                    <ScrollToBottom className="message-body">
                                        {
                                            messages.length > 0 && messages.map((message, index) => (
                                                <div key={index} className={`message ${message.user === conName ? "self-message" : "others-message"}`} >
                                                    <span className="user">
                                                        {capitalizeFirstLetter(message.user)}
                                                    </span>
                                                    <span className="text">{message.text}</span>
                                                </div>
                                            ))
                                        }
                                    </ScrollToBottom>
                                    <div className="chat-input">
                                        <input type="text" name="" placeholder="Type your message here" id="" className="form-control" onKeyDown={(e) => sendMessage(e)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Chat;