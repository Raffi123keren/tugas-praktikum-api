<<<<<<< HEAD
const list = document.getElementById('task-list');

async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:3000/tasks');
        const data = await response.json();
        list.innerHTML = '';
        
        data.forEach(task => {
            let li = document.createElement('li');
            
            // Checkbox
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.status === 'Selesai';
            checkbox.onchange = async () => {
                await fetch(`http://localhost:3000/tasks/${task.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: checkbox.checked ? 'Selesai' : 'Belum Selesai' })
                });
                fetchTasks();
            };

            // Teks & Edit
            let span = document.createElement('span');
            span.textContent = task.title;
            
            let btnEdit = document.createElement('button');
            btnEdit.textContent = "Edit";
            btnEdit.onclick = () => {
                let inputEdit = document.createElement('input');
                inputEdit.value = task.title;
                li.replaceChild(inputEdit, span);
                btnEdit.textContent = "Simpan";
                btnEdit.onclick = async () => {
                    await fetch(`http://localhost:3000/tasks/${task.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ title: inputEdit.value })
                    });
                    fetchTasks();
                };
            };

            // Hapus
            let btnHapus = document.createElement('button');
            btnHapus.textContent = "Hapus";
            btnHapus.onclick = async () => {
                await fetch(`http://localhost:3000/tasks/${task.id}`, { method: 'DELETE' });
                fetchTasks();
            };

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(btnEdit);
            li.appendChild(btnHapus);
            list.appendChild(li);
        });
    } catch (err) { console.error(err); }
}

async function addTask() {
    const input = document.getElementById('new-task');
    if (!input.value) return;
    await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input.value })
    });
    input.value = '';
    fetchTasks();
}

document.getElementById('btn-simpan').addEventListener('click', addTask);
=======
const list = document.getElementById('task-list');

async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:3000/tasks');
        const data = await response.json();
        list.innerHTML = '';
        
        data.forEach(task => {
            let li = document.createElement('li');
            
            // Checkbox
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.status === 'Selesai';
            checkbox.onchange = async () => {
                await fetch(`http://localhost:3000/tasks/${task.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: checkbox.checked ? 'Selesai' : 'Belum Selesai' })
                });
                fetchTasks();
            };

            // Teks & Edit
            let span = document.createElement('span');
            span.textContent = task.title;
            
            let btnEdit = document.createElement('button');
            btnEdit.textContent = "Edit";
            btnEdit.onclick = () => {
                let inputEdit = document.createElement('input');
                inputEdit.value = task.title;
                li.replaceChild(inputEdit, span);
                btnEdit.textContent = "Simpan";
                btnEdit.onclick = async () => {
                    await fetch(`http://localhost:3000/tasks/${task.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ title: inputEdit.value })
                    });
                    fetchTasks();
                };
            };

            // Hapus
            let btnHapus = document.createElement('button');
            btnHapus.textContent = "Hapus";
            btnHapus.onclick = async () => {
                await fetch(`http://localhost:3000/tasks/${task.id}`, { method: 'DELETE' });
                fetchTasks();
            };

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(btnEdit);
            li.appendChild(btnHapus);
            list.appendChild(li);
        });
    } catch (err) { console.error(err); }
}

async function addTask() {
    const input = document.getElementById('new-task');
    if (!input.value) return;
    await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input.value })
    });
    input.value = '';
    fetchTasks();
}

document.getElementById('btn-simpan').addEventListener('click', addTask);
>>>>>>> 04d73387861efdf29ee1a49f2ebeb2017c2ab8de
fetchTasks();