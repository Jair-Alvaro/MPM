import mongoose from "mongoose";

const temperatureSchema = new mongoose.Schema(
  {
    tiempo: { type: [Date], required: true },
    temperatura: { type: [Number], required: true },
  },
  { _id: false }
);

const spectralSchema = new mongoose.Schema({
  frecMax: { type: Number, required: true },
  temperatura: { type: temperatureSchema, required: true },
  modoX: {
    amplitud: { type: [Number], required: true },
    frecuencia: { type: [Number], required: true },
  },
  modoY: {
    amplitud: { type: [Number], required: true },
    frecuencia: { type: [Number], required: true },
  },
  modoZ: {
    amplitud: { type: [Number], required: true },
    frecuencia: { type: [Number], required: true },
  },
});

const SpectralModel = mongoose.model("Spectral", spectralSchema);

export default SpectralModel;
