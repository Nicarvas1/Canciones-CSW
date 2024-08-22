document.querySelector('.song-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const artist = document.getElementById('artist').value;
    const duration = document.getElementById('duration').value;
    const year = document.getElementById('year').value;
    const image = document.getElementById('image').files[0];
    const reader = new FileReader();
    
    const songInfo = document.createElement('div');
    songInfo.classList.add('song-info');
    songInfo.setAttribute('data-name', name.toLowerCase()); // Añadir el nombre en minúsculas como un atributo de datos
    
    reader.onload = function(e) {
        songInfo.innerHTML = `
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Artista:</strong> ${artist}</p>
            <p><strong>Duración:</strong> ${duration}</p>
            <p><strong>Año:</strong> ${year}</p>
            <img src="${e.target.result}" alt="Imagen de la Canción">
            <button class="delete-button">Eliminar Canción</button>
        `;
        document.getElementById('songs-container').appendChild(songInfo);
    }
    reader.readAsDataURL(image);

    // Limpiar los campos del formulario
    document.querySelector('.song-form').reset();
});

document.getElementById('songs-container').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
        event.target.parentElement.remove();
    }
});

document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const songs = document.querySelectorAll('.song-info');

    songs.forEach(function(song) {
        const name = song.getAttribute('data-name');
        if (name.includes(query)) {
            song.style.display = 'block';
        } else {
            song.style.display = 'none';
        }
    });
});
