import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// 假設 API 引用是通過 URL 參數傳遞過來的
const urlParams = new URLSearchParams(window.location.search);
const apiKey = urlParams.get('api_key');

// 根據 API 引用從你的 Firestore 中獲取用戶配置
const firebaseConfig = {
    apiKey: "AIzaSyApnNuR7xxWABj6WDo8PiUfPUejH7Tpm1c",
    authDomain: "comment-8ef9b.firebaseapp.com",
    projectId: "comment-8ef9b",
    storageBucket: "comment-8ef9b.appspot.com",
    messagingSenderId: "303390367936",
    appId: "1:303390367936:web:e5d6a7fb5a970547548d25"
  };

const db = getFirestore(app);

document.getElementById('commentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const commentText = document.getElementById('commentText').value;

    if (commentText.trim()) {
        await addDoc(collection(db, 'comments'), {
            text: commentText,
            timestamp: new Date()
        });

        document.getElementById('commentText').value = '';
        loadComments();
    }
});

async function loadComments() {
    const commentsSection = document.getElementById('commentsSection');
    commentsSection.innerHTML = '';

    const q = query(collection(db, 'comments'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const comment = doc.data();
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.textContent = comment.text;
        commentsSection.appendChild(commentElement);
    })};
