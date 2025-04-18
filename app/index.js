// Créer un contexte audio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Charger un fichier audio
async function loadAudio(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return audioContext.decodeAudioData(arrayBuffer);
}

// Jouer l'audio en boucle sur les 30 premières secondes
async function playLoop() {
    const audioBuffer = await loadAudio("../intro.mp3");

    function playSegment() {
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start(0, 0, 50); // Commence à 0s et joue jusqu'à 30s
        source.onended = playSegment; // Relancer la lecture après 30s
    }

    playSegment();
}


document.addEventListener('DOMContentLoaded', ()=>{
    playLoop();
});

// Activer l'audio via un événement utilisateur (nécessaire pour certains navigateurs)
document.addEventListener("click", () => {
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
    playLoop();
}, { once: true }); // Ne s'exécute qu'une seule fois après un clic
