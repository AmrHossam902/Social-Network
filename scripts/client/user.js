window.onload = function(){
    var cards = document.getElementsByClassName("friend-card");
    for (let i = 0; i< cards.length; i++){
        
        cards[i].onmouseover = function(){
            cards[i].children[0].style.visibility = "visible";
        }   

        cards[i].onmouseleave = function(){
            cards[i].children[0].style.visibility = "hidden";
        }   
    }
}