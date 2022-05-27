import { VTextarea } from 'vuetify/lib';

export default {
  extends: VTextarea,

  name: 'TextArea',

  props: {
    outlined: { default: true },
    hideDetails: { default: 'auto' },
    dense: { default: true },
    validateOnBlur: { default: true },
    autoGrow: { default: true },
  }
}
