import React, { useContext, useEffect} from 'react';
import { Button, Card, Typography } from "@material-tailwind/react";
import { NoteContext } from '../contextApi/NoteContext';
import { useNavigate } from 'react-router-dom';

const TABLE_HEAD = ["Title", "Tag", "Data", "Status", "Add Status", "Submit Status"];

function NoteList() {
    const context = useContext(NoteContext)
    const {count, notes, getAllNote, updateNoteStatusController ,note, setNote} = context;
    
    const navigate = useNavigate()

    useEffect(() => {
        getAllNote()
    }, [count])

    const handleStatus = (e, id) => {
        e.preventDefault()
        updateNoteStatusController(id, note)
        navigate("/home", { replace: true })
    }
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
                        {notes?.note?.map(({ title, tag, date, status, _id }, index) => {
                            const isLast = index === notes.note.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={_id}>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {title}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {tag}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {date}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50`}>
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            {status}
                                        </Typography>
                                    </td>
                                    <td className='d-flex justify-center items-center'>
                                        <select id="city" className='py-2 rounded-lg border m-1  text-black w-96 hover:bg-rose-500 hover:border-emerald-500' placeholder='Enter Your City' type="text" value={note.status} onChange={(e) => setNote({ ...note, status: e.target.value })}>
                                            <option>Add Status</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Active">Active</option>
                                            <option value="Reject">Reject</option>
                                        </select>
                                    </td>
                                    <td>
                                        <Button disabled={!note.status} onClick={(e) => handleStatus(e, _id, note)}>Submit Status</Button>
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