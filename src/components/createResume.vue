<style lang="sass">
    .editor-item{
        margin-top: 1em;

        &:first-child{
             margin-top: 64px;
         }
        @each $item in edu, intern, proj, com, skill, demo{
            & .#{$item}-item{

                margin: 0px;
            }
            & .#{$item}-item:before{
                display:none;
            }
        }
    }

    .basic-item  .sidebar-item{
        padding: 0;
    }
    .basic-item {
        .sidebar-item{
             .sidebar-title{
                  color: #555;
              }
             span{
                  color: #555;
             }
        }
        .sidebar-contact-item:before{
            display: none;
        }
        .sidebar-contact-item{
            margin-left: 20px ;

        }
    }
    #editor-container{
        padding: 0 1em;
        background-color: #eeeeee;

    }

    #editor-choice{
        padding: 1em;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

    }
    .md-theme-default.md-sidenav .md-sidenav-content{
        position: fixed;
        height: 100vh;
    }
    #editor-toolbar.md-toolbar{
        position: fixed;
        top:0px;
        left:0px;
        right: 0px;
        z-index: 10000;
    }
    .skill-tab{
        background-color: white;
    }
    .editing-panel {
        display: flex;
        flex-direction: column;
        align-items: center;

        @each $item in edu, intern, proj, com, skill, demo {
            & .#{$item}-edit-item {
                width: 100%;
                margin: 0px;
            }
        }
    }
    .md-card .md-card-header .md-card-header-text{
        margin-left: 1em;
    }
    .md-card-media img{
        height: 100%;
    }

</style>
<template>
    <div id="resume-editor">
        <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog1">
            <md-dialog-title>Dear Resume</md-dialog-title>

            <md-dialog-content>{{dialog1Content}}</md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click.native="closeDialog('dialog1')">Cancel</md-button>
                <md-button class="md-primary" @click.native="closeDialog('dialog1')">Ok</md-button>
            </md-dialog-actions>
        </md-dialog>

        <md-toolbar class="md-primary" id="editor-toolbar">
            <router-link class="md-icon-button" :to="{ name:'homepage'}">
                <md-icon>arrow_back</md-icon>
            </router-link>

            <h2 class="md-title editor-title" style="flex: 1">{{resume.resumeName}}</h2>

            <router-link class="md-raised" :to="{ name:'generate', params: { resumeName: resumeID}}">生成简历</router-link>


            <md-button class="md-icon-button" @click.native="toggleRightSidenav">
                <md-icon>menu</md-icon>
            </md-button>

        </md-toolbar>

        <md-sidenav class="md-right" ref="rightSidenav">
            <md-toolbar>
                <div class="md-toolbar-container">
                    <h3 class="md-title">Sidenav content</h3>
                </div>
            </md-toolbar>

            <div id="editor-choice">
                <md-checkbox v-for="(choice, idx) of Object.keys(moduleSelect)"
                             :key="idx" name="moduleSelect"
                             v-model="moduleSelect[choice].status"
                             class="md-primary"
                             @input="moduleStatusChanged(choice, idx)">{{moduleSelect[choice].name}}</md-checkbox>
            </div>

        </md-sidenav>



        <div id="editor-container">

            <!-------------------Basic 基本情况------------------->

            <div class="editor-item" id="basic-editor">
                <md-toolbar class="md-accent editor-item-title">
                    <h3 class="md-title" style="flex: 1">基本情况</h3>
                    <md-button :class="['md-fab md-mini', {'md-warn': moduleSelect.isBasic.isEditing, 'md-primary': !moduleSelect.isBasic.isEditing}]"
                               @click.native="editBtnClicked($event, moduleSelect.isBasic.isEditing, 'isBasic', 0)">
                        <md-icon v-if="moduleSelect.isBasic.isEditing">save</md-icon>
                        <md-icon v-if="!moduleSelect.isBasic.isEditing">edit</md-icon>
                    </md-button>
                </md-toolbar>

                <md-card class="basic-item" v-if="!moduleSelect.isBasic.isEditing">
                <md-card-header>
                    <md-card-media>
                        <img :src="resume.iconURL == undefined? 'data:image/png;base64,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':resume.iconURL" alt="me">
                    </md-card-media>

                    <md-card-header-text>
                        <div class="md-title">{{resume.name}} {{resume.enName}}</div>
                        <div class="md-subhead">{{resume.brief}}</div>
                    </md-card-header-text>
                </md-card-header>

                <md-card-content>
                    <div class="sidebar-item">

                        <div class="sidebar-contact-item">
                            <span>电话：{{resume.contact.phone}}</span>
                        </div>
                        <div class="sidebar-contact-item">
                            <span>邮箱：{{resume.contact.email}}</span>
                        </div>
                        <div class="sidebar-contact-item">
                            <span><em>GitHub</em>: {{resume.contact.page}}</span>
                        </div>
                    </div>
                </md-card-content>
            </md-card>

                <div class="editing-panel" v-if="moduleSelect.isBasic.isEditing">

                    <md-card md-with-hover class="edu-edit-item">
                        <md-card-content>

                            <div class="row">
                                <div class="file-field input-field">
                                    <div class="btn">
                                        <span>头像</span>
                                        <input type="file" @change="showFile($event)">
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input class="file-path validate" placeholder="请上传大小不超过80K的图片格式文件~" type="text">
                                    </div>

                                </div>
                            </div>

                            <div class="row">
                                <div class="input-field col s12 m6">
                                    <input type="text" v-model="backupResume.name" >
                                    <label class="active">姓名</label>
                                </div>
                                <div class="input-field col s12 m6">
                                    <input type="text" v-model="backupResume.enName" >
                                    <label class="active">英文名</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="input-field col s12">
                                    <input type="text" v-model="backupResume.brief" placeholder="Front-end Developer">
                                    <label class="active">职业</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="input-field col s12 m4">
                                    <i class="material-icons prefix">phone</i>
                                    <input type="text" v-model="backupResume.contact.phone" placeholder="请输入您的常用手机号码">
                                    <label class="active">电话</label>
                                </div>
                                <div class="input-field col s12 m4">
                                    <i class="material-icons prefix">email</i>
                                    <input type="text" v-model="backupResume.contact.email" placeholder="请输入您的常用邮箱">
                                    <label class="active">邮箱</label>
                                </div>
                                <div class="input-field col s12 m4">
                                    <i class="material-icons prefix">link</i>
                                    <input type="text" v-model="backupResume.contact.page" placeholder="请输入您的GitHub主页">
                                    <label class="active">GitHub</label>
                                </div>
                            </div>

                        </md-card-content>
                    </md-card>

                </div>
            </div>





            <!-------------------Education 教育背景------------------->


            <div class="editor-item" id="edu-editor" v-if="moduleSelect.isEducation.status">

                <md-toolbar class="md-accent editor-item-title">
                    <h3 class="md-title" style="flex: 1">教育背景</h3>
                    <md-button :class="['md-fab md-mini', {'md-warn': moduleSelect.isEducation.isEditing, 'md-primary': !moduleSelect.isEducation.isEditing}]"
                               @click.native="editBtnClicked($event, moduleSelect.isEducation.isEditing, 'isEducation', 1)">
                        <md-icon v-if="moduleSelect.isEducation.isEditing">save</md-icon>
                        <md-icon v-if="!moduleSelect.isEducation.isEditing">edit</md-icon>

                    </md-button>
                </md-toolbar>


                <md-card class="edu-item" :key="index" v-for="(eduitem, index) in resume.eduExperience.data" v-if="!moduleSelect.isEducation.isEditing">
                    <md-card-content>
                        <div class="edu-item-basic">
                            <span class="edu-school">{{eduitem.school}}</span>
                            <span class="edu-degree">{{eduitem.degree}}</span>
                            <span class="edu-gpa">GPA: {{eduitem.gpa}}</span>
                            <span class="edu-duration">{{eduitem.enrollYear}} - {{eduitem.eduYear}}</span>
                        </div>
                        <div class="edu-item-faculty">{{eduitem.faculty}} {{eduitem.major}}</div>
                        <div class="edu-item-des">{{eduitem.courses}}</div>
                        <ul class="edu-item-des" v-if="eduitem.description.length">
                            <li v-for="honor in eduitem.description">{{honor}}</li>
                        </ul>
                    </md-card-content>

                </md-card>

                <div class="editing-panel" v-if="moduleSelect.isEducation.isEditing">


                        <md-card md-with-hover class="edu-edit-item" v-for="(eduitem, index) in backupResume.eduExperience.data" :key="index">
                            <md-card-content>

                                <div class="row">
                                    <div class="input-field col s12 m6">
                                        <input type="text" v-model="eduitem.school" id="edu-edit-school">
                                        <label class="active" for="edu-edit-school">学校</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <md-input-container >
                                            <label>教育程度</label>
                                            <md-select v-model="eduitem.degree" name="degree">
                                                <md-option value="高中">高中</md-option>
                                                <md-option value="学士">学士</md-option>
                                                <md-option value="硕士">硕士</md-option>
                                                <md-option value="博士">博士</md-option>
                                            </md-select>

                                        </md-input-container>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="input-field col s12 m6">
                                        <input type="text" v-model="eduitem.faculty"
                                               id="edu-edit-faculty" placeholder="计算机学院">
                                        <label class="active" for="edu-edit-faculty">学院</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <input type="text"  v-model="eduitem.major"
                                               id="edu-edit-major" placeholder="软件技术应用专业">
                                        <label class="active" for="edu-edit-major">专业</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12 m2">
                                        <input v-model="eduitem.gpa" id="edu-edit-gpa"
                                               placeholder="3.5/4.0">
                                        <label class="active" for="edu-edit-gpa">GPA</label>
                                    </div>
                                    <div class="input-field col s6 m5">
                                        <input class="datepicker" type="date" v-model="eduitem.enrollYear" id="edu-edit-enrollYear">
                                        <label class="active" for="edu-edit-enrollYear">入学日期</label>
                                    </div>

                                    <div class="input-field col s6 m5">
                                        <input class="datepicker" type="date" v-model="eduitem.eduYear" id="edu-edit-eduYear">
                                        <label class="active" for="edu-edit-eduYear">毕业日期</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                <textarea class="materialize-textarea"
                                          v-model="eduitem.courses"
                                          id="edu-edit-courses"
                                          placeholder="数据结构与算法、计算机网络"></textarea>
                                        <label class="active" for="edu-edit-courses">主修课程</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">

                                <textarea class="materialize-textarea"
                                          @change="modifyDes($event, index, 'eduExperience')"
                                          placeholder="请一行描写一个荣誉奖励，以回车分行">{{eduitem.description.join('\n')}}</textarea>
                                        <label class="active" >荣誉奖励</label>
                                    </div>
                                </div>

                            </md-card-content>
                            <md-card-actions>
                                <md-button class="md-warn" @click.native="delItem('eduExperience', index)">删除</md-button>
                            </md-card-actions>
                        </md-card>


                    <md-button class=" md-raised" @click.native="addItem('eduExperience', 1)">添加教育经历</md-button>
                </div>
            </div>





            <!-------------------Internship 实习经历------------------->


            <div class="editor-item" id="intern-editor" v-if="moduleSelect.isInternship.status">
                <md-toolbar class="md-accent editor-item-title">
                    <h3 class="md-title" style="flex: 1">实习经历</h3>
                    <md-button :class="['md-fab md-mini', {'md-warn': moduleSelect.isInternship.isEditing, 'md-primary': !moduleSelect.isInternship.isEditing}]"
                               @click.native="editBtnClicked($event, moduleSelect.isInternship.isEditing, 'isInternship', 2)">
                        <md-icon v-if="moduleSelect.isInternship.isEditing">save</md-icon>
                        <md-icon v-if="!moduleSelect.isInternship.isEditing">edit</md-icon>

                    </md-button>
                </md-toolbar>

                <md-card class="intern-item"
                     v-for="(internitem, index) in resume.internExperience.data"
                     v-if="!moduleSelect.isInternship.isEditing"
                    :key="index">
                    <md-card-content>
                        <div class="intern-item-basic">
                            <span class="intern-company">{{internitem.company}}</span>
                            <span class="intern-location">{{internitem.location}}</span>
                            <span class="intern-duration">{{internitem.startDate}} - {{internitem.endDate}}</span>
                        </div>
                        <div class="intern-item-job">{{internitem.job}}</div>
                        <ul class="intern-item-des">
                            <li class="intern-des-item" v-for="des in internitem.description">
                                <em>{{des.keyword}}</em>{{des.detail}}
                            </li>

                        </ul>
                    </md-card-content>

                </md-card>

                <div class="editing-panel" v-if="moduleSelect.isInternship.isEditing">

                        <md-card md-with-hover class="intern-edit-item" v-for="(internitem, index) in backupResume.internExperience.data" :key="index">
                            <md-card-content>
                                <div class="row">
                                    <div class="input-field col s12 m6">
                                        <input type="text" v-model="internitem.company" id="intern-edit-company">
                                        <label class="active" for="intern-edit-company">公司</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <input type="text"
                                               v-model="internitem.job"
                                               id="intern-edit-job"
                                               placeholder="机器学习工程师">
                                        <label class="active" for="intern-edit-job">职务</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12 m2">
                                        <input v-model="internitem.location" id="intern-edit-localtion"
                                               placeholder="广州">
                                        <label class="active" for="intern-edit-localtion">地点</label>
                                    </div>
                                    <div class="input-field col s6 m5">
                                        <input class="datepicker" type="date" v-model="internitem.startDate" id="intern-edit-startDate">
                                        <label class="active" for="intern-edit-startDate">入职日期</label>
                                    </div>

                                    <div class="input-field col s6 m5">
                                        <input class="datepicker" type="date" v-model="internitem.endDate" id="intern-edit-endDate">
                                        <label class="active" for="intern-edit-endDate">离职日期</label>
                                    </div>
                                </div>
                                <div class="row" v-for="(desitem, desidx) in internitem.description">
                                    <div class="col s1" @click="delDes(index, desidx, 'internExperience')">
                                        <i class="material-icons">close</i>
                                    </div>
                                    <div class="input-field col s3">
                                        <input v-model="desitem.keyword" placeholder="职务描述">
                                    </div>
                                    <div class="input-field col s8">
                                        <input v-model="desitem.detail" placeholder="职务详情">
                                    </div>
                                </div>
                                <md-button class="md-primary" @click.native="addDes(index, 'internExperience')">添加描述</md-button>

                            </md-card-content>
                            <md-card-actions>
                                <md-button class="md-warn" @click.native="delItem('internExperience', index)">删除</md-button>

                            </md-card-actions>
                        </md-card>

                    <md-button class="md-raised" @click.native="addItem('internExperience', 2)">添加实习经历</md-button>
                </div>
            </div>





            <!-------------------Project 项目经历------------------->


            <div class="editor-item" id="proj-editor" v-if="moduleSelect.isProject.status">

                <md-toolbar class="md-accent editor-item-title">
                    <h3 class="md-title" style="flex: 1">校园/项目经历</h3>
                    <md-button :class="['md-fab md-mini', {'md-warn': moduleSelect.isProject.isEditing, 'md-primary': !moduleSelect.isProject.isEditing}]"
                               @click.native="editBtnClicked($event, moduleSelect.isProject.isEditing, 'isProject', 3)">
                        <md-icon v-if="moduleSelect.isProject.isEditing">save</md-icon>
                        <md-icon v-if="!moduleSelect.isProject.isEditing">edit</md-icon>

                    </md-button>
                </md-toolbar>

                <md-card class="proj-item"
                     v-for="(projitem, index) in resume.projectExperience.data"
                    v-if="!moduleSelect.isProject.isEditing"
                    :key="index">
                    <md-card-content>
                        <div class="proj-item-basic">
                            <span class="proj-name">{{projitem.name}}</span>
                            <span class="proj-location">{{projitem.location}}</span>
                            <span class="proj-duration">{{projitem.startDate}} - {{projitem.endDate}}</span>
                        </div>
                        <div class="proj-item-job">{{projitem.job}}</div>
                        <ul class="proj-item-des">
                            <li class="proj-des-item" v-for="des in projitem.description">{{des}}</li>
                        </ul>
                    </md-card-content>
                </md-card>

                <div class="editing-panel" v-if="moduleSelect.isProject.isEditing">
                        <md-card class="edu-edit-item" v-for="(projectitem, index) in backupResume.projectExperience.data" :key="index">
                            <md-card-content>
                                <div class="row">
                                    <div class="input-field col s12 m6">
                                        <input type="text" v-model="projectitem.name" id="project-edit-name">
                                        <label class="active" for="project-edit-name">项目名称</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <input type="text"
                                               v-model="projectitem.job"
                                               id="project-edit-job"
                                               placeholder="机器学习工程师">
                                        <label class="active" for="project-edit-job">职务</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12 m2">
                                        <input v-model="projectitem.location" id="project-edit-localtion"
                                               placeholder="广州">
                                        <label class="active" for="project-edit-localtion">地点</label>
                                    </div>
                                    <div class="input-field col s6 m5">
                                        <input class="datepicker" type="date" v-model="projectitem.startDate" id="project-edit-startDate">
                                        <label class="active" for="project-edit-startDate">开始日期</label>
                                    </div>

                                    <div class="input-field col s6 m5">
                                        <input class="datepicker" type="date" v-model="projectitem.endDate" id="project-edit-endDate">
                                        <label class="active" for="project-edit-endDate">结束日期</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                    <textarea class="materialize-textarea"
                                          @change="modifyDes($event, index,'projectExperience')"
                                          placeholder="每行一个描述，以回车分行">{{projectitem.description.join('\n')}}</textarea>
                                        <label class="active" >项目详情</label>
                                    </div>
                                </div>
                            </md-card-content>
                            <md-card-actions>
                                <md-button class="md-warn" @click.native="delItem('projectExperience', index)">删除</md-button>
                            </md-card-actions>
                        </md-card>



                    <md-button class="md-raised" @click.native="addItem('projectExperience', 3)">添加实习经历</md-button>
                </div>

            </div>





            <!-------------------Competition 比赛经历------------------->


            <div class="editor-item" id="competition-editor" v-if="moduleSelect.isCompetition.status">

                <md-toolbar class="md-accent editor-item-title">
                    <h3 class="md-title" style="flex: 1">比赛经历</h3>
                    <md-button :class="['md-fab md-mini', {'md-warn': moduleSelect.isCompetition.isEditing, 'md-primary': !moduleSelect.isCompetition.isEditing}]"
                               @click.native="editBtnClicked($event, moduleSelect.isCompetition.isEditing, 'isCompetition', 4)">
                        <md-icon v-if="moduleSelect.isCompetition.isEditing">save</md-icon>
                        <md-icon v-if="!moduleSelect.isCompetition.isEditing">edit</md-icon>

                    </md-button>
                </md-toolbar>
                <md-card class="com-item"
                     v-for="(com,index) in resume.competitionExperience.data"
                     v-if="!moduleSelect.isCompetition.isEditing" :key="index">
                    <md-card-content>
                        <div class="com-item-basic">
                            <span class="com-name">{{com.name}}</span>
                            <span class="com-duration">{{com.date}}</span>
                        </div>
                        <div class="com-item-honor">{{com.honor}}</div>
                        <div class="com-item-des">{{com.description}}</div>
                    </md-card-content>

                </md-card>

                <div class="editing-panel" v-if="moduleSelect.isCompetition.isEditing">
                        <md-card class="com-edit-item" v-for="(comitem, index) in backupResume.competitionExperience.data":key="index">
                            <md-card-content>
                                <div class="row">
                                    <div class="input-field col s12 m6">
                                        <input type="text" v-model="comitem.name" id="com-edit-name">
                                        <label class="active" for="com-edit-name">比赛</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <input type="text" v-model="comitem.honor" id="com-edit-honor">
                                        <label class="active" for="com-edit-honor">奖项</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s6">
                                        <input v-model="comitem.location" id="com-edit-localtion"
                                               placeholder="广州">
                                        <label class="active" for="com-edit-localtion">地点</label>
                                    </div>
                                    <div class="input-field col s6">
                                        <input class="datepicker" type="date" v-model="comitem.date" id="com-edit-date">
                                        <label class="active" for="com-edit-date">日期</label>
                                    </div>

                                </div>
                                <div class="row">
                                    <label class="active">比赛详情</label>
                                    <div class="input-field col s12">
                                    <textarea class="materialize-textarea"
                                          v-model="comitem.description"></textarea>
                                    </div>
                                </div>
                            </md-card-content>
                            <md-card-actions>
                                <md-button class="md-warn" @click.native="delItem('competitionExperience', index)">删除</md-button>
                            </md-card-actions>
                        </md-card>

                    <md-button class="md-raised" @click.native="addItem('competitionExperience', 4)">添加比赛</md-button>
                </div>

            </div>





            <!-------------------Skill 技能爱好------------------->


            <div class="editor-item" id="skill-editor" v-if="moduleSelect.isSkill.status">

                <md-toolbar class="md-accent editor-item-title">
                    <h3 class="md-title" style="flex: 1">技能爱好</h3>
                    <md-button :class="['md-fab md-mini', {'md-warn': moduleSelect.isSkill.isEditing, 'md-primary': !moduleSelect.isSkill.isEditing}]"
                               @click.native="editBtnClicked($event, moduleSelect.isSkill.isEditing, 'isSkill', 5)">
                        <md-icon v-if="moduleSelect.isSkill.isEditing">save</md-icon>
                        <md-icon v-if="!moduleSelect.isSkill.isEditing">edit</md-icon>

                    </md-button>
                </md-toolbar>

                <md-card v-if="!moduleSelect.isSkill.isEditing">
                    <md-card-content>
                        <div class="skill-item">
                            <h4 class="skill-title">专业技能</h4>
                            <div class="prof-container">
                                <div class="prof-item" v-for="pro in resume.skills.data.professional">
                                    <div class="prof-item-title">{{pro.title}}</div>
                                    <ul class="skill-item-des">
                                        <li class="prof-des-item" v-for="proDes in pro.description">{{proDes}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <h4 class="skill-title">兴趣爱好</h4>
                            <ul class="skill-item-hobbies">
                                <li v-for="hobby in resume.skills.data.hobbies">{{hobby}}</li>
                            </ul>
                        </div>
                    </md-card-content>
                </md-card>


                <div class="editing-panel" v-if="moduleSelect.isSkill.isEditing">
                    <md-tabs md-centered class="md-accent">
                        <md-tab md-label="专业技能" class="skill-tab">
                            <div v-for="(profitem, index) in backupResume.skills.data.professional">

                                <div class="row">
                                    <div class="input-field col s12">
                                        <input v-model="profitem.title"
                                               placeholder="广州">
                                        <label class="active" >标题</label>
                                    </div>

                                </div>
                                <div class="row">
                                    <label class="active">描述</label>
                                    <div class="input-field col s12">
                                        <textarea class="materialize-textarea"
                                                  @change="modifySkillDes($event, index)">{{profitem.description.join('\n')}}
                                        </textarea>

                                    </div>
                                </div>
                                <md-button class="md-warn" @click.native="delProItem(index)">删除</md-button>

                            </div>
                            <md-button class="md-primary" @click.native="addProfItem()">添加专业技能</md-button>


                        </md-tab>

                        <md-tab md-label="语言技能" class="skill-tab">

                            <div class="row">
                                <label class="active">描述</label>
                                <div class="input-field col s12">
                                        <textarea class="materialize-textarea"
                                                  v-model="backupResume.skills.data.language.general"></textarea>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s6">
                                    <label class="active">CET-4</label>
                                    <input type="number" placeholder="请输入您的四级分数" v-model="backupResume.skills.data.language['CET-4']">
                                </div>
                                <div class="input-field col s6">
                                    <label class="active">CET-6</label>
                                    <input type="number" placeholder="请输入您的六级分数" v-model="backupResume.skills.data.language['CET-6']">
                                </div>

                            </div>
                        </md-tab>

                        <md-tab md-label="兴趣爱好" class="skill-tab">
                            <div class="row">
                                <label class="active">描述</label>
                                <div class="input-field col s12">
                                        <textarea class="materialize-textarea"
                                                  @change="modifyHobbyDes($event)">{{backupResume.skills.data.hobbies.join('\n')}}
                                        </textarea>
                                </div>
                            </div>
                        </md-tab>
                    </md-tabs>
                </div>
            </div>





            <!-------------------Demo 作品展示------------------->

            <div class="editor-item" id="demo-editor" v-if="moduleSelect.isDemo.status">

                <md-toolbar class="md-accent editor-item-title">
                    <h3 class="md-title" style="flex: 1">作品展示</h3>
                    <md-button :class="['md-fab md-mini', {'md-warn': moduleSelect.isDemo.isEditing, 'md-primary': !moduleSelect.isDemo.isEditing}]"
                               @click.native="editBtnClicked($event, moduleSelect.isDemo.isEditing, 'isDemo', 5)">
                        <md-icon v-if="moduleSelect.isDemo.isEditing">save</md-icon>
                        <md-icon v-if="!moduleSelect.isDemo.isEditing">edit</md-icon>

                    </md-button>
                </md-toolbar>
                <md-card class="demo-item"
                     v-for="(demo,index) in resume.workDemo.data"
                     v-if="!moduleSelect.isDemo.isEditing" :key="index">
                    <md-card-content>
                        <div class="demo-item-name">
                            <span>{{demo.name}}</span>
                            <a :href=demo.link></a>
                        </div>
                        <div class="demo-item-des">{{demo.description}}</div>

                    </md-card-content>
                </md-card>

                <div class="editing-panel" v-if="moduleSelect.isDemo.isEditing">
                        <md-card class="demo-edit-item" v-for="(demoitem, index) in backupResume.workDemo.data" :key="index">
                            <md-card-content>

                                <div class="row">
                                    <div class="input-field col s12 m6">
                                        <input v-model="demoitem.name" id="demo-edit-name">
                                        <label class="active" for="demo-edit-name">名称</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <input v-model="demoitem.link" id="demo-edit-link">
                                        <label class="active" for="demo-edit-link">链接</label>
                                    </div>
                                </div>

                                <div class="row">
                                    <label class="active">作品详情</label>
                                    <textarea class="materialize-textarea"
                                              v-model="demoitem.description"
                                    ></textarea>

                                </div>

                            </md-card-content>
                            <md-card-actions>
                                <md-button class="md-warn" @click.native="delItem('workDemo', index)">删除</md-button>
                            </md-card-actions>
                        </md-card>


                    <md-button class="md-raised" @click.native="addItem('workDemo', 6)">添加作品</md-button>
                </div>

            </div>





            <!-------------------Personal Accessment 个人评价------------------->


            <div class="editor-item" id="pa-editor" v-if="moduleSelect.isPersonalAccessment.status">

                <md-toolbar class="md-accent editor-item-title">
                    <h3 class="md-title" style="flex: 1">个人评价</h3>
                    <md-button :class="['md-fab md-mini', {'md-warn': moduleSelect.isPersonalAccessment.isEditing, 'md-primary': !moduleSelect.isPersonalAccessment.isEditing}]"
                               @click.native="editBtnClicked($event, moduleSelect.isPersonalAccessment.isEditing, 'isPersonalAccessment', 6)">
                        <md-icon v-if="moduleSelect.isPersonalAccessment.isEditing">save</md-icon>
                        <md-icon v-if="!moduleSelect.isPersonalAccessment.isEditing">edit</md-icon>

                    </md-button>
                </md-toolbar>

                <md-card class="pa-item" v-if="!moduleSelect.isPersonalAccessment.isEditing">

                    <md-card-content>
                        {{resume.personalAccessment}}
                    </md-card-content>
                </md-card>

                <md-card class="editing-panel"
                               v-if="moduleSelect.isPersonalAccessment.isEditing"
                               >
                    <md-card-content>
                        <div class="row">
                            <div class="input-field col s12">
                                <textarea class="materialize-textarea"
                                          v-model="backupResume.personalAccessment"
                                          id="pa-edit"></textarea>
                            </div>
                        </div>
                    </md-card-content>

                </md-card>
            </div>
        </div>

    </div>
</template>
<script>
    import {mapGetters, mapMutations} from 'vuex';

    export default{
        props:{
            resumeID:{
                type:String
            }
        },
        data: function(){

            return {
                dialog1Content:'',
                emptyItems:[
                    {},
                    {
                        "school":"",
                        "degree":"",
                        "enrollYear":'',
                        "eduYear":'',
                        "faculty":"",
                        "major":"",
                        "gpa":"",
                        "rank":0,
                        "courses":"",
                        "description":[]
                    },
                    {
                        "company":"",
                        "job":"",
                        "location":"",
                        "startDate":"",
                        "endDate":"",
                        "description":[]
                    },
                    {
                        "name":"",
                        "job":"",
                        "location":"",
                        "startDate":"",
                        "endDate":"",
                        "description":[]
                    },
                    {
                        "name":"",
                        "date":"",
                        "description":"",
                        "honor":""
                    },
                    {},
                    {
                        "name":"",
                        "link":"",
                        "description":""
                    }
                ],
                backupResume:{},
                moduleName : [
                    '',
                    'eduExperience',
                    'internExperience',
                    'projectExperience',
                    'competitionExperience',
                    'skills',
                    'workDemo',
                    'personalAccessment',
                ],
                moduleSelect:{
                    isBasic:{
                        name:'基本情况',
                        status: true,
                        isEditing: false,
                    },
                    isEducation : {
                        name:'教育背景',
                        status:true,
                        isEditing: false,
                    },
                    isInternship: {
                        name:'实习经历',
                        status: true,
                        isEditing: false,
                    },
                    isProject: {
                        name: '校园/项目经历',
                        status: true,
                        isEditing: false,
                    },
                    isCompetition: {
                        name: '比赛经历',
                        status: true,
                        isEditing: false,
                    },
                    isSkill: {
                        name:'技能爱好',
                        status: true,
                        isEditing: false,
                    },
                    isDemo: {
                        name:'作品展示',
                        status: true,
                        isEditing: false,
                    },
                    isPersonalAccessment: {
                        name: '个人评价',
                        status: true,
                        isEditing: false,
                    }
                }
            }
        },

        computed:{
            ...mapGetters({
                resumeData: 'getResume'
            }),
            resume (){
                return this.resumeData[this.resumeID];
            }
        },
        methods:{
            ...mapMutations([
                'modifyBasic',
                'modifyEducation',
                'modifyInternship',
                'modifyProject',
                'modifyCompetition',
                'modifySkill',
                'modifyDemo',
                'modifyPersonalAccessment',
                'modifyStatus'
            ]),

            mutationFunc (idx){
                var self = this;
                var funcs = [
                    'modifyBasic',
                    'modifyEducation',
                    'modifyInternship',
                    'modifyProject',
                    'modifyCompetition',
                    'modifySkill',
                    'modifyDemo',
                    'modifyPersonalAccessment',
                ];

                this[funcs[idx]]({
                    id: self.resumeID,
                    resume: self.backupResume
                });
            },
            showFile(e){
              var file = e.target.files[0];
              if(/image\/.+/.test(file.type) &&file.size <= 81920){
                    this.backupResume.iconURL = window.URL.createObjectURL(file);
                    this.backupResume.iconFile = file;
              }else{
                  e.target.value = null;
                  if(!/image\/.+/.test(file.type)){
                      this.dialog1Content = '文件应为图片格式~';
                      this.openDialog('dialog1');
                  }else if(file.size > 81920){
                      this.dialog1Content = '图片大小应不超过80K~';
                      this.openDialog('dialog1');
                  }
              }
            },
            moduleStatusChanged(name, idx){
                var self = this;
                if(idx % 7 != 0) {
                    self.modifyStatus({
                        id: self.resumeID,
                        modulename: self.moduleName[idx],
                        result : self.moduleSelect[name].status
                    })
                }

            },
            editBtnClicked (event, isEditing, module, moduleidx){
                if(isEditing){
                    this.moduleSelect[module].isEditing = false;
                    this.mutationFunc(moduleidx);
                }else{
                    this.moduleSelect[module].isEditing = true;
                }
            },
            addItem(module, idx){
                this.backupResume[module].data.push(this.emptyItems[idx]);
            },
            delItem(module, idx){
                this.backupResume[module].data.splice(idx, 1);
            },

            modifyDes (e, idx, module){
                this.backupResume[module].data[idx].description = e.target.value.split('\n').filter((item)=>{
                    return item.trim() != '';
                });
            },
            delDes(idx, desidx, module){
                this.backupResume[module].data[idx].description.splice(desidx, 1);
            },
            addDes(index, module){
                this.backupResume[module].data[index].description.push({
                    keyword: '',
                    detail:"",
                })
            },
            modifySkillDes(e, idx){
                this.backupResume.skills.data.professional[idx].description = e.target.value.split('\n').filter((item)=>{
                    return item.trim() != '';
                });
            },
            modifyHobbyDes(e){
                this.backupResume.skills.data.hobbies = e.target.value.split('\n').filter((item)=>{
                    return item.trim() != '';
                });
            },
            addProfItem(){
                this.backupResume.skills.data.professional.push({
                    "title":"",
                    "description":[]
                })
            },
            delProItem(idx){
                this.backupResume.skills.data.professional.splice(idx, 1);
            }
        },
        mounted (){
            this.backupResume = this.resume;
            this.moduleSelect.isCompetition.status = this.backupResume.competitionExperience.status;
            this.moduleSelect.isEducation.status = this.backupResume.eduExperience.status;
            this.moduleSelect.isInternship.status = this.backupResume.internExperience.status;
            this.moduleSelect.isProject.status = this.backupResume.projectExperience.status;
            this.moduleSelect.isSkill.status = this.backupResume.skills.status;
            this.moduleSelect.isDemo.status = this.backupResume.workDemo.status;

        }

    }

</script>
