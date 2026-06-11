const list=document.getElementById("list");
const save=document.getElementById("save");

function timeNow(){
return new Date().toLocaleString();
}

function draw(){

let data=
JSON.parse(
localStorage.getItem(
"rb_system"
))||[];

list.innerHTML="";

data.forEach((x,i)=>{

list.innerHTML+=`

<div class="card">

<div>

<h2>
${x.name}
</h2>

<br>

<div>
Market:
${x.market}
</div>

<br>

<div>
Pair:
${x.pair}
</div>

<br>

<div>
Win Rate:
${x.win}
</div>

<br>

<div>
${x.note}
</div>

</div>


<div class="card-right">

<div class="time">
${x.time}
</div>

<button
class="action play"
onclick="playVideo('${x.video}')">

▶ Play Video

</button>

<button
class="action photo"
onclick="viewPhoto()">

🖼 View Photo

</button>

<button
class="action delete"
onclick="removeItem(${i})">

🗑 Delete

</button>

</div>

</div>

`;

});

}



save.onclick=()=>{

let all=
document.querySelectorAll(
"input"
);

let select=
document.querySelector(
"select"
);

let txt=
document.querySelector(
"textarea"
);

let obj={

name:
all[0].value,

market:
select.value,

pair:
all[1].value,

win:
all[2].value,

note:
txt.value,

video:
all[3].value,

time:
timeNow()

};

let data=
JSON.parse(
localStorage.getItem(
"rb_system"
))||[];

data.unshift(obj);

localStorage.setItem(
"rb_system",
JSON.stringify(data)
);

draw();

};



function removeItem(i){

let data=
JSON.parse(
localStorage.getItem(
"rb_system"
))||[];

data.splice(i,1);

localStorage.setItem(
"rb_system",
JSON.stringify(data)
);

draw();

}



function playVideo(url){

if(url){

window.open(url);

}else{

alert(
"No Video"
);

}

}



function viewPhoto(){

alert(
"Photo Preview"
);

}



draw();
