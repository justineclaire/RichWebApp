//query selectors
const noteContainer = document.querySelector(".note-container");
const form = document.querySelector('form');
const titleinput = document.querySelector('#title');
//class for new note
class Note {
    constructor(title, body, colour) {
        this.title = title;
        this.body = body;
        this.colour = colour;
        this.id = Math.random();
    }
}

//Show alert message
function showAlertMessage(message, alertClass){
  const alertDiv = document.createElement('div');
  alertDiv.className = `message ${alertClass}`;
  alertDiv.appendChild(document.createTextNode(message));
  form.insertAdjacentElement('beforebegin', alertDiv);
  titleinput.focus();
  setTimeout(() => alertDiv.remove(), 2000)
}

//Local storage

//get notes from storage
function getNotes() {
    let notes;
    if (localStorage.getItem('noteApp.notes') === null){
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem('noteApp.notes'));
    }
    return notes;
    console.log(notes);
}

//add note to storage
function addNotetoStorage(note) {
    const notes = getNotes();
    notes.push(note);
    localStorage.setItem('noteApp.notes', JSON.stringify(notes));
}

//remove a note from storage
function removeNote(id) {
    const notes = getNotes();
    notes.forEach((note, index) => {
        if(note.id === id){
            notes.splice(index, 1);
        }
        localStorage.setItem('noteApp.notes', JSON.stringify(notes));
    })
}
// create note for user
function addNotetoList(note){
    const newUINote = document.createElement('div');
    newUINote.classList.add('note');
    newUINote.classList.add(note.colour);
    newUINote.innerHTML = `
    <span hidden>${note.id}</span>
    <h2 class='note-title'>${note.title}</h2>
    <p class='note-title' sty;e>${note.body}</p>
    <div class="note-btns">
        <button class="delete">delete</button>
    </div>
    `;
    noteContainer.appendChild(newUINote);
}

//show notes to user
function displayNotes() {
    const notes = getNotes();
    notes.forEach(note => {
        addNotetoList(note);
    })
}

//event note button
noteContainer.addEventListener('click', (e) =>{
    if(e.target.classList.contains('delete')) {
        const currentNote = e.target.closest('.note');
        currentNote.remove();
        showAlertMessage('Your note was permanently deleted', 'remove-message');

        const id = currentNote.querySelector('span').textContent;
        removeNote(Number(id));
    }
})


//event display notes
document.addEventListener('DOMContentLoaded', displayNotes);

//event submit form
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const titleinput = document.querySelector('#title');
    const noteinput = document.querySelector('#note');
    const colourinput = document.querySelector('#colour').value;

    //validate inputs
    if(titleinput.value.length > 0 && noteinput.value.length > 0){
        const newNote = new Note(titleinput.value, noteinput.value, colourinput);
        addNotetoList(newNote);
        addNotetoStorage(newNote);
        titleinput.value = '';
        noteinput.value = '';
        showAlertMessage('Note successfully added', 'success-message');
        titleinput.focus();
  } else {
    showAlertMessage('Please add both a title and a note', 'alert-message');
  }
});