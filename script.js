/* =========================
RB SYSTEM - SCRIPT
========================= */


/* SIDEBAR */

const menus=document.querySelectorAll(".menu");
const pages=document.querySelectorAll(".page");

menus.forEach(btn=>{

btn.addEventListener("click",()=>{

menus.forEach(x=>
x.classList.remove("active")
);

pages.forEach(x=>
x.classList.remove("active-page")
);

btn.classList.add("active");

document
.getElementById(
btn.dataset.page
)
.classList.add(
"active-page"
);

});

});



/* STORAGE */

function load(){

return JSON.parse(

localStorage.getItem(
"rb_reports"
)

||"[]"

);

}

function save(data){

localStorage.setItem(

"rb_reports",

JSON.stringify(data)

);

}



/* IMAGE */

function fileToBase64(file){

return new Promise(

(resolve)=>{

const reader=
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



/* SAVE */

const saveBtn=
document.getElementById(
"save"
);

if(saveBtn){

saveBtn.onclick=

async()=>{

let name=

document
.getElementById(
"name"
)?.value||

"";

if(!name){

alert(
"Setup Name লিখেন"
);

return;

}



let img="";

let photo=

document
.getElementById(
"photoFile"
);

if(

photo?.files[0]

){

img=

await fileToBase64(

photo.files[0]

);

}



let obj={

name,

market:

document
.getElementById(
"market"
)?.value||

"",

pair:

document
.getElementById(
"pair"
)?.value||

"",

win:

document
.getElementById(
"win"
)?.value||

"",

note:

document
.getElementById(
"note"
)?.value||

"",

video:

document
.getElementById(
"video"
)?.value||

"",

photo:img

};



let data=
load();

data.unshift(
obj
);

save(
data
);

render();



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



/* REPORT */

function render(){

let box=

document
.getElementById(
"reportList"
);

if(!box)return;

box.innerHTML="";

let data=
load();



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
width:130px;
height:130px;
border-radius:14px;
object-fit:cover;
margin-bottom:15px;
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
background:#19c43d;
color:white;
padding:12px;
border:none;
border-radius:12px;
"

onclick="
playVideo(
${i}
)
"

>

▶ Play

</button>


<button

style="
background:#1956ff;
color:white;
padding:12px;
border:none;
border-radius:12px;
"

onclick="
viewPhoto(
${i}
)
"

>

🖼 View

</button>


<button

style="
background:red;
color:white;
padding:12px;
border:none;
border-radius:12px;
"

onclick="
deleteReport(
${i}
)
"

>

🗑 Delete

</button>

</div>

</div>

`;

});

}



/* VIDEO */

function playVideo(i){

let url=

load()

[i]

?.video;

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



/* PHOTO */

function viewPhoto(i){

let img=

load()

[i]

?.photo;

if(!img){

alert(
"No Photo"
);

return;

}

window.open(
img,
"_blank"
);

}



/* DELETE */

function deleteReport(i){

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



/* SEARCH */

let search=

document
.getElementById(
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

.forEach(c=>{

c.style.display=

c.innerText

.toLowerCase()

.includes(
txt
)

?

"flex"

:

"none";

});

}

);

}



/* START */

render();
