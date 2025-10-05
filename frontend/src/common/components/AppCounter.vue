<template>
  <div :class="counterClasses">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="isMinDisabled"
      @click="decrease"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="modelValue"
      readonly
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="{ 'counter__button--orange': isOrange }"
      :disabled="isMaxDisabled"
      @click="increase"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  orange: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isMinDisabled = computed(() => props.modelValue <= props.min);
const isMaxDisabled = computed(() => props.modelValue >= props.max);
const isOrange = computed(() => props.orange);

const counterClasses = computed(() => {
  const classes = ["counter"];
  if (props.orange) {
    classes.push("counter--orange");
  }
  return classes;
});

const decrease = () => {
  if (!isMinDisabled.value) {
    emit("update:modelValue", props.modelValue - 1);
  }
};

const increase = () => {
  if (!isMaxDisabled.value) {
    emit("update:modelValue", props.modelValue + 1);
  }
};
</script>
