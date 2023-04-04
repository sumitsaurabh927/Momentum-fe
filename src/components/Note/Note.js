import React, { useState, useEffect } from 'react'
import "./note.css"
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../../actions/notes';
import {MdOutlineEmail} from "react-icons/md";
import {BsTrash3Fill} from "react-icons/bs"
import {FiEdit} from "react-icons/fi";
import {MdSms} from "react-icons/md";

const Note = ({item,setCurrentId}) => {
  const [isDone,setIsDone]=useState(false);
  const [isEmail,setIsEmail]=useState(false);
  const [isSms,setIsSms]=useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    const storedIsDone = localStorage.getItem(item._id);
    if (storedIsDone !== null) {
      setIsDone(JSON.parse(storedIsDone));
    }
  },[item._id])

  const donehandler = () => {
    setIsDone(true);
    localStorage.setItem(item._id, JSON.stringify(true));
  }

  const smsHandler = () => {
    setIsSms((prev)=>!prev);
  }

  const emailHandler = () => {
    setIsEmail((prev)=>!prev);
  }

  return (
    <div className="note">
      <div className='note_container'>
        <div className='note_text_container'>
          <input
            type="checkbox"
            classname="note_checkbox"
            checked={isDone}
            onChange={donehandler}
          />
          <h2 className={isDone ? "note_title done" : "note_title"}>{item.title}</h2>
        </div>
        <div className="note_button_container">
          <div className='icon_container' onClick={emailHandler}>
            <MdOutlineEmail/>
          </div>
          <div className='icon_container' onClick={smsHandler}>
            <MdSms/>
          </div>
          <div className='icon_container note_update' onClick={()=>setCurrentId(item._id)}>
            <FiEdit/>
          </div>
          <div className='icon_container note_delete' onClick={()=>dispatch(deleteNote(item._id))}>
            <BsTrash3Fill/>
          </div>
        </div>
      </div>
      <div className='note_input_container'>
        <p className={isDone ? "note_description done" : "note_description"}>{item.description}</p>
        {isEmail && (
          <input
            className='input_box'
            type="text"
            placeholder='Enter Assignee email'
          />
        )}
        {isSms && (
          <input
            className='input_box'
            type="number"
            placeholder='Enter Number'
          />
        )}
        <span>created on {moment(item.createdAt).fromNow()}</span>
      </div>
    </div>

  )
}

export default Note
