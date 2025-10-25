import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    user: {
      id: null,
      name: "",
      email: "",
      avatar: "",
      phone: "",
    },
    addresses: [],
    passwordForm: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  }),

  getters: {
    fullAddress: () => (address) => {
      let full = `${address.street}, д. ${address.building}`;
      if (address.flat) {
        full += `, кв. ${address.flat}`;
      }
      return full;
    },
    hasAddresses: (state) => state.addresses.length > 0,
    addressesCount: (state) => state.addresses.length,
    defaultAddress: (state) =>
      state.addresses.find((address) => address.isDefault) ||
      state.addresses[0],
    hasUserData: (state) => {
      return state.user.name || state.user.email || state.user.phone;
    },
    isUserComplete: (state) => {
      return state.user.name && state.user.email && state.user.phone;
    },
    userDisplayName: (state) => {
      return state.user.name || "Пользователь";
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
      const newId = Math.max(...this.addresses.map((addr) => addr.id), 0) + 1;
      this.addresses.push({
        id: newId,
        name: `Адрес №${newId}`,
        street: "",
        building: "",
        flat: "",
        comment: "",
        userId: "",
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
