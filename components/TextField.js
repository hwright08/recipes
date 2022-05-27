import { VTextField } from 'vuetify/lib';

export default {
  extends: VTextField,

  name: 'TextField',

  props: {
    outlined: { default: true },
    hideDetails: { default: 'auto' },
    dense: { default: true },
    validateOnBlur: { default: true }
  }
}
