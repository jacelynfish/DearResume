<template>
    <div>
        <resume-template resumeName="r1"></resume-template>
        <router-link :to="{ name:'create' }">create</router-link>
        <router-view></router-view>
    </div>
</template>
<script>
    import resumeTemplate from './resumeTemplate.vue';

    import {mapGetters, mapMutations} from 'vuex';
    export default{
        data : function(){
            return {}
        },
        components:{
            resumeTemplate
        },
        computed:{

        },
        mounted (){

        }

    }
</script>