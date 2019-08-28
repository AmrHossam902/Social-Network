
window.onload = function(){
    
    var button = document.getElementById("input").children[1];
    button.addEventListener("pointerdown", function(){
        button.style.backgroundColor = "rgb(36, 36, 134)";
    });

    button.addEventListener("pointerup", function(){
        button.style.backgroundColor = "rgb(74, 74, 255)";
    });

    var a = document.getElementById("chat-head").children[0];
    a.addEventListener("mouseover", function(){
        a.children[0].style.color="rgb(82, 82, 82)";
    });

    a.addEventListener("mouseleave", function(){
        a.children[0].style.color="darkgrey";
    });
}