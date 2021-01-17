import Vue from "vue";
import SchedulePage from "./SchedulePage"
import WeatherPage from "./WeatherPage"
import MinusSchedulePage from "./MinusSchedulePage"
import PlusSchedulePage from "./PlusSchedulePage"
import WeeklyReportPage from "./WeeklyReportPage"
import DiaryPage from "./DiaryPage"
function Register(page){
    switch (page) {
        case "schedule":
            Vue.component("tt-main",SchedulePage);
            break;
        case "weather":
            Vue.component("tt-main",WeatherPage);
            break;
        case "schedule-minus":
            Vue.component("tt-main",MinusSchedulePage);
            break;
        case "schedule-plus":
            Vue.component("tt-main",PlusSchedulePage);
            break;
        case "weekly-report":
            Vue.component("tt-main",WeeklyReportPage);
            break;
        case "diary":
            Vue.component("tt-main",DiaryPage);
            break;
        default:break;
    }
}
export {
    Register,
}