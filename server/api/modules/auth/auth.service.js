const userRepository = require('../user/user.repository');
const bcrypt = require('bcrypt');
const config = require('../../../config');
const jwt = require('jsonwebtoken');

async function login(data){
    if((!data.name & !data.email) || !data.password){
        throw new Error("Bạn cần điền tên( hoặc email) và mật khẩu");
    }

    const existedUser1 = await userRepository.findByName(data.name);
    const existedUser2 = await userRepository.findByEmail(data.email);

    if(!existedUser1 & !existedUser2){
        throw new Error("tên hoặc email không tồn tại ");
    }

    const compareOk = await bcrypt.compare(data.password,existedUser2.password);

    if(compareOk){
        const tokendata={
            _id: existedUser2._id,
            name: existedUser2.name,
            email: existedUser2.email,
            role:existedUser2.role,
        }

        const token = await jwt.sign(tokendata, config.privateKey,{
            expiresIn:'2h',
        } )

        return token;
    }else{
        throw new Error("2");
    }

}


const register = async function(data){
    if(!data.email || !data.name || !data.password){
        throw new Error("bạn cần điền đủ thông tin");
    }

    const existedUser1 = await userRepository.findByName(data.name);
    const existedUser2 = await userRepository.findByEmail(data.email);
    if(existedUser1) throw new Error("Tên đăng nhập đã tồn tại ");
    if(existedUser2) throw new Error("Email đã tồn tại ");

    const newPassword = await bcrypt.hashSync(data.password, config.salt );

    return await userRepository.create({
        name:data.name,
        email:data.email,
        password:newPassword,
    });
}

const authentication =async function (req, res, next){
    try{
        const token = req.headers.authorization;
    
        if(!token){
            res.status(401).send("bạn cần đăng nhập");
        }
        data =await jwt.verify(token, config.privateKey);
        console.log(data);
        if(!data){
            res.status(401).send("bạn cần đăng nhập");
        }

        if(data){
            if(data.exp <=Date.now()/1000){
                res.status(401).send("hết phiên đăng nhập");
            }
        }
        req.user=data;
        next();
    }catch(err){
        res.status(401).send("unauthentication o");
    }
    
}

const authorization = function(user,roles){
    if(user && roles.indexOf(user.role) >=0 ){
        return true;
    }
    else{
        console.log(user);
        return false;
    }
}

module.exports={
    login:login,
    register:register,
    authentication,
    authorization,
}