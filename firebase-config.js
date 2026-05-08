// KONFIGURASI FIREBASE - XI TJKT 1


const firebaseConfig = {
    apiKey: "AIzaSyDRP7yhibESwudoHhD4F4jS8iKjZF7JpWE",
    authDomain: "tjkt1-c6119.firebaseapp.com",
    databaseURL: "https://tjkt1-c6119-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tjkt1-c6119",
    storageBucket: "tjkt1-c6119.firebasestorage.app",
    messagingSenderId: "360114699858",
    appId: "1:360114699858:web:6b5bffc8edff2f08ff698b"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Ambil referensi database
const database = firebase.database();

// Referensi ke node messages untuk pesan anonim
const messagesRef = database.ref('anonymous');

console.log('Firebase Connected!');