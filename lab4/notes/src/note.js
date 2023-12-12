import React, { useEffect, useState } from 'react';


function Note({note, addChild, removeNote, editNote, piratify}) {

    if (note.parent === null) {
        // This is a parent note
        return (
            <div key={note.id} id={note.id} className={`note ${note.colour}`}>
                <h2 className='note-title'>{note.title}</h2>
                <p className='note-body'>{note.body}</p>
                <div className="note-btns">
                    <button className="delete" onClick={() => removeNote(note.id)}>delete</button>
                    <button className="childbtn" onClick={() => addChild(note.id)}>add child</button>
                    <button className="childbtn" onClick={() => piratify(note)}>piratify</button>
                    <button className="childbtn" onClick={() => editNote(note.id)}>edit note</button>
                </div>
                <div className="child">
                    {note.children && note.children.map((cnote) => {
                        return <Note key={cnote.id} note={cnote} addChild={addChild} removeNote={removeNote} editNote={editNote} piratify={piratify}/>;
                    })}</div>
            </div>
        );
    } else {
        // This is a child note
        return (
            <div key={note.id} id={note.id} className={`cnote ${note.colour}`}>
                <span>{note.parent}</span>
                <h2 className='note-title'>{note.title}</h2>
                <p className='note-body'>{note.body}</p>
                <div className="note-btns">
                    <button className="delete" onClick={() => removeNote(note.id)}>delete</button>
                    <button className="childbtn" onClick={() => addChild(note.id)}>add child</button>
                    <button className="childbtn" onClick={() => piratify(note)}>piratify</button>
                    <button className="childbtn" onClick={() => editNote(note.id)}>edit note</button>
                </div>
                <div className="child">
                    {note.children && note.children.map((cnote) => {
                        return <Note key={cnote.id} note={cnote} addChild={addChild} removeNote={removeNote} editNote={editNote} piratify={piratify}/>;
                    })}
                </div>
            </div>
        );
    }
  
};

export default Note;
