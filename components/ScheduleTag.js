export default {
    template:"<nut-drag @click.native=\"click\">\n" +
        "  <div class=\"touch-dom\">可点击，可拖拽</div>\n" +
        "</nut-drag>",
    methods: {
        click() {
            this.$toast.text("点击了拖拽元素");
        },
    },
};