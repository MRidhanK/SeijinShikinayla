const fortunes = [

{
title:"大吉",
english:"Great Blessing",
text:"A wonderful future is waiting ahead."
},

{
title:"吉",
english:"Good Luck",
text:"Small steps today become great memories tomorrow."
},

{
title:"中吉",
english:"Middle Blessing",
text:"Keep believing in yourself."
},

{
title:"小吉",
english:"Small Blessing",
text:"Every smile creates another miracle."
},

{
title:"末吉",
english:"Future Blessing",
text:"The best chapter has not been written yet."
}

];

const drawBtn=document.getElementById("drawFortune");

const card=document.getElementById("fortuneCard");

drawBtn?.addEventListener("click",()=>{

const random=
fortunes[
Math.floor(Math.random()*fortunes.length)
];

card.innerHTML=`

<h3>${random.title}</h3>

<h4>${random.english}</h4>

<p>${random.text}</p>

`;

card.classList.add("show");

});