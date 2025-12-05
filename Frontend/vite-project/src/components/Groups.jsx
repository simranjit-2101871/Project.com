import React, { use, useEffect } from 'react'
import MainNav from './MainNav';
import { useState } from 'react';
import GSideBar from './GSideBar';
import ChatNav from './ChatNav';

export default function Groups() {

    const [data, setData] = useState(0)
    const [storeLocal, setLocal] = useState([]); // empty array initially
    const [items, setItems] = useState([]); // empty array initially
    const [chat,setChat]=useState(false);
    const btnStyle = (color) => ({
        padding: "8px 12px",
        borderRadius: "4px",
        backgroundColor: color,
        color: "#fff",
        border: "none",
        cursor: "pointer",
    });
    /* const  tom= useEffect = () => {
         getGroupData();
     },[])*/ //why is this wrong means useEffect is not called throufh varaible
    useEffect(() => {
        getGroupData();
    }, []);

    
    useEffect(() => {
        console.log(items)
    }, [items]); // This will log the items whenever they change

    const openChatWindow = (groupId) => {
        setChat(true);
    }

    const getGroupData = async () => {
        try {
            const response = await fetch("http://localhost:8080/create/getGroupData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                setItems(data.groupResult);
            } else {
                console.error("Failed to fetch group data");
            }
        } catch (error) {
            console.error("Error fetching group data:", error);
        }
    }
    return (
        <div>
            <>
                <div className='instructor'>
                    <MainNav />
                    <GSideBar />


                    <div style={{
                        display: 'flex',
                        height: '100vh',
                        backgroundColor: '#eae6df'
                    }}>
                        {/* Left Panel (Chat List style) */}
                        <div style={{
                            width: '30%',
                            backgroundColor: '#ffffff',
                            borderRight: '1px solid #ccc',
                            overflowY: 'scroll'
                        }}>
                            <div className='group-box'>
                                {!items.length ? (
                                    <h2 style={{ textAlign: "center", color: 'black' }}>No Groups Formed Yet</h2>
                                ) : (
                                    items.map((item, index) => (
                                        <div
                                            key={item.Id || index}
                                            onClick={openChatWindow}
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                padding: "12px 16px",
                                                margin: "0",
                                                borderBottom: "1px solid #ddd",
                                                cursor: "pointer",
                                                backgroundColor: "#fff"
                                            }}
                                        >
                                            <div style={{ fontWeight: "bold", color: "#333" }}>{item.groupName || "Untitled Group"}</div>
                                            <div style={{ fontSize: "12px", color: "#888" }}>Group #{index}</div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Right Panel (Chat Window style) */}

                        <div style={{
                            width: '70%',
                            backgroundColor: '#efeae2',
                            padding: '16px',
                            overflowY: 'auto',
                           
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#888'
                        }}>
                            

                            <div>
                                {chat==false?(<h2>Select a group to view details</h2>):(
                                   <div>
                                    <ChatNav />
                                    <form>
                                        <label>ToDo</label>
                                        <input type="text" name="person" placeholder="Work assigned to "/>
                                        <input type="text" name="task" placeholder="Task description" />
                                        <button type="submit">Add</button>
                                        <button type="submit">Assign</button>
                                    </form>
                                   </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </>
        </div>
    )
}
