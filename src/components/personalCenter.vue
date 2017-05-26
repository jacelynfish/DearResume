<template>
    <div id="personal-center-container">
        <md-dialog-confirm
                md-title="删除简历"
                :md-content-html="confirm.content"
                md-content="hi"
                md-ok-text="确认删除"
                md-cancel-text="再看看"
                @close="onDialogClose"
                ref="del-confirm-dialog">
        </md-dialog-confirm>


            <md-list>
                <md-list-item v-for="(ritem, index) in resumeList" :key="index">
                    <md-icon>move_to_inbox</md-icon>
                    <span>{{resumeData[ritem].resumeName}}</span>

                    <md-list-expand>
                        <md-list>
                            <md-list-item class="md-inset">
                                <span>编辑简历</span>
                                <md-button class="md-icon-button md-list-action" @click.native="editResume(ritem)">
                                    <md-icon>edit</md-icon>
                                </md-button>
                            </md-list-item>
                            <md-list-item class="md-inset">
                                <span>删除简历</span>
                                <md-button class="md-warning md-icon-button md-list-action" @click.native="delResumeItem(index)">
                                    <md-icon>close</md-icon>
                                </md-button>
                            </md-list-item>

                        </md-list>
                    </md-list-expand>
                </md-list-item>

            </md-list>

    </div>
</template>
<script>
    import {mapGetters, mapMutations} from 'vuex'
    export default{
        data: function(){
            return {
                curDelIdx: -1,
                confirm:{
                    content:'',
                    ok:'',
                    cancel:''
                }
            }
        },
        mounted(){
          this.eventHub.$on('delConfirmChanged', this.delConfirmChanged);
        },
        methods:{
            ...mapMutations(['addNewResume','delResume']),
            delResumeItem(idx){

                this.curDelIdx = idx;
                this.confirm.content = `请问您是否确认删除简历"${this.resumeData[this.resumeList[idx]].resumeName}"?`
                this.openDialog('del-confirm-dialog');

            },
            editResume(resumeID){
                this.$router.push({name:'create', params: {resumeID: resumeID}})
            },
            delConfirmChanged(result){
                if(result){
                    this.delResume({
                        idx: this.curDelIdx
                    })
                }
            }
        },
        computed:{
            ...mapGetters({
                resumeList: 'getResumeList',
                resumeData: 'getResume'
            })
        }
    }
</script>