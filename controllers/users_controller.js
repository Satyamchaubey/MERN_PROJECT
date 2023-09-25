const User = require('../models/user')
module.exports.profile = async function(req, res){
    try{
       const user =  await User.findById( req.params.id);

            return res.render('user_profile', {
                title: 'User Profile',
                profile_user:user 
                 
                
            })
        } catch(error){
            console.log("Error", error);
        }
    }


    module.exports.update = async (req,res)=>{
        try{
        if(req.user.id == req.params.id){
         const user = await User.findByIdAndUpdate(req.params.id, req.body);
                return res.redirect('/');
            
        }else{
            return res.status(401).send('Unauthorized');
        }
    } catch(error){
        console.log("Error", error);
    }
}





// module.exports.profile = async(req, res) => {
//     // user id present or not in the cookie
//     try{
//     if (req.cookies.user_id) {
//         // find the user from database
//        const user = await User.findById(req.cookies.user_id);
//             if (user) {
//                 return res.render('user_profile', {
//                     title: "user_profile",
//                     user: user
//                 });
//             }
//     }
//     } catch(error) {
//         console.log('error',error);
//         return res.redirect('/users/sign-in');
//     }
// }



module.exports.satyam = (req,res)=>{
   return res.render('satyam_profile',{
    title:"Satyam_profile"
   })
}
module.exports.singUp = (req,res)=>{
    if(req.isAuthenticated()){
         return res.redirect('/users/profile')
    }
    return res.render('user_sign_up',{
        title:"codeial | sign_Up"
    })
}
module.exports.singIn = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_in',{
        title:"codeial | sign_In"
    })
}


//get the sing up data
module.exports.create = async(req, res) => {
    try{
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }

    const User1 = await User.findOne({ email: req.body.email });
        

        if (!User1) {
          await User.create(req.body)
                return res.redirect('/users/sign-in');
        } else   {
            return res.redirect('back');
        }
    } catch (err) {
        console.log("error", err);
        return res.redirect('back');
    }
};


// sing in and create a session for the user
/* module.exports.createSession = async(req,res)=>{

    // steps to Authenticate
    // find the user
    try{
    const user = await User.findOne({email:req.body.email});
         //handel user found
         if(user){
            // handel password which does not match
            if (user.password != req.body.password){
                req.flash('error', 'Invalid credentials. Please try again.');
                return res.redirect('back');
            }

            //handel session creation

            res.cookie('user_id',user.id)
            return res.redirect('/users/profile');
        
         }else{
            // handel user not found
            return res.redirect('/users/sign-up')
            
            
            
         }
    }
    catch(error){
        console.log('error',error)
        return res.redirect('back');
    }

    
}
*/
// sing in and create a session for the user
module.exports.createSession = (req,res)=>{
    req.flash('success', 'Log in Successfully')
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if(err) {
            console.error(err);
        }
        req.flash('success', 'Log out Successfully!!')
        return res.redirect('/');
    });
}
