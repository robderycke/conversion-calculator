"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    const form = document.querySelector("#js-conversion-form");
    
    // Luister naar elk 'input' event voor realtime updates
    form.addEventListener("input", updateStats);
}

function updateStats() {
    // Selecties
    const omzet = parseFloat(document.querySelector(".js-input-omzet").value) || 0;
    const verkoop = parseFloat(document.querySelector(".js-input-verkoop").value) || 0;
    let koopPerc = parseFloat(document.querySelector(".js-input-koop").value) || 0;
    let convPerc = parseFloat(document.querySelector(".js-input-conv").value) || 0;

    const display = document.querySelector(".js-result-display");
    const card = document.querySelector(".js-result-card");

    // Strikte 100% check op de logica
    if (koopPerc > 100) koopPerc = 100;
    if (convPerc > 100) convPerc = 100;

    // Basis validatie: we hebben alle getallen nodig om te rekenen
    if (omzet > 0 && verkoop > 0 && koopPerc > 0 && convPerc > 0) {
        
        // Funnel Berekening
        const ratioKoop = koopPerc / 100;
        const ratioConv = convPerc / 100;

        const salesNodig = Math.ceil(omzet / verkoop);
        const leadsNodig = Math.ceil(salesNodig / ratioKoop);
        const bezoekersNodig = Math.ceil(leadsNodig / ratioConv);

        card.classList.add("c-result-card--active");

        display.innerHTML = `
            <h3 class="h6 text-uppercase fw-bold text-muted mb-3">Nodige Website Bezoeken</h3>
            <span class="c-result-card__highlight">${bezoekersNodig.toLocaleString('nl-NL')}</span>
            <div class="mt-4">
                <p class="mb-1">Om ${leadsNodig.toLocaleString()} leads</strong> te verzamelen</p>
                <p class="small text-muted">Dit resulteert in ${salesNodig} verkopen om je doel van €${omzet.toLocaleString()} te halen.</p>
            </div>
        `;
    } else {
        card.classList.remove("c-result-card--active");
        display.innerHTML = `<p class="text-muted">Vul alle velden in voor een live berekening...</p>`;
    }
}