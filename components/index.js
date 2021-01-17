import Vue from "vue";
import Footer from "./Footer"
import ScheduleTag from "./ScheduleTag"
function Register(){
    Vue.component("tt-footer",Footer);
    Vue.component("schedule-tag",ScheduleTag);
}
export {
    Register,
}