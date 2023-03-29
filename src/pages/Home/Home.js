import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header';
import Note from '../../components/Note/Note';
import "./home.css";
import {getNotes,createNote,updateNote} from "../../actions/notes";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


const Home = () => {
  const [inputText,setInputText]=useState({
    title:"",
    description:"",
  })
  const [currentId,setCurrentId]=useState(null);

  const dispatch = useDispatch();

  const notes = useSelector((state)=>state.notes);
  const user = JSON.parse(localStorage.getItem("profile"));
  const updatedNote = useSelector((state)=>currentId ? state.notes.find((c)=>c._id===currentId):null);


  useEffect(()=>{
    dispatch(getNotes());
  },[dispatch,currentId]);

  useEffect(()=>{
    if(updatedNote){
      setInputText(updatedNote);
    }
  },[updatedNote]);

  const changeHandeler=(e)=>{
    setInputText({
      ...inputText,
      [e.target.name]:e.target.value,
    })
  }

  const handleSubmitNote=(e)=>{
    e.preventDefault();
    if(currentId){
      dispatch(updateNote(currentId,inputText));
    }else{
      dispatch(createNote(inputText));
    }
    handleClearNote();
  }

  const handleClearNote=()=>{
    setCurrentId(null);
    setInputText({title:"",description:""});
  }


  return (
    <main className="home">
      <Header/>
      <div className="home_container">
        <div className="home_container_left">
        {notes.length>0?
        (
        <>
          {notes.filter((note)=>note?.creator===user?.result?._id).map((item,i)=>(
            <Note key={i} item={item} setCurrentId={setCurrentId}/>
          ))}
        </>
        ):
        <h2>Start adding ToDO's</h2>}          
        </div>
        <div className="home_container_right">
          <form className="home_form_container" onSubmit={handleSubmitNote}>
            <h3 className="form_heading">Create A Todo</h3>
            <input 
              type="text" 
              value={inputText.title} 
              name="title" 
              onChange={changeHandeler} 
              className="form_input" 
              placeholder="Text" 
            />
            <textarea 
              type="text" 
              value={inputText.description} 
              name="description" 
              onChange={changeHandeler} 
              className="form_textarea" 
              placeholder="Description"
            />
            <button className="form_button">Create</button>
          </form>
        </div>
      </div>

    </main>
  )
}

export default Home
