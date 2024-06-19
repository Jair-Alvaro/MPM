<template>
  <NuxtLayout>
    <UDashboardPage>
      <UDashboardPanel grow>
        <UDashboardNavbar title="Máquinas" class="mt-2">
          <template #right>
            <DashboardHeader />
          </template>
        </UDashboardNavbar>

        <UDashboardPanelContent>
          <div class="grid grid-cols-3 gap-4 items-center">
            <!-- Filtro por activos -->
            <div>
              <select v-model="selectedActivo" @change="filterSubconjuntos" class="teal-select">
                <option value="">Todos los Activos</option>
                <option
                  v-for="activo in activos"
                  :value="activo.id"
                  :key="activo.id"
                >
                  {{ activo.nombre }}
                </option>
              </select>
            </div>
            <!-- Botón de exportar -->
            <button
              @click="exportToExcel"
              class="export-button bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
            >
              Exportar
            </button>
          </div>
          <br />

          <div class="overflow-x-auto">
            <table class="table-auto w-full rounded border border-green-500">
              <thead>
                <tr>
                  <th class="px-4 py-2 border border-green-500">Nombre</th>
                  <th class="px-4 py-2 border border-green-500">Descripción</th>
                  <th class="px-4 py-2 border border-green-500">Fabricante</th>
                  <th class="px-4 py-2 border border-green-500">Modelo</th>
                  <th class="px-4 py-2 border border-green-500">
                    Número de Pieza
                  </th>
                  <th class="px-4 py-2 border border-green-500">
                    Número de Serie
                  </th>
                  <th class="px-4 py-2 border border-green-500">Código</th>
                  <th class="px-4 py-2 border border-green-500">Imagen</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="subconjunto in filteredSubconjuntos"
                  :key="subconjunto.id"
                >
                  <td class="border px-4 py-2">{{ subconjunto.nombre }}</td>
                  <td class="border px-4 py-2">
                    {{ subconjunto.descripcion }}
                  </td>
                  <td class="border px-4 py-2">{{ subconjunto.fabricante }}</td>
                  <td class="border px-4 py-2">{{ subconjunto.modelo }}</td>
                  <td class="border px-4 py-2">
                    {{ subconjunto.numero_pieza }}
                  </td>
                  <td class="border px-4 py-2">
                    {{ subconjunto.numero_serie }}
                  </td>
                  <td class="border px-4 py-2">{{ subconjunto.codigo }}</td>
                  <td class="border px-4 py-2">
                    <img
                      :src="getSmallImage(subconjunto.imagen)"
                      alt="Imagen del Subconjunto"
                      class="w-24 h-auto"
                    />
                    <p v-if="!subconjunto.imagen" class="text-gray-500">
                      Sin imagen
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </UDashboardPanelContent>
      </UDashboardPanel>
    </UDashboardPage>
  </NuxtLayout>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import { createClient } from '@supabase/supabase-js';
import * as XLSX from 'xlsx';

=======
import { createClient } from "@supabase/supabase-js";
>>>>>>> 7e4a6fb351960ffa51c038d2bf0877c2b3d1f742

const supabase = createClient(
  "https://nqpfkwmkparhpxjovixf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcGZrd21rcGFyaHB4am92aXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3OTg5NjEsImV4cCI6MjAzMzM3NDk2MX0.jkoYu7IOIDETPGI-qqhGbCGEX8FN-M7mqW39uzSexH0"
);

const selectedActivo = ref("");
const activos = ref([]);
const subconjuntos = ref([]);

const filteredSubconjuntos = ref([]);

const fetchActivos = async () => {
  const { data, error } = await supabase.from("activos").select("*");
  if (error) {
    console.error("Error fetching activos:", error.message);
  } else {
    activos.value = data;
  }
};

const fetchSubconjuntos = async () => {
  const { data, error } = await supabase.from("subconjuntos").select("*");
  if (error) {
    console.error("Error fetching subconjuntos:", error.message);
  } else {
    subconjuntos.value = data;
    filterSubconjuntos();
  }
};

const filterSubconjuntos = () => {
  filteredSubconjuntos.value = subconjuntos.value.filter((subconjunto) => {
    return (
      !selectedActivo.value || subconjunto.id_activo === selectedActivo.value
    );
  });
};

const getSmallImage = (imageUrl) => {
  return imageUrl || ""; // Retorna una cadena vacía si no hay imagen
};

const exportToExcel = () => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(filteredSubconjuntos.value);
  XLSX.utils.book_append_sheet(wb, ws, "Subconjuntos");
  XLSX.writeFile(wb, "subconjuntos.xlsx");
};

onMounted(() => {
  fetchActivos();
  fetchSubconjuntos();
});

// Vuelve a filtrar los subconjuntos cuando cambia el filtro de activos
watch(selectedActivo, () => {
  filterSubconjuntos();
});
</script>

<style scoped>
.export-button {
  background-color: #05a396;
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
}
.teal-select {
  border: 2px solid teal;
  color: teal;
  outline: none;
  border-radius: 8px; /* Makes the corners rounded */
  padding: 3px;
}

.teal-select:focus {
  outline: 1px solid teal;
 
}
</style>
