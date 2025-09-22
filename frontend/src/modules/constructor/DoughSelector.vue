<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="doughItem in doughOptions"
          :key="doughItem.id"
          :class="`dough__input dough__input--${doughItem.id === 1 ? 'light' : 'large'}`"
        >
          <input
            type="radio"
            name="dough"
            :value="doughItem.id === 1 ? 'light' : 'large'"
            class="visually-hidden"
            :checked="doughItem.id === selectedDoughId"
            @change="onDoughChange(doughItem)"
          />
          <b>{{ doughItem.name }}</b>
          <span>{{ doughItem.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  doughOptions: {
    type: Array,
    required: true,
    default: () => [],
  },
  selectedDoughId: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["dough-change"]);

const onDoughChange = (doughItem) => {
  emit("dough-change", doughItem);
};
</script>

<style scoped>
.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.sheet {
  padding-top: 15px;
  border-radius: 8px;
  background-color: #ffffff;
  -webkit-box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.04),
    0 0 2px rgba(0, 0, 0, 0.06),
    0 0 1px rgba(0, 0, 0, 0.04);
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.04),
    0 0 2px rgba(0, 0, 0, 0.06),
    0 0 1px rgba(0, 0, 0, 0.04);
}

.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}

.sheet__content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding-right: 18px;
  padding-bottom: 15px;
  padding-left: 18px;
}

.title {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  color: #000000;
}

.title--small {
  font-size: 18px;
  font-weight: 700;
  font-style: normal;
  line-height: 21px;
}

.dough__input {
  position: relative;
  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;
  cursor: pointer;
}

.dough__input b {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
}

.dough__input b::before {
  position: absolute;
  top: 50%;
  left: 0;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  width: 36px;
  height: 36px;
  content: "";
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 50%;
  background-color: #f2eef5;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 22px;
}

.dough__input span {
  font-size: 11px;
  font-weight: 300;
  font-style: normal;
  line-height: 13px;
  display: block;
}

.dough__input--light b::before {
  background-image: url("@/assets/img/dough-light.svg");
}

.dough__input--large b::before {
  background-image: url("@/assets/img/dough-large.svg");
}

.dough__input:hover b::before {
  -webkit-box-shadow: 0 0 0 2px rgba(65, 182, 25, 0.6);
  box-shadow: 0 0 0 2px rgba(65, 182, 25, 0.6);
}

.dough__input input:checked + b::before {
  -webkit-box-shadow: 0 0 0 2px #41b619;
  box-shadow: 0 0 0 2px #41b619;
}
</style>
