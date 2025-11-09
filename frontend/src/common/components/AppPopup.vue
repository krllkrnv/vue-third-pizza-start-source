<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isVisible" class="popup-overlay" @click.self="$emit('close')">
        <div class="popup">
          <button type="button" class="close" @click="$emit('close')"></button>
          <h2 class="title">Спасибо за заказ</h2>
          <p>Мы начали готовить ваш заказ</p>
          <button type="button" class="button" @click="$emit('close')">
            Супер!
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["close"]);
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup {
  position: relative;
  width: 420px;
  padding: 64px 95px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.popup h2 {
  text-align: center;
  font-size: 1.3em;
}

.popup p {
  margin: 24px 0;
  text-align: center;
}

.popup .button {
  display: block;
  margin: 0 auto;
  padding: 16px 32px;
}

.close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 25px;
  height: 25px;
  border: none;
  background: transparent;
  cursor: pointer;
}

.close::before,
.close::after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25px;
  height: 2px;
  content: "";
  background-color: #000;
  transform: translate(-50%, -50%) rotate(45deg);
}

.close::before {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.close:hover {
  opacity: 0.8;
}

.button {
  padding: 16px 32px;
  border: none;
  border-radius: 4px;
  background-color: #41b619;
  color: #fff;
  cursor: pointer;
}

.button:hover {
  background-color: #48d618;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
