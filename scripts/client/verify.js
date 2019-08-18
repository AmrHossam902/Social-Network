


function verify(){
    var v_code = document.getElementsByTagName("input")[0];
    
    if(v_code.value.length <6){
        var error_label = document.getElementsByName("error")[0];
        error_label.innerHTML = "incomplete code !";
        error_label.style.display = "block";

        v_code.onfocus = function(){
            error_label.style.display = "none";
        }
    }
    else{
        var xhr = new XMLHttpRequest();
        xhr.open("post", "/verify");

        xhr.onreadystatechange = function(){
            if(this.readyState == 4){
                var response = JSON.parse( this.responseText );
                if(response.error){
                    var error_label = document.getElementsByName("error")[0];
                    error_label.innerHTML = "your code isn't correct !";
                    error_label.style.display = "block";

                    v_code.onfocus = function(){
                        error_label.style.display = "none";
                    }
                } 
                else{
                    window.location.pathname = "/home";
                }
            }
        }

        xhr.send(JSON.stringify({'v_code': v_code.value}));
    }
}