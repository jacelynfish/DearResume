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
        //for swiper
        toggleLeftSidenav() {
            this.$refs.leftSidenav.toggle();
        },
        toggleRightSidenav() {
            this.$refs.rightSidenav.toggle();
        },
        closeRightSidenav() {
            this.$refs.rightSidenav.close();
        },

        //for dialog
        openDialog(ref) {
            this.$refs[ref].open();
        },
        closeDialog(ref) {
            this.$refs[ref].close();
        },
        onDialogClose(type){
            if(type == 'ok'){

                this.eventHub.$emit('delConfirmChanged', true);
            }else{
                this.eventHub.$emit('delConfirmChanged', false);
            }
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
