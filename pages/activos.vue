<template>
  <NuxtLayout>
    <div class="container">
      <br />
      <button class="btn-area" @click="mostrarFormularioArea">+ Área de Trabajo</button><br />

      <!-- Áreas de Trabajo -->
      <div class="area-trabajo-section">
        <br />
        <AreaTrabajo
          v-if="mostrarFormArea"
          @cerrarFormulario="cerrarFormularioArea"
          @areaAgregada="actualizarAreasTrabajo"
        />
        <ul>
          <li v-for="area in areasTrabajo" :key="area.id" class="area-item">
            <div class="card">
              <!-- Parte izquierda de la carta -->
              <div class="card-left">
                <span v-if="area.nombre" class="icon icon-area">🏢</span>
              </div>

              <!-- Parte central de la carta -->
              <div class="card-center">
                <span class="name">{{ truncateText(area.nombre) }}</span>
              </div>

              <!-- Parte derecha de la carta -->
              <div class="card-right">
                <button class="btn-subarea" @click="mostrarFormularioSubarea(area.id)">+</button>
              </div>
            </div>
            <ul class="subarea-list">
              <li v-for="subarea in area.subareas" :key="subarea.id" class="subarea-item">
                <div class="card">
                  <!-- Parte izquierda de la carta -->
                  <div class="card-left">
                    <span v-if="subarea.nombre" class="icon icon-subarea">📁</span>
                  </div>

                  <!-- Parte central de la carta -->
                  <div class="card-center">
                    <span class="name">{{ truncateText(subarea.nombre) }}</span>
                  </div>

                  <!-- Parte derecha de la carta -->
                  <div class="card-right">
                    <button class="btn-activo" @click="mostrarFormularioActivos(subarea.id)">+</button>
                  </div>
                </div>
                <ul class="activo-list">
                  <!-- Activos -->
                  <li v-for="activo in subarea.activos" :key="activo.id" class="activo-item">
                    <div class="card">
                      <!-- Parte izquierda de la carta -->
                      <div class="card-left">
                        <span v-if="activo.nombre" class="icon icon-activo">📂</span>
                      </div>

                      <!-- Parte central de la carta -->
                      <div class="card-center">
                        <span class="name">{{ truncateText(activo.nombre) }}</span>
                      </div>

                      <!-- Parte derecha de la carta -->
                      <div class="card-right">
                        <button class="btn-subconjunto" @click="mostrarFormularioSubconjunto(activo.id)">+</button>
                      </div>
                    </div>
                    <ul class="subconjunto-list">
                      <!-- Subconjuntos -->
                      <li v-for="subconjunto in activo.subconjuntos" :key="subconjunto.id" class="subconjunto-item">
                        <div class="card">
                          <!-- Parte izquierda de la carta -->
                          <div class="card-left">
                            <span v-if="subconjunto.nombre" class="icon icon-subconjunto">🚜</span>
                          </div>

                          <!-- Parte central de la carta -->
                          <div class="card-center">
                            <span class="name">{{ truncateText(subconjunto.nombre) }}</span>
                          </div>

                          <!-- Parte derecha de la carta -->
                          <div class="card-right">
                            <button class="btn-componente" @click="mostrarFormularioComponente(subconjunto.id)">+</button>
                            <button class="btn-spot-subconjunto" @click="mostrarFormularioSpotSubconjunto(subconjunto.id)">+</button>
                          </div>
                        </div>
                        <ul class="spot-list">
                          <!-- Spots -->
                          <li v-for="spot in subconjunto.spots" :key="spot.id" class="spot-item">
                            <div class="card">
                              <!-- Parte izquierda de la carta -->
                              <div class="card-left">
                                <span v-if="spot.nombre" class="icon icon-spot">📍</span>
                              </div>

                              <!-- Parte central de la carta -->
                              <div class="card-center">
                                <span class="spot">{{ truncateText(spot.nombre) }}</span>
                              </div>

                              <div class="card-right"> </div>
                            </div>
                          </li>
                          <!-- Componentes -->
                          <li v-for="componente in subconjunto.componentes" :key="componente.id" class="componente-item">
                            <div class="card">
                              <!-- Parte izquierda de la carta -->
                              <div class="card-left">
                                <span v-if="componente.nombre" class="icon icon-componente">⚙️</span>
                              </div>

                              <!-- Parte central de la carta -->
                              <div class="card-center">
                                <span class="name">{{ truncateText(componente.nombre) }}</span>
                              </div>

                              <!-- Parte derecha de la carta -->
                              <div class="card-right">
                                <button class="btn-spot-componente" @click="mostrarFormularioSpotComponente(componente.id)">+</button>
                              </div>
                            </div>
                            <ul class="spot-list">
                              <!-- Spots del Componente -->
                              <li v-for="spot in componente.spots" :key="spot.id" class="spot-item">
                                <div class="card">
                                  <!-- Parte izquierda de la carta -->
                                  <div class="card-left">
                                    <span v-if="spot.nombre" class="icon icon-spot">📍</span>
                                  </div>

                                  <!-- Parte central de la carta -->
                                  <div class="card-center">
                                    <span class="spot">{{ truncateText(spot.nombre) }}</span>
                                  </div>
                                  <div class="card-right"> </div>
                                </div>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            <br /><br />
          </li>
        </ul>
      </div>

      <!-- Formularios -->
      <SubAreasTrabajo v-if="mostrarFormSubarea" :areaId="areaId" @cerrarFormulario="cerrarFormularioSubarea" @subareaAgregada="actualizarSubareasTrabajo" />
      <ActivosForm v-if="mostrarFormActivos" :subareaId="subareaId" @cerrarFormulario="cerrarFormularioActivos" @activoAgregado="actualizarActivos" />
      <SubconjuntosForm v-if="mostrarFormSubconjunto" :activoId="activoId" @cerrarFormularioSubconjunto="cerrarFormularioSubconjunto" @SubconjuntoAgregado="actualizarSubconjunto" />
      <ComponentesForm v-if="mostrarFormComponente" :subconjuntoId="subconjuntoId" @cerrarFormularioComponentes="cerrarFormularioComponente" @ComponenteAgregado="actualizarComponentes" />
      <SpotsForm v-if="mostrarFormSpot" :subconjuntoId="subconjuntoIdSpot" :componenteId="componenteIdSpot" @cerrarFormularioSpots="cerrarFormularioSpot" @SpotAgregado="actualizarSpots" />
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { createClient } from "@supabase/supabase-js";
import AreaTrabajo from "@/components/FormActivo/AreaTrabajo.vue";
import SubAreasTrabajo from "@/components/FormActivo/subareasTrabajo.vue";
import ActivosForm from "@/components/FormActivo/ActivosForm.vue";
import SubconjuntosForm from "@/components/FormActivo/SubconjuntosForm.vue";
import ComponentesForm from "@/components/FormActivo/ComponentesForm.vue";
import SpotsForm from "@/components/FormActivo/SpotsForm.vue";

const supabase = createClient(
  "https://nqpfkwmkparhpxjovixf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcGZrd21rcGFyaHB4am92aXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3OTg5NjEsImV4cCI6MjAzMzM3NDk2MX0.jkoYu7IOIDETPGI-qqhGbCGEX8FN-M7mqW39uzSexH0"
);

const areasTrabajo = ref([]);
const mostrarFormArea = ref(false);
const mostrarFormSubarea = ref(false);
const mostrarFormActivos = ref(false);
const mostrarFormSubconjunto = ref(false);
const mostrarFormComponente = ref(false);
const mostrarFormSpot = ref(false);
const areaId = ref(null);
const subareaId = ref(null);
const activoId = ref(null);
const subconjuntoId = ref(null);
const subconjuntoIdSpot = ref(null);
const componenteIdSpot = ref(null);

onMounted(() => {
  cargarAreasTrabajo();
});

async function cargarAreasTrabajo() {
  try {
    const { data: areasData, error: areasError } = await supabase.from("areas").select("*");
    if (areasError) throw areasError;

    for (const area of areasData) {
      const { data: subareasData, error: subareasError } = await supabase.from("subareas").select("*").eq("id_area", area.id);
      if (subareasError) throw subareasError;
      area.subareas = subareasData;

      for (const subarea of area.subareas) {
        const { data: activosData, error: activosError } = await supabase.from("activos").select("*").eq("id_subarea", subarea.id);
        if (activosError) throw activosError;
        subarea.activos = activosData;

        for (const activo of subarea.activos) {
          const { data: subconjuntosData, error: subconjuntosError } = await supabase.from("subconjuntos").select("*").eq("id_activo", activo.id);
          if (subconjuntosError) throw subconjuntosError;
          activo.subconjuntos = subconjuntosData;

          for (const subconjunto of activo.subconjuntos) {
            const { data: componentesData, error: componentesError } = await supabase.from("componentes").select("*").eq("id_subconjunto", subconjunto.id);
            if (componentesError) throw componentesError;
            subconjunto.componentes = componentesData;

            const { data: spotsSubconjuntoData, error: spotsSubconjuntoError } = await supabase.from("spots").select("*").eq("id_subconjunto", subconjunto.id);
            if (spotsSubconjuntoError) throw spotsSubconjuntoError;
            subconjunto.spots = spotsSubconjuntoData;

            for (const componente of subconjunto.componentes) {
              const { data: spotsComponenteData, error: spotsComponenteError } = await supabase.from("spots").select("*").eq("id_componente", componente.id);
              if (spotsComponenteError) throw spotsComponenteError;
              componente.spots = spotsComponenteData;
            }
          }
        }
      }
    }
    areasTrabajo.value = areasData;
  } catch (error) {
    console.error("Error al cargar las áreas de trabajo:", error.message);
  }
}

function mostrarFormularioArea() {
  mostrarFormArea.value = true;
}

function cerrarFormularioArea() {
  mostrarFormArea.value = false;
}

function mostrarFormularioSubarea(id) {
  mostrarFormSubarea.value = true;
  areaId.value = id;
}

function cerrarFormularioSubarea() {
  mostrarFormSubarea.value = false;
}

function mostrarFormularioActivos(idSubarea) {
  mostrarFormActivos.value = true;
  subareaId.value = idSubarea;
}

function cerrarFormularioActivos() {
  mostrarFormActivos.value = false;
}

function mostrarFormularioSubconjunto(idActivo) {
  mostrarFormSubconjunto.value = true;
  activoId.value = idActivo;
}

function cerrarFormularioSubconjunto() {
  mostrarFormSubconjunto.value = false;
}

function mostrarFormularioComponente(idSubconjunto) {
  mostrarFormComponente.value = true;
  subconjuntoId.value = idSubconjunto;
}

function cerrarFormularioComponente() {
  mostrarFormComponente.value = false;
}

function mostrarFormularioSpotSubconjunto(idSubconjunto) {
  mostrarFormSpot.value = true;
  subconjuntoIdSpot.value = idSubconjunto;
  componenteIdSpot.value = null;
}

function mostrarFormularioSpotComponente(idComponente) {
  mostrarFormSpot.value = true;
  subconjuntoIdSpot.value = null;
  componenteIdSpot.value = idComponente;
}

function cerrarFormularioSpot() {
  mostrarFormSpot.value = false;
}

async function actualizarAreasTrabajo() {
  await cargarAreasTrabajo();
}

async function actualizarSubareasTrabajo() {
  await cargarAreasTrabajo();
}

async function actualizarActivos() {
  await cargarAreasTrabajo();
}

async function actualizarSubconjunto() {
  await cargarAreasTrabajo();
}

async function actualizarComponentes() {
  await cargarAreasTrabajo();
}

async function actualizarSpots() {
  await cargarAreasTrabajo();
}

function truncateText(text) {
  const maxLength = 20;
  return text.length > maxLength ? text.substr(0, maxLength - 3) + "..." : text;
}
</script>

<style scoped>
.container {
  margin: 20px;
}

.area-trabajo-section {
  max-height: 97%;
  overflow-y: auto;
}

.area-item {
  margin-bottom: 20px;
}

.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #05a396;
  border-radius: 5px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  max-width: 300px;
  overflow-x: auto;
}

.card-left,
.card-center,
.card-right {
  flex: 1;
}

.card-center {
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* Ajuste de tamaño */
  flex-grow: 2;
}

.card-right {
  text-align: right;
}

.icon {
  margin-right: 0.25rem;
}

.icon-area {
  color: blue;
}

.icon-subarea {
  color: green;
}

.icon-activo {
  color: red;
}

.icon-subconjunto {
  color: yellow;
}

.icon-componente {
  color: purple;
}

.icon-spot {
  color: cyan;
}

.btn-area {
  margin-bottom: 20px;
  background-color: #05a396; /* Cambio de color */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.btn-area:hover {
  background-color: #047f72;
}

.btn-subarea,
.btn-activo,
.btn-subconjunto,
.btn-componente,
.btn-spot-subconjunto,
.btn-spot-componente {
  margin-left: 0.25rem;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #05a396;
  color: white;
  border: none;
  cursor: pointer;
}

.btn-subarea:hover,
.btn-activo:hover,
.btn-subconjunto:hover,
.btn-componente:hover,
.btn-spot-subconjunto:hover,
.btn-spot-componente:hover {
  background-color: #047f72;
}

.subarea-list,
.activo-list,
.subconjunto-list,
.spot-list {
  list-style-type: none;
  margin-left: 1rem;
}

.subarea-item,
.activo-item,
.subconjunto-item,
.spot-item,
.componente-item {
  margin-bottom: 0.5rem;
}
</style>
