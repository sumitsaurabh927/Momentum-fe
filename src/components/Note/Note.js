import React, { useState, useEffect } from 'react'
import "./note.css"
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteNote, deleteTodoInApp, sendEmailNotification, sendSmsNotification } from '../../actions/notes';
import {MdOutlineEmail} from "react-icons/md";
import {BsTrash3Fill} from "react-icons/bs"
import {FiEdit} from "react-icons/fi";
import {MdSms} from "react-icons/md";


const Note = ({item,setCurrentId}) => {
  const [isDone,setIsDone]=useState(false);
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("")
  const [isEmail,setIsEmail]=useState(false);
  const [isSms,setIsSms]=useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();

  useEffect(()=>{
    const storedIsDone = localStorage.getItem(item._id);
    if (storedIsDone !== null) {
      setIsDone(JSON.parse(storedIsDone));
    }
  },[item._id])

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("profile")))
  },[])

  const donehandler = () => {
    setIsDone((prev)=>!prev);
    localStorage.setItem(item._id, JSON.stringify(true));
  }

  const deleteTodoHandler = async () => {
    const deleteInAppNote={
      title: item.title,
      description: item.description,
      userId: user?.result?._id,
      message: "deleted"
    }
    try {
      dispatch(deleteTodoInApp(deleteInAppNote));
      dispatch(deleteNote(item._id))
    } catch (error) {
      console.log("deleteTodoHandler error",error);
    }
  }

  const smsHandler = () => {
    setIsSms((prev)=>!prev);
  }

  const emailHandler = () => {
    setIsEmail((prev)=>!prev);
  }

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    const emailNote = {
      title: item.title,
      description: item.description,
      email: email,
      noteId: item._id
    };
    try {
      dispatch(sendEmailNotification(emailNote));
    } catch (error) {
      console.log("handleSubmitEmail error",error)
    }
    setEmail("");
  }

  const handleSubmitPhone = async (e) => {
    e.preventDefault();
    const smsNote = {
      title: item.title,
      description: item.description,
      phone: phone,
      noteId: item._id
    }
    try {
      dispatch(sendSmsNotification(smsNote));
    } catch (error) {
      console.log("handleSubmitPhone error",error)
    }
    setPhone("")
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
          <div className='icon_container note_delete' onClick={deleteTodoHandler}>
            <BsTrash3Fill/>
          </div>
        </div>
      </div>
      <div className='note_input_container'>
        <p className={isDone ? "note_description done" : "note_description"}>{item.description}</p>
        {isEmail && (
          <form className='note_form_container' onSubmit={handleSubmitEmail}>
            <input
              className='input_box'
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder='Enter Assignee email'
            />
            <button className='note_form_button'>send Email</button>
          </form>
        )}
        {isSms && (
          <form className='note_form_container' onSubmit={handleSubmitPhone}>
            <input
              className='input_box'
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              type="number"
              placeholder='Enter Number'
            />
            <button className='note_form_button'>Send sms</button>
          </form>
        )}
        <span>created on {moment(item.createdAt).fromNow()}</span>
      </div>
    </div>

  )
}

export default Note
