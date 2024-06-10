import SpectralModel from "~/server/models/Spectrals";

export default defineEventHandler( async( ) => {
    try {
        const result = await SpectralModel.find()
        return result
    } catch (error) {
        console.log(error);
        
    }
})