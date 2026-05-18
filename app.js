//sSelect all HTML elements and create let notes, let currentNoteId = null

const newNote = document.querySelector("#btnNew");

const searchInput = document.querySelector("#searchInput");

const notesList = document.querySelector("#notesList");

const noteCount = document.querySelector("#noteCount");

const editorContent = document.querySelector("#editorContent");

const editorPlaceholder = document.querySelector("#editorPlaceholder");

const noteTitle = document.querySelector("#noteTitle");

const noteBody = document.querySelector("#noteBody");

const editorMeta = document.querySelector("#editorMeta");

const btnSave = document.querySelector("#btnSave");

const btnDelete = document.querySelector("#btnDelete");

const noteTag = document.querySelector("#noteTag");

//current Note id

let currentNoteId = null;

let notes = JSON.parse(localStorage.getItem("notes")) || [] ;


 // a renderNotes function that clears notesList, loops through notes with forEach, creates a card div for each note with title and date, appends it, updates note count
 
function renderNotes() {
  //clear note list 
  notesList.innerHTML ="";
  
  notes.forEach( (note) => {
    
    const card = document.createElement("div");
    
    card.className = "note-card";
    
    card.innerHTML = `<div class = "cardtitle"> ${ note.title || "Untitled"} </div>
     <div class = "carddate"> ${note.createdAt} </div>`;
    
    notesList.appendChild(card);
    
    
    
    
    /* Card click listener (inside forEach)
    Set currentNoteId = note.id
    Hide editorPlaceholder
    Show editorContent
    Set noteTitle.value, noteBody.value, noteTag.value, editorMeta.textContent*/

     card.addEventListener("click", () => { 
       
       currentNoteId = note.id
       
       editorPlaceholder.classList.add("hidden");
       
       editorContent.classList.remove("hidden");
       
       noteTitle.value = note.title;
       noteBody.value = note.body; 
       noteTag.value = note.tag ;
       editorMeta.textContent = note.createdAt;
       
     });
     
     
});
    noteCount.textContent= notes.length
    
};


 /* New note button
Create note object: id, title: "", body: "", tag: "", createdAt
Push to notes*/

newNote.addEventListener("click" , () => {
   const noteObj = {
     id : Date.now(),
     title: "",
     body : "",
     tag : "",
     createdAt : new Date().toLocaleString(),
     
   } 
  
  notes.push(noteObj);
  
  editorPlaceholder.classList.add("hidden");
  editorContent.classList.remove("hidden");
  
  //Clear title, body, tag inputs
  
  noteTitle.value = "";
  noteBody.value = "";
  noteTag.value = "";
  
  saveNotes()
  renderNotes()
  
});

/* Save button
Find note with notes.find() where note.id === currentNoteId
Update title, body, tag from input values*/

btnSave.addEventListener("click", () => {
  
  const findNotes  = notes.find( note => note.id === currentNoteId);
  
  findNotes.title = noteTitle.value
  findNotes.body = noteBody.value
  findNotes.tag  = noteTag.value
  
  saveNotes()
  renderNotes()
});

/*Delete button
Filter out note where note.id === currentNoteId
Hide editor, show placeholder*/

btnDelete.addEventListener("click", () => {
  
  notes = notes.filter( note => note.id !== currentNoteId);
  
  editorContent.classList.add("hidden");
  editorPlaceholder.classList.remove("hidden")
  
  
  saveNotes()
  renderNotes()
});



 function saveNotes() {
  localStorage.setItem("notes",JSON.stringify(notes));
  
}

renderNotes()