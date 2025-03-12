const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");


//add book to favourite
router.put("/add-book-to-favourite",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}  = req.headers;
        const UserData  =await User.findById(id);
        const isBookFavorite =   UserData.favourites.includes(bookid);
        if(isBookFavorite){
            return res.status(200).json({message:"book already added to favourites"});
        }

        await UserData.findByIdandUpdate(id,{$push: {favourites :bookid}});
        return res.status(200).json({message:"book added to favourites"});



    }catch(error){
        res.status(500).json({message:"internal server error"});
    }
})


//delete
router.put("/remove-book-from-favourite",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}  = req.headers;
        const UserData  =await User.findById(id);
        const isBookFavorite =   UserData.favourites.includes(bookid);
        if(isBookFavorite){
           await UserData.findByIdandUpdate(id,{$pull : {favourites : bookid}});
        }
        
        return res.status(200).json({message:"book removed from favourites"});



    }catch(error){
        res.status(500).json({message:"internal server error"});
    }
})

//get favourites of a particular user

router.get("/get-fovourite-books",authenticateToken,async(req,res)=>{
    try{
        const {id} = req.headers;
        const user = await User.findById(id).populate("favourites");
        const favouriteBooks = userData.favourites;
        return res.json({
            status : "success",
            data : favouriteBooks,
        });
    }  catch(error){
        console.log(error);
        return res.status(500).json({message : " error occured"});
    } 
})
                                                                                                                                                                                                                                                                                                                                                                                      



module.exports =  router;
