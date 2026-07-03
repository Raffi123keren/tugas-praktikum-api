const list = document.getElementById('task-list');

async function fetchTasks() {
    try {
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

            // Teks
            let span = document.createElement('span');
            span.textContent = task.title;

            // Tombol Edit
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

            // Tombol Hapus
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
        console.error("Error fetching tasks:", error);
    }
}

fetchTasks();

// --- FUNGSI TOMBOL SIMPAN ---
document.getElementById('btn-simpan').addEventListener('click', async () => {
    const input = document.getElementById('new-task');
    
    // Baris Detektif: Jika ini muncul di console, berarti HTML/ID Anda bermasalah
    if (!input) { 
        console.error("Input 'new-task' tidak ditemukan! Pastikan ID di HTML sama."); 
        return; 
    }
    
    console.log("Tombol Simpan berhasil diklik!");

    if (input.value.trim() === "") {
        alert("Tugas tidak boleh kosong!");
        return;
    }

    try {
        await fetch(`https://tugas-praktikum-api.onrender.com/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: input.value, status: 'Belum Selesai' })
        });
        
        input.value = '';
        fetchTasks();
    } catch (error) {
        console.error("Gagal menyimpan ke server:", error);
    }
});