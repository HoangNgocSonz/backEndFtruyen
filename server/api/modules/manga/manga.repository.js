const mongoose = require('mongoose');

const MangaSchema = mongoose.Schema({

    name: String,
    avatar:String,
    author: String,
    description:String,
    category:[
        {
            type:String,
        }
    ],
    chapters:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Chapter"
    }],
    comments:[{
        user:String,
        message:String,
        dateCreated:Date,
        like:Number,
    }],
    view:{
        type:Number,
        default:0
    },
    like:{
        type:Number,
        default:0
    },
    follow:{
        type:Number,
        default:0
    },
    commentTotal:{
        type:Number,
        default:0
    },
    date:Date,
    anotherName:String,
    status:{
        type:String,
        default:'đang tiến hành',
    }
});

const MangaModel = mongoose.model('Manga',MangaSchema);

const find = async function (query) {
    const limit = Number(query.limit);
    const skip = Number(query.skip);
    delete query.skip;
    delete query.limit;
    if ( limit && skip !== undefined ) {
      return await MangaModel.find(query).limit(limit).skip(skip);
    } else {
      return await MangaModel.find(query).populate("chapters");
    }
  }
  
const count = async function (query) {
    return await MangaModel.count(query);
}

const findById = async function(id){
    return await MangaModel.findById(id).populate("chapters");
}

const create = async function(data){
    const a = new MangaModel(data);
    return await a.save();
}

const update = async function(id,data){
    if(data.chapters){
        return await MangaModel.findByIdAndUpdate(id,{$addToSet:data},{new:true});
    }else if(!data.chapters){
        return await MangaModel.findByIdAndUpdate(id,{$set:data},{new:true});
    }
    else{
        throw new Error("chỉ dùng để thêm chap mới, err tại manga.repo");
    }
    
}
const  deleteOne = async function(id){
    return await MangaModel.findByIdAndDelete(id);
}

module.exports = {
    find:find,
    findById:findById,
    create:create,
    update:update,
    delete:deleteOne,
    count: count,
}