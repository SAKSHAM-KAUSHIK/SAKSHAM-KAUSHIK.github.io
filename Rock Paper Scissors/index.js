let opt=["btn-rock","btn-paper","btn-scissors"];
let className=-1;
let score = localStorage.getItem('score') ? (JSON.parse(localStorage.getItem('score'))) : 0;
$(".score").text(score);
let random=-1;

$(document).ready(function(){
    if(window.innerWidth < 550){
      $('.play-again').removeClass('btn-lg');
    }
  });

$("#Game-Main button").click(function(event){
    $("#Game-Main").css("display","none");
    if($(this).hasClass("btn-rock")){ className=0; $("#Result .user").addClass( opt[className]+" pos-left2"); }
    else if($(this).hasClass("btn-paper")) {className=1; $("#Result .user").addClass(opt[className]+" pos-left2"); }
    else if($(this).hasClass("btn-scissors")) {className=2; $("#Result .user").addClass(opt[className]+" pos-left2"); }
    $("#Result").css("display","flex");
    random= Math.floor(Math.random()*3);
    setTimeout(function () {
        $("#Result .comp").removeClass("load");
        $("#Result .comp").addClass(opt[random]);
      }, 1500);

      setTimeout(function () {
        $("#Result .comp").removeClass("pos-right2");
        $("#Result .comp").addClass("pos-right");
        $("#Result .user").removeClass("pos-left2");
        $("#Result .user").addClass("pos-left");
        $("#Result .result-box").removeClass("hidden");
        declareWinner(className,random);
      }, 1500);
    
});

$(".play-again").click(restart);

$(".reset").click(function(){
    score=0;
    localStorage.setItem('score', JSON.stringify(score));
    $(".score").text(score);
    restart();
});

$(window).resize(function(){
    if(window.innerWidth < 550){
        $('.play-again').removeClass('btn-lg')
      } 
      if(window.innerWidth > 550){
        $('.play-again').addClass('btn-lg');
      }   
});


    


function restart(){
    $("#Result .result-box").addClass("hidden");
    $("#Result .comp").removeClass("pos-right");
    $("#Result .comp").addClass("pos-right2");
    $("#Result .user").removeClass("pos-left");
    $("#Result .user").addClass("pos-left2");
    $("#Result .comp").addClass("load");
    $("#Result .comp").removeClass(opt[random]);
    $("#Result .user").removeClass(opt[className]);

    $("#Result .user").removeClass("is-winner"); 
    $("#Result .comp").removeClass("is-winner");
    $("#Result").css("display","none");
    $("#Game-Main").css("display","flex");
    random=-1;
    className=-1;

}
function declareWinner(user,comp) {
    if(user==comp) {
        $(".game-result").text("IT'S A DRAW"); 
        $("#Result .user").addClass("is-winner"); 
        $("#Result .comp").addClass("is-winner");
        
    }
    else if((user==0 && comp==1) || (user==1 && comp==2) ||(user==2 && comp==0))
    {$(".game-result").text("YOU LOST");
    $("#Result .comp").addClass("is-winner");
    score--;
    localStorage.setItem('score', JSON.stringify(score));
    $(".score").text(score);
    }
    else {$(".game-result").text("YOU WON");
    $("#Result .user").addClass("is-winner");
    score++;
    localStorage.setItem('score', JSON.stringify(score));
    $(".score").text(score);
    }
}