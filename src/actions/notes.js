import * as api from "../api/index"
import {toast} from "react-toastify";

export const getNotes=()=>async (dispatch)=>{
    try {
        const {data}= await api.fetchNotes();
        dispatch({type:"FETCH_ALL",payload:data});
    } catch (error) {
        console.log("getNotes error",error);
    }
}

export const createNote=(note)=>async (dispatch)=>{
    try {
        const {data}= await api.createNote(note);
        dispatch({type:"CREATE",payload:data});
        toast.success("note added!!");
    } catch (error) {
        console.log("createNote error",error);
    }
}

export const updateNote=(id,note)=> async (dispatch)=>{
    try {
        const {data}= await api.updateNote(id,note);
        dispatch({type:"UPDATE",payload:data});
        toast.success("note updated!!");
    } catch (error) {
        console.log("updatedNote error",error);
    }
}

export const deleteNote= (id)=> async (dispatch)=>{
    try {
        await api.deleteNote(id);
        dispatch({type:"DELETE",payload:id});
        toast.warning("note deleted!!");
    } catch (error) {
        console.log("deleteNote error",error);
    }
}
