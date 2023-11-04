import Home from './components/Home';
import NoteState from './contextApi/NoteState';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import Navigationbar from './components/Navigationbar';
import NoteList from './components/NoteList';
import EditNote from './components/EditNote';
import AddNote from './components/AddNote.js';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className='mt-10 mx-auto'>
          <Navigationbar />
          <Home />
        </div>
      ),
    },
    {
      path: "/home",
      element: (
        <div className='mt-10 mx-auto'>
          <Navigationbar />
          <Home />
        </div>
      )
    },
    {
      path: "/add-note",
      element: (
        <div className='mt-10 mx-auto'>
          <Navigationbar />
          <AddNote />
        </div>
      )
    },
    {
      path: "/note-list",
      element: (
        <div className='mt-10 mx-auto'>
          <Navigationbar />
          <NoteList />
        </div>
      )
    },
    {
      path: "/edit-note",
      element: (
        <div className='mt-10 mx-auto'>
          <Navigationbar />
          <EditNote />
        </div>
      )
    },
  ]);
  
  return (
    <NoteState>
      <DragDropContext>
        <RouterProvider router={router} />
      </DragDropContext>
    </NoteState>
  );
}

export default App;
