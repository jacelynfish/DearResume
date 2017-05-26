<template>
    <div id="container">
        <div id="sidebar">
            <div class="sidebar-item" id="sidebar-icon">
                <div id="sidebar-avatar">
                    <img :src="curResume.iconURL == undefined? './static/img/default-icon.png': curResume.iconURL" alt="">
                </div>
                <div id="sidebar-name">
                    {{curResume.name}}<span>{{curResume.enName}}</span>
                </div>
                <div id="sidebar-brief">{{curResume.brief}}</div>
            </div>
            <div class="sidebar-item" id="sidebar-contact">
                <div class="sidebar-title">
                    <span>联系方式</span>
                </div>
                <div class="sidebar-contact-item">
                    <span>{{curResume.contact.phone}}</span>
                </div>
                <div class="sidebar-contact-item">
                    <span>{{curResume.contact.email}}</span>
                </div>
                <div class="sidebar-contact-item">
                    <span>{{curResume.contact.page}}</span>
                </div>
            </div>
            <div class="sidebar-item" id="sidebar-personalAccess" v-if="curResume.personalAccessment != '' ">
                <div class="sidebar-title">
                    <span>个人评价</span>
                </div>
                <div class="sidebar-des-item">{{curResume.personalAccessment}}</div>
            </div>
            <div class="sidebar-item" id="sidebar-lang">
                <div class="sidebar-title">
                    <span>语言水平</span>
                </div>
                <div class="sidebar-des-item">{{curResume.skills.data.language.general}}</div>
                <div class="sidebar-lang-item">
                    <span class="lang-title">CET-4</span>
                    <span class="lang-bar" id="cet4-bar"></span>
                    <span class="lang-level">{{curResume.skills.data.language['CET-4']}}</span>
                </div>
                <div class="sidebar-lang-item">
                    <span class="lang-title">CET-6</span>
                    <span class="lang-bar" id="cet6-bar"></span>
                    <span class="lang-level">{{curResume.skills.data.language['CET-6']}}</span>
                </div>

            </div>
            <div class="sidebar-item footer" id="sidebar-footer">
                    <span>
                        Designed by Jacelynfish. <br/>Powered by Gulp, Jade and Sass.
                    </span>
            </div>
        </div>
        <div id="main">
            <div class="main-item" id="education" v-if="curResume.eduExperience.status">
                <h3 class="main-title">
                    教育经历<span>Education Experience</span>
                </h3>
                <div class="edu-item" v-for="eduitem in curResume.eduExperience.data">
                    <div class="edu-item-basic">
                        <span class="edu-school">{{eduitem.school}}</span>
                        <span class="edu-degree">{{eduitem.degree}}</span>
                        <span class="edu-gpa">GPA: {{eduitem.gpa}}</span>
                        <span class="edu-duration">{{eduitem.enrollYear}} - {{eduitem.eduYear}}</span>
                    </div>
                    <div class="edu-item-faculty">{{eduitem.faculty}} {{eduitem.major}}</div>
                    <div class="edu-item-des">{{eduitem.courses}}</div>
                    <ul class="edu-item-des" v-if="eduitem.description.length">
                        <li v-for="honor in eduitem.description">{{honor}}</li></ul>
                </div>
            </div>
            <div class="main-item" id="intern" v-if="curResume.internExperience.status">
                <h3 class="main-title">
                    实习经历<span>Intern Experience</span>
                </h3>
                <div class="intern-item" v-for="internitem in curResume.internExperience.data">
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
            <div class="main-item" id="project" v-if="curResume.projectExperience.status">
                <h3 class="main-title">
                    校园/项目经历<span>Project Experience</span>
                </h3>
                <div class="proj-item" v-for="projitem in curResume.projectExperience.data">
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
            <div class="main-item" id="competition" v-if="curResume.competitionExperience.status">
                <h3 class="main-title">
                    比赛经历<span>Competition Experience</span>
                </h3>
                <div class="com-item" v-for="com in curResume.competitionExperience.data">
                    <div class="com-item-basic">
                        <span class="com-name">{{com.name}}</span>
                        <span class="com-duration">{{com.date}}</span>
                    </div>
                    <div class="com-item-honor">{{com.honor}}</div>
                    <div class="com-item-des">{{com.description}}</div>
                </div>
            </div>
            <div class="main-item" id="skills" v-if="curResume.skills.status">
                <h3 class="main-title">
                    技能爱好<span>Skills &Hobbies</span>
                </h3>
                <div class="skill-item">
                    <h4 class="skill-title">专业技能</h4>
                    <div class="prof-container">
                        <div class="prof-item" v-for="pro in curResume.skills.data.professional">
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
                        <li v-for="hobby in curResume.skills.data.hobbies">{{hobby}}</li>
                    </ul>
                </div>
            </div>
            <div class="main-item" id="demo" v-if="curResume.workDemo.status">
                <h3 class="main-title">
                    作品展示<span>Work Demo</span>
                </h3>
                <div class="demo-item" v-for="demo in curResume.workDemo.data">
                    <div class="demo-item-name">
                        <span>{{demo.name}}</span>
                        <a :href=demo.link></a>
                    </div>
                    <div class="demo-item-des">{{demo.description}}</div>
                </div>

            </div>
        </div>
        <div class="footer" id="global-footer">
                <span>
                    Designed by Jacelynfish. <br/>Powered by Gulp, Jade and Sass.
                </span>
        </div>
    </div>
</template>
<style lang="sass" >
    @import '../style/resume_style.scss';

</style>
<script>
    import {mapGetters} from 'vuex';
    export default{
        data: function(){
            return {

            }
        },
        computed:{
            ...mapGetters({
                resumeData: 'getResume'
            }),
            curResume(){
                return this.resumeData[this.resumeName];
            }
        },
        props:{
            resumeName: {
                type: String,
            }
        },
        beforeRouteEnter(to, from, next){
            next();
        }
    }
</script>