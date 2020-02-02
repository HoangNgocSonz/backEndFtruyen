const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email:String,
    password:String,
    mangaFolow:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Manga"
    }],
    role:{
        type:String,
        default:'user',
    }
});

const UserModel = mongoose.model('User',UserSchema);

const find = async function (query) {
    const limit = Number(query.limit);
    const skip = Number(query.skip);
    delete query.skip;
    delete query.limit;
    if ( limit && skip !== undefined ) {
      return await UserModel.find(query).limit(limit).skip(skip);
    } else {
      return await UserModel.find(query);
    }
  }
  
const count = async function (query) {
    return await UserModel.count(query);
}

const findById = async function(id){
    return await UserModel.findById(id);
}

const create = async function(data){
    const a = new UserModel(data);
    return await a.save();
}

const update = async function(id,data){
    return await UserModel.findByIdAndUpdate(id,{$set:data},{new:true});
}
const  deleteOne = async function(id){
    return await UserModel.findByIdAndDelete(id);
}

const findByEmail = async function(email){
    return await UserModel.findOne({email:email});
}
const findByName = async function(namex){
    return await UserModel.findOne({name:namex});
}

module.exports = {
    find:find,
    findById:findById,
    create:create,
    update:update,
    delete:deleteOne,
    count: count,
    findByEmail:findByEmail,
    findByName:findByName,
}