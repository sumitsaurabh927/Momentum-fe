import React from 'react'
import "./note.css"
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../../actions/notes';

const Note = ({item,setCurrentId}) => {
  const dispatch = useDispatch();
  return (
    <div className="note">
      <h2 className="note_title">{item.title}</h2>
      <p className='note_description'>{item.description}</p>
      <div className="note_button_container">
        <button className="note_update note_button" onClick={()=>setCurrentId(item._id)}>Update</button>
        <button className="note_delete note_button" onClick={()=>dispatch(deleteNote(item._id))}>Delete</button>
      </div>
      <span>created on {moment(item.createdAt).fromNow()}</span>
    </div>

  )
}

export default Note
