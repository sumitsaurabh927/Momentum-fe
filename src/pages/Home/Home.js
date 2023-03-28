import React,{useState} from 'react'
import Header from '../../components/Header/Header';
import Note from '../../components/Note/Note';
import "./home.css";

const Home = () => {
  const [notes,setNotes]=useState([]);
  const [inputText,setInputText]=useState({
    title:"",
    description:"",
  })
  const changeHandeler=(e)=>{
    setInputText({
      ...inputText,
      [e.target.name]:e.target.value,
    })
  }

  const clickHandeler=()=>{
    let newNote={...inputText};
    setNotes((prev)=>[...prev,newNote]);
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
          {notes.map((item,i)=>(
            <Note key={i} item={item}/>
          ))}
        </>
        ):
        <h2>Start adding notes</h2>}          
        </div>
        <div className="home_container_right">
          <form className="home_form_container" onSubmit={(e)=>e.preventDefault()}>
            <h3 className="form_heading">Create A Note</h3>
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
            <button className="form_button" onClick={clickHandeler}>Create</button>
          </form>
        </div>
      </div>

    </main>
  )
}

export default Home
