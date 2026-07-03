const list = document.getElementById('task-list');

async function fetchTasks() {
    try {
        // Ganti URL ini dengan URL Render Anda jika berbeda
        const response = await fetch('https://tugas-praktikum-api.onrender.com/tasks');
        const data = await response.json();
        list.innerHTML = '';

        data.forEach(task => {
            let li = document.createElement('li');

            // Checkbox
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.status === 'Selesai';
            checkbox.onchange = async () => {
                await fetch(`https://tugas-praktikum-api.onrender.com/tasks/${task.id}`, {
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
                    await fetch(`https://tugas-praktikum-api.onrender.com/tasks/${task.id}`, {
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
                await fetch(`https://tugas-praktikum-api.onrender.com/tasks/${task.id}`, { method: 'DELETE' });
                fetchTasks();
            };

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(btnEdit);
            li.appendChild(btnHapus);
            list.appendChild(li);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

fetchTasks();

    input.value = ''; 

    fetchTasks(); 


document.getElementById('btn-simpan').addEventListener('click', function() {
    // Logika pengiriman data ke API ada di sini
    console.log("Tombol diklik!"); 
});
fetchTasks(); 