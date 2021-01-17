let tasks = getLocalCache("weektasks");
let count = 0;
for(let task of tasks){
    if(task.estimate > task.actual)count++;
    console.log(count);
}
let weeklyreport = {
    'tabTitle':'周报',
    'curr':false,
    'icon':'./svg/clipboard.svg',
    'activeIcon':'./svg/clipboard-active.svg',
    'href':'',
    'page':'weekly-report'
};
if(count>0)weeklyreport['num']=count;
export default {
    template: '<nut-tabbar \n' +
        `  @tab-switch="tabSwitch" ` +
        '  :tabbar-list="tabList" \n' +
        '  :bottom="true"\n' +
        '>\n' +
        '</nut-tabbar>',
    data() {
        return {
            tabList:[
                {
                    'tabTitle':'日程',
                    'curr':true,
                    'icon':'./svg/calendar.svg',
                    'activeIcon':'./svg/calendar-active.svg',
                    'href':'',
                    'page':'schedule'
                },
                {
                    'tabTitle':'天气',
                    'curr':false,
                    'icon':'./svg/sun.svg',
                    'activeIcon':'./svg/sun.svg',
                    'href':'',
                    'page':'weather'
                },
                weeklyreport,
                {
                    'tabTitle':'日记',
                    'curr':false,
                    'icon':'./svg/book.svg',
                    'activeIcon':'./svg/book-active.svg',
                    'href':'',
                    'page':'diary'
                },
            ]
        };
    },
    methods: {
        tabSwitch: function (value, index) {
            this.$emit('on-switch',value.page);
        }
    }
}