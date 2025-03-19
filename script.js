let albums = JSON.parse(localStorage.getItem("albums")) || [];

function addAlbum() {
    let name = document.getElementById("album-name").value.trim();
    let consistency = parseInt(document.getElementById("consistency").value) || 0;
    let variation = parseInt(document.getElementById("variation").value) || 0;
    let lyrics = parseInt(document.getElementById("lyrics").value) || 0;
    let production = parseInt(document.getElementById("production").value) || 0;
    let enjoyment = parseInt(document.getElementById("enjoyment").value) || 0;
    
    if (!name) {
        alert("Please enter an album name.");
        return;
    }
    
    if (albums.some(album => album.name.toLowerCase() === name.toLowerCase())) {
        alert("This album has already been added.");
        return;
    }

    let avg = (consistency + variation + lyrics + production + enjoyment) / 5;
    albums.push({ name, avg });
    albums.sort((a, b) => b.avg - a.avg);
    localStorage.setItem("albums", JSON.stringify(albums));
    renderAlbums();
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
        div.innerHTML = `<strong>${index + 1}. ${album.name}</strong> - Average Score: ${album.avg.toFixed(2)}
        <button class="delete-btn" onclick="deleteAlbum(${index})">Delete</button>`;
        list.appendChild(div);
    });
}

renderAlbums();