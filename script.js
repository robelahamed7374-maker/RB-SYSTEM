function load(){

return JSON.parse(

localStorage.getItem(
"rb"
)

||"[]"

);

}

function save(x){

localStorage.setItem(
"rb",
JSON.stringify(x)
);

}

async function img(file){

return new Promise(r=>{

let fr=
new FileReader();

fr.onload=
()=>r(fr.result);

fr.readAsDataURL(
file
);

});

}



document

.getElementById(
"save"
)

.onclick=

async()=>{

let photo="";

let f=

document

.getElementById(
"photo"
)

.files[0];

if(f){

photo=

await img(f);

}

let data=
load();

data.unshift({

name:

name.value,

market:

market.value,

pair:

pair.value,

win:

win.value,

note:

note.value,

video:

video.value,

photo

});

save(data);

render();

};



function render(){

let box=

document

.getElementById(
"reportList"
);

box.innerHTML="";

load()

.forEach((x,i)=>{

box.innerHTML+=`

<div class=card>

<div>

${
x.photo

?

`<img
src="${x.photo}"
width=120>`

:

""
}

<h2>

${x.name}

</h2>

<p>
${x.market}
</p>

<p>
${x.pair}
</p>

<p>
${x.win}
</p>

</div>


<div class=actions>

<button
class=play

onclick="
window.open(
'${x.video}'
)

">

▶ Play

</button>


<button
class=view

onclick="

window.open(

'${x.photo}'

)

">

🖼 View

</button>


<button

class=del

onclick="

del(

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



function del(i){

let d=
load();

d.splice(
i,
1
);

save(d);

render();

}

render();
