import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    user: {
      name: "Василий Ложкин",
      phone: "+7 999-999-99-99",
      email: "vasily@example.com",
    },
    addresses: [
      {
        id: 1,
        name: "Адрес №1. Тест",
        street: "Невский пр.",
        house: "22",
        apartment: "46",
        comment: "Позвоните, пожалуйста, от проходной",
        isEditing: false,
      },
      {
        id: 2,
        name: "Адрес №2",
        street: "",
        house: "",
        apartment: "",
        comment: "",
        isEditing: true,
      },
    ],
    passwordForm: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  }),

  getters: {
    fullAddress: (state) => (address) => {
      let full = `${address.street}, д. ${address.house}`;
      if (address.apartment) {
        full += `, кв. ${address.apartment}`;
      }
      return full;
    },
  },

  actions: {
    updateUser(userData) {
      this.user = { ...this.user, ...userData };
    },
    saveProfile() {
      alert(this.user);
    },
    updatePassword(passwordData) {
      this.passwordForm = { ...this.passwordForm, ...passwordData };
    },
    changePassword() {
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        alert("Пароли не совпадают!");
        return;
      }

      alert({
        currentPassword: this.passwordForm.currentPassword,
        newPassword: this.passwordForm.newPassword,
      });

      this.passwordForm = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      };
    },
    addAddress(addressData) {
      const newId = Math.max(...this.addresses.map((addr) => addr.id)) + 1;
      this.addresses.push({
        id: newId,
        name: `Адрес №${newId}`,
        street: "",
        house: "",
        apartment: "",
        comment: "",
        isEditing: true,
        ...addressData,
      });
    },
    updateAddress(id, addressData) {
      const address = this.addresses.find((addr) => addr.id === id);
      if (address) {
        Object.assign(address, addressData);
      }
    },
    editAddress(id) {
      const address = this.addresses.find((addr) => addr.id === id);
      if (address) {
        address.isEditing = true;
      }
    },
    saveAddress(id) {
      const address = this.addresses.find((addr) => addr.id === id);
      if (address) {
        address.isEditing = false;
        alert(address);
      }
    },
    deleteAddress(id) {
      const index = this.addresses.findIndex((addr) => addr.id === id);
      if (index > -1) {
        this.addresses.splice(index, 1);
      }
    },
  },
});
