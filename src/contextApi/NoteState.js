import React, { useState } from "react"
import { NoteContext } from './NoteContext';
import axios from "axios"


const NoteState = (props) => {
    const hostAPI = "https://excited-kimono-clam.cyclic.app"
    const initialNote = []
    const [notes, setNotes] = useState(initialNote)
    const [count, setCount] = useState(0)
    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "", status: "" })
    // get note function
    const getAllNote = async () => {
        try {
            const res = await axios.get(`${hostAPI}/api/note/getnote`)
            setNotes(res.data.note)
        } catch (error) {
            return alert(`Something went wrong - ${error.message}`)
        }
    }

    //add note function
    const addNoteController = async (noteValue) => {
        try {
            const res = await axios.post(`${hostAPI}/api/note/postnote`, noteValue)
            const noteData = await res.data

            if (noteData) {
                alert("Note Added")
            }
            setNotes(notes.concat(noteData))
        } catch (error) {
            return alert(`Something went wrong - ${error.message}`)
        }
    }

    //update note function
    const updateNoteController = async (id, title, description, tag) => {
        try {
            const updateValue = { title, description, tag }
            const res = await axios.put(`${hostAPI}/api/note/updatenote/${id}`, updateValue)

            const json = await res.data;

            let newNotes = JSON.parse(JSON.stringify(notes));
            // logic to edit in client
            for (let index = 0; index < newNotes.length; index++) {
                const element = newNotes[index]
                if (element._id === id) {
                    newNotes[index].title = title;
                    newNotes[index].description = description;
                    newNotes[index].tag = tag;
                    break;
                }
            }
            setNotes(newNotes)

            if (json) {
                alert("Note update successfully done")
            }
        } catch (error) {
            return alert(`Something went wrong - ${error.message}`)
        }
    }

    //update note status function
    const updateNoteStatusController = async (id, status) => {
        console.log(status)
        try {
            await axios.patch(`${hostAPI}/api/note/notestatus/${id}`, status)

            let updateStatus = JSON.parse(JSON.stringify(notes));
            // logic to edit in client
            for (let index = 0; index < updateStatus.length; index++) {
                const element = updateStatus[index]
                if (element._id === id) {
                    updateStatus[index].status = status;
                    break;
                }
            }
            setNotes(updateStatus)


        } catch (error) {
            return alert(`Something went wrong - ${error.message}`)
        }
    }

    // delete note function
    const deleteNoteController = async (id) => {
        try {
            const res = await axios.delete(`${hostAPI}/api/note/deletenote/${id}`)
            const json = res.data;
            const newNote = notes.filter((note) => note._id !== id)
            setNotes(newNote)

            if (json) {
                alert("Note deleted done!")
            }
        } catch (error) {
            return alert(`Something went wrong - ${error.message}`)
        }
    }

    return (
        <NoteContext.Provider value={{ count, setCount, note, setNote, notes, setNotes, getAllNote, addNoteController, updateNoteController, updateNoteStatusController, deleteNoteController }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState