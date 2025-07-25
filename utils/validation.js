const validator = require('validator');

const validatesingupdata = (req) =>{
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName){
        throw new Error ("Name is not valid");
    }
    else if(!validator.isEmail(email)){
        throw new Error ("Email is not valid")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error ("Enter a strong password")
    }
};  

const validateprofiledata = (req) =>{
    const allowededitfields = [
        'firstName',
        'lastName',
        'email',
        'age',
        'photoUrl',
        'gender',
        'about',
        'skills',
    ]
    const iseditallowed = Object.keys(req.body).every((k)=>{
       return allowededitfields.includes(k);
    });
    if(!iseditallowed){
        throw new Error("Invalid data provided");
    }
};

const validateEmailOnly = (req) => {
    const {email} = req.body;
    if(!email || !validator.isEmail(email)){
        throw new Error("Email is not valid");
    }
};
 const validatenewpassword = (req) =>{
    const {newpassword} = req.body;
    if(!newpassword || !validator.isStrongPassword(newpassword)){
        throw new Error("New password is not valid");
    }
}
module.exports = {validatesingupdata, validateprofiledata, validateEmailOnly, validatenewpassword};