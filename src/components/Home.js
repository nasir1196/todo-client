import React, { useContext, useEffect } from 'react';
import { NoteContext } from '../contextApi/NoteContext';
import { Link } from 'react-router-dom';



function Home() {
    const context = useContext(NoteContext)
    const { count, getAllNote, notes, setNote, deleteNoteController } = context;

    const deleteHandler = (id) => {
        deleteNoteController(id)
        window.location.reload(false);
    }

    const handleData = (_id, title, description, tag) => {
        setNote({ id: _id, title: title, description: description, tag: tag })
    }

    useEffect(() => {
        getAllNote()
    }, [count])

    return (
        <div>
            <h1 className='text-center text-green-700 text-4xl font-extrabold m-5'>Todo Note List</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 md:gap-2 lg:gap-4' >
                {
                    notes && notes?.map((note) => {
                        const { title, description, tag, status, _id } = note
                        return (
                            <div key={_id} className=' m-2 p-3 transition-colors ease-in-out' style={{ border: "1px solid black", borderRadius: "0.5rem" }}>
                                <div className="grid grid-cols-2 gap-4 m-3">
                                    <h1 className='text-3xl'>{title}</h1>
                                    <button className={status === "Pending" ? "bg-yellow-500 rounded-md px-3 py-1" : status === "Active" ? "bg-green-500 rounded-md px-3 py-1" : "bg-red-500 rounded-md px-3 py-1"} >{status}</button>
                                </div>
                                <p >{description}</p>
                                <div className='grid grid-cols-3'>
                                    <button className='border-black p-2 m-3 bg-indigo-600 text-yellow-100 rounded'>{tag}</button>
                                    <Link to="/edit-note" onClick={() => handleData(_id, title, description, tag)}>
                                        <button className='border-black p-2 m-3 bg-yellow-500 text-black rounded' >Edit</button>
                                    </Link>
                                    <button className='border-black p-2 m-3 bg-red-600 text-yellow-100 rounded' onClick={() => deleteHandler(_id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }





            </div>
        </div>
    )
}

export default Home;