/* ===== SIDEBAR ===== */

const menus =
document.querySelectorAll(".menu");

const pages =
document.querySelectorAll(".page");

menus.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

menus.forEach(
m=>
m.classList.remove(
"active"
)
);

pages.forEach(
p=>
p.classList.remove(
"active-page"
)
);

btn.classList.add(
"active"
);

document

.getElementById(
btn.dataset.page
)

.classList.add(
"active-page"

);

}

);

});



/* ===== STORAGE ===== */

function getReports(){

return JSON.parse(

localStorage.getItem(
"rb_reports"
)

)||[];

}



function saveReports(data){

localStorage.setItem(

"rb_reports",

JSON.stringify(
data
)

);

}



/* ===== IMAGE ===== */

async function imageBase64(file){

return new Promise(

(resolve)=>{

let reader=

new FileReader();

reader.onload=

()=>resolve(
reader.result
);

reader.readAsDataURL(
file
);

}

);

}



/* ===== RENDER ===== */

function renderReports(){

let box=

document.getElementById(
"reportList"
);

if(!box)return;

let data=

getReports();

box.innerHTML="";

data.forEach((x,i)=>{

box.innerHTML+=`

<div class="card">

<div>

${
x.photo

?

`

<img
src="${x.photo}"

style="
width:120px;
height:120px;
border-radius:15px;
object-fit:cover;
margin-bottom:10px;
">

`

:

""
}

<h2>

${x.name}

</h2>

<br>

Market:
${x.market}

<br><br>

Pair:
${x.pair}

<br><br>

Win Rate:
${x.win}

<br><br>

${x.note}

</div>


<div
style="
display:flex;
flex-direction:column;
gap:10px;
">

<button
style="
background:#15b832;
padding:10px;
border:none;
border-radius:10px;
"

onclick="
playVideo(
${i}
)
">

▶ Play

</button>


<button
style="
background:#1858ff;
padding:10px;
border:none;
border-radius:10px;
"

onclick="
viewPhoto(
${i}
)
">

🖼 View

</button>


<button
style="
background:red;
padding:10px;
border:none;
border-radius:10px;
"

onclick="
deleteReport(
${i}
)
">

🗑 Delete

</button>

</div>

</div>

`;

});

}



/* ===== SAVE ===== */

const save=

document.getElementById(
"save"
);

if(save){

save.onclick=

async()=>{

let photo="";

let file=

document.getElementById(
"photoFile"
);

if(

file?.files[0]

){

photo=

await imageBase64(

file.files[0]

);

}



let obj={

name:

document
.getElementById(
"name"
).value,

market:

document
.getElementById(
"market"
).value,

pair:

document
.getElementById(
"pair"
).value,

win:

document
.getElementById(
"win"
).value,

note:

document
.getElementById(
"note"
).value,

video:

document
.getElementById(
"video"
).value,

photo

};



if(

!obj.name

){

alert(
"Write Setup Name"
);

return;

}



let data=

getReports();

data.unshift(
obj
);

saveReports(
data
);

renderReports();



document

.querySelectorAll(

"input,textarea"

)

.forEach(

x=>
x.value=""

);



alert(
"Saved"
);

};

}



/* ===== VIDEO ===== */

function playVideo(i){

let url=

getReports()

[i]

.video;

if(url)

window.open(
url
);

}



/* ===== PHOTO ===== */

function viewPhoto(i){

let img=

getReports()

[i]

.photo;

if(img){

window.open(
img
);

}

}



/* ===== DELETE ===== */

function deleteReport(i){

let data=

getReports();

data.splice(
i,
1
);

saveReports(
data
);

renderReports();

}



/* ===== SEARCH ===== */

let search=

document.getElementById(
"search"
);

if(search){

search.addEventListener(

"input",

()=>{

let txt=

search.value

.toLowerCase();

document

.querySelectorAll(
".card"
)

.forEach(

x=>{

x.style.display=

x.innerText

.toLowerCase()

.includes(
txt
)

?

"flex"

:

"none";

}

);

}

);

}



/* ===== START ===== */

renderReports();
