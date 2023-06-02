import { Form, Field, ErrorMessage } from "vee-validate";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("FormValidate", Form);
  nuxtApp.vueApp.component("FieldValidate", Field);
  nuxtApp.vueApp.component("ValidateErrorMessage", ErrorMessage);
});
