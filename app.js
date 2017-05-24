import Vue from 'vue';
import app from './src/components/app.vue';

import reset from './src/style/_reset.css';

import router from './src/router';
import store from './src/store';

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
