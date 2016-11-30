let users = [
    {
        username: 'masterdetective123',
        firstName: 'Sherlock',
        lastName: 'Holmes',
        profession: 'Detective',
        Bio: 'Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a "consulting detective" in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.',
        password: 'elementarymydearwatson'
    },
    {
        username: 'sunny',
        password: '123',
        firstName: 'Runxi',
        lastName: 'Ding',
        profession: 'student',
        Bio: 'currently a grad student at Stevens'
    }
];

let exportedMethods = {
    findOne(data, callback){
        
        if(!data.username) callback({message: 'username should be provided'}, null);
        let returnUser = null;
        users.forEach( (user)=>{
            if(user.username == data.username){
                returnUser = user;
            }
        });

        
        if(!returnUser) callback({message: 'user not found'}, null);

        returnUser.validPassword = (password)=>{
            if(password == returnUser.password){
                return true;
            }
            return false;
        }
      
        callback(null, returnUser);
    },
    getUserByUsername(username, callback){
        let returnUser = null;
        users.forEach( (user)=>{
            if(user.username == username){
                returnUser = user;
            }
        });
        if(returnUser == null){
            callback('cannot find user:' + username, returnUser);
        }else{
            callback(null, returnUser);
        }
        
    }
}



module.exports = exportedMethods;