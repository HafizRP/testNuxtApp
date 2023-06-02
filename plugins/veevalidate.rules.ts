import rules from "@vee-validate/rules";
import { defineRule } from "vee-validate";

export default defineNuxtPlugin((nuxtApp) => {
  Object.keys(rules)
    .filter((k) => k !== "default")
    .forEach((rule, i) => {
      defineRule(rule, rules[rule]);
    });
});
