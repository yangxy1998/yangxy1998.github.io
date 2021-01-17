let weekschedule = getLocalCache("weekschedule") || [];
let options = {
    template:
        "<nut-row type=\"flex\" flexWrap=\"wrap\" :gutter=\"10\" justify=\"center\" align=\"center\">" +
        "<nut-col>" +
        "<nut-cell \n" +
        "  :show-icon=\"true\" \n" +
        "  title=\"请选择日期\" \n" +
        "  :desc=\"option0\" \n" +
        "  @click.native=\"openSwitch('isVisible0')\"" +
        "  style='padding: 1% 10%;margin-top:10%;'>\n" +
        "</nut-cell>\n" +
        "</nut-col>" +
        "<nut-col>" +
        "<nut-picker\n" +
        "  :is-visible=\"isVisible0\"\n" +
        "  :list-data=\"listData\"\n" +
        "  :default-value-data=\"defaultValueData\"\n" +
        "  @close=\"closeSwitch('isVisible0')\"\n" +
        "  @confirm=\"setChooseValue0\"" +
        "></nut-picker>" +
        "</nut-col>" +
        "<nut-col>" +
        "<nut-cell \n" +
        "  :show-icon=\"true\" \n" +
        "  title=\"请选择开始时间\" \n" +
        "  :desc=\"option1\" \n" +
        "  @click.native=\"openSwitch('isVisible1')\"" +
        "  style='padding: 1% 10%'>\n" +
        "</nut-cell>\n" +
        "</nut-col>" +
        "<nut-col>" +
        "<nut-datepicker \n" +
        "    :is-visible=\"isVisible1\"\n" +
        "    type=\"time\"\n" +
        "    title=\"请选择开始时间\" \n" +
        "    startHour=\"6\"\n" +
        "    endHour=\"22\"\n" +
        "    defaultValue=\"09:06\"\n" +
        "    @choose=\"setChooseValue1\"" +
        "    @close=\"closeSwitch('isVisible1')\"\n" +
        ">\n" +
        "</nut-datepicker>" +
        "</nut-col>" +
        "<nut-col>" +
        "<nut-cell \n" +
        "  :show-icon=\"true\" \n" +
        "  title=\"请选择结束时间\" \n" +
        "  :desc=\"option2\" \n" +
        "  @click.native=\"openSwitch('isVisible2')\"" +
        "  style='padding: 1% 10%'>\n" +
        "</nut-cell>\n" +
        "</nut-col>" +
        "<nut-col>" +
        "<nut-datepicker \n" +
        "    :is-visible=\"isVisible2\"\n" +
        "    type=\"time\"\n" +
        "    title=\"请选择结束时间\" \n" +
        "    startHour=\"6\"\n" +
        "    endHour=\"22\"\n" +
        "    defaultValue=\"09:06\"\n" +
        "    @choose=\"setChooseValue2\"" +
        "    @close=\"closeSwitch('isVisible2')\"\n" +
        ">\n" +
        "</nut-datepicker>" +
        "</nut-col>" +
        "<nut-col>" +
        "<nut-textinput \n" +
        "    v-model=\"title\"\n" +
        "    label=\"标题：\"\n" +
        "    placeholder=\"请输入标题\"\n" +
        "    :clearBtn=\"true\"\n" +
        "    :disabled=\"false\"\n" +
        "    style='padding: 1% 10%'/>" +
        "</nut-col>" +
        "<nut-col>" +
        "<nut-textbox \n" +
        "    v-model=\"content\"\n" +
        "    label=\"内容：\"\n" +
        "    placeholder=\"请输入内容\"\n" +
        "    :clearBtn=\"true\"\n" +
        "    :disabled=\"false\"\n" +
        "    max-num='300'" +
        "    :txt-areaH='100'" +
        "    style='padding: 1% 10%'/>" +
        "</nut-col>" +
        "<nut-col>" +
        "<nut-textinput \n" +
        "    v-model=\"address\"\n" +
        "    label=\"地点：\"\n" +
        "    placeholder=\"请输入地点\"\n" +
        "    :clearBtn=\"true\"\n" +
        "    :disabled=\"false\"\n" +
        "    style='padding: 1% 10%'/>" +
        "</nut-col>" +
        "<nut-col align='center' :span='12'>" +
        "<nut-button \n" +
        "  @click=\"plusSchedule\"" +
        "  type=\"actived\" " +
        "  shape=\"circle\" \n" +
        ">\n" +
        "  确定\n" +
        "</nut-button>" +
        "</nut-col>" +
        "<nut-col align='center' :span='12'>" +
        "<nut-button \n" +
        "  @click=\"backToSchedule\"" +
        "  type=\"light\" " +
        "  shape=\"circle\" \n" +
        ">\n" +
        "  返回\n" +
        "</nut-button>" +
        "</nut-col>" +
        "</nut-row>",
    methods:{
        openSwitch(param) {
            this[`${param}`] = true;
        },

        closeSwitch(param) {
            this[`${param}`] = false;
        },

        setChooseValue0(chooseData) {
            this.option0 = `${chooseData[0].value}`;
            this.weekday = `${chooseData[0].label}`;
        },

        setChooseValue1(chooseData) {
            this.option1 = chooseData[2];
        },

        setChooseValue2(chooseData) {
            this.option2 = chooseData[2];
        },

        backToSchedule(){
            this.$emit('switch-page','schedule')
        },

        plusSchedule: function () {
            if (this.option0 === '请选择' || this.option1 === '请选择' || this.option2 === '请选择' || this.title === '') {
                this.$toast.text('请输入完整信息！');
                return;
            }
            if(this.option1>=this.option2){
                this.$toast.text('开始时间不能大于结束时间！');
                return;
            }
            weekschedule.push({
                from: this.option1,
                to: this.option2,
                weekday: this.weekday,
                title: this.title,
                content: this.content,
                at: this.address
            });
            console.log(weekschedule);
            setLocalCache("weekschedule",weekschedule);
            this.$toast.success(`操作成功！已添加日程：${this.title}`);
            window.location.href = "/";
        }
    },
    mounted() {
        this.defaultValueData = [this.listData[0][3]];
    },
    data(){
        return {
            option0: '请选择',
            option1: '请选择',
            option2: '请选择',
            isVisible0: false,
            isVisible1:false,
            isVisible2:false,
            title: "",
            content: "",
            address: "",
            weekday: 1,
            listData: [
                [
                    {
                        label: 1,
                        value: '星期一',
                    },
                    {
                        label: 2,
                        value: '星期二',
                    },
                    {
                        label: 3,
                        value: '星期三',
                    },
                    {
                        label: 4,
                        value: '星期四',
                    },
                    {
                        label: 5,
                        value: '星期五',
                    },
                    {
                        label: 6,
                        value: '星期六',
                    },
                    {
                        label: 7,
                        value: '星期日',
                    },
                ],
            ],
            defaultValueData: null
        }
    }
};
export default options;