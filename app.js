import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// 初始化你的 Firebase（用于存储 API 配置）
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

// 生成唯一的 API 引用
async function generateApiReference(firebaseConfig) {
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const apiReference = `https://yourdomain.com/api/${uniqueId}`;

    await setDoc(doc(db, "apiReferences", uniqueId), {
        apiReference,
        firebaseConfig
    });

    return apiReference;
}

// 处理表单提交
document.getElementById('firebaseForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const firebaseConfig = {
        apiKey: formData.get('apiKey'),
        authDomain: formData.get('authDomain'),
        projectId: formData.get('projectId'),
        storageBucket: formData.get('storageBucket'),
        messagingSenderId: formData.get('messagingSenderId'),
        appId: formData.get('appId')
    };

    const apiReference = await generateApiReference(firebaseConfig);

    document.getElementById('apiOutput').textContent = `你的 API 引用: ${apiReference}`;
});
