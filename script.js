import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "COLE_AQUI",
  authDomain: "COLE_AQUI",
  projectId: "COLE_AQUI",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const USER = "subgui";
const PASS = "nexus123";

window.go = function(id){
document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
document.getElementById(id).classList.add('active');
}

window.goHome = function(){
document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
}

window.enviar = async function(e){
e.preventDefault();

await addDoc(collection(db, "recrutamentos"), {
nick: document.getElementById('nick').value,
motivo: document.getElementById('motivo').value,
skill: document.getElementById('skill').value,
tempo: document.getElementById('tempo').value,
discord: document.getElementById('discord').value
});

alert("Enviado!");
}

window.login = function(e){
e.preventDefault();

if(user.value === USER && pass.value === PASS){
go('admin');
render();
}else{
alert("Erro login");
}
}

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
${r.discord}
</div>
`;
});
}
