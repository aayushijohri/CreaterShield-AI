

document.addEventListener('DOMContentLoaded', () => {
    initChart();
    initStats();
    initAlerts();
});

function initChart() {
    const canvas = document.getElementById("threatChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    
    function drawChart() {
        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = canvas.offsetHeight;
        
        ctx.clearRect(0, 0, width, height);

        const points = [
            height * 0.7, height * 0.6, height * 0.8, 
            height * 0.4, height * 0.5, height * 0.35, 
            height * 0.3, height * 0.25, height * 0.4, height * 0.2
        ];

    
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#00D4FF";
        ctx.shadowColor = "#00D4FF";
        ctx.shadowBlur = 20;

        for (let i = 0; i < points.length; i++) {
            let x = (i * width) / (points.length - 1);
            let y = points[i];
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

   
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
        
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.shadowBlur = 0;

        points.forEach((point, index) => {
            let x = (index * width) / (points.length - 1);
            ctx.beginPath();
            ctx.fillStyle = "#FF4FD8";
            ctx.arc(x, point, 6, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    drawChart();
    window.addEventListener("resize", drawChart);
}

function initStats() {
    const stats = ['theft-count', 'deepfake-count', 'fake-count', 'scam-count'];
    stats.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const target = parseInt(el.innerText);
            animateValue(el, 0, target, 1500);
        }
    });
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

async function initAlerts() {

    const summaryPrompt = "Generate a very short (10 words) summary of current creator threats for a dashboard welcome message.";
    const summary = await callGroq(summaryPrompt, "You are a threat intelligence bot.");
    
  
    const header = document.querySelector('.page-header p');
    if (header && summary) {
        header.innerText = summary;
    }
}
