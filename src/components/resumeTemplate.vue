<template>

    <div>

        <div id="resumeimg">
        </div>

        <md-toolbar class="md-primary top-toolbar" id="editor-toolbar">
            <router-link class="md-icon-button" :to="{ name:'create', params:{resumeID: resumeName}}">
                <md-icon>arrow_back</md-icon>
            </router-link>

            <h2 class="md-title editor-title" style="flex: 1">{{curResume.resumeName}}</h2>

            <md-button class="md-icon-button" @click.native="generateImg">
                <md-icon>cloud_download</md-icon>
            </md-button>

        </md-toolbar>

        <div id="container" >

            <div id="sidebar">
                <div class="sidebar-item" id="sidebar-icon">
                    <div id="sidebar-avatar">
                        <img :src="curResume.iconURL == undefined? 'data:image/png;base64,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': curResume.iconURL" alt="">
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

        </div>
    </div>

</template>
<style lang="sass" >
    @import '../style/resume_style.scss';

</style>
<script>
    import {mapGetters} from 'vuex';
    var html2canvas, canvas2image;
    export default{
        mounted(){
            import('../util/canvas2image').then(Canvas2Image => {
                canvas2image = Canvas2Image.default;
            });

            import('html2canvas').then(Html2Canvas=>{
                html2canvas = Html2Canvas;
            });
        },
        data: function(){
            return {
                isPDF: false,
                resumeimgurl: '',
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
        methods:{
            getPixelRatio:function(context){
                var backingStore = context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;
                return (window.devicePixelRatio || 1) / backingStore;
            },
            generateImg(){

                var self = this, rimg = document.getElementById('resumeimg');
                var resumeContainer = document.getElementById('container'),
                    resumeHidden = document.getElementById('resumehidden');


                resumeContainer.classList.add('pdfContainer');

                var width = resumeContainer.clientWidth; //获取dom 宽度
                var height = resumeContainer.offsetHeight; //获取dom 高度
                var offsetTop = resumeContainer.offsetTop;
                var canvas = document.createElement("canvas"); //创建一个canvas节点
                var context = canvas.getContext('2d');
                var scaleBy = self.getPixelRatio(context);

                canvas.width = width * scaleBy;
                canvas.height = (height+offsetTop) * scaleBy + 30;
                canvas.getContext("2d").scale(scaleBy,scaleBy);
                var opts = {
                    useCORS:true,//允许加载跨域的图片
                    allowTaint:false,
                    tainttest:true, //检测每张图片都已经加载完成
                    scale:scaleBy, // 添加的scale 参数
                    canvas:canvas, //自定义 canvas
                    logging: false, //日志开关，发布的时候记得改成false
                    width:width, //dom 原始宽度
                    height:height //dom 原始高度
                };

                var a4SizeWidth, a4SizeHeight;
                var resumeRatio = canvas.width/canvas.height,
                    a4Ratio = 595 / 842;
                if(resumeRatio> a4Ratio){
                    a4SizeWidth = 595;
                    a4SizeHeight = canvas.height * 595 / canvas.width ;
                }else{
                    a4SizeWidth = resumeRatio * 842;
                    a4SizeHeight = 842;
                }


                var centerDis = (595 - a4SizeWidth)/2;
               html2canvas(resumeContainer, opts).then(function(canvas){
                    var img = canvas2image.convertToImage(canvas, canvas.width, canvas.height);
                   resumeContainer.classList.remove('pdfContainer');
                   var pdf = new jsPDF('', 'pt', [595,842]);
                   pdf.addImage(img, 'JPEG', resumeRatio > a4Ratio? 0 : centerDis, 0, a4SizeWidth, a4SizeHeight);

                   pdf.save(`${self.curResume.name}_${self.curResume.resumeName}.pdf`);

                })
            }
        }
    }
</script>