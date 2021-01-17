let weekschedule = getLocalCache("weekschedule") || [];
let options = {
    template:"<div>\n" +
        "    <nut-leftslip v-for=\"(item, index) in list\" :key=\"index\" ref=\"leftslip\">\n" +
        "        <div slot=\"slip-main\" class=\"slip-main\">\n" +
        "            <div>\n" +
        "                <p>{{item.title}}</p>\n" +
        "                <p>星期{{item.weekday}} {{item.from}}-{{item.to}}</p>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <div slot=\"slipbtns\" class=\"slipbtns\"\n" +
        "            ><a href=\"javascript:;\" @click=\"delItem(index)\">删除</a></div\n" +
        "        >\n" +
        "    </nut-leftslip>\n" +
        "</div>",
    data() {
        return {
            list: weekschedule,
            weekday:["一","二","三","四","五","六","日"]
        };
    },
    methods: {
        delItem(index) {
            weekschedule.splice(index,1);
            setLocalCache("weekschedule",weekschedule);
            this.$emit("switch-page","schedule-minus");
        }
    }
};
export default options;