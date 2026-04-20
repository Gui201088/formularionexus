// FIREBASE (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// CONFIG DO SEU FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDTNWErmmJpuPU2QZNHEsDBQ_Stffbkfmo",
  authDomain: "nexuscla.firebaseapp.com",
  projectId: "nexuscla",
  storageBucket: "nexuscla.firebasestorage.app",
  messagingSenderId: "575158035283",
  appId: "1:575158035283:web:f1cf068a2c08d083f337a6",
  measurementId: "G-WBMY0NZG9K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// LOGIN
const USER = "subgui";
const PASS = "nexus123";

/* =========================
   NAVEGAÇÃO (FUNCIONA COM HTML)
========================= */

window.go = function(id){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

window.goHome = function(){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
}

/* =========================
   ENVIAR FORMULÁRIO (FIREBASE)
========================= */

window.enviar = async function(e){
  e.preventDefault();

  await addDoc(collection(db, "recrutamentos"), {
    nick: document.getElementById('nick').value,
    motivo: document.getElementById('motivo').value,
    skill: document.getElementById('skill').value,
    tempo: document.getElementById('tempo').value,
    discord: document.getElementById('discord').value
  });

  alert("Inscrição enviada com sucesso!");
}

/* =========================
   LOGIN ADM
========================= */

window.login = function(e){
  e.preventDefault();

  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;

  if(user === USER && pass === PASS){
    go('admin');
    render();
  } else {
    alert("Acesso negado");
  }
}

/* =========================
   MOSTRAR FORMULÁRIOS
========================= */

async function render(){
  let div = document.getElementById('lista');
  div.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "recrutamentos"));

  querySnapshot.forEach((docSnap) => {
    const r = docSnap.data();

    div.innerHTML += `
      <div class="admin-card">
        <b>${r.nick}</b><br>
        <b>Motivo:</b> ${r.motivo}<br>
        <b>Skill:</b> ${r.skill}<br>
        <b>Tempo:</b> ${r.tempo}<br>
        <b>Discord:</b> ${r.discord}
      </div>
    `;
  });
}
