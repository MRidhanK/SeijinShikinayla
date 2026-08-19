document.addEventListener("DOMContentLoaded",()=>{

const container=document.querySelector(".sakura-container");

const TOTAL=120;

for(let i=0;i<TOTAL;i++){

    const petal=document.createElement("span");

    petal.className="petal";

    petal.style.left=Math.random()*100+"%";

    const scale=.4+Math.random()*1.2;

    petal.style.setProperty(
        "--scale",
        scale
    );

    const drift=
        (Math.random()*250-125)+"px";

    petal.style.setProperty(
        "--drift",
        drift
    );

    petal.style.animation=
        `sakuraFall ${
            8+Math.random()*10
        }s linear infinite`;

    petal.style.animationDelay=
        Math.random()*12+"s";

    petal.style.filter=
        `blur(${Math.random()*1.4}px)`;

    petal.style.opacity=
        .4+Math.random()*.6;

    container.appendChild(petal);

}

});
