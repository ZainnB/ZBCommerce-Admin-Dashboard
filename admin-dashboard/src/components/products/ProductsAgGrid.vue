<template>
  <div class="ag-grid-container">
    <ag-grid-vue
      class="ag-theme-quartz"
      :columnDefs="columnDefs"
      :rowData="productsStore.filteredProducts"
      :defaultColDef="defaultColDef"
      :animateRows="true"
      :pagination="true"
      :paginationPageSize="10"
    ></ag-grid-vue>
  </div>
</template>

<script setup>
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useProductsStore } from "@/store";
import { formatCurrency } from "@/utils/format";

const productsStore = useProductsStore();

// AG-Grid configuration
const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
};

const columnDefs = [
  {
    headerName: "Image",
    field: "image",
    width: 100,
    cellRenderer: (params) => {
      return `<div class="product-image"><img src="${params.value}" alt="Product" /></div>`;
    },
    filter: false,
    sortable: false,
  },
  { headerName: "ID", field: "id", width: 100 },
  { headerName: "Product Name", field: "name", flex: 1 },
  { headerName: "Category", field: "category", width: 150 },
  {
    headerName: "Price",
    field: "price",
    width: 120,
    valueFormatter: (params) => {
      return formatCurrency(params.value);
    },
  },
  {
    headerName: "Stock",
    field: "stock",
    width: 120,
    cellStyle: (params) => {
      if (params.value <= params.data.threshold) {
        return { color: "#f87171" };
      }
      return null;
    },
  },
  {
    headerName: "Status",
    field: "stock",
    width: 140,
    cellRenderer: (params) => {
      let status, statusClass;

      if (params.value <= 0) {
        status = "Out of Stock";
        statusClass = "out-of-stock";
      } else if (params.value <= params.data.threshold) {
        status = "Low Stock";
        statusClass = "low-stock";
      } else {
        status = "In Stock";
        statusClass = "in-stock";
      }

      return `<span class="status-badge ${statusClass}">${status}</span>`;
    },
  },
  {
    headerName: "Actions",
    width: 100,
    cellRenderer: () => {
      return `<button class="edit-btn" data-action="edit"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>`;
    },
    onCellClicked: (params) => {
      const action = params.event.target.closest("button")?.dataset.action;
      if (action === "edit") {
        console.log("Edit product:", params.data);
      }
    },
    filter: false,
    sortable: false,
  },
];
</script>

<style scoped>
.ag-grid-container {
  height: 600px;
  width: 100%;
}

/* AG-Grid custom styles */
:deep(.ag-theme-alpine-dark) {
  --ag-background-color: rgba(0, 0, 0, 0.5);
  --ag-odd-row-background-color: rgba(255, 255, 255, 0.02);
  --ag-header-background-color: rgba(0, 0, 0, 0.3);
  --ag-header-foreground-color: #a0a0a0;
  --ag-border-color: rgba(255, 255, 255, 0.05);
}

:deep(.product-image) {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  background-color: #333;
}

:deep(.product-image img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

:deep(.status-badge) {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

:deep(.status-badge.in-stock) {
  background-color: rgba(74, 222, 128, 0.1);
  color: #4ade80;
}

:deep(.status-badge.low-stock) {
  background-color: rgba(250, 204, 21, 0.1);
  color: #facc15;
}

:deep(.status-badge.out-of-stock) {
  background-color: rgba(248, 113, 113, 0.1);
  color: #f87171;
}

:deep(.edit-btn) {
  background: transparent;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

:deep(.edit-btn:hover) {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}
</style>
