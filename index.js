// Contoh fungsi untuk mengambil data tugas (Task Management) dari API
async function fetchTasks() {
    try {
        console.log("Sedang mengambil data...");
        
        // Contoh endpoint API (ganti dengan URL API tugas Anda)
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        
        if (!response.ok) {
            throw new Error('Gagal mengambil data');
        }
        
        const data = await response.json();
        console.log("Data Tugas Berhasil Diambil:");
        console.log(data);
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }
}

// Menjalankan fungsi
fetchTasks(); 