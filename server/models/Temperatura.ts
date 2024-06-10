import mongoose from "mongoose";

const temperaturaSchema = new mongoose.Schema({
    temperatura: { type: Number, required: true },
    ubicacion: { type: String, trim: true },
});

const TemperaturaModel = mongoose.model("temperatura", temperaturaSchema);

export default TemperaturaModel
