<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauce in sauceOptions"
      :key="sauce.id"
      class="radio ingredients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="sauce.id === 1 ? 'tomato' : 'creamy'"
        :checked="sauce.id === selectedSauceId"
        @change="onSauceChange(sauce)"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script setup>
defineProps({
  sauceOptions: {
    type: Array,
    required: true,
    default: () => [],
  },
  selectedSauceId: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["sauce-change"]);

const onSauceChange = (sauce) => {
  emit("sauce-change", sauce);
};
</script>

<style scoped>
.ingredients__sauce {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 14px;
}

.ingredients__sauce p {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
  margin-top: 0;
  margin-right: 16px;
  margin-bottom: 10px;
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

.radio {
  cursor: pointer;
}

.radio span {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
  position: relative;
  padding-left: 24px;
}

.radio span:before {
  position: absolute;
  top: 50%;
  left: 0;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  width: 16px;
  height: 16px;
  content: "";
  border: 2px solid #b3abbc;
  border-radius: 50%;
  background-color: #ffffff;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.radio:hover input:not(:checked):not(:disabled) + span:before {
  border-color: #685879;
}

.radio input {
  display: none;
}

.radio input:checked + span:before {
  border: 6px solid #41b619;
}

.radio input:disabled + span:before {
  border-color: #b3abbc;
  background-color: #eaeaea;
}

.radio input:disabled:checked + span:before {
  border: 6px solid #b3abbc;
}
</style>
