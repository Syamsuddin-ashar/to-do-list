// Array untuk menyimpan daftar tugas
let tasks = [];

// Variabel untuk menentukan filter yang digunakan ('all', 'active', 'completed')
let filter = 'all';

// Variabel untuk mengontrol mode gelap (dark mode)
let darkMode = false;

// Fungsi untuk menambahkan tugas baru ke daftar tugas
function addTask() {
    // Ambil nilai input dari elemen input dengan id 'task-input'
    const input = document.getElementById('task-input');
    const taskText = input.value.trim(); // Menghapus spasi di awal dan akhir teks input

    // Jika input kosong, berikan peringatan dan hentikan eksekusi fungsi
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    // Membuat objek tugas baru dengan teks tugas, status selesai, dan ID unik
    const task = {
        text: taskText,
        completed: false,
        id: Date.now() // Menggunakan waktu sekarang sebagai ID unik, bisa diganti dengan UUID
    };

    // Menambahkan tugas baru ke dalam array tasks
    tasks.push(task);

    // Mengosongkan kolom input setelah tugas ditambahkan
    input.value = ''; 

    // Memanggil fungsi renderTasks untuk memperbarui tampilan daftar tugas
    renderTasks();
}

// Fungsi untuk menampilkan daftar tugas di halaman
function renderTasks() {
    // Ambil elemen dengan id 'task-list' (ul atau ol yang akan berisi tugas)
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Mengosongkan daftar tugas sebelum ditampilkan kembali

    // Filter tugas berdasarkan status yang dipilih ('all', 'active', 'completed')
    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true; // Tampilkan semua tugas
        if (filter === 'active') return !task.completed; // Tampilkan tugas yang belum selesai
        if (filter === 'completed') return task.completed; // Tampilkan tugas yang sudah selesai
    });

    // Iterasi melalui daftar tugas yang difilter dan buat elemen HTML untuk setiap tugas
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : ''; // Tambahkan class 'completed' jika tugas selesai
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="toggleComplete(${task.id})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
            </div>
        `;

        // Menambahkan elemen tugas (li) ke dalam daftar tugas (ul atau ol)
        taskList.appendChild(li);
    });
}

// Fungsi untuk menghapus tugas berdasarkan ID
function deleteTask(id) {
    // Hapus tugas dari array tasks yang ID-nya sesuai dengan ID yang diberikan
    tasks = tasks.filter(task => task.id !== id);

    // Memanggil fungsi renderTasks untuk memperbarui tampilan daftar tugas
    renderTasks();
}

// Fungsi untuk mengedit tugas berdasarkan ID
function editTask(id) {
    // Munculkan prompt untuk mengedit teks tugas
    const newTaskText = prompt('Edit the task:');
    if (newTaskText.trim() === '') return; // Jika teks baru kosong, hentikan eksekusi fungsi

    // Update teks tugas dalam array tasks yang ID-nya sesuai dengan ID yang diberikan
    tasks = tasks.map(task => task.id === id ? { ...task, text: newTaskText } : task);

    // Memanggil fungsi renderTasks untuk memperbarui tampilan daftar tugas
    renderTasks();
}

// Fungsi untuk menandai tugas sebagai selesai atau belum selesai berdasarkan ID
function toggleComplete(id) {
    // Toggle status 'completed' dari tugas yang ID-nya sesuai dengan ID yang diberikan
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);

    // Memanggil fungsi renderTasks untuk memperbarui tampilan daftar tugas
    renderTasks();
}

// Fungsi untuk memfilter tugas yang akan ditampilkan ('all', 'active', 'completed')
function filterTasks(type) {
    filter = type; // Set filter yang dipilih

    // Hapus class 'active' dari semua tombol filter
    document.querySelectorAll('.filter-container button').forEach(button => {
        button.classList.remove('active');
    });

    // Tambahkan class 'active' ke tombol filter yang dipilih
    document.querySelector(`.filter-container button[onclick="filterTasks('${type}')"]`).classList.add('active');

    // Memanggil fungsi renderTasks untuk memperbarui tampilan daftar tugas
    renderTasks();
}

// Fungsi untuk mengaktifkan atau menonaktifkan mode gelap (dark mode)
function toggleDarkMode() {
    darkMode = !darkMode; // Toggle nilai darkMode
    document.body.classList.toggle('dark-mode', darkMode); // Toggle class 'dark-mode' pada body
}

// Menjalankan kode saat DOM sudah siap
document.addEventListener('DOMContentLoaded', () => {
    renderTasks(); // Render tasks pertama kali saat halaman selesai dimuat
});
