import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@8.3.2/dist/esm-browser/index.js';

// 初始化 Firebase
const firebaseConfig = {
    apiKey: "AIzaSyApnNuR7xxWABj6WDo8PiUfPUejH7Tpm1c",
    authDomain: "comment-8ef9b.firebaseapp.com",
    projectId: "comment-8ef9b",
    storageBucket: "comment-8ef9b.appspot.com",
    messagingSenderId: "303390367936",
    appId: "1:303390367936:web:e5d6a7fb5a970547548d25"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('configForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const apiKey = document.getElementById('apiKey').value;
    const authDomain = document.getElementById('authDomain').value;
    const projectId = document.getElementById('projectId').value;
    const storageBucket = document.getElementById('storageBucket').value;
    const messagingSenderId = document.getElementById('messagingSenderId').value;
    const appId = document.getElementById('appId').value;

    const apiKeyGenerated = uuidv4();

    try {
        await addDoc(collection(db, "userConfigs"), {
            apiKey,
            authDomain,
            projectId,
            storageBucket,
            messagingSenderId,
            appId,
            apiKeyGenerated
        });

        window.location.href = `generate.html?api_key=${apiKeyGenerated}`;
    } catch (error) {
        console.error("Error writing document: ", error);
        alert("API 引用生成失敗，請稍後再試。");
    }
});
