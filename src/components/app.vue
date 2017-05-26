<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
    import resumeTemplate from './resumeTemplate.vue';
    import personalCenter from './personalCenter.vue';

    import {mapGetters, mapMutations} from 'vuex';
    export default{
        data : function(){
            return {}
        },
        components:{
            resumeTemplate,
            personalCenter
        },
        computed:{

        },
        mounted (){

        }

    }
</script>