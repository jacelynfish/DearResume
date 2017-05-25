import Vue from 'vue';
var VueMaterial = require('vue-material');
import app from './src/components/app.vue';

import reset from './src/style/_reset.css';
import materialcss from './node_modules/vue-material/dist/vue-material.css';

import router from './src/router';
import store from './src/store';

Vue.use(VueMaterial);

var eventHub = new Vue();

Vue.mixin({
    data: function(){
        return {
            eventHub: eventHub
        }
    },
});

new Vue({
    el: '#app',
    template:`
        <app></app>
    `,
    components:{
        app
    },
    router,
    store

})
