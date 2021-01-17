let tasks = getLocalCache("weektasks") || [];
let nextweek = getLocalCache("nextweektasks") || [];
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
function getSum()
{
    let estimate = 0;
    let actual = 0;
    for(let task of tasks){
        estimate+=task.estimate;
        actual+=task.actual;
    }
    let progress=Math.floor(100*actual/estimate);
    let color = 'red';
    if(progress>25)color='orange';
    if(progress>50)color='yellow';
    if(progress>75)color='yellowgreen';
    if(progress===100)color='green';
    color = {'progressColor':color};
    return {
        estimate,actual,progress,color
    }
}
function getNextweek(){
    let arr = [];
    for(let task of tasks){
        if(task.actual<task.estimate){
            arr.push({actual:task.actual,estimate:task.estimate,content:task.content})
        }
    }
    for(let task of nextweek){
        arr.push(task);
    }
    return arr;
}
let options ={
    template:
        "<nut-tab @tab-switch=\"tabSwitch\" style='padding-bottom: 70px'>\n" +
        "    <nut-tab-panel tab-title=\"本周任务概览\">" +
        "<nut-row type=\"flex\" flexWrap=\"wrap\" :gutter=\"10\" justify=\"center\" align=\"center\">\n" +
        "<nut-col :span='6'>" +
        "已完成工作量：{{sum.actual}}" +
        "</nut-col>" +
        "<nut-col :span='12'>" +
        "<nut-circleprogress :progress.sync='sum.progress' :progress-option='sum.color'>" +
        "</nut-circleprogress>" +
        "</nut-col>" +
        "<nut-col :span='6'>" +
        "预计工作量：{{sum.estimate}}" +
        "</nut-col>" +
        "<nut-col  style='padding-top: 10px;padding-bottom: 10px;'>" +
        "<nut-textinput \n" +
        "    v-model='newTaskContent'" +
        "    label=\"新增任务：\"\n" +
        "    placeholder=\"请输入任务内容\"\n" +
        "    :clearBtn=\"true\"\n" +
        "/>" +
        "</nut-col>" +
        "预计工作量：" +
        "<nut-col :span='8'>" +
        "<nut-stepper \n" +
        "    :value.sync=\"newTaskTime\" \n" +
        "    :min=\"0\" \n" +
        "></nut-stepper>" +
        "</nut-col>" +
        "<nut-button \n" +
        "  type=\"actived\" " +
        "  @click=\"addNewTask\"\n" +
        "  icon=\"plus\" " +
        ">\n" +
        "  新增任务\n" +
        "</nut-button>" +
        "<nut-col  style='padding-top: 10px;padding-bottom: 10px;'>" +
        "<nut-row type=\"flex\" flexWrap=\"wrap\" :gutter=\"5\" justify=\"center\" align=\"center\" v-for='(task,index) in tasks'>" +
        "<nut-col style='padding-top: 10px;padding-bottom: 10px;border-top: 2px solid #f3f3f3'>" +
        "<nut-progress v-if='task.percentage!==100'\n" +
        "    :percentage.sync='task.percentage'\n" +
        "    stroke-color=\"#f30\"\n" +
        "    stroke-width=\"15\"\n" +
        "    status=\"wrong\"\n" +
        ">\n" +
        "</nut-progress>" +
        "<nut-progress v-else\n" +
        "    :percentage.sync=\"task.percentage\" \n" +
        "    stroke-color=\"#1890ff\" \n" +
        "    :stroke-width=\"15\" \n" +
        "    status=\"success\"" +
        ">\n" +
        "</nut-progress>" +
        "</nut-col>" +
        "<nut-col style='padding-top: 10px;padding-bottom: 10px;'>" +
        "{{task.content}} 已完成工作量{{task.actual}} 预计工作量{{task.estimate}}" +
        "</nut-col>" +
        "<nut-col :span='12' style='padding-top: 10px;padding-bottom: 10px;'>" +
        "预计工作量" +
        "<nut-stepper \n" +
        "    :value.sync=\"task.estimate\" \n" +
        "    :min=\"task.actual\" \n" +
        "    @change='changeLoad(index)'\n" +
        "></nut-stepper>" +
        "</nut-col>" +
        "<nut-col :span='12' style='padding-top: 10px;padding-bottom: 10px;'>" +
        "完成工作量" +
        "<nut-stepper \n" +
        "    :value.sync=\"task.actual\" \n" +
        "    :min=\"0\" \n" +
        "    :max=\"task.estimate\"" +
        "    @change='changeLoad(index)'\n" +
        "></nut-stepper>" +
        "</nut-col>" +
        "</nut-row>" +
        "</nut-col>" +
        "</nut-row>" +
        "</nut-tab-panel>\n" +
        "    <nut-tab-panel tab-title=\"下周任务计划\">" +
        "<nut-row type=\"flex\" flexWrap=\"wrap\" :gutter=\"10\" justify=\"center\" align=\"center\">" +
        "<nut-col  style='padding-top: 10px;padding-bottom: 10px;'>" +
        "<nut-textinput \n" +
        "    v-model='newTaskContent'" +
        "    label=\"新增任务：\"\n" +
        "    placeholder=\"请输入任务内容\"\n" +
        "    :clearBtn=\"true\"\n" +
        "/>" +
        "</nut-col>" +
        "预计工作量：" +
        "<nut-col :span='8'  style='padding-top: 10px;padding-bottom: 10px;'>" +
        "<nut-stepper \n" +
        "    :value.sync=\"newTaskTime\" \n" +
        "    :min=\"0\" \n" +
        "></nut-stepper>" +
        "</nut-col>" +
        "<nut-col align='center'>" +
        "<nut-button \n" +
        "  @click=\"addNextTask\"\n" +
        "  type=\"actived\" " +
        "  icon=\"plus\" " +
        ">\n" +
        "  新增任务\n" +
        "</nut-button>" +
        "</nut-col>" +
        "<h3 style='padding-top: 10px;padding-bottom: 10px;'>本周未完成的任务</h3>" +
        "<nut-col v-for='(task,index) in tasks' style='border-top:2px solid #eee;'>" +
        "<nut-row v-if='task.actual < task.estimate'>" +
        "<nut-col>" +
        "<p>任务内容：{{task.content}} </p><p>剩余工作量：{{task.estimate - task.actual}}</p> " +
        "</nut-col>" +
        "</nut-row>" +
        "</nut-col>" +
        "<h3 style='padding-top: 10px;padding-bottom: 10px;'>下周的新任务</h3>" +
        "<nut-col  v-for=\"(task, index) in nextweek\">" +
        "            <div>\n" +
        "                <p>任务内容：{{task.content}}</p>\n" +
        "                <p>预计工作量：{{task.estimate}}</p>\n" +
        "            </div>\n" +

        "    <nut-leftslip ref=\"leftslip\" style='border-top:5px solid #eee;'>\n" +
        "        <div slot=\"slip-main\" class=\"slip-main\">\n" +
        "        </div>\n" +
        "        <div slot=\"slipbtns\" class=\"slipbtns\">" +
        "<a href=\"javascript:;\" @click=\"delNextweek(index)\">删除</a>" +
        "</div>\n" +
        "    </nut-leftslip>\n" +
        "</nut-col>" +
        "</nut-row>" +
        "</nut-tab-panel>\n" +
        "    <nut-tab-panel tab-title=\"生成本周周报\">" +
        "<nut-row type=\"flex\" flexWrap=\"wrap\" :gutter=\"10\" justify=\"center\" align=\"center\">" +
        "<nut-col>" +
        "<h2>周报</h2>" +
        "<p>时间：{{date.year}}-{{date.month+1}}-{{date.day}}</p>" +
        "<h3>本周小结</h3>" +
        "<p>本周原定计划工作量为{{sum.estimate}}，已完成的工作量{{sum.actual}}，完成的比例为{{sum.progress}}%。</p>" +
        "<p v-if='sum.progress===100'>本周任务全部完成，下周将开始{{nextweek.length}}个新任务。</p>" +
        "<p v-else>下周将继续进行本周仍未完成的任务，并完成{{nextweek.length}}个新任务。</p>" +
        "<h3>本周已完成的任务</h3>" +
        "<div v-for='(task,index) in tasks'>" +
        "<p v-if='task.estimate === task.actual'>{{task.content}}</p>" +
        "</div>" +
        "<h3>本周未完成的任务</h3>" +
        "<div v-for='(task,index) in tasks'>" +
        "<p v-if='task.estimate > task.actual'>{{task.content}} 剩余工作量：{{task.estimate - task.actual}}</p>" +
        "</div>" +
        "<h3>下周要完成的新任务</h3>" +
        "<div v-for='(task,index) in nextweek'>" +
        "<p>{{task.content}} 预计工作量：{{task.estimate}}</p>" +
        "</div>" +
        "</nut-col>" +
        "<nut-button \n" +
        "  @click=\"changeToNextWeek\"\n" +
        "  type=\"actived\" " +
        "  icon=\"tick\" " +
        "  align='center'" +
        ">\n" +
        "  朕已阅，开始下一周\n" +
        "</nut-button>" +
        "</nut-row>" +
        "</nut-tab-panel>\n" +
        "</nut-tab>",
    watch:{},
    methods:{
        tabSwitch:function(index,event){
            console.log(index+'--'+event);
        },
        addNewTask(){
            if(this.newTaskTime<=0){
                this.$toast.text('工作量不能为0！');
                return;
            }
            if(this.newTaskContent===""){
                this.$toast.text('工作内容不能为空！');
                return;
            }
            this.tasks.push({
                estimate:this.newTaskTime,
                actual:0,
                percentage:0,
                content:this.newTaskContent
            });
            setLocalCache("weektasks",this.tasks);
            this.newTaskTime = 0;
            this.newTaskContent = "";
            this.sum = getSum();
            this.$toast.success("本周任务添加成功！");
        },
        addNextTask(){
            if(this.newTaskTime<=0){
                this.$toast.text('工作量不能为0！');
                return;
            }
            if(this.newTaskContent===""){
                this.$toast.text('工作内容不能为空！');
                return;
            }
            this.nextweek.push({
                estimate:this.newTaskTime,
                actual:0,
                percentage:0,
                content:this.newTaskContent
            });
            setLocalCache("nextweektasks",this.nextweek);
            this.newTaskTime = 0;
            this.newTaskContent = "";
            this.$toast.success("下周任务添加成功！");
        },
        changeToNextWeek(){
            let next = this.nextweek;
            for(let task of this.tasks){
                if(task.estimate > task.actual)next.push(task);
            }
            setLocalCache("nextweektasks",[]);
            setLocalCache("weektasks",next);
            window.location.href = "/";
        },
        changeLoad(index){
            this.tasks[index].actual = parseInt(this.tasks[index].actual);
            this.tasks[index].estimate = parseInt(this.tasks[index].estimate);
            this.tasks[index].percentage=Math.floor(100*this.tasks[index].actual/this.tasks[index].estimate);
            setLocalCache("weektasks",this.tasks);
            this.sum = getSum();
        },
        delNextweek(index){
            this.nextweek.splice(index,1);
            setLocalCache("nextweektasks",this.nextweek);
        }
    },
    data(){
        return {
            tasks:tasks,
            nextweek:nextweek,
            sum:getSum(),
            newTaskTime:0,
            newTaskContent:"",
            date:getDate()
        }
    }
};

export default options;