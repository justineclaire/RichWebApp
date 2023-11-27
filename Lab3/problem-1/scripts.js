document.addEventListener('DOMContentLoaded', () => {
const { fromEvent, map, find } = rxjs;  // import pipe functions here
 

//query selectors
const noteContainer = document.querySelector(".note-container");
const form = document.querySelector('form');
const button = document.getElementById('ibutton');
const titleinput = document.querySelector('#title');
const noteinput = document.querySelector('#note');
const colourinput = document.querySelector('#colour');



//Show alert message
function showAlertMessage(message, alertClass){
  const alertDiv = document.createElement('div');
  alertDiv.className = `message ${alertClass}`;
  alertDiv.appendChild(document.createTextNode(message));
  form.insertAdjacentElement('beforebegin', alertDiv);
  titleinput.focus();
  setTimeout(() => alertDiv.remove(), 2000)
}



//get notes from storage
function getNotes() {
    let notes;
    if (localStorage.getItem('noteApp.notes') === null){
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem('noteApp.notes'));
    }
    return notes;
}

//add note to storage
function addNotetoStorage(note) {
    const notes = getNotes();
    notes.push(note);
    localStorage.setItem('noteApp.notes', JSON.stringify(notes));
}

function removeAllNotes() {
    localStorage.removeItem('noteApp.notes');
}

//remove a note from storage
function removeNote(id) {
    const notes = getNotes();
    notes.forEach((note, index) => {
        console.log(id);
        if(note.id === Number(id) || Number(note.parent) === Number(id)){
            notes.splice(index, 1);
        }
    })
    localStorage.setItem('noteApp.notes', JSON.stringify(notes));
}

// create note for user
function addNotetoList(note){
    if (note.parent === null) {
    const newUINote = document.createElement('div');
    newUINote.classList.add('note');
    newUINote.id = note.id;
    newUINote.classList.add(note.colour);
    newUINote.innerHTML = `
    <span hidden>${note.id}</span>
    <h2 class='note-title'>${note.title}</h2>
    <p class='note-body'>${note.body}</p>
    <div class="note-btns">
        <button class="delete">delete</button>
        <button class="child">add child</button>
    </div>
    `;
    noteContainer.appendChild(newUINote);
    } else {
        const parentNote = document.getElementById(note.parent); //where parent is the id of the parent note
        const newUINote = document.createElement('div');
        newUINote.classList.add('note');
        newUINote.classList.add(parentNote.id);
        newUINote.classList.add(note.colour);
        newUINote.innerHTML = `
        <span hidden>${note.id}</span>
        <h2 class='note-title'>${note.title}</h2>
        <p class='note-body'>${note.body}</p>
        <button class="delete">delete</button>
        `;
        parentNote.appendChild(newUINote);
    }
    
    
}

//show notes to user
function displayNotes() {
    const notes = getNotes();
    notes.forEach(note => {
        addNotetoList(note);
    })
}

//event delete note
const deletePressed = fromEvent(noteContainer, 'click');

const delNote = deletePressed.pipe(
    map(event => {
        // Assuming each note has an 'id' attribute
        if(event.target.classList.contains('delete')){
        const closestNote = event.target.closest('.note');
        
        return closestNote;
    }
}));

const deleteNote = delNote.subscribe(note => { 
    if (note) {
        showAlertMessage('Your note was permanently deleted', 'remove-message');
        const id = note.querySelector('span').textContent;
        note.remove();
        removeNote(id);
        
    } else {
        showAlertMessage('Your note was not deleted', 'remove-message');
        console.log('No matching note found');
    }
});

//event loaded
const loaded = fromEvent(document, 'change').subscribe(displayNotes());


//event create note
const submitPressed = fromEvent(button, 'click');
const noteobj = submitPressed.pipe(
    map(event => {
        // Prevent the default form submission behavior
        event.preventDefault();
    
        return {
            parent: null,
            title: titleinput.value,
            body: noteinput.value,
            colour: colourinput.value,
            id: Math.random()
        }
    })
)

noteobj.subscribe(note => {
    createAndHandleNote(note);
});
  
function createAndHandleNote(note) {
if(note.title.length > 0 && note.body.length > 0){
    addNotetoList(note);
    addNotetoStorage(note);
    titleinput.value = '';
    noteinput.value = '';
    showAlertMessage('Note successfully added', 'success-message');
    titleinput.focus();

} else {
showAlertMessage('Please add both a title and a note', 'alert-message');
}}

const addChildPressed = fromEvent(noteContainer, 'click');
const childNote = addChildPressed.pipe(
    map(event => {
        // Assuming each note has an 'id' attribute
        if(event.target.classList.contains('child')){
        const closestNote = event.target.closest('.note');
        const parentId = closestNote.id;

        return {
            parent: parentId,
            title: titleinput.value,
            body: noteinput.value,
            colour: colourinput.value,
            id: Math.random()
        }
    }
})).subscribe(note => {
    createAndHandleNote(note);
});

});