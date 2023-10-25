import mongoose from "mongoose";

export const validateMongodbId=(id)=>{
    const isValid=mongoose.Types.ObjectId.isValid(id);
    if(!isValid) res.status(404).json({message:"This ID is not valid or  not found"})
}