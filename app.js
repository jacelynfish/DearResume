import Vue from 'vue';
var VueMaterial = require('vue-material');
import app from './src/components/app.vue';

import reset from './src/style/_reset.css';
import materialcss from './node_modules/vue-material/dist/vue-material.css';

import router from './src/router';
import store from './src/store';



Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
    primary: 'teal',
    accent: 'white',
    warn: 'red',
    background: 'white'
})

var eventHub = new Vue();

Vue.mixin({
    data: function(){
        return {
            eventHub: eventHub
        }
    },
    methods:{
        toggleLeftSidenav() {
            this.$refs.leftSidenav.toggle();
        },
        toggleRightSidenav() {
            this.$refs.rightSidenav.toggle();
        },
        closeRightSidenav() {
            this.$refs.rightSidenav.close();
        },
        open(ref) {
            console.log('Opened: ' + ref);
        },
        close(ref) {
            console.log('Closed: ' + ref);
        }
    }
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
