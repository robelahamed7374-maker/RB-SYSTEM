// SIDEBAR

const menus =
document.querySelectorAll(".menu");

const pages =
document.querySelectorAll(".page");

menus.forEach(btn=>{

btn.onclick=()=>{

menus.forEach(x=>
x.classList.remove("active")
);

pages.forEach(x=>
x.classList.remove("active")
);

btn.classList.add("active");

document
.getElementById(
btn.dataset.page
)
.classList
.add("active");

};

});

/* STORAGE */

let reports=
JSON.parse(
localStorage.getItem(
"rb_reports"
)
)||[];

/* SAVE */

document
.getElementById("save")
.onclick=()=>{

let name=
document
.getElementById("name")
.value;

let market=
document
.getElementById("market")
.value;

let pair=
document
.getElementById("pair")
.value;

let win=
document
.getElementById("win")
.value;

let note=
document
.getElementById("note")
.value;

let video=
document
.getElementById("video")
.value;

let file=
document
.getElementById("photo")
.files[0];

if(!name){

alert(
"Setup Name লাগবে"
);

return;

}

if(file){

let reader=
new FileReader();

reader.onload=e=>{

saveData({

name,
market,
pair,
win,
note,
video,

photo:
e.target.result

});

};

reader.readAsDataURL(
file
);

}else{

saveData({

name,
market,
pair,
win,
note,
video,

photo:""

});

}

};

function saveData(obj){

reports.unshift(
obj
);

localStorage.setItem(

"rb_reports",

JSON.stringify(
reports
)

);

render();

alert(
"Saved"
);

}

/* RENDER */

function render(){

let box=
document
.getElementById(
"reportList"
);

let media=
document
.getElementById(
"mediaList"
);

if(!reports.length){

box.innerHTML=
"No Reports";

media.innerHTML=
"No Media";

return;
function viewPhoto(photo){

if(
!photo
||
photo===""

){

alert(
"এই রিপোর্টে ছবি সেভ করা নাই"
);

return;

}

let win=
window.open();

win.document.write(`

<style>

body{

margin:0;

background:black;

display:flex;

justify-content:center;

align-items:center;

height:100vh;

}

img{

max-width:100%;

max-height:100%;

}

</style>

<img src="${photo}">

`);

}
}

box.innerHTML="";

media.innerHTML="";

reports.forEach(

(x,i)=>{

box.innerHTML+=`

<div class="report">

${
x.photo
?

`<img
src="${x.photo}">
`

:

""

}

<h3>

${x.name}

</h3>

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

<div class="actions">

<button
class="play"

onclick="playVideo(
'${x.video}'
)">

▶ Play

</button>

<button
class="view"

onclick="viewPhoto(
'${x.photo}'
)">

🖼 View

</button>

<button
class="delete"

onclick="del(
${i}
)">

🗑 Delete

</button>

</div>

</div>

`;

if(x.photo){

media.innerHTML+=`

<img
src="${x.photo}"
style="
width:140px;
margin:10px;
border-radius:15px;
">

`;

}

}

);

}

/* BUTTONS */

function playVideo(v){

if(v){

window.open(v);

}else{

alert(
"No Video"
);

}

}

function viewPhoto(p){

if(p){

window.open(
p
);

}else{

alert(
"No Photo"
);

}

}

function del(i){

reports.splice(
i,
1
);

localStorage.setItem(

"rb_reports",

JSON.stringify(
reports
)

);

render();

}

/* START */

render();
