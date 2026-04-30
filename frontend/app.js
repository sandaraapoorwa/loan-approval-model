(function () {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    function init() {
        resize();
        particles = Array.from({ length: 28 }, () => ({
            x: Math.random() * W, y: Math.random() * H,
            r: Math.random() * 180 + 60,
            vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
            hue: Math.random() > 0.5 ? 255 : 160,
            alpha: Math.random() * 0.06 + 0.02
        }));
    }
    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
            g.addColorStop(0, `hsla(${p.hue},70%,60%,${p.alpha})`);
            g.addColorStop(1, 'transparent');
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = g; ctx.fill();
            p.x += p.vx; p.y += p.vy;
            if (p.x < -p.r) p.x = W + p.r; if (p.x > W + p.r) p.x = -p.r;
            if (p.y < -p.r) p.y = H + p.r; if (p.y > H + p.r) p.y = -p.r;
        });
        requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    init(); draw();
})();

function fmt(n) { return '$' + Number(n).toLocaleString(); }

function getCreditMeta(score) {
    if (score < 580) return { tier: 'Poor',      cls: 'poor',      color: '#ff6b6b' };
    if (score < 670) return { tier: 'Fair',      cls: 'fair',      color: '#ffb347' };
    if (score < 740) return { tier: 'Good',      cls: 'good',      color: '#ffd700' };
    if (score < 800) return { tier: 'Very Good', cls: 'very-good', color: '#3dd68c' };
    return                   { tier: 'Excellent', cls: 'excellent', color: '#3dd68c' };
}

function fillSlider(el, pct, color) {
    el.style.background = `linear-gradient(to right, ${color} ${pct}%, var(--surface-3) ${pct}%)`;
}

function updateDTI() {
    const income = Number(incomeEl.value);
    const loan   = Number(loanEl.value);
    const dtiVal    = document.getElementById('dti-value');
    const dtiFill   = document.getElementById('dti-fill');
    const dtiStatus = document.getElementById('dti-status');
    if (!income) { dtiVal.textContent = '—'; dtiFill.style.width = '0%'; dtiStatus.textContent = ''; return; }
    const ratio = (loan / income) * 100;
    const pct   = Math.min(ratio, 100);
    dtiVal.textContent = ratio.toFixed(1) + '%';
    dtiFill.style.width = pct + '%';
    if (ratio <= 36) {
        dtiFill.style.background = 'var(--green)';
        dtiStatus.textContent = 'Healthy'; dtiStatus.className = 'dti-status good';
        dtiVal.style.color = 'var(--green)';
    } else if (ratio <= 50) {
        dtiFill.style.background = 'var(--amber)';
        dtiStatus.textContent = 'Moderate'; dtiStatus.className = 'dti-status fair';
        dtiVal.style.color = 'var(--amber)';
    } else {
        dtiFill.style.background = 'var(--red)';
        dtiStatus.textContent = 'High Risk'; dtiStatus.className = 'dti-status high';
        dtiVal.style.color = 'var(--red)';
    }
}

const incomeEl = document.getElementById('income');
const creditEl = document.getElementById('credit');
const loanEl   = document.getElementById('loan');
const yearsEl  = document.getElementById('years');

incomeEl.addEventListener('input', () => {
    document.getElementById('income-display').textContent = fmt(incomeEl.value);
    fillSlider(incomeEl, ((incomeEl.value - 10000) / 290000) * 100, 'var(--accent)');
    updateDTI();
});
creditEl.addEventListener('input', () => {
    const score = Number(creditEl.value);
    const meta  = getCreditMeta(score);
    document.getElementById('credit-display').textContent = score;
    const tierEl = document.getElementById('credit-tier');
    tierEl.textContent = meta.tier; tierEl.className = 'credit-tier ' + meta.cls;
    fillSlider(creditEl, ((score - 300) / 550) * 100, meta.color);
});
loanEl.addEventListener('input', () => {
    document.getElementById('loan-display').textContent = fmt(loanEl.value);
    fillSlider(loanEl, ((loanEl.value - 1000) / 199000) * 100, 'var(--accent)');
    updateDTI();
});
yearsEl.addEventListener('input', () => {
    document.getElementById('years-display').textContent = yearsEl.value + ' yrs';
    fillSlider(yearsEl, (yearsEl.value / 40) * 100, 'var(--accent)');
});

fillSlider(incomeEl, ((50000 - 10000) / 290000) * 100, 'var(--accent)');
fillSlider(creditEl, ((580 - 300) / 550) * 100, '#ffb347');
fillSlider(loanEl,   ((20000 - 1000) / 199000) * 100, 'var(--accent)');
fillSlider(yearsEl,  (3 / 40) * 100, 'var(--accent)');
updateDTI();

(function() {
    const meta = getCreditMeta(580);
    const t = document.getElementById('credit-tier');
    t.textContent = meta.tier; t.className = 'credit-tier ' + meta.cls;
})();

async function checkHealth() {
    const pill = document.getElementById('status-pill');
    const txt  = document.getElementById('status-text');
    try {
        const r = await fetch('http://127.0.0.1:8000/', { signal: AbortSignal.timeout(3000) });
        if (r.ok) { pill.className = 'status-pill online'; txt.textContent = 'Backend online'; }
        else throw new Error();
    } catch {
        pill.className = 'status-pill offline'; txt.textContent = 'Backend offline';
    }
}
checkHealth();
setInterval(checkHealth, 15000);

function animateRing(pct, approved) {
    const circumference = 314;
    const offset = circumference - (pct / 100) * circumference;
    const track = document.getElementById('ring-track');
    track.style.stroke = approved ? 'var(--green)' : 'var(--red)';
    setTimeout(() => { track.style.strokeDashoffset = offset; }, 50);
    const ringPct = document.getElementById('ring-pct');
    let current = 0;
    const target = Math.round(pct);
    const step = () => {
        current = Math.min(current + 2, target);
        ringPct.textContent = current + '%';
        if (current < target) requestAnimationFrame(step);
    };
    setTimeout(step, 100);
}

function buildFactors(income, credit, loan, years) {
    const dti = (loan / income) * 100;
    const hints = [];
    if (credit >= 740)       hints.push({ cls: 'pos', text: 'Strong credit score' });
    else if (credit < 580)   hints.push({ cls: 'neg', text: 'Low credit score is a risk factor' });
    else                     hints.push({ cls: 'neu', text: 'Credit score is adequate' });
    if (dti <= 36)           hints.push({ cls: 'pos', text: `DTI of ${dti.toFixed(0)}% is healthy` });
    else if (dti > 50)       hints.push({ cls: 'neg', text: `DTI of ${dti.toFixed(0)}% is high` });
    else                     hints.push({ cls: 'neu', text: `DTI of ${dti.toFixed(0)}% is moderate` });
    if (years >= 5)          hints.push({ cls: 'pos', text: 'Stable employment history' });
    else if (years < 2)      hints.push({ cls: 'neg', text: 'Limited employment history' });
    return hints.slice(0, 3);
}

const APPROVED_LINES = [
    "Outstanding profile!",
    "Looking great!",
    "You're all set!",
    "Congrats! Approved!",
    "Excellent numbers!",
];

const REJECTED_LINES = [
    "Sorry, not this time.",
    "Criteria not met...",
    "Improve your score.",
    "Not enough equity.",
    "Try a smaller loan?",
];

let accountant = null;

function showAccountant(state, approved) {
    const wrap = document.getElementById('accountant-canvas-wrap');
    const bubble = document.getElementById('speech-bubble');
    const speechText = document.getElementById('speech-text');

    if (!accountant) {
        accountant = window.AccountantCharacter.create('accountant-canvas-wrap');
    }

    if (accountant) accountant.setState(state);

    const lines = approved ? APPROVED_LINES : REJECTED_LINES;
    const line = lines[Math.floor(Math.random() * lines.length)];
    speechText.textContent = line;
    bubble.className = 'speech-bubble ' + (approved ? 'approved-bubble' : 'rejected-bubble');
}

async function predict() {
    const income = Number(incomeEl.value);
    const credit = Number(creditEl.value);
    const loan   = Number(loanEl.value);
    const years  = Number(yearsEl.value);

    const panel = document.getElementById('result-panel');
    const btn   = document.getElementById('predict-btn');
    const bubble = document.getElementById('speech-bubble');

    btn.classList.add('loading');
    btn.querySelector('.btn-text').textContent = 'Analysing…';
    panel.classList.add('hidden');
    bubble.className = 'speech-bubble hidden';

    if (!accountant) {
        accountant = window.AccountantCharacter.create('accountant-canvas-wrap');
    }
    if (accountant) accountant.setState('idle');

    try {
        const res  = await fetch('http://127.0.0.1:8000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ income, credit_score: credit, loan_amount: loan, years_employed: years })
        });

        const data = await res.json();
        const approved = data.loan_approved === 1;

        let confidence = data.confidence != null
            ? Math.round(data.confidence * 100)
            : Math.max(5, Math.min(99, Math.round(50 + (approved ? 1 : -1) * (Math.random() * 20 + 10))));

        panel.className = 'result-panel ' + (approved ? 'approved' : 'rejected');
        document.getElementById('verdict-title').textContent = approved ? 'Loan Approved' : 'Loan Rejected';
        document.getElementById('verdict-sub').textContent = approved
            ? 'Your profile meets the eligibility criteria based on our model.'
            : 'Your profile did not meet the criteria. Improving your credit score or reducing the loan amount may help.';

        const factorsEl = document.getElementById('factors');
        factorsEl.innerHTML = '';
        buildFactors(income, credit, loan, years).forEach(f => {
            factorsEl.innerHTML += `<div class="factor-row"><div class="factor-dot ${f.cls}"></div><span>${f.text}</span></div>`;
        });

        panel.classList.remove('hidden');
        animateRing(confidence, approved);

        // Trigger character state with a small delay for drama
        setTimeout(() => {
            showAccountant(approved ? 'happy' : 'sad', approved);
        }, 300);

    } catch (err) {
        panel.className = 'result-panel';
        panel.style.borderColor = 'rgba(255,179,71,0.3)';
        document.getElementById('verdict-title').textContent = 'Connection error';
        document.getElementById('verdict-title').style.color = 'var(--amber)';
        document.getElementById('verdict-sub').textContent = 'Could not reach the backend on port 8000.';
        document.getElementById('factors').innerHTML = '';
        document.getElementById('ring-pct').textContent = '—';
        panel.classList.remove('hidden');
        if (accountant) accountant.setState('idle');
    }

    btn.classList.remove('loading');
    btn.querySelector('.btn-text').textContent = 'Check Eligibility';
}