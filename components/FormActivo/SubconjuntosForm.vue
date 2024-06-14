<template>
    <div>
      <div class="modal" @click="cerrarFormularioSubconjunto"></div>
      <div class="formulario subconjunto-form">
        <h1>Crear Subconjunto</h1>
        <form @submit.prevent="crearSubconjunto">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" v-model="subconjunto.nombre" required>
          </div>
          <div class="form-group">
            <label for="descripcion">Descripción:</label>
            <textarea id="descripcion" v-model="subconjunto.descripcion"></textarea>
          </div>
          <div class="form-group">
            <label for="fabricante">Fabricante:</label>
            <input type="text" id="fabricante" v-model="subconjunto.fabricante">
          </div>
          <div class="form-group">
            <label for="modelo">Modelo:</label>
            <input type="text" id="modelo" v-model="subconjunto.modelo">
          </div>
          <div class="form-group">
            <label for="numero_pieza">Número de Pieza:</label>
            <input type="text" id="numero_pieza" v-model="subconjunto.numero_pieza">
          </div>
          <div class="form-group">
            <label for="numero_serie">Número de Serie:</label>
            <input type="text" id="numero_serie" v-model="subconjunto.numero_serie">
          </div>
          <div class="form-group">
            <label for="codigo">Código:</label>
            <input type="text" id="codigo" v-model="subconjunto.codigo">
          </div>
          <div class="form-group">
            <label for="imagen">Imagen:</label>
            <input type="file" id="imagen" @change="onFileChange" accept="image/*">
          </div>
          <div class="buttons">
            <button type="submit">Crear Subconjunto</button>
            <button type="button" @click="cerrarFormularioSubconjunto" class="cancel-button">Cancelar</button>
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
    activoId: {
      type: Number,
      required: true
    }
  });
  
  const emit = defineEmits(['cerrarFormularioSubconjunto', 'SubconjuntoAgregado']);
  
  const subconjunto = ref({
    nombre: '',
    descripcion: '',
    fabricante: '',
    modelo: '',
    numero_pieza: '',
    numero_serie: '',
    codigo: '',
    imagen: '',
    id_activo: props.activoId
  });
  
  // Función para crear subconjuntos
  async function crearSubconjunto() {
    try {
      const { data, error } = await supabase.from('subconjuntos').insert([subconjunto.value]);
      if (error) {
        throw error;
      } else {
        console.log('Subconjunto creado:', data);
        subconjunto.value = {
          nombre: '',
          descripcion: '',
          fabricante: '',
          modelo: '',
          numero_pieza: '',
          numero_serie: '',
          codigo: '',
          imagen: '',
          id_activo: props.activoId
        };
        emit('SubconjuntoAgregado');
        cerrarFormularioSubconjunto();
      }
    } catch (error) {
      console.error('Error al crear el subconjunto:', error.message);
    }
  }
  
  function cerrarFormularioSubconjunto() {
    emit('cerrarFormularioSubconjunto');
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
    max-width: 800px;
    text-align: center;
    backdrop-filter: blur(10px);
    border: 1px solid #05a396;
    display: flex;
    flex-direction: column;
    overflow-y: auto; /* Permitir scroll */
    max-height: 90vh; /* Limitar la altura máxima */
  }
  
  h1 {
    color: #ffffff;
    margin-bottom: 16px;
    font-size: 1.8em;
  }
  
  .form-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .form-group label {
    width: 25%;
    color: #ffffff;
    text-align: left;
    margin-right: 10px;
  }
  
  .form-group input, .form-group textarea {
    width: 75%;
    padding: 10px;
    border: 1px solid #05a396;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.1);
    color: rgb(255, 255, 255);
  }
  
  textarea {
    resize: vertical;
  }
  
  .buttons {
    display: flex;
    justify-content: flex-end; /* Alinear botones a la derecha */
    margin-top: 30px;
    gap: 10px; /* Añadir espacio entre botones */
  }
  
  button[type="submit"], .cancel-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    color: white;
  }
  
  button[type="submit"] {
    background-color: #05a396;
  }
  
  button[type="submit"]:hover {
    background-color: rgb(6, 128, 118);
  }
  
  .cancel-button {
    background-color: #dc3545;
  }
  
  .cancel-button:hover {
    background-color: #a9202e;
  }
  
  /* Responsividad */
  @media (max-width: 600px) {
    .formulario {
      width: 90%;
      top: 10%;
      transform: translate(-50%, 0);
    }
  
    .form-group {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .form-group label {
      width: 100%;
      margin-right: 0;
      margin-bottom: 5px;
    }
  
    .form-group input, .form-group textarea {
      width: 100%;
    }
  
    .buttons {
      flex-direction: column;
      align-items: stretch; /* Estirar botones para ocupar el ancho completo */
    }
  
    button[type="submit"], .cancel-button {
      width: 100%;
    }
  }
  </style>