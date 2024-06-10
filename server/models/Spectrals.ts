import mongoose from "mongoose";

const spectralSchema = new mongoose.Schema({
  FrecMax: { type: Number, required: true },
  frecuencia: { type: [Number], required: true },
  Amplitud: { type: [Number], required: true },
});

const SpectralModel = mongoose.model("spectral", spectralSchema);

export default SpectralModel
