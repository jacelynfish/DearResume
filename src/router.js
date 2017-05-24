import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

import createResume from '../src/components/createResume.vue';

var router = new VueRouter({
    routes:[
        {
            name: 'create',
            path:'/create_resume',
            component: createResume
        }
    ]
});

export default router;

