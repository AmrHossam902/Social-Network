

function verify_user(){

    var veri_code = document.getElementsByTagName("input")[0].value;
    console.log("verify user function----------------" + veri_code);
  
  var request = new XMLHttpRequest();
    request.open("POST", "/verify");
    request.setRequestHeader("Content-Type", "application/json");
    
    request.onreadystatechange = function(){
        if(this.readyState == 4){
            var result = JSON.parse(request.responseText);
            if(result["verified"] == "incorrect"){ 
                //ask to reverify you again

                var l = document.createElement("label").innerHTML = "Verification Code is incorrect";
                document.body.appendChild(l);
            }
            else{

                document.location.href = "http://localhost:5555/home"
                //direct to home page , register user as permanent
            }
        }
    }

    request.send(JSON.stringify({ "veri_code": veri_code}));   
}


function resend_code(){
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/resendCode");
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){

        }
    }

    xhr.send();

}