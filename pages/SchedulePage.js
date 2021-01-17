
let times = [];
for(let i = 6;i<23;i++){
    times.push(""+i+":00");
    times.push(""+i+":30");
}

let weekschedule = getLocalCache("weekschedule") || [];

let tagColor = getLocalCache("tagcolor") || {};
function getTotalTime(time){
    let hm = time.split(":");
    let hour = parseInt(hm[0])-6;
    let min = parseInt(hm[1]);
    return hour*60+min;
}
function getTagAttributes(schedule){
    let from = schedule.from;
    let to = schedule.to;
    let top = getTotalTime(from);
    let height = getTotalTime(to) - top;
    return {top,height}
}
function randomColor(){
    let color = Math.floor(Math.random()*0xFFFFFF|0xA3A3A3);
    let [R,G,B]=[(color&0xFF0000)>>16,(color&0x00FF00)>>8,(color&0x0000FF)];
    let d = (0.299*R + 0.587*G + 0.114*B)/255;
    let fontcolor = d>0.5?"#000":"#fff";
    let color100 = color-0x030303;
    color = color.toString(16).toUpperCase();
    color100 = color100.toString(16).toUpperCase();
    let colorStr0="#"+"000000".substring(0,6-color.length)+color;
    let colorStr100="#"+"000000".substring(0,6-color100.length)+color100;
    console.log(colorStr0,colorStr100);
    return {color0:colorStr0,color100:colorStr100,fontColor:fontcolor};
}
let days = [{tags:[],title:"星期一"},{tags:[],title:"星期二"},{tags:[],title:"星期三"},{tags:[],title:"星期四"},{tags:[],title:"星期五"},{tags:[],title:"星期六"},{tags:[],title:"星期日"}];
for(let i in days){
    days[i].dayStyle = `position:absolute;margin-top:9px;top:60px;left:${50+100*(i)}px;width:100px`;
    days[i].titleStyle = `position:absolute;left:${50+100*(i)}px;width:100px;background:#ffffff;border:1px solid #f3f3f3`;
}
for(let s of weekschedule){
    let tag = s;
    if(!tagColor[tag.title]){
        tagColor[tag.title]=randomColor();
        setLocalCache("tagcolor",tagColor);
    }
    let {top,height}=getTagAttributes(s);
    let {color0,color100,fontColor}=tagColor[tag.title];
    tag.style = `position:absolute;left:2px;width:96px;padding:0 6px;border-radius:5px;top:${top}px;height:${height}px;background: linear-gradient(315deg, ${color0} 0%, ${color100} 100%);color: ${fontColor};`;
    days[s.weekday-1].tags.push(tag);
}
let options = {
    template:
        "<div style='width: 764px;height: 1100px;background: #fafafa;'>" +
        "<nut-drag direction=\"y\" :style=\"{left:'0px',top:'300px'}\">\n" +
        "    <nut-fixednav type=\"left\">\n" +
        "    <ul slot=\"list\" class=\"fixed-list\">\n" +
        "        <li @click='clickShowPlus'><nut-icon type=\"plus\" size='10px'></nut-icon>新增</li>\n" +
        "        <li @click='clickShowMinus'><nut-icon type=\"minus\" size='10px'></nut-icon>编辑</li>\n" +
        "    </ul>\n" +
        "    <template slot=\"btn\" @click=\"myActive=!myActive\">\n" +
        "        <img style=\"width:20px;height:20px\"\n" +
        "        src=\"https://img10.360buyimg.com/imagetools/jfs/t1/143466/8/1743/6993/5ef9fb50E10f30d87/993e4e681fc50cac.png\" />\n" +
        "        <span>日程调整</span>\n" +
        "    </template>\n" +
        "    </nut-fixednav>\n" +
        "</nut-drag>" +
        "    <div style='position:fixed;padding-left:5px;z-index:10;background: #ffffff;top:60px' id='times'>\n" +
        "<div v-for='time in times' style='font-size: 12px;height: 30px;'>" +
        "{{time}}" +
        "</div>" +
        "    </div>\n" +
        "    <div style='position:fixed;padding-left:5px;z-index:10;' id='days'>\n" +
        "<div v-for='(day,index) in days' :style='day.titleStyle'>" +
        "<p style='padding-left: 25px'>{{day.title}}</p>" +
        "</div>" +
        "    </div>\n" +
        "    <div v-for='day in days' :style='day.dayStyle'>" +
        "<div v-for='time in times' style='height: 29px;border-top: 1px solid #f3f3f3'>" +
        "</div>" +
        "<nut-button v-for='tag in day.tags' :style='tag.style' @click='showScheduleTag(tag)'>" +
        "{{tag.title}}\n{{tag.from}}-{{tag.to}}\n@{{tag.at}}" +
        "</nut-button>"+
        "    </div>" +
        "</div>",
    methods: {
        showScheduleTag(tag){
            this.$dialog({
                title: tag.title,
                content:
                    `开始时间：${tag.from}<p/>
                    结束时间：${tag.to}<p/>
                    地点：${tag.at}<p/>
                    内容：${tag.content}`,
                closeBtn:true,  //显式右上角关闭按钮
                noFooter:true
            });
        },
        clickShowPlus(){
            this.$emit("switch-page","schedule-plus");
        },
        clickShowMinus(){
            this.$emit("switch-page","schedule-minus");
        },
        openSwitch(param) {
            this[`${param}`] = true;
        },

        closeSwitch(param) {
            this[`${param}`] = false;
        }
    },
    watch:{},
    data(){
        return {
            showPlus:false,
            showMinus:false,
            times:times,
            days:days,
            scheduleList:weekschedule,
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
            start:null,
            moveX:0,
            moveY:0,
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
window.onscroll = function(){
    let t=document.body.scrollTop||document.documentElement.scrollTop;
    let l=document.body.scrollLeft||document.documentElement.scrollLeft;
    if($("#times")[0]&&$("#days")[0]){
        $("#times")[0].style.top = 60-t+"px";
        $("#days")[0].style.left = -l+"px";
    }
};
export default options;