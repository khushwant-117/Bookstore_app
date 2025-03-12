const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");


//add book to cart
router.put("/add-to-cart",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}  = req.headers;
        const UserData  =await User.findById(id);
        const isBookinCart =   UserData.favourites.includes(bookid);
        if(isBookinCart){
            return res.json({
                status:"success",
                message : "book is already in cart",
            });
        }

        await User.findByIdandUpdate(id,{$push: {cart :bookid}});
        return res.json({
            status:"success",
            message : "book added to cart successfully",
        });



    }catch(error){
        res.status(500).json({message:"internal server error"});
    }
})

//remove from cart
router.get("/get-user-cart", authenticateToken,async(req,res)=>{
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        return res.json({
            status : "success",
            data : cart,

        })
        
    }catch(error)
{
    res.status(500).json({message:"internal server error"});
}});

module.exports = router;
