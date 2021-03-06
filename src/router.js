import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

import createResume from '../src/components/createResume.vue';
// import resumeTemplate from '../src/components/resumeTemplate.vue';
import personalCenter from '../src/components/personalCenter.vue';



var router = new VueRouter({
    routes:[

        {
            name: 'create',
            path:'/create_resume/:resumeID',
            component: createResume,
            props: true
        },
        {
            name: 'generate',
            path:'/generate_resume/:resumeName',
            props: true,
            component: (resolve)=>{
                require.ensure(['../src/components/resumeTemplate.vue'], ()=>{
                    resolve(require('../src/components/resumeTemplate.vue'));
                },'resume-template')
            },

        },
        {
            name:'homepage',
            path: '/',
            component: personalCenter
        }
    ]
});

export default router;

