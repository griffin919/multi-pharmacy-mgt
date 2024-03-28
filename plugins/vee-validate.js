import Vue from "vue";
import {
  ValidationProvider,
  ValidationObserver,
  extend,
} from "vee-validate";
import {
  required,
  numeric,
  alpha,
  email,
  min,
  regex,
  max,
  alpha_spaces,
} from "vee-validate/dist/rules";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

extend("required", {
  ...required,
  message: "Please enter the {_field_}.",
});

extend("alpha", {
  ...alpha,
  message: "The {_field_} can contain only letters.",
});

extend("min4", {
  ...min,
  message: "The {_field_} should have a minimum of 4 characters.",
});

extend("min5", {
  ...min,
  message: "The {_field_} should have a minimum of 5 characters.",
});

extend("min10", {
  ...min,
  message: "The {_field_} should have a minimum of 10 characters.",
});

extend("max10", {
  ...max,
  message: "The {_field_} should have a maximum of 10 characters.",
});

extend("numeric", {
  ...numeric,
  message: "The {_field_} should contain only numbers.",
});

extend("alpha_spaces", {
  ...alpha_spaces,
  message: "The {_field_} should contain only letters and spaces.",
});

extend("regex", {
  ...regex,
  message: "The {_field_} format is invalid.",
});
