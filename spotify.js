console.log("Welcome To Spotify")


// Initializa the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3')
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


// array with key value pairs 
let songs = [
    {songName: "In My Feelings", filePath: "songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName: "Faded", filePath: "songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName: "Girls Like You", filePath: "songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName: "Better Now", filePath: "songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName: "Let Me Go", filePath: "songs/5.mp3", coverPath:"covers/5.jpg"}

]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; // cover image
    
})

// play pause button below range bar
masterPlay.addEventListener('click', () =>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        updateSongItemPlay(songIndex,true);

    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        updateSongItemPlay(songIndex,false);
       
    }
    
    
})

// Event listener
audioElement.addEventListener('timeupdate',() => {
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100
})

const makeAllPlays = () =>{ // converts pause icon to play icon
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-circle-play')
        element.classList.remove('fa-circle-pause')

    })
    

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) =>    {
        if (e.target.classList.contains('fa-circle-play')) {
        makeAllPlays();
        songIndex = parseInt(e.target.id) // plays different songs
        e.target.classList.remove('fa-circle-play') // e-event object, an event object is created and passed to the event handler function. 
        e.target.classList.add('fa-circle-pause')
        audioElement.src = `songs/${songIndex+1}.mp3`
        audioElement.currentTime = 0
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play'); // play icon below prograssbar
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        }
        else{
            e.target.classList.add('fa-circle-play')
            e.target.classList.remove('fa-circle-pause')
            audioElement.pause();
            masterPlay.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            gif.style.opacity=0;
        }
    })
});
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 4) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    updateSong(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 4;
    } else {
        songIndex -= 1;
    }
    updateSong(songIndex);
});

function updateSong(songIndex) {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });

    const currentSongItemPlay = document.getElementById(`${songIndex}`);
    currentSongItemPlay.classList.remove('fa-circle-play');
    currentSongItemPlay.classList.add('fa-circle-pause');

    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
}

function updateSongItemPlay(index, isPlaying) {
    const songItemPlay = document.getElementById(`${index}`);
    if (isPlaying) {
        songItemPlay.classList.add('fa-circle-pause');
        songItemPlay.classList.remove('fa-circle-play');
    } else {
        songItemPlay.classList.add('fa-circle-play');
        songItemPlay.classList.remove('fa-circle-pause');
    }
}
