export default {
  methods: {
    required(val) {
      let msg = 'This field is required';
      if (typeof val === 'string') return !!val.trim() || msg;
      if (Array.isArray(val)) return val.length || msg;
      return !!val;
    },
  }
}
