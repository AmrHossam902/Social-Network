var cookiesObj;
window.onload = function(){
    
    var friends_list;
    var request = new XMLHttpRequest();
    request.open("GET", "/friends");

    request.onreadystatechange = function(){
        if(this.readyState == 4){
            friends_list = JSON.parse(request.responseText);
            load_friends(friends_list);
        }
    }
    request.send();
}

function load_friends(list){

    list.forEach(function(item, index, arr){
        var d = document.createElement("div");
        d.setAttribute("class", "friend_item");
        
        var img = document.createElement("img");
        img.setAttribute("src", "./../assets/bomb.jpg");
        img.setAttribute("alt", "n exist");
        img.setAttribute("class", "chatList-img");
        
        var name = document.createElement("label");
        name.innerHTML = item.name;
        name.setAttribute("class", "chatName");

        d.appendChild(img);
        d.appendChild(name);

        document.getElementById("friends").appendChild(d);
    });
}
