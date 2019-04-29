

function validate_signup_data(name, password1, password2, email){
    var errs = [];

    if(name.length == 0)
        errs.push("name can't be empty");

    if(password1.length < 8 || password2.length < 8)
        errs.push("password must be at least 8 chars");

    if(password1 != password2)
        errs.push("password mismatch");
    else{
        var small = false, capital = false, special = false;
        for(let i =0; i<password1.length; i++){
            if(password1[i]>= 'a' && password1[i] <= "z")
                small = true;
            else if(password1[i] >= 'A' && password1[i] <= 'Z')
                capital = true;
            else
                special = true;
        }

        if(!(small && capital && special))
            errs.push("password must contain small, capital and special chars");
    }
    
    var email_pat = /^(([1-9]|[a-z]|[A-Z]|_).)*([1-9]|[a-z]|[A-Z]|_)+@([a-z]|[A-Z])(.[a-z]|[A-Z])*$/
    var match = email_pat.test(email);
    if(!match)
        errs.push("Invalid Email format");
    
    return errs;
}

module.exports.validate_signup_data = validate_signup_data;