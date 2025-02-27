const mongoose = require ('mongoose');
const {Schema,model} = monhoose;

const PostSchema = new Schema ({
    title:String,
    description:String,
    cover:String
},{
    timestamps:true,
});
const PostModal = model('Post', PostSchema);

model.exports = PostModal;