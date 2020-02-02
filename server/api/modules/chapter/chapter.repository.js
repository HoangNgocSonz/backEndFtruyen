const mongoose = require('mongoose');

const ChapterSchema = mongoose.Schema({
    name: String,
    chapIndex:String,
    manga:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Manga"
    },
    imageLink:[{
        type:String,
    }],
    date:Date,
    view:Number,

});

const ChapterModel = mongoose.model('Chapter',ChapterSchema);

const find = async function (query) {
    const limit = Number(query.limit);
    const skip = Number(query.skip);
    delete query.skip;
    delete query.limit;
    if ( limit && skip !== undefined ) {
      return await ChapterModel.find(query).limit(limit).skip(skip);
    } else {
      return await ChapterModel.find(query).populate("manga");
    }
  }
  
const count = async function (query) {
    return await ChapterModel.count(query);
}

const findById = async function(id){
    return await ChapterModel.findById(id).populate("manga");
}

const create = async function(data){
    const a = new ChapterModel(data);
    return await a.save();
}

// const update = async function(id,data){
//     return await ChapterModel.findByIdAndUpdate(id,{$set:data},{new:true});
// }
const update = async function(id,data){
    console.log(data);
    return await ChapterModel.findByIdAndUpdate(id,{$set:data},{new:true});
}
const  deleteOne = async function(id){
    return await ChapterModel.findByIdAndDelete(id);
}

module.exports = {
    find:find,
    findById:findById,
    create:create,
    update:update,
    delete:deleteOne,
    count: count,
}