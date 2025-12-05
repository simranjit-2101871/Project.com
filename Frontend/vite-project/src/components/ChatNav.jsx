import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

export default function ChatNav() {
    const navigate = useNavigate();
    const [invite, setInvite] = useState(false)
    useEffect(()=>{
        if(invite){
            navigate(`/main/${invite}`);
        }
    },[invite])

    return (


        <div style={{
            width: '100%',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
            <h2 style={{ textAlign: "center", color: '#333' }}>Group Details</h2>
            <button onClick={() => { setInvite(true);; }} className="invitegBtn">Invite</button>
        </div>
    )
}

