
function submit_signup(){
    
    console.log("submit fired");
    
    var uname = document.forms["signup"]["username"].value;
    var email = document.forms["signup"]["email"].value;
    var p1 = document.forms["signup"]["password1"].value;
    var p2 = document.forms["signup"]["password2"].value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/SignUp"); 

    xhr.setRequestHeader("Content-Type", "application/json");
   
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            var result = JSON.parse(xhr.responseText);


            if(result["res"] == "OK"){
                document.open();
                document.write(result["next"]);
                document.close();
            }
            //else
                //show errors
        }
    }

    xhr.send( JSON.stringify ({"uname" : uname, "email": email, "pass1": p1, "pass2" : p2}));


}


function submit_login(){
    
    var email = document.forms["login"]["email"].value;
    var password = document.forms["login"]["password"].value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/Login');
    
    xhr.setRequestHeader("Content-Type", "application/json");
   
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            var result =  JSON.parse(xhr.responseText);
            console.log(result);
            
            if(result["res"] == "permanent")
                window.location.href = window.location.href + "home";
            else if (result["res"] == "temp"){
                document.open();
                document.write(result["next"]);
                document.close();
            }
            else
                console.log("no such user");
        }
    }

    xhr.send( JSON.stringify ({"email" : email, "password" : password}));
}