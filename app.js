const todoList = document.querySelector('#todoList'); // loading todo list
const form = document.querySelector('#add-todo-form'); // form to add 
const darkBtn = document.querySelector('#lit'); // dark mode button
const bodyEl = document.querySelector('body'); // body element

function renderTodo(doc) { // Element and Render Classes
    let li = document.createElement('li'); // list
    li.setAttribute('data-id', doc.id);
    let form2 = document.createElement('form'); // edit forms
    form2.setAttribute('data-id', doc.id);
    form2.id = "form2";
    let todos = document.createElement('input'); // edit todo fields
    todos.id = "todos";
    todos.textContent = doc.data().todo;
    let notes = document.createElement('input'); // edit note fields
    notes.id = "notes";
    notes.textContent = doc.data().note;
    let del = document.createElement('button'); // delete button
    del.id = "del";
    del.textContent = "x";
    let edit = document.createElement('button'); // edit button
    edit.id = "edit"; 
    edit.innerText = String.fromCodePoint(0x270E); // edit 'pencil' emoji    

    todoList.appendChild(li);
    li.appendChild(form2);
    form2.appendChild(todos);
    form2.todos.value = localStorage.getItem('todoval').innerText = doc.data().todo;
    form2.appendChild(notes);
    form2.notes.value = localStorage.getItem('noteval').innerText = doc.data().note;
    form2.appendChild(del);
    form2.appendChild(edit);

    // Deleting Data
    del.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id'); // Get id
        db.collection('todo').doc(id).delete();
        todoList.removeChild(li);
        li.removeChild(form2);
        form.todo.value = '';
        form.note.value = '';
    })

    // Updating Data
    edit.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id'); // Get id      
        form2.addEventListener('submit', (e) => {
            e.preventDefault();
            db.collection('todo').doc(id).set({        
                todo: form2.todos.value, 
                note: form2.notes.value
            });
            localStorage.setItem('todoval', form2.todos.value);
            localStorage.setItem('noteval', form2.notes.value); 
        })   
    })
}

// Saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('todo').add({        
        todo: form.todo.value, 
        note: form.note.value
    });
    localStorage.setItem('todoval', form.todo.value);
    localStorage.setItem('noteval', form.note.value);
    form.todo.value = '';
    form.note.value = '';
})

// Real-time listener, Order by Class todo
db.collection('todo').orderBy('todo').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    //console.log(changes);
    changes.forEach(change => {
        //console.log(change.doc.data())
        if(change.type == 'added') {
            renderTodo(change.doc); 
        } else if (change.type == 'revmoved') {
            let li = todoList.querySelector('[data-id=' + change.doc.id + ']');
            todoList.removeChild(li);
        }
    })
})

// Getting console data
db.collection("todo").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});

// Toggle dark mode
const darkMode = () => {
    bodyEl.classList.toggle('darkMode');
}

darkBtn.addEventListener('click', () => { // get "darkMode" item value from localStorage on reload
    setDarkMode = localStorage.getItem('darkMode');
    if(setDarkMode !== "on") {
        darkMode();
        setDarkMode = localStorage.setItem('darkMode', 'on'); // set "darkMode" item value to "on" when dark mode is on
    } else {
        darkMode();
        setDarkMode = localStorage.setItem('darkMode', null); // set "darkMode" item value to "null" when dark mode is off
    }
});

let setDarkMode = localStorage.getItem('darkMode'); // get "dark" item value from localStorage

if(setDarkMode === 'on') { // check if dark mode is on or off on reload
    darkMode();
}