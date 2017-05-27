<style lang="sass" >
    .bottom-toolbar-title{
        font-family: "American Typewriter", "Courier New", serif;
        font-size: 2.6em;
        line-height: 1.5;
    }

    #welcome-header{
        position: relative;
        height: 100vh;
        width: 100vw;
        box-sizing: border-box;
        z-index: 1000;
        overflow: hidden;
        text-align: center;

    }
    #welcome-header.welcomeHeaderActive{
        transition: height 0.6s;
        position: relative;
        height: 30vh;
    }
    #welcome-container{
        transition: all 0.6s;
        display: flex;
        height: calc(100vh - 32px);
        box-sizing: border-box;
        flex-direction: column;
        justify-content: center;


    }
    #welcome-container.welcomeContainerActive{
        transition: all 0.6s;
        height: 30vh;
        justify-content: flex-start;
        >div{
                width: 100%;
          }
     }
    #welcome-container.welcomeContainerActive div:first-child{
         width: 100%;
     }
    #add-resume-btn{
        transition: all 0.6s;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

    }

    #add-resume-btn:hover{
        transition: all 0.6s;
         top: 0%;
        transform: translate(-50%, -75%);
     }

    .toolbar-leave-active{
        transition: all 0.3s;
    }
    .toolbar-leave-to{

        height: 0px;

    }

    .v-enter{
        opacity: 0;
    }
    .v-enter-active{
        transition: all 0.3s;
    }

    input.md-input:focus{
        border-bottom: none !important;
        box-shadow: none !important;
    }



</style>
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

        <md-dialog-prompt
            md-title="添加简历"
            md-ok-text="确认"
            md-cancel-text="取消"
            @close="onAddResumeClose"
            v-model="newTitle"
            md-input-maxlength="40"
            md-input-placeholder="请输入简历名称"
            ref="add-prompt-dialog">
    </md-dialog-prompt>

        <md-dialog-prompt
                md-title="重命名简历"
                md-ok-text="确认"
                md-cancel-text="取消"
                @close="onRenameResumeClose"
                v-model="renameName"
                md-input-maxlength="40"
                md-input-placeholder="请输入简历名称"
                ref="rename-prompt-dialog">
        </md-dialog-prompt>


        <div id="welcome-header" :class="{ 'welcomeHeaderActive': listActive, 'md-whiteframe-4dp': listActive}">


            <md-whiteframe md-tag="md-toolbar" md-elevation="0" :class='["md-large", { welcomeContainerActive: listActive}]' id="welcome-container">

                <transition>
                    <md-toolbar class="md-primary" v-if="listActive">
                        <md-button class="md-icon-button" @click.native="$refs.sidenav.toggle()">
                            <md-icon>menu</md-icon>
                        </md-button>

                        <span style="flex: 1"></span>

                        <md-button class="md-icon-button md-raised"
                                   @click.native="openDialog('add-prompt-dialog')">
                            <md-icon>add</md-icon>
                        </md-button>
                    </md-toolbar>
                </transition>

                <div>
                    <h1 class="bottom-toolbar-title" > &lt;Dear Resume /&gt; </h1>
                    <span class="md-subheading">为互联网从业人员量身打造的简历生成器</span>
                </div>
            </md-whiteframe>

            <div v-if="!listActive">
                <md-toolbar class="md-primary" id="add-tool-bar" >
                    <md-button
                            v-on:click.native="activateList"
                            :class='["md-fab md-large", { addResumeBtnActive: listActive}]'
                            id="add-resume-btn">
                        <md-icon>add</md-icon>
                    </md-button>
                </md-toolbar>
            </div>

        </div>



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
                            <span>重命名简历</span>
                            <md-button class="md-icon-button md-list-action" @click.native="renameResume(ritem)">
                                <md-icon>autorenew</md-icon>
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
                newTitle:'',
                renameName: '',
                renameID:'',
                curDelIdx: -1,
                confirm:{
                    content:'',
                }
            }
        },
        mounted(){
          this.eventHub.$on('delConfirmChanged', this.delConfirmChanged);
          this.eventHub.$on('addPromptChanged', this.addPromptChanged);
            this.eventHub.$on('renamePromptChanged', this.renamePromptChanged);
        },
        methods:{
            ...mapMutations(['addNewResume','delResume',
                'newNameResume','setListActive']),
            activateList(){
                this.setListActive();
            },
            delResumeItem(idx){

                this.curDelIdx = idx;
                this.confirm.content = `请问您是否确认删除简历"${this.resumeData[this.resumeList[idx]].resumeName}"?`
                this.openDialog('del-confirm-dialog');

            },
            editResume(resumeID){
                this.$router.push({name:'create', params: {resumeID: resumeID}})
            },
            renameResume(resumeID){
                this.renameID = resumeID;
                this.openDialog('rename-prompt-dialog');
            },
            renamePromptChanged(result){
                if(result){
                    this.newNameResume({
                        id: this.renameID,
                        newName: this.renameName
                    })
                }
            },
            delConfirmChanged(result){
                if(result){
                    this.delResume({
                        idx: this.curDelIdx
                    })
                }
            },
            addPromptChanged(result){
                if(result){
                    this.addNewResume({
                        newID: (new Date()).valueOf().toString(),
                        newName: this.newTitle
                    })
                }
            }
        },
        computed:{
            ...mapGetters({
                resumeList: 'getResumeList',
                resumeData: 'getResume',
                listActive: 'getListActive'
            })
        }
    }
</script>