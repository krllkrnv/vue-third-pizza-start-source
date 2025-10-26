import AddressService from "./resources/AddressService.js";
import DoughService from "./resources/DoughService.js";
import IngredientService from "./resources/IngredientService.js";
import MiscService from "./resources/MiscService.js";
import OrderService from "./resources/OrderService.js";
import SauceService from "./resources/SauceService.js";
import SizeService from "./resources/SizeService.js";

export {
  AddressService,
  DoughService,
  IngredientService,
  MiscService,
  OrderService,
  SauceService,
  SizeService,
};

export default {
  addresses: AddressService,
  dough: DoughService,
  ingredients: IngredientService,
  misc: MiscService,
  orders: OrderService,
  sauces: SauceService,
  sizes: SizeService,
};
