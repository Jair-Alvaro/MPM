<template>
    <div>
      <div class="modal" @click="cerrarFormularioSpots"></div>
      <div class="formulario spots-form" @keydown.escape="cerrarFormularioSpots">
        <h1>Crear Spot</h1>
        <form @submit.prevent="crearSpot">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="spot.nombre" required>
  
          <label for="rpm">RPM:</label>
          <input type="number" id="rpm" v-model="spot.rpm">
  
          <label for="local_monitoreo">Local de Monitoreo:</label>
          <input type="text" id="local_monitoreo" v-model="spot.local_monitoreo">
  
          <div class="buttons">
            <button type="submit">Crear Spot</button>
            <button type="button" @click="cerrarFormularioSpots" class="cancel-button">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  import { createClient } from '@supabase/supabase-js';
  
  const supabase = createClient('https://nqpfkwmkparhpxjovixf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcGZrd21rcGFyaHB4am92aXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3OTg5NjEsImV4cCI6MjAzMzM3NDk2MX0.jkoYu7IOIDETPGI-qqhGbCGEX8FN-M7mqW39uzSexH0');
  
  const props = defineProps({
    subconjuntoId: {
      type: Number,
      required: false,
      default: null
    },
    componenteId: {
      type: Number,
      required: false,
      default: null
    }
  });
  
  const emit = defineEmits(['cerrarFormularioSpots', 'SpotAgregado']);
  
  const spot = ref({
    nombre: '',
    rpm: null,
    local_monitoreo: '',
    id_subconjunto: props.subconjuntoId,
    id_componente: props.componenteId
  });
  
  async function crearSpot() {
    try {
      const { data, error } = await supabase.from('spots').insert([spot.value]);
      if (error) {
        throw error;
      } else {
        console.log('Spot creado:', data);
        spot.value = {
          nombre: '',
          rpm: null,
          local_monitoreo: '',
          id_subconjunto: props.subconjuntoId,
          id_componente: props.componenteId
        };
        emit('cerrarFormularioSpots');
        emit('SpotAgregado');
      }
    } catch (error) {
      console.error('Error al crear el spot:', error.message);
    }
  }
  
  function cerrarFormularioSpots() {
    emit('cerrarFormularioSpots');
  }
  </script>
  
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999;
  }
  
  .formulario {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 0, 0, 0);
    padding: 15px;
    border-radius: 11px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 1);
    z-index: 1000;
    width: 100%;
    max-width: 500px;
    text-align: center;
    backdrop-filter: blur(10px);
    border: 1px solid #05a396;
  }
  
  h1 {
    color: #ffffff;
    margin-bottom: 16px;
    font-size: 1.8em;
  }
  
  label {
    display: block;
    margin-top: 10px;
    color: #ffffff;
    text-align: left;
  }
  
  input[type="text"],
  input[type="number"] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
    border: 1px solid #05a396;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.1);
    color: rgb(255, 255, 255);
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  
  button[type="submit"] {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    color: white;
    background-color: #05a396;
  }
  
  button[type="submit"]:hover {
    background-color: rgb(6, 128, 118);
  }
  
  .cancel-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    color: white;
    background-color: #dc3545;
  }
  
  .cancel-button:hover {
    background-color: #a9202e;
  }
  </style>