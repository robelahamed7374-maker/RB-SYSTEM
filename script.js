// RB SYSTEM NEW SCRIPT

const STORAGE="rb_reports";

function load(){
return JSON.parse(
localStorage.getItem(STORAGE)||"[]"
);
}

function save(data){
localStorage.setItem(
STORAGE,
JSON.stringify(data)
);
}

function toBase64(file){

return new Promise((ok)=>{

if(!file){

ok("");

return;

}

const reader=
new FileReader();

reader.onload=
()=>ok(
reader.result
);

reader.readAsDataURL(
file);

});

}



async function saveSetup(){

const photoFile=
document
.getElementById(
"photo"
)?.files[0];

const photo=
await toBase64(
photoFile
);

const data=
load();

data.unshift({

name:
document.getElementById("name").value,

market:
document.getElementById("market").value,

pair:
document.getElementById("pair").value,

win:
document.getElementById("win").value,

note:
document.getElementById("note").value,

video:
document.getElementById("video").value,

photo

});

save(data);

render();

alert("Saved");

}



function render(){

const box=
document.getElementById(
"reportList"
);

if(!box)return;

box.innerHTML="";

load()

.forEach((x,i)=>{

box.innerHTML+=`

<div class="card">

<div>

${
x.photo

?

`<img
src="${x.photo}"
style="
width:120px;
height:120px;
object-fit:cover;
border-radius:12px;
margin-bottom:10px;
">`

:

""
}

<h3>${x.name}</h3>

<p>
Market:
${x.market}
</p>

<p>
Pair:
${x.pair}
</p>

<p>
Win:
${x.win}
</p>

</div>


<div class="actions">

<button
onclick="
play(${i})
"
class="play">

▶ Play

</button>


<button
onclick="
view(${i})
"
class="view">

🖼 View

</button>


<button
onclick="
removeReport(${i})
"
class="del">

🗑 Delete

</button>

</div>

</div>

`;

});

}



function play(i){

const url=
load()[i]?.video;

if(!url){

alert(
"No Video"
);

return;

}

window.open(
url,
"_blank"
);

}



function view(i){

const img=
load()[i]?.photo;

if(!img){

alert(
"No Photo Saved"
);

return;

}

window.open(
img,
"_blank"
);

}



function removeReport(i){

let data=
load();

data.splice(
i,
1
);

save(
data
);

render();

}



document
.getElementById(
"save"
)
?.addEventListener(
"click",
saveSetup
);

render();
