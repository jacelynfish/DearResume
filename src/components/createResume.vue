<style lang="sass">
    .editor-item{
        @each $item in edu, intern, proj, com, skill, demo{
            & .#{$item}-item{
                margin-left: 8px;
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



</style>
<template>
    <div id="resume-editor">
        <div id="editor-popup">

        </div>
        <div id="editor-title">{{resumeID}}</div>
        <div id="editor-choice">
            <md-checkbox v-for="(choice, idx) of Object.keys(moduleSelect)"
                         :key="idx" name="moduleSelect"
                         v-model="moduleSelect[choice].status"
                         class="md-primary">{{moduleSelect[choice].name}}</md-checkbox>
        </div>

        <div id="editor-container">

            <!-------------------Basic 基本情况------------------->

            <div class="editor-item" id="basic-editor">
                <md-toolbar class="md-transparent editor-item-title">
                    <h3 class="md-title" style="flex: 1">基本情况</h3>
                    <md-button :class="['md-fab md-mini', {'md-warning': moduleSelect.isBasic.isEditing, 'md-primary': !moduleSelect.isBasic.isEditing}]"
                               @click.native="editBtnClicked($event, moduleSelect.isBasic.isEditing, 'isBasic', 0)">
                        <md-icon v-if="moduleSelect.isBasic.isEditing">save</md-icon>
                        <md-icon v-if="!moduleSelect.isBasic.isEditing">edit</md-icon>
                    </md-button>
                </md-toolbar>

                <md-card class="basic-item" v-if="!moduleSelect.isBasic.isEditing">
                <md-card-header>
                    <md-card-media>
                        <img src="../img/avatar.jpg" alt="me">
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
                                    <input type="text" v-model="backupResume.brief" placeholder="请输入您的常用手机号码">
                                    <label class="active">电话</label>
                                </div>
                                <div class="input-field col s12 m4">
                                    <i class="material-icons prefix">email</i>
                                    <input type="text" v-model="backupResume.brief" placeholder="请输入您的常用邮箱">
                                    <label class="active">邮箱</label>
                                </div>
                                <div class="input-field col s12 m4">
                                    <i class="material-icons prefix">link</i>
                                    <input type="text" v-model="backupResume.brief" placeholder="请输入您的GitHub主页">
                                    <label class="active">GitHub</label>
                                </div>
                            </div>

                        </md-card-content>
                    </md-card>

                </div>
            </div>







            <!-------------------Education 教育背景------------------->


            <div class="editor-item" id="edu-editor" v-if="moduleSelect.isEducation.status">

                <md-toolbar class="md-transparent editor-item-title">
                    <h3 class="md-title" style="flex: 1">教育背景</h3>
                    <md-button :class="['md-fab md-mini', {'md-warning': moduleSelect.isEducation.isEditing, 'md-primary': !moduleSelect.isEducation.isEditing}]"
                               @click.native="editBtnClicked($event, moduleSelect.isEducation.isEditing, 'isEducation', 1)">
                        <md-icon v-if="moduleSelect.isEducation.isEditing">save</md-icon>
                        <md-icon v-if="!moduleSelect.isEducation.isEditing">edit</md-icon>

                    </md-button>
                </md-toolbar>


                <div class="edu-item " v-for="eduitem in resume.eduExperience.data" v-if="!moduleSelect.isEducation.isEditing">
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
                </div>

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


                    <md-button class="md-primary md-raised" @click.native="addItem('eduExperience', 1)">添加教育经历</md-button>
                </div>
            </div>





            <!-------------------Internship 实习经历------------------->


            <div class="editor-item" id="intern-editor" v-if="moduleSelect.isInternship.status">
                <md-toolbar class="md-transparent editor-item-title">
                    <h3 class="md-title" style="flex: 1">实习经历</h3>
                    <md-button :class="['md-fab md-mini', {'md-warning': moduleSelect.isInternship.isEditing, 'md-primary': !moduleSelect.isInternship.isEditing}]"
                               @click.native="editBtnClicked($event, moduleSelect.isInternship.isEditing, 'isInternship', 2)">
                        <md-icon v-if="moduleSelect.isInternship.isEditing">save</md-icon>
                        <md-icon v-if="!moduleSelect.isInternship.isEditing">edit</md-icon>

                    </md-button>
                </md-toolbar>

                <div class="intern-item"
                     v-for="internitem in resume.internExperience.data"
                     v-if="!moduleSelect.isInternship.isEditing">
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
                </div>

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

                    <md-button class="md-primary md-raised" @click.native="addItem('internExperience', 2)">添加实习经历</md-button>
                </div>
            </div>





            <!-------------------Project 项目经历------------------->


            <div class="editor-item" id="proj-editor" v-if="moduleSelect.isProject.status">

                <md-toolbar class="md-transparent editor-item-title">
                    <h3 class="md-title" style="flex: 1">校园/项目经历</h3>
                    <md-button :class="['md-fab md-mini', {'md-warning': moduleSelect.isProject.isEditing, 'md-primary': !moduleSelect.isProject.isEditing}]"
                               @click.native="editBtnClicked($event, moduleSelect.isProject.isEditing, 'isProject', 3)">
                        <md-icon v-if="moduleSelect.isProject.isEditing">save</md-icon>
                        <md-icon v-if="!moduleSelect.isProject.isEditing">edit</md-icon>

                    </md-button>
                </md-toolbar>

                <div class="proj-item"
                     v-for="projitem in resume.projectExperience.data"
                    v-if="!moduleSelect.isProject.isEditing">
                    <div class="proj-item-basic">
                        <span class="proj-name">{{projitem.name}}</span>
                        <span class="proj-location">{{projitem.location}}</span>
                        <span class="proj-duration">{{projitem.startDate}} - {{projitem.endDate}}</span>
                    </div>
                    <div class="proj-item-job">{{projitem.job}}</div>
                    <ul class="proj-item-des">
                        <li class="proj-des-item" v-for="des in projitem.description">{{des}}</li>
                    </ul>
                </div>

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



                    <md-button class="md-primary md-raised" @click.native="addItem('projectExperience', 3)">添加实习经历</md-button>
                </div>

            </div>





            <!-------------------Competition 比赛经历------------------->


            <div class="editor-item" id="competition-editor" v-if="moduleSelect.isCompetition.status">

                <md-toolbar class="md-transparent editor-item-title">
                    <h3 class="md-title" style="flex: 1">比赛经历</h3>
                    <md-button :class="['md-fab md-mini', {'md-warning': moduleSelect.isCompetition.isEditing, 'md-primary': !moduleSelect.isCompetition.isEditing}]"
                               @click.native="editBtnClicked($event, moduleSelect.isCompetition.isEditing, 'isCompetition', 4)">
                        <md-icon v-if="moduleSelect.isCompetition.isEditing">save</md-icon>
                        <md-icon v-if="!moduleSelect.isCompetition.isEditing">edit</md-icon>

                    </md-button>
                </md-toolbar>
                <div class="com-item"
                     v-for="com in resume.competitionExperience.data"
                     v-if="!moduleSelect.isCompetition.isEditing">
                    <div class="com-item-basic">
                        <span class="com-name">{{com.name}}</span>
                        <span class="com-duration">{{com.date}}</span>
                    </div>
                    <div class="com-item-honor">{{com.honor}}</div>
                    <div class="com-item-des">{{com.description}}</div>
                </div>

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

                    <md-button class="md-primary md-raised" @click.native="addItem('competitionExperience', 4)">添加比赛</md-button>
                </div>

            </div>





            <!-------------------Skill 技能爱好------------------->


            <div class="editor-item" id="skill-editor" v-if="moduleSelect.isSkill.status">

                <md-toolbar class="md-transparent editor-item-title">
                    <h3 class="md-title" style="flex: 1">技能爱好</h3>
                    <md-button :class="['md-fab md-mini', {'md-warning': moduleSelect.isSkill.isEditing, 'md-primary': !moduleSelect.isSkill.isEditing}]"
                               @click.native="editBtnClicked($event, moduleSelect.isSkill.isEditing, 'isSkill', 5)">
                        <md-icon v-if="moduleSelect.isSkill.isEditing">save</md-icon>
                        <md-icon v-if="!moduleSelect.isSkill.isEditing">edit</md-icon>

                    </md-button>
                </md-toolbar>

                <div class="skill-item" v-if="!moduleSelect.isSkill.isEditing">
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
                <div class="skill-item" v-if="!moduleSelect.isSkill.isEditing">
                    <h4 class="skill-title">兴趣爱好</h4>
                    <ul class="skill-item-hobbies">
                        <li v-for="hobby in resume.skills.data.hobbies">{{hobby}}</li>
                    </ul>
                </div>

                <div class="editing-panel" v-if="moduleSelect.isSkill.isEditing">
                    <md-tabs md-centered class="md-transparent">
                        <md-tab md-label="专业技能">
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

                        <md-tab md-label="语言技能">

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

                        <md-tab md-label="兴趣爱好">
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

                <md-toolbar class="md-transparent editor-item-title">
                    <h3 class="md-title" style="flex: 1">作品展示</h3>
                    <md-button :class="['md-fab md-mini', {'md-warning': moduleSelect.isDemo.isEditing, 'md-primary': !moduleSelect.isDemo.isEditing}]"
                               @click.native="editBtnClicked($event, moduleSelect.isDemo.isEditing, 'isDemo', 5)">
                        <md-icon v-if="moduleSelect.isDemo.isEditing">save</md-icon>
                        <md-icon v-if="!moduleSelect.isDemo.isEditing">edit</md-icon>

                    </md-button>
                </md-toolbar>
                <div class="demo-item"
                     v-for="demo in resume.workDemo.data"
                     v-if="!moduleSelect.isDemo.isEditing">
                    <div class="demo-item-name">
                        <span>{{demo.name}}</span>
                        <a :href=demo.link></a>
                    </div>
                    <div class="demo-item-des">{{demo.description}}</div>
                </div>

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


                    <md-button class="md-primary md-raised" @click.native="addItem('workDemo', 6)">添加作品</md-button>
                </div>

            </div>





            <!-------------------Personal Accessment 个人评价------------------->


            <div class="editor-item" id="pa-editor" v-if="moduleSelect.isPersonalAccessment.status">

                <md-toolbar class="md-transparent editor-item-title">
                    <h3 class="md-title" style="flex: 1">个人评价</h3>
                    <md-button :class="['md-fab md-mini', {'md-warning': moduleSelect.isPersonalAccessment.isEditing, 'md-primary': !moduleSelect.isPersonalAccessment.isEditing}]"
                               @click.native="editBtnClicked($event, moduleSelect.isPersonalAccessment.isEditing, 'isPersonalAccessment', 6)">
                        <md-icon v-if="moduleSelect.isPersonalAccessment.isEditing">save</md-icon>
                        <md-icon v-if="!moduleSelect.isPersonalAccessment.isEditing">edit</md-icon>

                    </md-button>
                </md-toolbar>

                <md-whiteframe md-elevation="5" class="pa-item" v-if="!moduleSelect.isPersonalAccessment.isEditing">
                    {{resume.personalAccessment}}
                </md-whiteframe>
                <md-whiteframe class="editing-panel"
                               v-if="moduleSelect.isPersonalAccessment.isEditing"
                               md-elevation="5">
                    <div class="row">
                        <div class="input-field col s12">
                                <textarea class="materialize-textarea"
                                          v-model="backupResume.personalAccessment"
                                          id="pa-edit"></textarea>
                        </div>
                    </div>
                </md-whiteframe>
            </div>
        </div>

    </div>
</template>
<script>
    import {mapGetters, mapMutations} from 'vuex';
    export default{
        data: function(){
            return {
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
                resumeID: 'r1',
                backupResume:{},
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
                return this.resumeData['r1'];
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
