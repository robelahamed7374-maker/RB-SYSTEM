/* ========= PAGES ========= */

const menus =
document.querySelectorAll(
".menu"
);

const pages =
document.querySelectorAll(
".page"
);

menus.forEach(btn=>{

btn.onclick=()=>{

menus.forEach(
x=>
x.classList.remove(
"active"
)
);

pages.forEach(
x=>
x.classList.remove(
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

};

});



/* ========= SAVE ========= */

const save =

document.getElementById(
"save"
);

const reportList=

document.getElementById(
"reportList"
);



function getData(){

return JSON.parse(

localStorage.getItem(
"rb_reports"
)

)||[];

}



function setData(data){

localStorage.setItem(

"rb_reports",

JSON.stringify(
data
)

);

}



function render(){

let data=
getData();

reportList.innerHTML="";

data.forEach((x,i)=>{

reportList.innerHTML+=`

<div class="card">

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

<br><br>


<button
onclick="playVideo(
'${x.video}'
)">

▶ Play

</button>


<button
onclick="deleteItem(
${i}
)">

🗑 Delete

</button>

</div>

`;

});

}



save.onclick=()=>{

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
).value

};



if(
!obj.name
){

alert(
"Setup Name Required"
);

return;

}



let data=
getData();

data.unshift(
obj
);

setData(
data
);

render();

alert(
"Saved"
);

};



/* ========= DELETE ========= */

function deleteItem(i){

let data=
getData();

data.splice(
i,
1
);

setData(
data
);

render();

}



/* ========= VIDEO ========= */

function playVideo(url){

if(url){

window.open(
url
);

}else{

alert(
"No Video"
);

}

}



/* ========= SEARCH ========= */

const search=

document.getElementById(
"search"
);

if(search){

search.addEventListener(

"input",

()=>{

let text=

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
text
)

?

"block"

:

"none";

});

}

);

}



/* ========= NOTES ========= */

const noteBtn=

document.querySelector(
"#notes button"
);

if(noteBtn){

noteBtn.onclick=()=>{

let txt=

document
.getElementById(
"noteText"
)

.value;

localStorage.setItem(

"rb_note",

txt

);

alert(
"Note Saved"
);

};

}



/* ========= SETTINGS ========= */

const clear=

document.querySelector(
"#settings button"
);

if(clear){

clear.onclick=()=>{

if(

confirm(
"Delete all data?"
)

){

localStorage.clear();

location.reload();

}

};
/* SIDEBAR FIX */

document
.querySelectorAll(".menu")
.forEach(btn=>{

btn.onclick=()=>{

document

.querySelectorAll(".menu")

.forEach(
x=>
x.classList.remove(
"active"
)

);

btn.classList.add(
"active"
);

document

.querySelectorAll(".page")

.forEach(
x=>
x.classList.remove(
"active-page"
)

);

let id=

btn.dataset.page;

document

.getElementById(id)

.classList.add(
"active-page"
);

};

});


document

.getElementById(
"trading"
)

.classList.add(
"active-page"
);
}



render();
