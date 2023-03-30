import React, { useState, useEffect } from 'react'
import "./note.css"
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../../actions/notes';

const Note = ({item,setCurrentId}) => {
  const [isDone,setIsDone]=useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    const storedIsDone = localStorage.getItem(item._id);
    if (storedIsDone !== null) {
      setIsDone(JSON.parse(storedIsDone));
    }
  },[item._id])

  const donehandler=()=>{
    setIsDone(true);
    localStorage.setItem(item._id, JSON.stringify(true));
  }

  return (
    <div className="note">
      <h2 className={isDone ? "note_title done" : "note_title"}>{item.title}</h2>
      <p className={isDone ? "note_description done" : "note_description"}>{item.description}</p>
      <div className="note_button_container">
        <button className="note_done note_button" onClick={donehandler}>Done</button>
        <button className="note_update note_button" onClick={()=>setCurrentId(item._id)}>Update</button>
        <button className="note_delete note_button" onClick={()=>dispatch(deleteNote(item._id))}>Delete</button>
      </div>
      <span>created on {moment(item.createdAt).fromNow()}</span>
    </div>

  )
}

export default Note
