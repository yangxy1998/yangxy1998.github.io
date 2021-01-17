let diaries = getLocalCache("diaries") || [];

function getDate(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let weekday = date.getDay();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return {year,month,day,weekday,hours,minutes,seconds};
}

let options = {
    template:"<div  style='padding: 10px;background: #eee'>" +
        "<nut-row type=\"flex\" flexWrap=\"wrap\" :gutter=\"10\" justify=\"center\" align=\"center\" style='padding-top:10px;background: #fff'>\n" +
        "<nut-col :span='16'>" +
        "<nut-textinput \n" +
        "    v-model=\"title\"\n" +
        "    label=\"\"\n" +
        "    placeholder=\"请输入标题\"\n" +
        "    :clearBtn=\"true\"\n" +
        "    :disabled=\"false\"\n" +
        "    style='padding: 1% 10%'/>" +
        "</nut-col>" +
        "<nut-col :span='8'>" +
        "<nut-button \n" +
        "  @click=\"submitDiary\"\n" +
        "  type=\"actived\" " +
        "  icon=\"top\" " +
        "  style='padding: 10px'" +
        ">\n" +
        "  提交日记\n" +
        "</nut-button>" +
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
        "<nut-col style='padding-top: 20px'>" +
        "<nut-infiniteloading \n" +
        "    @loadmore=\"onInfinite\" \n" +
        "    :is-show-mod=\"true\" \n" +
        "    :has-more=\"isHasMore\" \n" +
        "    :is-loading=\"isLoading\" \n" +
        "    :threshold=\"200\"\n" +
        ">\n" +
        "<nut-timeline>\n" +
        "    <nut-timelineitem v-for='(diary,index) in diaries'>\n" +
        "        <div slot=\"title\">{{diary.date}}</div>\n" +
        "        <h4>{{diary.title}}</h4>" +
        "        <div>{{diary.content}}</div>\n" +
        "    </nut-timelineitem>\n" +
        "</nut-timeline>" +
        "</nut-infiniteloading>" +
        "</nut-col>" +
        "</nut-row>" +
        "</div>",
    data() {
        return {
            diaries: diaries.slice(0,20),
            totalDiaries:diaries,
            page: 2,
            num: 10,
            isHasMore: true,
            isLoading: false,
            isErr: false,
            timer: null,
            title:"",
            content:""
        };
    },
    watch:{},
    methods: {
        onInfinite () {
            this.isLoading = true;
            this.timer = setTimeout(() => {
                if (this.page*this.num <= this.totalDiaries.length) {
                    this.diaries = this.totalDiaries.slice(0,this.num * this.page);
                    this.page = this.page + 1;
                } else {
                    this.isHasMore = false;
                }
                this.isLoading = false;
            }, 100);
        },
        submitDiary(){
            if(this.title===""||this.content===""){
                this.$toast.text("标题或内容不能为空！");
                return;
            }
            let date = getDate();
            let weekday =["日","一","二","三","四","五","六"];
            this.totalDiaries.unshift({
                date:`${date.year}-${date.month+1}-${date.day} ${date.hours}：${date.minutes}：${date.seconds} 星期${weekday[date.weekday]}`,
                content:this.content,
                title:this.title
            });
            setLocalCache("diaries",this.totalDiaries);
            this.$toast.success("提交成功！");
            this.title="";
            this.content="";
        }
    },
    destroyed() {
        clearTimeout(this.timer);
    }
};

export default options;