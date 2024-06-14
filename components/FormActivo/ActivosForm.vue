<template>
    <div>
      <div class="modal" @click="cerrarFormulario"></div>
      <div class="formulario activo-form">
        <h1>Crear Activo</h1>
        <form @submit.prevent="crearActivo">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" v-model="activo.nombre" required>
          </div>
          <div class="form-group">
            <label for="descripcion">Descripción:</label>
            <textarea id="descripcion" v-model="activo.descripcion"></textarea>
          </div>
          <div class="form-group">
            <label for="fabricante">Fabricante:</label>
            <input type="text" id="fabricante" v-model="activo.fabricante">
          </div>
          <div class="form-group">
            <label for="modelo">Modelo:</label>
            <input type="text" id="modelo" v-model="activo.modelo">
          </div>
          <div class="form-group">
            <label for="numero_pieza">Número de Pieza:</label>
            <input type="text" id="numero_pieza" v-model="activo.numero_pieza">
          </div>
          <div class="form-group">
            <label for="numero_serie">Número de Serie:</label>
            <input type="text" id="numero_serie" v-model="activo.numero_serie">
          </div>
          <div class="form-group">
            <label for="codigo">Código:</label>
            <input type="text" id="codigo" v-model="activo.codigo">
          </div>
          <div class="buttons">
            <button type="submit">Crear Activo</button>
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
    props: ['subareaId'],
    setup(props, { emit }) {
      const activo = ref({
        nombre: '',
        descripcion: '',
        fabricante: '',
        modelo: '',
        numero_pieza: '',
        numero_serie: '',
        codigo: '',
        id_subarea: props.subareaId
      });
  
      const cerrarFormulario = () => {
        emit('cerrarFormulario');
      };
  
      const crearActivo = async () => {
        try {
          const { data, error } = await supabase.from('activos').insert([activo.value]);
          if (error) {
            throw error;
          } else {
            console.log('Activo creado:', data);
            activo.value = {
              nombre: '',
              descripcion: '',
              fabricante: '',
              modelo: '',
              numero_pieza: '',
              numero_serie: '',
              codigo: '',
              id_subarea: props.subareaId
            };
            emit('cerrarFormulario');
            emit('activoAgregado');
          }
        } catch (error) {
          console.error('Error al crear el activo:', error.message);
        }
      };
  
      return {
        activo,
        crearActivo,
        cerrarFormulario
      };
    }
  });
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
  
  .form-group input,
  .form-group textarea {
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
    justify-content: flex-end;
    margin-top: 30px;
    gap: 10px;
  }
  
  button[type="submit"],
  .cancel-button {
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
  
  @media (max-width: 600px) {
    .formulario {
      width: 90%;
      top: 5%;
      left: 50%;
      transform: translate(-50%, 0);
      max-height: 90vh;
      overflow-y: auto;
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
  
    .form-group input,
    .form-group textarea {
      width: 100%;
    }
  
    .buttons {
      flex-direction: column;
      align-items: stretch;
    }
  
    button[type="submit"],
    .cancel-button {
      width: 100%;
    }
  }
  </style>