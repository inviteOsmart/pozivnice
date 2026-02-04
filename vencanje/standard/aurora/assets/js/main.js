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

      if(days<0 && minutes<0 && seconds<0 && days<0){

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