import React, { useEffect, useState } from 'react'
import { completeMessage, deleteMessage, getAllMessages, inCompleteMessage } from '../services/MessageService'
import { useNavigate } from 'react-router-dom'

const ListTodoComponent = () => {

    const [messages, setMessages] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        listMessages();
    }, [])
    
    async function listMessages(){
        try {
            const response = await getAllMessages();
            setMessages(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function removeMessage(id){
        try {
            await deleteMessage(id);
            await listMessages();
        } catch (error) {
            console.error(error);
        }
    }

    async function markCompleteMessage(id){
        try {
            await completeMessage(id);
            await listMessages();
        } catch (error) {
            console.error(error);
        }
    }

    async function markInCompleteMessage(id){
        try {
            await inCompleteMessage(id);
            await listMessages();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='container'>
            <h2 className='text-center mt-5'>List of Messages</h2>
            
            <div>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>email</th>
                            <th>message</th>
                            <th>date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            messages.map(message => 
                                <tr key={message.id}>
                                    <td>{message.name}</td>
                                    <td>{message.phone}</td>
                                    <td>{message.email}</td>
                                    <td>{message.message}</td>
                                    <td>{message.date}</td>
                                    <td>{message.completed ? 'YES': 'NO'}</td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => removeMessage(message.id)} style={ { marginLeft: "10px" }} >Delete</button>
                                        <button className='btn btn-success' onClick={() => markCompleteMessage(message.id)} style={ { marginLeft: "10px" }} >Complete</button>
                                        <button className='btn btn-info' onClick={() => markInCompleteMessage(message.id)} style={ { marginLeft: "10px" }} >In Complete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListTodoComponent
