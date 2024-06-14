<template>
    <div>
      <div class="modal" @click="cerrarFormulario"></div>
      <div class="formulario">
        <h1>Crear Area de Trabajo</h1>
        <form @submit.prevent="crearArea">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="area.nombre" required>
  
          <label for="direccion">Dirección:</label>
          <input type="text" id="direccion" v-model="area.direccion">
  
          <label for="url">URL:</label>
          <input type="text" id="url" v-model="area.url">
  
          <div class="buttons">
            <button type="submit">Crear Area</button>
            <button type="button" @click="cerrarFormulario" class="cancel-button">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { createClient } from '@supabase/supabase-js';
  
  const supabaseUrl = 'https://nqpfkwmkparhpxjovixf.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcGZrd21rcGFyaHB4am92aXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3OTg5NjEsImV4cCI6MjAzMzM3NDk2MX0.jkoYu7IOIDETPGI-qqhGbCGEX8FN-M7mqW39uzSexH0';
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  export default defineComponent({
    setup(props, { emit }) {
      const selectedColor = ref("#007bff");
      const area = ref({
        nombre: '',
        direccion: '',
        url: ''
      });
  
      async function crearArea() {
        try {
          const { data, error } = await supabase.from('areas').insert([area.value]);
          if (error) {
            throw error;
          } else {
            console.log('Área creada:', data);
            area.value = { nombre: '', direccion: '', url: '' }; // Limpiamos los campos del formulario
            emit('cerrarFormulario');
            emit('areaAgregada');
          }
        } catch (error) {
          console.error('Error al crear el área:', error.message);
        }
      }
  
      function cerrarFormulario() {
        emit('cerrarFormulario');
      }
  
      return {
        area,
        crearArea,
        cerrarFormulario,
        selectedColor
      };
    }
  });
  </script>
  
  <style>
  .modal {
    /* Fondo oscuro semitransparente para el modal */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999;
  }
  
  .formulario {
    /* Contenedor del formulario con fondo oscuro semitransparente */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 0, 0, 0); /* Fondo oscuro semitransparente */
    padding: 15px;
    border-radius: 11px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 1);
    z-index: 1000;
    width: 100%;
    max-width: 500px;
    text-align: center;
    backdrop-filter: blur(10px);
    border: 1px solid #05a396; /* Bordes */
  }
  
  h1 {
    /* Título del formulario */
    color: #ffffff;
    margin-bottom: 16px;
    font-size: 1.8em;
  }
  
  label {
    /* Etiquetas de los campos */
    display: block;
    margin-top: 10px;
    color: #ffffff;
    text-align: left;
  }
  
  input[type="text"] {
    /* Campos de texto del formulario */
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
    border: 1px solid #05a396;  /* Bordes blancos */
    border-radius: 4px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.1); /* Fondo claro semitransparente */
    color: rgb(255, 255, 255)}
  
  .buttons {
    /* Contenedor de los botones */
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  
  button[type="submit"], .cancel-button {
    /* Estilos comunes para los botones */
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    color: white;
  }
  
  button[type="submit"] {
    /* Botón de submit */
    background-color: #05a396;
  }
  
  button[type="submit"]:hover {
    /* Efecto hover para el botón de submit */
    background-color: rgb(42, 134, 126);
  }
  
  .cancel-button {
    /* Botón de cancelar */
    background-color: #dc3545;
  }
  
  .cancel-button:hover {
    /* Efecto hover para el botón de cancelar */
    background-color: #a9202e;
  }
  </style>