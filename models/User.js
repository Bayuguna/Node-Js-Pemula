import mongoose from "mongoose";
import crypto from "crypto";

const User = mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    hash: {
        type: String
    },
    salt: {
        type : String
    }
}, { timestamps:true });

User.set('toJSON', {
    transform: function(doc, ret, opt) {
        delete ret['hash']
        delete ret['__v']
        delete ret['salt']
        return ret
    }
})

// Method to set salt and hash the password for a user 
User.methods.setPassword = function(password) { 
        
    // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex'); 
    
    // Hashing user's salt and password with 1000 iterations, 
        
    this.hash = crypto.pbkdf2Sync(password, this.salt,  
    1000, 64, `sha512`).toString(`hex`); 
}; 
        
// Method to check the entered password is correct or not 
User.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
}; 
        

export default mongoose.model('Users', User);