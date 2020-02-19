const repository = require('./manga.repository');
const authService = require('../auth/auth.service');

// const find = async function (user,query) {
//     const auth = authService.authorization(user,["user","admin"]);
//     if(auth){
//         const data = await repository.find(query);
//         const total = await repository.count(query);
//         return {
//           data: data,
//           total: total,
//         }
//     }else{
//         throw new Error("err in function find, manga.service");
//     }  
// }

const find = async function(query){
    return await repository.find(query);
}

const findById = async function(id){
    return await repository.findById(id);
}

// const create = async function(user, data){
//     const auth = authService.authorization(user, ["admin"]);
//     if(auth)
//         return await repository.create(data);
//     else{
//         throw new Error("Unauthorization");
//     }
// }

const create = async function( data){
    return await repository.create(data);
    }
    

const update = async function(id,data){
    const existed = await repository.findById(id);
    if(!existed){
        throw new Error("entity not found");
    }
    return await repository.update(id,data);
}

const deleteOne = async function(id){
    const existed = await repository.findById(id);
    if(!existed){
        throw new Error("entity not found");
    }
    return await repository.delete(id);
}
module.exports = {
    find:find,
    findById:findById,
    create:create,
    update:update,
    delete:deleteOne,
}