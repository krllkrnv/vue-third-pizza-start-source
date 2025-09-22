<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in sizeOptions"
          :key="size.id"
          :class="`diameter__input diameter__input--${size.id === 1 ? 'small' : size.id === 2 ? 'normal' : 'big'}`"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.id === 1 ? 'small' : size.id === 2 ? 'normal' : 'big'"
            class="visually-hidden"
            :checked="size.id === selectedSizeId"
            @change="onSizeChange(size)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  sizeOptions: {
    type: Array,
    required: true,
    default: () => [],
  },
  selectedSizeId: {
    type: Number,
    default: 2,
  },
});

const emit = defineEmits(["size-change"]);

const onSizeChange = (size) => {
  emit("size-change", size);
};
</script>

<style scoped>
.content__diameter {
  width: 373px;
  margin-top: 15px;
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

.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;
  cursor: pointer;
}

.diameter__input span {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
  position: relative;
  padding-left: 46px;
}

.diameter__input span::before {
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
  background-image: url("@/assets/img/diameter.svg");
  background-position: center;
  background-repeat: no-repeat;
}

.diameter__input:nth-child(3n) {
  margin-right: 0;
}

.diameter__input--small span::before {
  background-size: 18px;
}

.diameter__input--normal span::before {
  background-size: 29px;
}

.diameter__input--big span::before {
  background-size: 100%;
}

.diameter__input:hover span::before {
  -webkit-box-shadow: 0 0 0 2px rgba(65, 182, 25, 0.6);
  box-shadow: 0 0 0 2px rgba(65, 182, 25, 0.6);
}

.diameter__input input:checked + span::before {
  -webkit-box-shadow: 0 0 0 2px #41b619;
  box-shadow: 0 0 0 2px #41b619;
}
</style>
