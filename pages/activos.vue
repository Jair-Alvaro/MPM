<template>
  <NuxtLayout>
    
    <div class="container">
      <br />
      <button class="btn-area" @click="mostrarFormularioArea">
        + Area de Trabajo</button
      ><br />

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
            <span class="bullet-area">&#11044;</span>--> {{ area.nombre }}
            <button
              class="btn-subarea"
              @click="mostrarFormularioSubarea(area.id)"
            >
              +</button
            ><br /><br />
            <ul class="subarea-list">
              <li
                v-for="subarea in area.subareas"
                :key="subarea.id"
                class="subarea-item"
              >
                <span class="bullet-subarea">&#11044;</span>-->
                {{ subarea.nombre }}
                <button
                  class="btn-activo"
                  @click="mostrarFormularioActivos(subarea.id)"
                >
                  +</button
                ><br /><br />
                <ul class="activo-list">
                  <li
                    v-for="activo in subarea.activos"
                    :key="activo.id"
                    class="activo-item"
                  >
                    <span class="bullet-activo">&#11044;</span> -->
                    {{ activo.nombre }}
                    <button
                      class="btn-subconjunto"
                      @click="mostrarFormularioSubconjunto(activo.id)"
                    >
                      +</button
                    ><br /><br />
                    <ul class="subconjunto-list">
                      <li
                        v-for="subconjunto in activo.subconjuntos"
                        :key="subconjunto.id"
                        class="subconjunto-item"
                      >
                        <span class="bullet-subconjunto">&#11044;</span> -->
                        {{ subconjunto.nombre }}
                        <button
                          class="btn-componente"
                          @click="mostrarFormularioComponente(subconjunto.id)"
                        >
                          +
                        </button>
                        <button
                          class="btn-spot-subconjunto"
                          @click="
                            mostrarFormularioSpotSubconjunto(subconjunto.id)
                          "
                        >
                          +</button
                        ><br /><br />
                        <ul class="spot-list">
                          <li
                            v-for="spot in subconjunto.spots"
                            :key="spot.id"
                            class="spot-item"
                          >
                            <span class="bullet-spot">&#11044;</span
                            ><span class="spot"> --> {{ spot.nombre }}</span>
                          </li>
                          <li
                            v-for="componente in subconjunto.componentes"
                            :key="componente.id"
                            class="componente-item"
                          >
                            <span class="bullet-componente">&#11044;</span> -->
                            {{ componente.nombre }}
                            <button
                              class="btn-spot-componente"
                              @click="
                                mostrarFormularioSpotComponente(componente.id)
                              "
                            >
                              +</button
                            ><br /><br />
                            <ul class="spot-list">
                              <li
                                v-for="spot in componente.spots"
                                :key="spot.id"
                                class="spot-item"
                              >
                                <span class="bullet-spot">&#11044;</span
                                ><span class="spot">--> {{ spot.nombre }}</span>
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
      <SubAreasTrabajo
        v-if="mostrarFormSubarea"
        :areaId="areaId"
        @cerrarFormulario="cerrarFormularioSubarea"
        @subareaAgregada="actualizarSubareasTrabajo"
      />
      <ActivosForm
        v-if="mostrarFormActivos"
        :subareaId="subareaId"
        @cerrarFormulario="cerrarFormularioActivos"
        @activoAgregado="actualizarActivos"
      />
      <SubconjuntosForm
        v-if="mostrarFormSubconjunto"
        :activoId="activoId"
        @cerrarFormularioSubconjunto="cerrarFormularioSubconjunto"
        @SubconjuntoAgregado="actualizarSubconjunto"
      />
      <ComponentesForm
        v-if="mostrarFormComponente"
        :subconjuntoId="subconjuntoId"
        @cerrarFormularioComponentes="cerrarFormularioComponente"
        @ComponenteAgregado="actualizarComponentes"
      />
      <SpotsForm
        v-if="mostrarFormSpot"
        :subconjuntoId="subconjuntoIdSpot"
        :componenteId="componenteIdSpot"
        @cerrarFormularioSpots="cerrarFormularioSpot"
        @SpotAgregado="actualizarSpots"
      />
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
    const { data: areasData, error: areasError } = await supabase
      .from("areas")
      .select("*");
    if (areasError) throw areasError;

    for (const area of areasData) {
      const { data: subareasData, error: subareasError } = await supabase
        .from("subareas")
        .select("*")
        .eq("id_area", area.id);
      if (subareasError) throw subareasError;
      area.subareas = subareasData;

      for (const subarea of area.subareas) {
        const { data: activosData, error: activosError } = await supabase
          .from("activos")
          .select("*")
          .eq("id_subarea", subarea.id);
        if (activosError) throw activosError;
        subarea.activos = activosData;

        for (const activo of subarea.activos) {
          const { data: subconjuntosData, error: subconjuntosError } =
            await supabase
              .from("subconjuntos")
              .select("*")
              .eq("id_activo", activo.id);
          if (subconjuntosError) throw subconjuntosError;
          activo.subconjuntos = subconjuntosData;

          for (const subconjunto of activo.subconjuntos) {
            const { data: componentesData, error: componentesError } =
              await supabase
                .from("componentes")
                .select("*")
                .eq("id_subconjunto", subconjunto.id);
            if (componentesError) throw componentesError;
            subconjunto.componentes = componentesData;

            const { data: spotsSubconjuntoData, error: spotsSubconjuntoError } =
              await supabase
                .from("spots")
                .select("*")
                .eq("id_subconjunto", subconjunto.id);
            if (spotsSubconjuntoError) throw spotsSubconjuntoError;
            subconjunto.spots = spotsSubconjuntoData;

            for (const componente of subconjunto.componentes) {
              const { data: spotsComponenteData, error: spotsComponenteError } =
                await supabase
                  .from("spots")
                  .select("*")
                  .eq("id_componente", componente.id);
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
</script>

<style scoped>
.container {
  margin: 20px;
}

.area-trabajo-section {
  max-height: 97%; /* Altura máxima de la sección */
  overflow-y: auto; /* Agrega una barra de desplazamiento vertical cuando el contenido excede la altura máxima */
}

.area-item {
  margin-bottom: 20px;
}

.subarea-list {
  margin-left: 20px;
}

.subarea-item {
  margin-bottom: 10px;
}

.activo-list {
  margin-left: 20px;
}

.activo-item {
  margin-bottom: 10px;
}

.subconjunto-list {
  margin-left: 20px;
}

.subconjunto-item {
  margin-bottom: 10px;
}

.spot-list {
  margin-left: 20px;
}

.spot-item {
  margin-bottom: 5px;
}

.componente-item {
  margin-bottom: 10px;
}

.line {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-left: 4px solid green;
  margin-right: 10px;
}

/* Estilo para los puntos grandes */
.bullet-area {
  color: rgb(43, 0, 255); /* Color para los puntos de área */
}

.bullet-subarea {
  color: rgb(8, 226, 52); /* Color para los puntos de subárea */
}

.bullet-activo {
  color: rgb(237, 22, 22); /* Color para los puntos de activo */
}

.bullet-subconjunto {
  color: orange; /* Color para los puntos de subconjunto */
}

.bullet-componente {
  color: rgb(255, 100, 3); /* Color para los puntos de componente */
}

.bullet-spot {
  color: rgb(193, 133, 133); /* Color para los puntos de spot */
}

/* Estilo para los botones */
.btn-area,
.btn-subarea,
.btn-activo,
.btn-subconjunto,
.btn-componente,
.btn-spot-subconjunto,
.btn-spot-componente {
  background-color: #05a396;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 5px; /* Bordes redondeados */
  font-size: 14px; /* Tamaño de fuente */
}

.btn-spot-subconjunto,
.btn-spot-componente {
  background-color: #05a396;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 5px; /* Bordes redondeados */
  font-size: 14px; /* Tamaño de fuente */
}

.btn-area:hover,
.btn-subarea:hover,
.btn-activo:hover,
.btn-subconjunto:hover,
.btn-componente:hover,
.btn-spot-subconjunto:hover,
.btn-spot-componente:hover {
  background-color: #06857a;
}
.spot {
  color: rgb(195, 0, 255);
  font-weight: bold;
}
</style>
