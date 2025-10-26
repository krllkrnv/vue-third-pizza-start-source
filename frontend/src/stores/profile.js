import { defineStore } from "pinia";
import { AddressService } from "@/services";
import { useAuthStore } from "./auth.js";
import { getPublicImage } from "@/utils/images.js";

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
    addressesCount: (state) => state.addresses.length,
    defaultAddress: (state) =>
      state.addresses.find((address) => address.isDefault) ||
      state.addresses[0],
    userDisplayName: () => {
      const authStore = useAuthStore();
      return authStore.user?.name || "Пользователь";
    },
    userAvatar: () => {
      const authStore = useAuthStore();
      return authStore.user?.avatar
        ? getPublicImage(authStore.user.avatar)
        : null;
    },
  },

  actions: {
    async loadAddresses() {
      try {
        const addresses = await AddressService.getAll();
        this.addresses = addresses;
      } catch (error) {
        console.error("[useProfileStore] Error loading addresses:", error);
      }
    },

    async addAddress(addressData) {
      try {
        const authStore = useAuthStore();
        const newAddress = await AddressService.create({
          ...addressData,
          userId: authStore.user?.id,
        });
        this.addresses.push(newAddress);
        return newAddress;
      } catch (error) {
        console.error("[useProfileStore] Error adding address:", error);
        throw error;
      }
    },

    async updateAddress(id, addressData) {
      try {
        const updatedAddress = await AddressService.update(id, addressData);
        const index = this.addresses.findIndex((addr) => addr.id === id);
        if (index > -1) {
          this.addresses[index] = updatedAddress;
        }
        return updatedAddress;
      } catch (error) {
        console.error("[useProfileStore] Error updating address:", error);
        throw error;
      }
    },

    async deleteAddress(id) {
      try {
        await AddressService.delete(id);
        const index = this.addresses.findIndex((addr) => addr.id === id);
        if (index > -1) {
          this.addresses.splice(index, 1);
        }
      } catch (error) {
        console.error("[useProfileStore] Error deleting address:", error);
        throw error;
      }
    },

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
        alert("Passwords do not match!");
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
  },
});