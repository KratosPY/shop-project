<script setup lang="ts"></script>
<template>
    <div class="modal">
      <div class="modal-content">
        <slot />
      </div>
    </div>
</template>
<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  transition: all;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 800px;
  text-align: center;
}


</style>
