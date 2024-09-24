console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3'); // Ensure this path is correct
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [    
    { songName: "Let me love you", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cartel", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "They Mad", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Rich the kid", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Song title", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Safety Dance", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Keep it up", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
];

// Update song items in the HTML
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Function to reset all song play buttons to 'play' icon
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Function to play the song
const playSong = (index) => {
    makeAllPlays();
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    gif.style.opacity = 1;

    // Update the play/pause icons
    document.getElementById('masterPlay').classList.remove('fa-circle-play');
    document.getElementById('masterPlay').classList.add('fa-circle-pause');

    // Update the correct song item play button
    let songItemPlay = document.getElementsByClassName('songItemPlay')[songIndex];
    songItemPlay.classList.remove('fa-circle-play');
    songItemPlay.classList.add('fa-circle-pause');
};

// Handle Play/Pause Click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong(songIndex);
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Handle Next Button Click
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; // Go to next song, loop back to first if at the end
    playSong(songIndex);
});

// Handle Previous Button Click
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Go to previous song, loop to last if at the beginning
    playSong(songIndex);
});

// Update Progress Bar
audioElement.addEventListener('timeupdate', () => {
    // Update progress bar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek the song when the user changes the progress bar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Add click event listeners to each song's play button
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        if (audioElement.src.includes(songs[index].filePath) && !audioElement.paused) {
            audioElement.pause(); // Pause the song
            e.target.classList.remove('fa-circle-pause'); // Change icon back to play
            e.target.classList.add('fa-circle-play');
        } else {
            playSong(index);
        }
    });
});
