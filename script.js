// FIREBASE (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// SUA CONFIG (a que você mandou no print)
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

/* NAVEGAÇÃO */
function go(id){
document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
document.getElementById(id).classList.add('active');
}

function goHome(){
document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
}

/* ENVIAR */
async function enviar(e){
e.preventDefault();

await addDoc(collection(db, "recrutamentos"), {
nick: nick.value,
motivo: motivo.value,
skill: skill.value,
tempo: tempo.value,
discord: discord.value
});

alert("Enviado com sucesso!");
}

/* LOGIN */
function login(e){
e.preventDefault();

if(user.value === USER && pass.value === PASS){
go('admin');
render();
}else{
alert("Acesso negado");
}
}

/* RENDER */
async function render(){
let div = document.getElementById('lista');
div.innerHTML = "";

const querySnapshot = await getDocs(collection(db, "recrutamentos"));

querySnapshot.forEach((docSnap)=>{
const r = docSnap.data();

div.innerHTML += `
<div class="admin-card">
<b>${r.nick}</b><br>
${r.motivo}<br>
${r.skill}<br>
${r.tempo}<br>
${r.discord}<br>
</div>
`;
});
}
