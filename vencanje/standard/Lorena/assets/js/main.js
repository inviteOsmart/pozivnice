    // Set the date we're counting down to
    var countDownDate = new Date("Sep 13, 2026 09:00:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      document.querySelector(".box1").innerHTML = "<span>"+days+"</span>";
      if(days<2 && days>0){
        document.querySelector("#dan").innerHTML = "dan";
      }else if(days=0){
        document.querySelector("#dan").innerHTML = "dana";
      }
      else{
        document.querySelector("#dan").innerHTML = "dana";
      }

      document.querySelector(".box2").innerHTML = "<span>"+hours +"</span>";

      if(hours<5 && hours>0){
        document.querySelector("#sat").innerHTML = "sata";
      }else if(hours<0){
        document.querySelector("#sat").innerHTML = "sati";
      }else if(hours<2){
        document.querySelector("#sat").innerHTML = "sat";
      }else{
        document.querySelector("#sat").innerHTML = "sati";
      }

      document.querySelector(".box3").innerHTML = "<span>"+minutes + "</span>";

      if(minutes<2 && minutes>0){
        document.querySelector("#minut").innerHTML = "minut";
      }else if(minutes=0){
        document.querySelector("#minut").innerHTML = "minuta";
      }else{
        document.querySelector("#minut").innerHTML = "minuta";
      }

      document.querySelector(".box4").innerHTML = "<span>"+seconds + "</span>";

      if(seconds<5 && seconds>0){
        document.querySelector("#sekunda").innerHTML = "sekunde";
      }else{
        document.querySelector("#sekunda").innerHTML = "sekundi";
      }



      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.querySelector(".box1").innerHTML = "<span>"+"0"+"</span>";
        document.querySelector(".box2").innerHTML = "<span>"+"0"+"</span>";
        document.querySelector(".box3").innerHTML = "<span>"+"0"+ "</span>";
        document.querySelector(".box4").innerHTML = "<span>"+"0"+ "</span>";
      }
    }, 1000);




            //////////////////koliko je ostalo dana za potvrdu////////////////

            var dan = new Date("Sep 13, 2026 09:00:00").getTime();

            // Update the count down every 1 second
            var y = setInterval(function() {

            // Get today's date and time
            var sad = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = dan - sad;

            // Time calculation for days
            var dani = Math.floor(distance / (1000 * 60 * 60 * 24));
                
            // Display the result in the element with id="potvrdaTimer"
            if(dani<2){
                document.getElementById("potvrdaTimer").innerHTML = "Ostalo je još " + dani + " dan za potvrdu.";
                document.getElementById("potvrdaTimerGore").innerHTML = "Ostalo je još " + dani + " dan za potvrdu.";
            }else if(dani<1){
                document.getElementById("potvrdaTimer").innerHTML = "Vreme za potvrdu je isteklo.";
                document.getElementById("potvrdaTimerGore").innerHTML = "Vreme za potvrdu je isteklo.";
            }else{
                document.getElementById("potvrdaTimer").innerHTML = "Ostalo je još " + dani + " dana za potvrdu.";
                document.getElementById("potvrdaTimerGore").innerHTML = "Ostalo je još " + dani + " dana za potvrdu.";
            }


            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(y);
                document.getElementById("potvrdaTimer").innerHTML = "Vreme za potvrdu je isteklo.";
            }
            }, 1000);

            //////////////////koliko je ostalo dana za potvrdu////////////////



    const songs = [
    {
        name: "Endless Love",
        link: 'https://smartpozivnice.com/music/EndlessLove.mp3',
        artists: "Diana Ross & Lionel Richie",
        image: 'https://smartpozivnice.com/music/endlessLove.webp',
    },
    {
        name: "My Valentine",
        link: 'https://smartpozivnice.com/music/MyValentine.mp3',
        artists: "Martina McBride & Jim Brickman",
        image: 'https://smartpozivnice.com/music/myValentine.webp',
    },
    {
        name: "Beautiful in White",
        link: 'https://smartpozivnice.com/music/Westlife.mp3',
        artists: "Westlife",
        image: 'https://smartpozivnice.com/music/white.webp',
    }

    ];

    var progress = document.querySelector("#progress");
    var song = document.querySelector("#song");
    var playBtn = document.querySelector("#play i");
    var index = 0;
    var img = document.querySelector(".img img");

    var title = document.querySelector("#title");
    var thumb = document.querySelector("#thumb");
    var artist = document.querySelector("#musician");

    var start = document.querySelector("#start");
    var end = document.querySelector("#end");

    song.src = songs[index].link;

    title.innerHTML = songs[index].name;
    artist.innerHTML = songs[index].artists;
    thumb.src = songs[index].image;

    song.onloadedmetadata = function () {
        progress.max = song.duration;
        progress.value = song.currentTime;

        setInterval(() => {
            var min = Math.floor(song.duration / 60);
            var sec = Math.floor(song.duration % 60);

            var curMin = Math.floor(song.currentTime / 60);
            var curSec = Math.floor(song.currentTime % 60);

            if (sec < 10) {
                sec = "0" + sec;
            }
            if (curSec < 10) {
                curSec = "0" + curSec;
            }
            if (min < 10) {
                min = "0" + min;
            }
            if (curMin < 10) {
                curMin = "0" + curMin;
            }

            end.innerHTML = min + ":" + sec;
            start.innerHTML = curMin + ":" + curSec;
            }, 1000);
    };

    function playPause() {
        if (playBtn.classList.contains("bx-pause")) {
            song.pause();
            playBtn.classList.remove("bx-pause");
            playBtn.classList.add("bx-play");
            img.classList.remove("play");
        } else {
            song.play();
            playBtn.classList.remove("bx-play");
            playBtn.classList.add("bx-pause");
            img.classList.add("play");
        }
    }


    progress.onchange = function () {
        song.play();
        song.currentTime = progress.value;
        playBtn.classList.remove("bx-play");
        playBtn.classList.add("bx-pause");
        img.classList.add("play");
    };

    function nextPlay() {
        index = index + 1;
        if (index > songs.length) {
            index = 0;
            song.src = songs[index].link;
            title.innerHTML = songs[index].name;
            artist.innerHTML = songs[index].artists;
            thumb.src = songs[index].image;
            song.play();
        } else {
            song.src = songs[index].link;
            title.innerHTML = songs[index].name;
            artist.innerHTML = songs[index].artists;
            thumb.src = songs[index].image;
            song.play();
        }
    }

    function prevPlay() {
        index = index - 1;
        if (index < 0) {
        index = songs.length;
        song.src = songs[index].link;
        title.innerHTML = songs[index].name;
        artist.innerHTML = songs[index].artists;
        thumb.src = songs[index].image;
        song.play();
        } else {
        song.src = songs[index].link;
        title.innerHTML = songs[index].name;
        artist.innerHTML = songs[index].artists;
        thumb.src = songs[index].image;
        song.play();
        }
    }

// Poziv funkcije na događaj keyup za polje imePrezime
document.getElementById('imePrezime').addEventListener('keyup', checkContact);

// Poziv funkcije na događaj change za select listu
document.getElementById('broj').addEventListener('change', checkContact);

// Poziv funkcije na događaj change za radio dugmad
var daNeButtons = document.querySelectorAll('.daNe');
daNeButtons.forEach(function(button) {
    button.addEventListener('change', checkContact);
});

// Poziv funkcije na događaj keyup za polje ime gosta
document.getElementById('gosti').addEventListener('keyup', checkContact);

document.getElementById('sendMessage').addEventListener('click', submitForm);

function checkContact() {
    var imePrezime = document.getElementById('imePrezime').value;
    var daNeButtons = document.querySelectorAll('.daNe');
    var selectLista = document.getElementById('broj');
    var imeGosta = document.getElementById('gosti').value;
    var poruka = document.getElementById('poruka').value;
    var button = document.getElementById('sendMessage');

    var status = true;

    // Provera polja imePrezime
    if (imePrezime == "") {
        status = false;
        error("greskaIme", "Polje ime i prezime je obavezno.");
    } else {
        success("greskaIme");
    }

    // Provera selekt liste
    if (selectLista.value < 1 || selectLista.value > 9) {
        status = false;
        error("greskaLista", "Morate izabrati opciju u opsegu od 1 do 9.");
    } else {
        success("greskaLista");
    }

    // Provera da li je izabrano "Da" ili "Ne" za radio dugmad
    var daNeValue = "";
    for (var i = 0; i < daNeButtons.length; i++) {
        if (daNeButtons[i].checked) {
            daNeValue = daNeButtons[i].value;
            break;
        }
    }

    if (daNeValue == "") {
        status = false;
        error("greskaRadio", "Morate izabrati opciju.");
    } else {
        success("greskaRadio");
    }

    // Provera polja za ime gosta u zavisnosti od izabrane opcije za select listu
    if (selectLista.value != 1 && imeGosta == "") {
        status = false;
        error("greskaGosti", "Polje ime gosta je obavezno.");
    } else {
        success("greskaGosti");
    }

    // Postavljanje disabled atributa na dugme u zavisnosti od statusa
    button.disabled = !status;

    // Dodavanje/uklanjanje klase za stilizaciju dugmeta
    if (!status) {
        button.classList.add("buttonDisable");
    } else {
        button.classList.remove("buttonDisable");
    }
}

function submitForm() {
    var button = document.getElementById('sendMessage');
    if (!button.disabled) {
        document.getElementById('form').innerHTML = "<div class='message success'>Hvala na obaveštenju!</div>";
    }
}

function error(id, message) {
    var span = document.getElementById(id);
    span.innerHTML = message;
    span.style.display = "block";
}

function success(id) {
    var span = document.getElementById(id);
    span.innerHTML = "";
    span.style.display = "none";
}