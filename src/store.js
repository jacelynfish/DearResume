import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        listActive: false,
        resumeList: ['default','demo'],
        resumeData:{
            default:{
                "resumeName":'默认简历',
                "name":"",
                "iconURL": undefined,
                "iconFile":null,
                "enName":"",
                "brief":"",
                "contact":{
                    "phone":"",
                    "email":"",
                    "page":""
                },
                "eduExperience":{
                    status: true,
                    data:[
                        {
                            "school":"",
                            "degree":"",
                            "enrollYear":"",
                            "eduYear":"",
                            "faculty":"",
                            "major":"",
                            "gpa":"",
                            "rank":0,
                            "courses":"",
                            "description":[]
                        }
                    ]
                },
                "internExperience":{
                    status: true,
                    data:[
                        {
                            "company":"",
                            "job":"",
                            "location":"",
                            "startDate":"",
                            "endDate":"",
                            "description":[]
                        }
                    ]
                },
                "projectExperience":{
                    status: true,
                    data:[
                        {
                            "name":"",
                            "job":"",
                            "location":"",
                            "startDate":"",
                            "endDate":"",
                            "description":[]
                        }
                    ]
                },
                "competitionExperience":{
                    status: true,
                    data: [
                        {
                            "name":"",
                            "date":"",
                            "description":"",
                            "honor":""
                        }
                    ]

                },
                "skills":{
                    "status": true,
                    data:{
                        "professional":[
                            {
                                "title":"",
                                "description":[]
                            }
                        ],
                        "language":{
                            "general":"",
                            "CET-4":0,
                            "CET-6":0,

                        },
                        "hobbies":[]
                    }
                },
                "workDemo":{
                    status: true,
                    data:[
                        {
                            "name":"",
                            "link":"",
                            "description":""
                        }

                    ]
                },

                "personalAccessment":""

            },
            demo:{
                "resumeName":"我的中文简历",
                "name":"靳鸿媛",
                "iconURL": undefined,
                "iconFile":null,
                "enName":"Jacelyn",
                "brief":"Front-end Developer",
                "contact":{
                    "phone":"153 6376 3678",
                    "email":"hyjin_jacelyn@163.com",
                    "page":"https://github.com/jacelynfish"
                },
                "eduExperience":{
                    status: true,
                    data:[
                        {
                            "school":"澳门科技大学",
                            "degree":"学士",
                            "enrollYear":"2014-09-01",
                            "eduYear":"2018-06-10",
                            "faculty":"资讯科技学院",
                            "major":"软件技术及应用",
                            "gpa":"3.73/4",
                            "rank":0,
                            "courses":"面向对象程序设计、数据结构与算法、数字电路、数据库原理及应用、编译原理、计算机组成原理、网络编程、软件工程等",
                            "description":[
                                "2014-2015 学年第一、第二学期澳门科技大学资讯科技学院院长优秀生 榜(B 榜)第一名",
                                "2016 年度澳门科技大学 ACM/ICPC 编程比赛二等奖",
                                "2015-2016 学年第一、第二学期澳门科技大学资讯科技学院院长优秀生 榜(B 榜)第二名",
                                "2016-2017 学年第一澳门科技大学资讯科技学院院长优秀生 榜(B 榜)第一名"
                            ]
                        }
                    ]
                },
                "internExperience":{
                    status: true,
                    data:[
                        {
                            "company":"跟我科技",

                            "job":"Web网页设计开发",
                            "location":"珠海",
                            "startDate":"2015-10-01",
                            "endDate":"2016-02-27",
                            "description":[
                                {
                                    "keyword":"前端页面开发",
                                    "detail": "策划前端网页内容,修改前端网页页面代码,更换网页内容、表现样式及动画效果,网页端按时上线"
                                },
                                {
                                    "keyword":"",
                                    "detail"
                                }
                                {
                                    "keyword":"创业路演",
                                    "detail": "在珠海横琴澳门青年创业谷与创业邦合作的举办的互联网+时代的成功之道创业比赛中代表项目团队路演"
                                }
                            ]
                        }
                    ]
                },
                "projectExperience":{
                    status: true,
                    data:[
                        {
                            "name":"MUSTBEE微信公众号“澳科大服务平台”",
                            "job":"微信公众号后台开发",
                            "location":"澳门",
                            "startDate":"2016-04-01",
                            "endDate":"2017-03-31",
                            "description":[
                                "使用NodeJS+Express为同学提供查阅图书馆馆藏、GPA及其他校园信息的微信公众号服务",
                                "参与策划、开发校园应用MUSTBEE微信小程序"
                            ]
                        }
                    ]
                },
                "competitionExperience":{
                    status: true,
                    data: [
                        {
                            "name":"2016 爱范儿×Segmentfault第一届「未来小程序」黑客马拉松",
                            "date":"2016-10-06",
                            "description":"策划、设计游乐园指南微信小程序并负责部分页面的前端开发",
                            "honor":"最佳团队大奖"
                        }
                    ]

                },
                "skills":{
                    "status": true,
                    data:{
                        "professional":[
                            {
                                "title":"前端技能",
                                "description":[
                                    "熟练应用HTML+CSS+JavaScript进行网页开发，熟悉JS原生Ajax, 了解ES6语法",
                                    "熟悉NodeJS+Express+Mongodb的服务器后端开发，曾使用此技术开发校图书馆信息爬虫微信应用",
                                    "熟练使用Vue2.0+Vue-router+Vuex开发SPA，了解微信小程序Mina框架；"
                                ]
                            },
                            {
                                "title":"前端工具",
                                "description":[
                                    "在开发中熟练使用Sass预处理器",
                                    "了解构建工具Webpack使用方法，有Gulp使用经验",
                                    "在开发中熟练使用Git进行版本管理"
                                ]
                            }
                        ],
                        "language":{
                            "general":"日常熟练使用英文，能流利使用英文进行日常对话，能够使用英文进行专业阅读与写作；曾参与贡献Vue2.0中文版的翻译工作。",
                            "CET-4":632,
                            "CET-6":559,

                        },
                        "hobbies":["熟练使用Photoshop"]
                    }
                },
                "workDemo":{
                    status: true,
                    data:[
                        {
                            "name":"模拟联合国会议流程单页应用 http://jacelynfish.github.io/mustmun/#!/",
                            "link":"http://jacelynfish.github.io/mustmun/",
                            "description":"使用Vue1.0+Vue-router+vuex开发，选择localStorage作为客户端缓存方案，使用Webpack 1.0打包"
                        },
                        {
                            "name":"迷你课程管理系统 https://github.com/jacelynfish/mini_moodle",
                            "link":"https://github.com/jacelynfish/mini_moodle",
                            "description":"使用Vue2.0+Vue-router+vuex开发，选择localStorage作为客户端缓存方案，使用Webpack 2.0打包；后端选择Node.js作为开发语言，数据库使用Microsoft SQL Server 2016 Express"
                        },
                        {
                            "name":"在线简历 https://github.com/jacelynfish/resume-generator",
                            "link":"http://jacelynfish.github.io/resume/",
                            "description":"使用Sass, Gulp以及Pug开发"
                        }

                    ]
                },

                "personalAccessment":"2018届软件工程学生，热爱前端开发，了解前端工程化流程，乐于学习各种前端新技术，曾在项目实践与课程作业中多次使用Vue.js与Sass、Webpack等框架与工具。\n熟练使用英文并热衷参加社区交流与活动，曾参与Vue.js 2.0社区版本的中文翻译。\n性格乐观向上，对基础知识的学习脚踏实地，对新技术、框架、工具永远保持无尽的好奇心。"

            }
        }
    },
    getters:{
        getResume (state){
            return state.resumeData;
        },
        getResumeList(state){
            return state.resumeList;
        },
        getListActive(state){
            return state.listActive;
        }
    },
    mutations:{
        setListActive(state){
            state.listActive = true;
        },
        modifyEducation (state, {id, resume}){
            state.resumeData[id].eduExperience = resume.eduExperience;
        },
        modifyInternship (state, {id, resume}){
            state.resumeData[id].internExperience = resume.internExperience;
        },
        modifyProject (state, {id, resume}){
            state.resumeData[id].projectExperience = resume.projectExperience;
        },
        modifyCompetition (state, {id, resume}){
            state.resumeData[id].competitionExperience = resume.competitionExperience;

        },
        modifySkill (state, {id, resume}){
            state.resumeData[id].skills = resume.skills;

        },
        modifyDemo (state, {id, resume}){
            state.resumeData[id].workDemo = resume.workDemo;

        },
        modifyPersonalAccessment (state, {id, resume}){
            state.resumeData[id].personalAccessment = resume.personalAccessment;

        },
        modifyBasic (state, {id, resume}){
            state.resumeData[id].name = resume.name;
            state.resumeData[id].iconURL = resume.iconURL;
            state.resumeData[id].iconFile = resume.iconFile;

            state.resumeData[id].enName = resume.enName;
            state.resumeData[id].brief = resume.brief;
            state.resumeData[id].contact = resume.contact;
        },
        modifyStatus(state, {id, modulename, result}){
            state.resumeData[id][modulename].status = result;

        },
        addNewResume(state,{newID, newName}){
            state.resumeList.push(newID);
            state.resumeData[newID] = {
                "resumeName":newName,
                "name":"",
                "iconURL": undefined,
                "iconFile":null,
                "enName":"",
                "brief":"",
                "contact":{
                    "phone":"",
                    "email":"",
                    "page":""
                },
                "eduExperience":{
                    status: true,
                    data:[
                        {
                            "school":"",
                            "degree":"",
                            "enrollYear":"",
                            "eduYear":"",
                            "faculty":"",
                            "major":"",
                            "gpa":"",
                            "rank":0,
                            "courses":"",
                            "description":[]
                        }
                    ]
                },
                "internExperience":{
                    status: true,
                    data:[
                        {
                            "company":"",
                            "job":"",
                            "location":"",
                            "startDate":"",
                            "endDate":"",
                            "description":[]
                        }
                    ]
                },
                "projectExperience":{
                    status: true,
                    data:[
                        {
                            "name":"",
                            "job":"",
                            "location":"",
                            "startDate":"",
                            "endDate":"",
                            "description":[]
                        }
                    ]
                },
                "competitionExperience":{
                    status: true,
                    data: [
                        {
                            "name":"",
                            "date":"",
                            "description":"",
                            "honor":""
                        }
                    ]

                },
                "skills":{
                    "status": true,
                    data:{
                        "professional":[
                            {
                                "title":"",
                                "description":[]
                            }
                        ],
                        "language":{
                            "general":"",
                            "CET-4":0,
                            "CET-6":0,

                        },
                        "hobbies":[]
                    }
                },
                "workDemo":{
                    status: true,
                    data:[
                        {
                            "name":"",
                            "link":"",
                            "description":""
                        }

                    ]
                },

                "personalAccessment":""

            }
        },
        delResume(state,{idx}){
            var id = state.resumeList[idx];
            state.resumeList.splice(idx, 1);
            state.resumeData[id] = undefined;
        },
        newNameResume(state, {id, newName}){
            state.resumeData[id].resumeName = newName;
        }
    },
    actions:{

    }
});
export default store;

