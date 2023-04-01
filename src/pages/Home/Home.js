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
    email:""
  })
  const [currentId,setCurrentId]=useState(null);
  const [addMore,setAddMore]=useState(false);

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
    setInputText({title:"",description:"",email:""});
  }

  const addMoreHandler = (e) => {
    e.preventDefault();
    setAddMore((prev)=>!prev);
  }


  return (
    <main className="home">
      <Header/>
      <div className="home_container">
        <div className="home_container_top">
          <form className="home_form_container" onSubmit={handleSubmitNote}>
            <h3 className="form_heading">Create A Todo</h3>
            <div className='home_form_top'>
              <input 
                type="text" 
                value={inputText.title} 
                name="title" 
                onChange={changeHandeler} 
                className="form_input" 
                placeholder="Text" 
              />
              <input 
                type="email" 
                value={inputText.email} 
                name="email" 
                onChange={changeHandeler} 
                className="form_input" 
                placeholder="Enter Assignee Email" 
              />
              <button className="form_add_more" onClick={addMoreHandler}>Add more</button>
            </div>
            {addMore && (
              <textarea 
                type="text" 
                value={inputText.description} 
                name="description" 
                onChange={changeHandeler} 
                className="form_textarea" 
                placeholder="Description"
              />
            )}
            <button className="form_button">Create</button>
          </form>
        </div>
        <div className="home_container_bottom">
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
      </div>

    </main>
  )
}

export default Home
