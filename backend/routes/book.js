const router  = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const {authenticateToken} = require("./userAuth");




//add book --admin
router.post("/add-book" , authenticateToken, async(req,res)=>{
    try{
        const{id} = req.headers;
        const user = await User.findById(id);
        if(user.role!=="admin")
        {
            return res.status(400).json({message: "you are not allowed to access admin"});

        }
        const book = new Book({
            url : req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.desc,
            language: req.body.language,
        });
        await book.save();

        res.status(200).json({message : "book added successfully"});
    
    }
    catch(error){
        res.status(500).json({message : "internal server error"});
    };
    
})

//updatebook

router.put("/update-book",authenticateToken, async(req,res)=>{
    try{
     const {bookid} = req.headers;
     await Book.findByIdAndUpdate(bookid,{
        url:req.body.url,
        title : req.body.title,
        author: req.body.author,
        price: req.body.price,
        description: req.body.desc,
        language: req.body.language,
     });
        res.status(200).json({message : "book updated successfully"});
    
    }
    catch(error){
        res.status(500).json({message : "internal server error"});
    };
    
})


//delete book --admin
router.delete("/delete-book",authenticateToken, async(req,res)=>{
    try{
        const{bookid}= req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({
            message : "book deleted successfully",        
        })
    }catch(err){
        res.status(500).json({message : "internal server error"});
    }
})

//get all books
router.get("/get-all-books",async(req,res)=>{
    try{
        const books = await Book.find().sort({createdAt: -1});
        return res.json({
            status : " success",
            data : books,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message : "internal server error"});
    }
})

//get recently added-books limit 4
router.get("/get-recent-books",async(req,res)=>{
    try{
        const books = await Book.find().sort({createdAt: -1}).limit(4);
        return res.json({
            status : " success",
            data : books,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message : "internal server error"});
    }
})

//get book by id

 router.get("/get-book-by-id/:id",async(req,res)=>{
    try{
        const{id} = req.params;
        const book = await Book.findById(id);
        return res.json({
            status : " success",
            data : book,
        })
    }catch(err){
        console.log(error);
        return res.status(500).json({message : "internal server error"});
    }

});
module.exports = router;