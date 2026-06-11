/* ========= SIDEBAR NAVIGATION ========= */

const menus =
document.querySelectorAll(
".menu"
);

const pages =
document.querySelectorAll(
".page"
);

menus.forEach((btn,index)=>{

btn.addEventListener(
"click",

()=>{

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

if(index===0){

document
.getElementById(
"trading"
)
.classList.add(
"active-page"
);

}

if(index===1){

document
.getElementById(
"reports"
)
.classList.add(
"active-page"
);

}

if(index===2){

document
.getElementById(
"media"
)
.classList.add(
"active-page"
);

}

if(index===3){

document
.getElementById(
"notes"
)
.classList.add(
"active-page"
);

}

if(index===4){

document
.getElementById(
"history"
)
.classList.add(
"active-page"
);

}

if(index===5){

document
.getElementById(
"settings"
)
.classList.add(
"active-page"
);

}

}

);

});


/* ========= REPORT AUTO LOAD ========= */

function updateReports(){

let reports=

JSON.parse(
localStorage.getItem(
"rb_system"
)
)||[];

let box=

document.getElementById(
"reportList"
);

if(!box)
return;

box.innerHTML="";

reports.forEach(
r=>{

box.innerHTML+=`

<div class="card">

<h3>

${r.name}

</h3>

<br>

Market:
${r.market}

<br><br>

Pair:
${r.pair}

<br><br>

Win:
${r.win}

</div>

`;

}

);

}

updateReports();


/* ========= NOTES ========= */

function saveNote(){

let note=

prompt(
"Write note"
);

if(!note)
return;

let data=

JSON.parse(
localStorage.getItem(
"rb_notes"
)

)||[];

data.unshift(
note
);

localStorage.setItem(

"rb_notes",

JSON.stringify(
data)

);

alert(
"Saved"
);

}


/* ========= SETTINGS ========= */

function clearAll(){

if(

confirm(
"Delete all data?"
)

){

localStorage.clear();

location.reload();

}

}
