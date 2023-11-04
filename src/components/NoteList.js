import React, { useContext, useEffect } from 'react';
import { Button, Card, Typography } from "@material-tailwind/react";
import { NoteContext } from '../contextApi/NoteContext';
import {useNavigate} from "react-router-dom"

const TABLE_HEAD = ["Title", "Tag", "Data", "Status", "Add Status", "Submit Status"];

function NoteList() {
    const navigate = useNavigate()
    const context = useContext(NoteContext)
    const { count, notes, getAllNote, updateNoteStatusController, note, setNote } = context;
    

    const handleStatus = (e, id, note) => {
        e.preventDefault()
        updateNoteStatusController(id, note)
        navigate("/")
    }

    useEffect(() => {
        getAllNote()
    }, [count])
    return (
        <div>
            <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD?.map((head) => (
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {notes?.map((items, index) => {
                            const isLast = index === notes?.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";


                            return (
                                <tr key={items._id}>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {items.title}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {items.tag}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {items.date}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50`}>
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            {items.status}
                                        </Typography>
                                    </td>
                                    <td className='d-flex justify-center items-center'>
                                        <select value={note.status}  onChange={(e) => setNote({ ...note, status: e.target.value })}>
                                            <option>Add Status</option>
                                            <option value="Active">Active</option>
                                            <option value="Reject">Reject</option>
                                            <option value="Pending">Pending</option>
                                        </select>
                                    </td>
                                    <td>
                                        <Button onClick={(e) => handleStatus(e, items._id, note)}>Status</Button>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}

export default NoteList;