/* =========================
CREATORSHIELD AI
PREMIUM JAVASCRIPT
========================= */

/* =========================
LIVE THREAT FEED
========================= */

const feedMessages = [

"⚠ Fake Account Detected: @creator_giveaway",
"🚨 Deepfake Alert: YouTube Clone Found",
"📹 Content Theft Detected: Instagram Reupload",
"🎁 Scam Campaign Using Creator Name",
"🤖 AI Generated Deepfake Flagged",
"🔒 Identity Impersonation Account Found",
"⚡ Threat Analysis Completed Successfully"

];

const feed = document.getElementById("feed-content");

let currentFeed = 0;

setInterval(() => {

feed.style.opacity = "0";

setTimeout(() => {

feed.innerHTML = feedMessages[currentFeed];

feed.style.opacity = "1";

currentFeed++;

if(currentFeed >= feedMessages.length){

currentFeed = 0;

}

},400);

},3000);


/* =========================
COUNTER ANIMATION
========================= */

function animateCounter(id,target){

const element = document.getElementById(id);

let current = 0;

const increment = target / 100;

const timer = setInterval(() => {

current += increment;

if(current >= target){

current = target;

clearInterval(timer);

}

element.innerText =
Math.floor(current).toLocaleString();

},20);

}

animateCounter("counter1",50000);
animateCounter("counter2",12000);
animateCounter("counter3",25000);
animateCounter("counter4",8000);


/* =========================
DEEPFAKE SCANNER
========================= */

const scanBtn =
document.getElementById("scanBtn");

const progressBar =
document.getElementById("progressBar");

const scanResult =
document.getElementById("scanResult");

scanBtn.addEventListener("click",() => {

progressBar.style.width = "0%";

scanResult.innerHTML = "";

let progress = 0;

scanBtn.disabled = true;
scanBtn.innerText = "Scanning...";

const scanInterval = setInterval(() => {

progress += 2;

progressBar.style.width =
progress + "%";

if(progress >= 100){

clearInterval(scanInterval);

scanBtn.disabled = false;
scanBtn.innerText = "Scan Content";

generateResult();

}

},60);

});

function generateResult(){

const score =
Math.floor(Math.random()*30)+70;

let risk = "";

if(score > 90){

risk = "Critical";

}
else if(score > 80){

risk = "High";

}
else{

risk = "Medium";

}

scanResult.innerHTML = `

<div class="result-box">

<h3>Scan Completed</h3>

<p>
Deepfake Probability:
<b>${score}%</b>
</p>

<p>
Risk Level:
<b>${risk}</b>
</p>

<p>
Recommended Action:
<b>Flag Content & Investigate</b>
</p>

</div>

`;

}


/* =========================
THREAT CHART
========================= */

const canvas =
document.getElementById("threatChart");

if(canvas){

const ctx =
canvas.getContext("2d");

function drawChart(){

const width =
canvas.width =
canvas.offsetWidth;

const height =
canvas.height = 350;

ctx.clearRect(
0,
0,
width,
height
);

const points = [
220,
180,
250,
130,
150,
110,
90,
70,
120,
80
];

ctx.beginPath();

ctx.lineWidth = 4;

ctx.strokeStyle = "#00D4FF";

ctx.shadowColor = "#00D4FF";
ctx.shadowBlur = 20;

for(let i=0;i<points.length;i++){

let x =
(i * width) /
(points.length - 1);

let y =
points[i];

if(i===0){

ctx.moveTo(x,y);

}else{

ctx.lineTo(x,y);

}

}

ctx.stroke();

ctx.shadowBlur = 0;

/* POINTS */

points.forEach((point,index)=>{

let x =
(index * width) /
(points.length - 1);

ctx.beginPath();

ctx.fillStyle =
"#FF4FD8";

ctx.arc(
x,
point,
6,
0,
Math.PI*2
);

ctx.fill();

});

}

drawChart();

window.addEventListener(
"resize",
drawChart
);

}


/* =========================
SMOOTH SCROLL
========================= */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

anchor.addEventListener(
"click",
function(e){

e.preventDefault();

const target =
document.querySelector(
this.getAttribute("href")
);

target.scrollIntoView({

behavior:"smooth"

});

});

});


/* =========================
SCROLL REVEAL
========================= */

const revealElements =
document.querySelectorAll(

".feature-card,\
.stat-card,\
.dashboard-card,\
.price-card,\
.timeline-item"

);

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity = "1";

entry.target.style.transform =
"translateY(0px)";

}

});

},

{
threshold:0.2
}

);

revealElements.forEach(el=>{

el.style.opacity = "0";

el.style.transform =
"translateY(40px)";

el.style.transition =
"all .8s ease";

observer.observe(el);

});


/* =========================
NAVBAR GLOW EFFECT
========================= */

const navbar =
document.querySelector(".navbar");

window.addEventListener(
"scroll",
()=>{

if(window.scrollY > 50){

navbar.style.background =
"rgba(5,8,22,.95)";

navbar.style.boxShadow =
"0 0 25px rgba(255,79,216,.15)";

}
else{

navbar.style.background =
"rgba(0,0,0,.25)";

navbar.style.boxShadow =
"none";

}

}
);


/* =========================
FLOATING PARTICLES
========================= */

for(let i=0;i<20;i++){

const particle =
document.createElement("div");

particle.classList.add("particle");

particle.style.left =
Math.random()*100 + "vw";

particle.style.top =
Math.random()*100 + "vh";

particle.style.animationDuration =
(5 + Math.random()*10) + "s";

document.body.appendChild(
particle
);

}


/* =========================
MOUSE PARALLAX HERO
========================= */

const shield =
document.querySelector(
".shield-container"
);

document.addEventListener(
"mousemove",
(e)=>{

const x =
(e.clientX -
window.innerWidth/2) / 40;

const y =
(e.clientY -
window.innerHeight/2) / 40;

if(shield){

shield.style.transform =

`translate(${x}px, ${y}px)`;

}

}
);


/* =========================
BUTTON GLOW EFFECT
========================= */

const buttons =
document.querySelectorAll(
"button"
);

buttons.forEach(btn=>{

btn.addEventListener(
"mouseenter",
()=>{

btn.style.boxShadow =
"0 0 35px rgba(255,79,216,.6)";

});

btn.addEventListener(
"mouseleave",
()=>{

btn.style.boxShadow =
"none";

});

});

console.log(
"🛡 CreatorShield AI Loaded Successfully"
);