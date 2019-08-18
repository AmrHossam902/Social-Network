
document.getElementsByTagName("button");

function login(){
    document.body.style.borderColor
}

/*
function signup(){ 
    //load untill response comes
    var d = (document.getElementsByTagName("button"))[0].firstElementChild.style.display = "inline-block";

    //1- send sign up request to server
    var form = document.forms["signup-form"];

    var user_data = {
        usrnme: form.elements[0].value,
        email:  form.elements[1].value,
        password: form.elements[2].value ,
        password_confirm :form.elements[3].value 
    }


    
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/signup");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            var res =  JSON.parse( this.responseText );
            
            if(res["res_msg"] === "ok"){
                
            }
            else if(res["res_msg"] === "error"){
                if(res["error_type"].contain("duplicate") ){

                }
                if(res["error_type"].contain("incorrect email") ){}
                if(res["error_type"].contain("password mismatch") ){}
                if(res["error_type"].contain("incomplete password") ){}

            }
        }
    }
    xhr.send(JSON.stringify(user_data) );
    
    show_duplicate_error_msg();
}
*/

function show_duplicate_error_msg(){
    let email_element = document.forms["signup-form"].elements[1];
    let err_msg = document.createElement("label");
    err_msg.innerHTML = "this email is already in use";
    err_msg.style.color = "red";
    err_msg.style.fontSize = "0.7em";
    err_msg.style.marginLeft = ""
    email_element.insertAdjacentElement("afterend", err_msg);
    email_element.insertAdjacentElement("afterend", document.createElement("br"));
}



function validate_form(form){

    var errors = [];

    if(form.type === "signup"){
        
    }
    else{

    }

}