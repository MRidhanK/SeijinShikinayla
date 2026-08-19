document.addEventListener("DOMContentLoaded",()=>{

    const layer=document.querySelector(".stars-layer");

    if(layer){

        for(let i=0;i<180;i++){

            const star=document.createElement("span");

            star.className="star";

            const random=Math.random();

            if(random<0.7){

                star.classList.add("small");

            }else if(random<0.95){

                star.classList.add("medium");

            }else{

                star.classList.add("large");

            }

            star.style.left=Math.random()*100+"%";
            star.style.top=Math.random()*100+"%";
            star.style.animationDuration=(2+Math.random()*4)+"s";
            star.style.animationDelay=(Math.random()*5)+"s";

            layer.appendChild(star);

        }

    }

    const shootingLayer=document.querySelector(".shooting-stars");

    if(!shootingLayer) return;

    function createShootingStar(){

        const star=document.createElement("div");

        star.className="shooting";

        star.style.top=Math.random()*40+"%";

        star.style.left="-250px";

        shootingLayer.appendChild(star);

        setTimeout(()=>{

            star.remove();

        },3000);

    }

    setInterval(createShootingStar,7000);

});