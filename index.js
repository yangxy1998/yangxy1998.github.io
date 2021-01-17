import Vue from "vue";
import NutUI from '@nutui/nutui';
import * as Components from "./components"
import * as Pages from "./pages"
NutUI.install(Vue);
Vue.use(NutUI);
Components.Register();
Pages.Register("schedule");
var app = new Vue({
    el: '#app',
    template: '<div>' +
        '<tt-main @switch-page="changePage($event)"></tt-main>' +
        '<tt-footer @on-switch="changePage($event)"></tt-footer>' +
        '</div>'
    ,
    watch:{
        page: function () {
            Pages.Register(this.page);
            this.$forceUpdate();
        }
    },
    data(){
        return {
            page:"schedule"
        }
    },
    methods:{
        changePage:function(event){
            this.page = event;
        }
    }
});



