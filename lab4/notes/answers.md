# Question 1
**Explain using code examples what is meant by props and state in React JS?**
Props in react are a way to pass data or properties between components. 
e.g. below is the component for the main page in the app. It passes each note id, note object and the removeNote function to the Note component
``` 
function App() {
    const removeNote = (noteId) => {
        //remove note 
    };

  return (
    {notes.map((note) => (
        <Note key={note.id} note={note} removeNote={removeNote} />
    ))} 
  );
}
```

Then the note component below takes the note and function as props to use when being created i.e. the props are shared between components
```
function Note({note, removeNote}) {
        return (
            <div key={note.id} id={note.id} className={`note ${note.colour}`}>
                    //note
                    <button className="delete" onClick={() => removeNote(note.id)}>delete</button>
            </div>
        );
};
```

State is the realtime data available only in the component it is created in. For example below, notes is a state that is initialised to an empty array. The setNotes() function is used to set the notes state to something e.g. below sets it to a local storage array. This 'notes' array is only available to the component it is created in.

```
const [notes, setNotes] = useState ([]);
setNotes(JSON.parse(localStorage.getItem('noteApp.notes')));
```
# Question 2
**In functional programming, what does the term functor mean? Can you give an example in JavaScript?**

# Question 3
**We have looked at three kinds of asynchronous programming mechanisms, namely callbacks, promises and streams. Mention one advantage and one disadvantage of each type.**

# Question 4
**With the aid of a diagram and example code, describe the Cascading Style Sheets (CSS) Box Model and show how it can be used to space DOM elements**

# Question 5
**Detail how the browser loads and bootstraps a rich web application from an initial URL.**

# Question 6