const notesContainer = document.querySelector('.notes-container');
const createBtn = document.querySelector('.btn');
let notes = [];

// 🧩 Load notes from localStorage and display them properly
function showNotes() {
  const saved = localStorage.getItem("notes");
  if (saved) {
    notes = JSON.parse(saved); // stored as array
    notes.forEach(text => createNote(text)); // recreate all notes
  }
}

// 🧩 Save all notes (only text content)
function updateStorage() {
  const allNotes = Array.from(document.querySelectorAll('.inputbox'))
                        .map(note => note.textContent.trim());
  localStorage.setItem("notes", JSON.stringify(allNotes));
}

// 🧩 Create new note element
function createNote(text = "") {
  const inputBox = document.createElement("p");
  const img = document.createElement("img");

  inputBox.className = "inputbox";
  inputBox.setAttribute("contenteditable", "true");
  inputBox.textContent = text;

  img.src = "images/delete.png";
  img.alt = "Delete Note";

  inputBox.appendChild(img);
  notesContainer.appendChild(inputBox);

  // Save changes when typing
  inputBox.onkeyup = updateStorage;

  // Delete this note when clicking the image
  img.onclick = () => {
    inputBox.remove();
    updateStorage();
  };
}

// 🧩 When clicking "Create Note" button
createBtn.addEventListener("click", () => {
  createNote();
  updateStorage();
});

// 🧩 Load saved notes when page opens
showNotes();

// 🧩 Prevent Enter from making new paragraphs
document.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});
