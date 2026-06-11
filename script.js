const saveBtn=document.getElementById("save");

const resetBtn=document.getElementById("reset");

const list=document.getElementById("list");

const search=document.querySelector(
".saved-head input"
);




function load(){

let data=

JSON.parse(
localStorage.getItem(
"rb_system"
)
)||[];

list.innerHTML="";

data.forEach((item,index)=>{

list.innerHTML+=`

<div class="card">

<h2>
${item.name}
</h2>

<br>

<p>

Market:
${item.market}

</p>

<br>

<p>

Pair:
${item.pair}

</p>

<br>

<p>

Win Rate:
${item.win}

</p>

<br>

<p>

${item.note}

</p>

<br>

<button
onclick="removeItem(${index})">

Delete

</button>

</div>

`;

});

}



saveBtn.onclick=()=>{

let inputs=

document.querySelectorAll(
"input"
);

let select=

document.querySelector(
"select"
);

let text=

document.querySelector(
"textarea"
);

let item={

name:
inputs[0].value,

market:
select.value,

pair:
inputs[1].value,

win:
inputs[2].value,

note:
text.value

};



if(
!item.name
){

alert(
"Setup Name Required"
);

return;

}



let data=

JSON.parse(
localStorage.getItem(
"rb_system"
)
)||[];


data.unshift(item);


localStorage.setItem(

"rb_system",

JSON.stringify(
data
)

);



inputs.forEach(

x=>x.value=""

);

text.value="";


load();

};



function removeItem(i){

let data=

JSON.parse(

localStorage.getItem(
"rb_system"
)

)||[];


data.splice(i,1);


localStorage.setItem(

"rb_system",

JSON.stringify(
data
)

);


load();

}



resetBtn.onclick=()=>{

if(

confirm(
"Delete Everything?"
)

){

localStorage.removeItem(
"rb_system"
);

load();

}

};



search.addEventListener(

"input",

e=>{

let cards=

document.querySelectorAll(
".card"
);

cards.forEach(c=>{

c.style.display=

c.innerText

.toLowerCase()

.includes(

e.target.value

.toLowerCase()

)

?

"block"

:

"none";

});

}

);



load();
