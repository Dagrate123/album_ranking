let albums = JSON.parse(localStorage.getItem("albums")) || [];

function calculateAverage(consistency, variation, lyrics, production, enjoyment) {
    return ((consistency + variation + lyrics + production) * 0.15 + enjoyment * 0.40);
}

function addAlbum() {
    let name = document.getElementById("album-name").value.trim();
    let consistency = parseFloat(document.getElementById("consistency").value) || 0;
    let variation = parseFloat(document.getElementById("variation").value) || 0;
    let lyrics = parseFloat(document.getElementById("lyrics").value) || 0;
    let production = parseFloat(document.getElementById("production").value) || 0;
    let enjoyment = parseFloat(document.getElementById("enjoyment").value) || 0;
    
    if (!name) {
        alert("Please enter an album name.");
        return;
    }
    
    if (albums.some(album => album.name.toLowerCase() === name.toLowerCase())) {
        alert("This album has already been added.");
        return;
    }

    let avg = calculateAverage(consistency, variation, lyrics, production, enjoyment);
    albums.push({ name, avg, consistency, variation, lyrics, production, enjoyment });
    updateAlbums();
    resetInputs();
}

function updateAlbums() {
    albums = albums.map(album => {
        let consistency = parseFloat(album.consistency) || 1;
        let variation = parseFloat(album.variation) || 1;
        let lyrics = parseFloat(album.lyrics) || 1;
        let production = parseFloat(album.production) || 1;
        let enjoyment = parseFloat(album.enjoyment) || 1;
        let avg = calculateAverage(consistency, variation, lyrics, production, enjoyment);
        return { ...album, consistency, variation, lyrics, production, enjoyment, avg };
    });
    albums.sort((a, b) => b.avg - a.avg);
    localStorage.setItem("albums", JSON.stringify(albums));
    renderAlbums();
}

function resetInputs() {
    document.getElementById("album-name").value = "";
    document.getElementById("consistency").value = "";
    document.getElementById("variation").value = "";
    document.getElementById("lyrics").value = "";
    document.getElementById("production").value = "";
    document.getElementById("enjoyment").value = "";
}

function deleteAlbum(index) {
    albums.splice(index, 1);
    localStorage.setItem("albums", JSON.stringify(albums));
    renderAlbums();
}

function renderAlbums() {
    let list = document.getElementById("album-list");
    list.innerHTML = "";
    albums.forEach((album, index) => {
        let div = document.createElement("div");
        div.classList.add("album");
        div.innerHTML = `<strong>${index + 1}. ${album.name}</strong> - Average Score: ${album.avg.toFixed(4)}
        <button class="delete-btn" onclick="deleteAlbum(${index})">Delete</button>`;
        list.appendChild(div);
    });
}

updateAlbums();