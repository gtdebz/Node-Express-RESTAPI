const express = require('express');
const app = express();
const playerExpressRoute = express.Router();
let PlayerSchema = require('../model/player.model');

playerExpressRoute.route('/').get((req,res)=>{
    PlayerSchema.find((error,data)=>{
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

playerExpressRoute.route('/player/:id').get((req,res)=>{ //route to fetch player by id
   PlayerSchema.findById(req.params.id,(error,data)=>{ //initiate find by id here
    if (error) {
        return next(error)
    } else {
        res.json(data)
    }
   }) 
})

playerExpressRoute.route('/add-player').post((req,res,next)=>{ //Add player here
    PlayerSchema.create(req.body,(error, data) =>{
    if (error) {
        return next(error)
    } else {
        res.json(data)
    }
})
})


playerExpressRoute.route('/del-player/:id').delete((req,res)=>{  //delete player here
    PlayerSchema.findByIdAndRemove(req.params.id,(error,data)=>{
     if (error) {
         return next(error)
     } else {
        res.status(200).json({
            msg: data
        })
     }
    }) 
 })


 playerExpressRoute.route('/update-player/:id').put((req,res)=>{
    PlayerSchema.findByIdAndUpdate(req.params.id,{
        $set: req.body
    },(error,data)=>{
     if (error) {
         return next(error)
     } else {
         res.json(data);
         console.log('Deleted Successfully!')
     }
    }) 
 })


module.exports = playerExpressRoute;