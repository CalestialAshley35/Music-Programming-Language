const audioFiles = {
    "neosurf-192037.mp3": "https://cdn.glitch.global/0705b36f-7b11-4908-aec3-6e094de64cb6/neosurf-192037?v=1726891126665",
    "inspiring-emotional-uplifting-piano-112623.mp3": "https://cdn.glitch.global/0705b36f-7b11-4908-aec3-6e094de64cb6/inspiring-emotional-uplifting-piano-112623?v=1726891137286",
    "classical-piano-music-carmen-239495.mp3": "https://cdn.glitch.global/0705b36f-7b11-4908-aec3-6e094de64cb6/classical-piano-music-carmen-239495?v=1726891153139",
    "epic-drums-216819.mp3": "https://cdn.glitch.global/0705b36f-7b11-4908-aec3-6e094de64cb6/epic-drums-216819?v=1726891162382",
    "Record_2024-09-21-09-44-51.mp3": "https://cdn.glitch.global/0705b36f-7b11-4908-aec3-6e094de64cb6/Record_2024-09-21-09-44-51?v=1726891113065",
    "lv_0_20240921110835.mp3": "https://cdn.glitch.global/0705b36f-7b11-4908-aec3-6e094de64cb6/lv_0_20240921110835?v=1726895612464", // George Harrison track
    "smooth.mp3": "https://cdn.glitch.global/0705b36f-7b11-4908-aec3-6e094de64cb6/smooth?v=1726897744461", // Smooth Criminal
    "jailhouserock.mp3": "https://cdn.glitch.global/0705b36f-7b11-4908-aec3-6e094de64cb6/Elvis%20Presley%20-%20Jailhouse%20Rock%20(Music%20Video)?v=1726935795408", // Jailhouse Rock by Elvis Presley
    "1961runaway.mp3": "https://cdn.glitch.global/0705b36f-7b11-4908-aec3-6e094de64cb6/Del%20Shannon%20-%20Runaway%20(HQ%20STUDIO_1961).mp4?v=1727773610251" // Runaway by Del Shannon
};

document.getElementById('runButton').addEventListener('click', () => {
    const code = document.getElementById('codeInput').value.trim();
    const outputAudio = document.getElementById('audioOutput');
    const regex = /add\s+"([^"]+)"\s*\+\s*"([^"]+)"/g;
    const listenRegex = /listen\s+"([^"]+)"/g;
    
    let matches = code.match(regex);
    
    if (matches) {
        const audioElements = matches.map(match => {
            const audioNames = match.match(/"([^"]+)"/g).map(name => name.replace(/"/g, ''));
            return audioNames.map(name => new Audio(audioFiles[name]));
        }).flat();

        audioElements.forEach(audio => {
            audio.volume = 0.5;
            audio.play();
        });

        // Play the first audio in the output
        outputAudio.src = audioElements[0].src;
    } else if (code.match(listenRegex)) {
        const listenMatch = code.match(listenRegex);
        const listenName = listenMatch[0].match(/"([^"]+)"/)[1];
        if (audioFiles[listenName]) {
            outputAudio.src = audioFiles[listenName];
            outputAudio.play();
        } else {
            alert('Track not found!');
        }
    } else {
        alert('Invalid code! Please use the format: add "sound1.mp3" + "sound2.mp3" or listen "sound.mp3"');
    }
});
