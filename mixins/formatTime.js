export default {
  methods: {
    formatTime(time) {
      let hours = Math.floor(time / 60);
      let minutes = time % 60;

      let hourStr = hours ? `${hours} hr` : '';
      let minStr = `${minutes} min`;
      return `${hourStr} ${minStr}`;
    },
  }
}
