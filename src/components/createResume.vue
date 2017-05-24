<template>
    <div id="resume-editor">
        <div id="editor-popup">

        </div>
        <div id="editor-title">{{resumeID}}</div>
        <div id="editor-choice">
            <div class="choice-group" v-for="choice of Object.keys(moduleSelect)">
                <label :for="choice" class="choice-label">{{moduleSelect[choice].name}}</label>
                <input type="checkbox" class="choice-check" :id="choice" v-model="moduleSelect[choice].status">
            </div>
        </div>

        <div id="editor-container">
            <div class="editor-item" id="basic-editor">
                <div class="editor-item-title">
                    <h3>基本情况</h3>
                    <button :class="['btn', 'waves-effect','waves-light', {'isEditingBtn': moduleSelect.isBasic.isEditing, 'isSavingBtn': !moduleSelect.isBasic.isEditing}]"
                                @click="editBtnClicked($event, moduleSelect.isBasic.isEditing, 'isBasic', 0)">{{moduleSelect.isBasic.isEditing? '保存':'编辑'}}</button>
                </div>
            </div>
            <div class="editor-item" id="edu-editor" v-if="moduleSelect.isEducation.status">
                <div class="editor-item-title">
                    <h3>教育背景</h3>
                    <button :class="['btn', {'isEditingBtn': moduleSelect.isEducation.isEditing, 'isSavingBtn': !moduleSelect.isEducation.isEditing}]"
                            @click="editBtnClicked($event, moduleSelect.isEducation.isEditing, 'isEducation', 1)">{{moduleSelect.isEducation.isEditing? '保存':'编辑'}}</button>
                </div>

                <div class="edu-item " v-for="eduitem in resume.eduExperience.data" v-if="!moduleSelect.isEducation.isEditing">
                    <div class="edu-item-basic">
                        <span class="edu-school">{{eduitem.school}}</span>
                        <span class="edu-degree">{{eduitem.degree}}</span>
                        <span class="edu-gpa">GPA: {{eduitem.gpa}}</span>
                        <span class="edu-duration">{{eduitem.enrollYear}} - {{eduitem.eduYear}}</span>
                    </div>
                    <div class="edu-item-faculty">{{eduitem.faculty}} {{eduitem.major}}</div>
                    <div class="edu-item-des">{{eduitem.courses}}</div>
                    <ul class="edu-item-des" v-if="eduitem.honor.length">
                        <li v-for="honor in eduitem.honor">{{honor}}</li>
                    </ul>
                </div>

                <div class="editing-panel" v-if="moduleSelect.isEducation.isEditing">
                    <div class="edu-edit-item" v-for="(eduitem, index) in backupResume.eduExperience.data">
                        <div class="row">
                            <div class="input-field col s12 m6">
                                <input type="text" class="validate" v-model="eduitem.school" id="edu-edit-school">
                                <label for="edu-edit-school">学校</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <select v-model="eduitem.degree">
                                    <option value="高中">高中</option>
                                    <option value="本科">本科</option>
                                    <option value="研究生">研究生</option>
                                    <option value="博士">博士</option>
                                </select>
                                <label>教育程度</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12 m6">
                                <input type="text" class="validate" v-model="eduitem.faculty" id="edu-edit-faculty">
                                <label for="edu-edit-faculty">学院</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <input type="text" class="validate" v-model="eduitem.major" id="edu-edit-major">
                                <label for="edu-edit-major">专业</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12 m2">
                                <input class="validate" v-model="eduitem.gpa" id="edu-edit-gpa">
                                <label for="edu-edit-gpa">GPA</label>
                            </div>
                            <div class="input-field col s6 m5">
                                <input class="datepicker" type="date" v-model="eduitem.enrollYear" id="edu-edit-enrollYear">
                                <label for="edu-edit-enrollYear">入学日期</label>
                            </div>

                            <div class="input-field col s6 m5">
                                <input class="datepicker" type="date" v-model="eduitem.eduYear" id="edu-edit-eduYear">
                                <label for="edu-edit-eduYear">毕业日期</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <textarea class="materialize-textarea" v-model="eduitem.courses" id="edu-edit-courses"></textarea>
                                <label for="edu-edit-courses">主修课程</label>
                            </div>
                        </div>
                        <label>奖励</label>
                        <ul>
                            <li v-for="(honor, index) in eduitem.honor">
                                <div class="input-field col s12">
                                    <input type="text" class="" v-model="eduitem.honor[index]">
                                </div>
                            </li>
                        </ul>
                    </div>
                    <a class="waves-effect waves-light btn" @click="addEducation">添加教育经历</a>
                </div>
            </div>

            <div class="editor-item" id="intern-editor" v-if="moduleSelect.isInternship.status">
                <div class="editor-item-title">
                    <h3>实习经历</h3>
                    <button :class="['btn', {'isEditingBtn': moduleSelect.isInternship.isEditing, 'isSavingBtn': !moduleSelect.isInternship.isEditing}]"
                            @click="editBtnClicked($event, moduleSelect.isInternship.isEditing, 'isInternship', 2)">{{moduleSelect.isInternship.isEditing? '保存':'编辑'}}</button>
                </div>
                <div class="intern-item" v-for="internitem in resume.internExperience.data">
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
            </div>
            <div class="editor-item" id="proj-editor" v-if="moduleSelect.isProject.status">
                <div class="editor-item-title">
                    <h3>校园/项目经历</h3>
                    <button :class="['btn', {'isEditingBtn': moduleSelect.isProject.isEditing, 'isSavingBtn': !moduleSelect.isProject.isEditing}]"
                            @click="editBtnClicked($event, moduleSelect.isProject.isEditing, 'isProject', 3)">{{moduleSelect.isProject.isEditing? '保存':'编辑'}}</button>

                </div>
                <div class="proj-item" v-for="projitem in resume.projectExperience.data">
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
            </div>
            <div class="editor-item" id="competition-editor" v-if="moduleSelect.isCompetition.status">
                <div class="editor-item-title">
                    <h3>比赛经历</h3>
                    <button :class="['btn', {'isEditingBtn': moduleSelect.isCompetition.isEditing, 'isSavingBtn': !moduleSelect.isCompetition.isEditing}]"
                            @click="editBtnClicked($event, moduleSelect.isCompetition.isEditing, 'isCompetition', 4)">{{moduleSelect.isCompetition.isEditing? '保存':'编辑'}}</button>

                </div>
                <div class="com-item" v-for="com in resume.competitionExperience.data">
                    <div class="com-item-basic">
                        <span class="com-name">{{com.name}}</span>
                        <span class="com-duration">{{com.date}}</span>
                    </div>
                    <div class="com-item-honor">{{com.honor}}</div>
                    <div class="com-item-des">{{com.description}}</div>
                </div>
            </div>
            <div class="editor-item" id="skill-editor" v-if="moduleSelect.isSkill.status">
                <div class="editor-item-title">
                    <h3>技能爱好</h3>
                    <button :class="['btn', {'isEditingBtn': moduleSelect.isSkill.isEditing, 'isSavingBtn': !moduleSelect.isSkill.isEditing}]"
                            @click="editBtnClicked($event, moduleSelect.isSkill.isEditing, 'isSkill', 5)">{{moduleSelect.isSkill.isEditing? '保存':'编辑'}}</button>
                </div>
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
            </div>
            <div class="editor-item" id="demo-editor" v-if="moduleSelect.isDemo.status">
                <div class="editor-item-title">
                    <h3>作品展示</h3>
                    <button :class="['btn', {'isEditingBtn': moduleSelect.isDemo.isEditing, 'isSavingBtn': !moduleSelect.isDemo.isEditing}]"
                            @click="editBtnClicked($event, moduleSelect.isDemo.isEditing, 'isDemo', 5)">{{moduleSelect.isDemo.isEditing? '保存':'编辑'}}</button>
                </div>
                <div class="demo-item" v-for="demo in resume.workDemo.data">
                    <div class="demo-item-name">
                        <span>{{demo.name}}</span>
                        <a :href=demo.link></a>
                    </div>
                    <div class="demo-item-des">{{demo.description}}</div>
                </div>
            </div>
            <div class="editor-item" id="pa-editor" v-if="moduleSelect.isPersonalAccessment.status">
                <div class="editor-item-title">
                    <h3>个人评价</h3>
                    <button :class="['btn', {'isEditingBtn': moduleSelect.isPersonalAccessment.isEditing, 'isSavingBtn': !moduleSelect.isPersonalAccessment.isEditing}]"
                            @click="editBtnClicked($event, moduleSelect.isPersonalAccessment.isEditing, 'isPersonalAccessment', 6)">{{moduleSelect.isPersonalAccessment.isEditing? '保存':'编辑'}}</button>

                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import {mapGetters, mapMutations} from 'vuex';
    export default{
        data: function(){
            return {
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
            addEducation(){
                this.backupResume.eduExperience.data.push({
                    "school":"",
                    "degree":"",
                    "enrollYear":'',
                    "eduYear":'',
                    "faculty":"",
                    "major":"",
                    "gpa":"",
                    "rank":0,
                    "courses":"",
                    "honor":[

                    ]
                })
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
