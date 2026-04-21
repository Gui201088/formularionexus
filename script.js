// IMPORT FIREBASE (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 COLE AQUI SUA CONFIG DO FIREBASE (DO PROJETO NOVO)
const firebaseConfig = {
  apiKey: "COLE_AQUI",
  authDomain: "COLE_AQUI",
  projectId: "COLE_AQUI",
};

// INICIALIZA
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// LOGIN ADM
const USER = "subgui";
const PASS = "nexus123";

/* =========================
   NAVEGAÇÃO
========================= */
window.go = function(id){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

window.goHome = function(){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
}

/* =========================
   ENVIAR FORMULÁRIO
========================= */
window.enviar = async function(e){
  e.preventDefault();

  try {
    await addDoc(collection(db, "recrutamentos"), {
      nick: document.getElementById('nick').value,
      motivo: document.getElementById('motivo').value,
      skill: document.getElementById('skill').value,
      tempo: document.getElementById('tempo').value,
      discord: document.getElementById('discord').value
    });

    alert("Inscrição enviada com sucesso!");
  } catch (erro) {
    alert("Erro ao enviar: " + erro);
    console.error(erro);
  }
}

/* =========================
   LOGIN
========================= */
window.login = function(e){
  e.preventDefault();

  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;

  if(user === USER && pass === PASS){
    go('admin');
    render();
  } else {
    alert("Usuário ou senha errados");
  }
}

/* =========================
   RENDER (MOSTRAR DADOS)
========================= */
async function render(){
  let div = document.getElementById('lista');
  div.innerHTML = "";

  try {
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

  } catch (erro) {
    console.error("Erro ao buscar dados:", erro);
  }
}
