import React, { useEffect, useState } from 'react';
import Note from './note.js';
import sbflute from './sbflute.mp3';
import ship from './ship.jpg';
import sky from './sky.jpg';

export default Home;

function Home() {
    
//query selectors
const [notes, setNotes] = useState ([]);

//get notes from storage
useEffect(() => {
    if (localStorage.getItem('noteApp.notes') === null){
        setNotes([]);
    } else {
        setNotes(JSON.parse(localStorage.getItem('noteApp.notes')));
    }

}, []);

useEffect(() => {
    document.querySelector('#title').value = '';
    document.querySelector('#note').value = '';
}, [notes]);



const addNote = e => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#note').value;
    const colour = document.querySelector('#colour').value;
    const id = Math.random();
    const parent = null;
    const children = [];
    const noteObj = {parent, title, body, colour, id, children};
    setNotes(prevNotes => {
        const updatedNotes = [...prevNotes, noteObj];
        localStorage.setItem('noteApp.notes', JSON.stringify(updatedNotes));
        return updatedNotes;
    });
};

const addChild = (parentId) => {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#note').value;
    const colour = document.querySelector('#colour').value;
    const id = Math.random();
    const parent = parentId;
    const children = [];
    const noteObj = {parent, title, body, colour, id, children};
    notes.forEach((note) => {
        if(note.id === Number(parentId)){
            note.children.push(noteObj);
        }
    });
    setNotes([...notes, noteObj]);
    localStorage.setItem('noteApp.notes', JSON.stringify(notes));
};



const removeNote = (noteId) => {
    setNotes(prevNotes => {
        const updatedNotes = prevNotes.map(note => {
            if (note.children) {
                note.children = note.children.filter(child => child.id !== noteId);
            }
            return note;
        }).filter(note => note.id !== noteId);
        localStorage.setItem('noteApp.notes', JSON.stringify(updatedNotes));
        return updatedNotes;
    });
};

function play() {
    new Audio(sbflute).play();
}

const piratify = (note) => {
    play();
    document.getElementsByClassName('body')[0].style.backgroundImage = `url(${ship})`;
    document.getElementsByClassName('body')[0].style.backgroundSize = 'cover'; 
    document.getElementById(note.id).style.backgroundImage = `url(${sky})`;
    document.getElementById(note.id).style.backgroundSize = 'cover';
    setTimeout(() => { 
        document.getElementsByClassName('body')[0].style.backgroundImage = 'none';
    }, 10000);
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'X-Funtranslations-Api-Secret': '<api_key>',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'text=' + JSON.stringify(note.body)
    };
    fetch('https://api.funtranslations.com/translate/pirate.json', requestOptions)
        .then(response => response.json())
        .then(async data => { console.log(data.contents.translated)
           document.querySelector('#title').value = note.title
            document.querySelector('#colour').value = note.colour
            document.querySelector('#note').value = await data.contents.translated
            editNote(note.id)
        });
        
};

const editNote = (noteId) => {
    setNotes(prevNotes => {
        const updatedNotes = prevNotes.map(note => {
            if (note.id === noteId && note.parent === null) {
                note.title = document.querySelector('#title').value;
                note.body = document.querySelector('#note').value;
                note.colour = document.querySelector('#colour').value;
            } else if (note.children) {
                note.children = note.children.map(child => {
                    if (child.id === noteId) {
                        child.title = document.querySelector('#title').value;
                        child.body = document.querySelector('#note').value;
                        child.colour = document.querySelector('#colour').value;
                    }
                    return child;
                });
            }
            return note;
        });
        localStorage.setItem('noteApp.notes', JSON.stringify(updatedNotes));
        return updatedNotes;
    });
};
    return (
       <div className='body'>
        <title>Take notes here!</title>
 
            <div className="form-container">
            <h1>Note Taker</h1>
            <h3>Add a New Note:</h3>
            <form id="form">
                <label className="formbox">Title
                <input type="text" id="title" placeholder="Enter a note title."/>
                </label>
                <label className="formbox">Note
                <textarea type="text" id="note" cols="30" rows="10" placeholder="Enter note text."></textarea>
                </label>
                <select id="colour">
                    <option value="pink">Pink</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                </select>
                <input id="ibutton" type="submit" onClick={addNote} />
            </form>
            </div>
            <div className="note-container">
            {notes.map((note) => (
                <Note key={note.id} note={note} addChild={addChild} removeNote={removeNote} editNote={editNote} piratify={piratify}/>
            ))}
            </div>
       
        </div>
    );
};

