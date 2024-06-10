import TemperaturaModel from "~/server/models/Temperatura";

export default defineEventHandler(async () => {
  try {
    const result = await TemperaturaModel.find();
    return result;
  } catch (error) {
    console.log(error);
  }
});
