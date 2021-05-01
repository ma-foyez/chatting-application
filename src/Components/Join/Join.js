import React, { useState } from 'react';
import { Link } from "react-router-dom"
import './Join.css'
const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return (
        <>
            <div className="row join-outer-container justify-content-center align-items-center">
                <div className="col-md-5 text-center">
                    <div className="p-3">
                        <div className="join-inner">
                            <div className="heading">
                                <h1 className="">Join</h1>
                                <p>Group Chatting Application</p>
                            </div>
                            <div>
                                <input type="text" placeholder="Your Name" name="" id="" className="join-input form-control" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <input type="text" placeholder="Group Name" name="" id="" className="join-input form-control" onChange={(e) => setRoom(e.target.value)} />
                            </div>
                            <Link onClick={(event) => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                                <button className="btn button" type="submit">Sign In</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Join;