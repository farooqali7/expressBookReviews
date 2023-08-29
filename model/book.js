const mongoose= require('mongoose')


const BookSchema= new mongoose.Schema({
    isbn:{
        type:String,
       
 
    },
    author:{
        type:String,

    },
    title:{
        type:String,
     
        
    },
    review: [{
        text: String,
        reviewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    }]
    
})

const Book = mongoose.model('book', BookSchema)


module.exports=Book;