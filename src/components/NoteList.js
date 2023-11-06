import React, { useContext, useEffect } from "react";
import { NoteContext } from "../contextApi/NoteContext";
import { Link, useNavigate } from "react-router-dom";

const TABLE_HEAD = [
  "Title",
  "Tag",
  "Data",
  "Status",
  "Submit Status",
  "Action",
];

function NoteList() {
  const context = useContext(NoteContext);
  const {
    count,
    notes,
    updateNoteStatusController,
    setNote,
    deleteNoteController,
    note,
    getAllNoteList,
    api,
  } = context;
  const navigate = useNavigate();

  const handleStatus = (id, noteStatus) => {
    updateNoteStatusController(id, noteStatus);
    if (api) {
      navigate("/", { replace: true });
    }
  };

  const handleData = (_id, title, description, tag) => {
    setNote({ id: _id, title: title, description: description, tag: tag });
  };

  useEffect(() => {
    getAllNoteList();
  }, [count]);
  return (
    <div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD?.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <p
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {notes?.note?.map((items, index) => {
            const isLast = index === notes?.note?.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            const { _id, title, description, tag, date, status } = items;
            return (
              <tr key={_id}>
                <td className={classes}>
                  <p color="blue-gray" className="font-normal">
                    {title}
                  </p>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <p color="blue-gray" className="font-normal">
                    {tag}
                  </p>
                </td>
                <td className={classes}>
                  <p color="blue-gray" className="font-normal">
                    {date}
                  </p>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <p color="blue-gray" className="font-medium">
                    {status}
                  </p>
                </td>

                <td className="d-flex justify-center items-center">
                  <select
                    id="status"
                    className=" rounded-lg border text-black hover:bg-rose-500 hover:border-emerald-500"
                    type="text"
                    value={note.status}
                    onChange={(e) =>
                      setNote({ ...note, status: e.target.value })
                    }
                  >
                    <option>Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Reject">Reject</option>
                  </select>
                  <button
                    className="bg-green-500 m-2 text-black py-2 px-5 rounded-md"
                    onClick={() => handleStatus(_id, note)}
                  >
                    Submit Status
                  </button>
                </td>
                <td className="d-flex justify-center items-center">
                  <button className=" m-2 bg-orange-500 py-2 px-5 rounded-md">
                    {" "}
                    <Link
                      className="px-6"
                      to="/edit-note"
                      onClick={() => handleData(_id, title, description, tag)}
                    >
                      Edit
                    </Link>
                  </button>

                  <button
                    className=" m-2 bg-red-500 py-2 px-5 rounded-md"
                    onClick={() => deleteNoteController(_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default NoteList;
