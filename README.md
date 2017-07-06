_Human-computer interaction design report_   |   Hongyuan Jin   |   1409853G-I011-0046 

# _Dear Resume_: ideas and implementations

> Source code: https://github.com/jacelynfish/DearResume
>
> Demo site: http://jacelynfish.github.io/dear_resume/ (please view it on your mobile device)



### 1. Motivation

During the process of hunting opportunities for summer internship, the need of preparing a decent resume grew stronger as I was experiencing more interviews. However, as newbies in the actual career field, this has definitely proved to be an even fiercer challenge for programmers than all those complex technical details in the interviews and exams. The main reason is that, for average students, like the rest of us,  who began coding just two or three years ago as freshmen, the lack of attractive internship or academic research experiences makes the entire resume look a bit thin and even too boring for tech team employers, who prefer sophisticated programmers with solid coding skills and glorious performance in their competition history. Yet for those privileged students, it's even harder for them to express their accomplishments in the most simplified form of language and therefore not straightforward enough for HRs to spot their advantages systematically. A well-organized resume is the most effective way of winning the opportunity to directly talk to our employers and demostrate our actual abilities in programming. Furthermore, not every IT students get the hang of the styling of resumes with elegant layouts.

After trying out different resume generation applications including [DeerCV](http://www.deercv.com/) and [Shixiseng](https://www.shixiseng.com), I decided to design a resume generator of my own which purely focuses on creating a decent resume. Those products are good, but there are inadequancies. For DeerCV, you have to login by scanning a WeChat QR Code before you can edit an resume. Besides, the responsive design of the editor page is not perfect enough to be view on mobile devices. For Shixiseng, well, this application is a flatform for hunting internships and providing resume generator is only a part of its many functionalities. Therefore, you have to edit an resume on PC website and the PDF version of your resume barely has color and decent layout, which makes it too casual and unprofessional for job hunting.

So I decided to build this resume generator in the following spirites:

1. Simple and strong Material Design,
2. Component-wised and least input fields needed and
3. Lightweight and mobile-first.



### 2. Ideas

#### 2.1 Material Design

Material Design is a widely-welcomed design style promoted by Google. Inspired by paper and ink, the foundational elements of print-based design – typography, grids, space, scale, color, and use of imagery – guide visual treatments. Surfaces and edges of the material provide visual cues that are grounded in reality. The use of familiar tactile attributes helps users quickly understand affordances. Yet the flexibility of the material creates new affordances that supersede those in the physical world, without breaking the rules of physics. It aims to create a visual language that synthesizes classic principles of good design with the innovation and possibility of technology and science.

This simple but strong design pattern is adopted in the preparation of _Dear Resume_: the entire product is built on components of material design for the sake of simplicity and clarity. Palette comprises of dark green, white and grey remains consistent during the whole process of editing resumes, while a lighter green acts as the main color of the generated document. This kind of consistency is a vital key in visual direction and can naturally reduce the sense of distraction.

![](file:///Users/jacelynfish/Desktop/report/WechatIMG23.jpeg)

> Simple material design create straightforward visual direction and sense of consistency for users. It greatly improves user experience.



#### 2.2 Component-wised

Components are not only a strong logical indicator for resume cravers to better organize their experience, but an unsurprisingly convenient way to progressively develop intention for future development direction. The weakness of one is often transparent under comparison when, for example, the length of your internship experience component box is obviously shorter than the one in academic research field, it will clearly point one a direction that internship experiences may be most urgent when it comes to the decision of next step. 

_Dear Resume_ divides the information needed to be completed into 8 parts, including basic information, academic background, internship experiences, project researches, competition history, skills & hobbies, work demostration as well as personal statement. Each part can be editted seperately and you are even allowed to add or remove several parts. Its highly-tailored features enable the resume creator to highlight his/her own advantages in a more intuitive style.

![](file:///Users/jacelynfish/Desktop/report/WechatIMG24.jpeg)

> Clear component design helps editor figure out his/her weakness and provides more logical cues for them to organize their achievements.



#### 2.3 Lightweight and mobile-first

As a resume generator is not considered as an application that's frequently used as social media applications, it's designed as a web-based and mobile-first application with extremely light weight and smooth responsive layout design. After one-time edition and generation, you can easily discard and turn back the next time the need rises again. The total size of the released version of this application is only 3.1 MBytes in total including static files such as fonts and icon images. 

Although the current version of _Dear Resume_ has not supported downloading PDF version of resume on mobile devices directly, on the desktop version, resume PDFs with high resolution and readily printable A4 size are available for download and it's even perfect for those who have to prepare their interviews in haste.



### 3. Implementation

The overall layout of the source codes are

```shell
.
├── app.js
├── gulpfile.js
├── index.html
├── node_modules
├── package.json
├── public
├── src
└── webpack.config.js
```

And inside the `src` directory:

```
.
├── components
│   ├── app.vue					// Container of the entire application
│   ├── createResume.vue		// Editing panels
│   ├── personalCenter.vue		// Welcome page
│   └── resumeTemplate.vue		// Resume generation page
├── font
│   ├── Knockout-HTF49-Liteweight.otf
│   ├── SourceSansPro-Light.otf
│   └── SourceSansPro-Regular.otf
├── img
│   ├── avatar.jpg
│   ├── default-icon.png
│   ├── sprites.png
│   └── sprites@2x.png
├── router.js					// Application front-end router
├── store.js					// Application state management
├── style
│   ├── _reset.css
│   ├── resume_style.scss
│   └── sprites.scss
└── util
    └── canvas2image.js
```

There're several implementation details that I'd like to elaborate on:

1. Explicitly, the `router.js` and `store.js` are the front-end routing and state management instances of Single Page Application. It enables the application to work fine enough without the support of a strong server-side implementation. Besides, lazy loading of component files are supported to reduce the burden of downloading and executing every piece of unneccessary component at the beginning of application initialization. A simple routing implementation:

   ```javascript
   var router = new VueRouter({
       routes:[
           {
               name: 'create',
               path:'/create_resume/:resumeID',
               component: createResume,
               props: true
           },
           {
               name: 'generate',
               path:'/generate_resume/:resumeName',
               props: true,
               component: (resolve)=>{
                   require.ensure(['../src/components/resumeTemplate.vue'], ()=>{
      			resolve(require('../src/components/resumeTemplate.vue'));
                   },'resume-template')
               },
           },
           {
               name:'homepage',
               path: '/',
               component: personalCenter
           }
       ]
   });
   ```

   ​

2. For the generation of resume from HTML and CSS codes to PDF version, various open-sourced modules are introduced.  `html2canvas.js`  is a utility that iterates through the assigned DOM component to create a `canvas` element. Then the `canvas2image.js ` module converts this `canvas` into regular image. I specifically adjusted the width and length of the image to be several times larger for further high-resolution PDF transformation. `jsPDF.js` is another module that supports image-PDF convertion. Detailed implementation:

   ```javascript
   //resumeTemplate.vue
   generateImg(){


                   var self = this, rimg = document.getElementById('resumeimg');
                   var resumeContainer = document.getElementById('container'),
                       resumeHidden = document.getElementById('resumehidden');

                   resumeContainer.scrollIntoView();
                   resumeContainer.classList.add('pdfContainer');

                   var width = resumeContainer.clientWidth; //获取dom 宽度
                   var height = resumeContainer.offsetHeight; //获取dom 高度
                   var offsetTop = resumeContainer.offsetTop;
                   var canvas = document.createElement("canvas"); //创建一个canvas节点
                   var context = canvas.getContext('2d');
                   var scaleBy = self.getPixelRatio(context);

                   canvas.width = width * scaleBy;
                   canvas.height = height * scaleBy + 30;
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
   ```

3.  Loading optimization. Resources are compressed to achieve higher performance of loading including the use of sprites. Code splitting to achieve lazyloading also helps improve the reacting time of this application. For sprites generation, I employed [Gulp](http://gulpjs.com/), an automatic workflow building tool to spare the tedious work to aligning CSS rules. In the mean time, 2x version of sprites are also generated to support users of Retina screens.

   ```javascript
   //gulpfile.js
   var gulp = require('gulp');
   var spritesmith = require('gulp.spritesmith');

   gulp.task('sprites', function(){
       var sprites = gulp.src('./src/icon/*.png')
           .pipe(spritesmith({
               padding:20,
               retinaSrcFilter:['./src/icon/*@2x.png'],
               cssName:'sprites.scss',
               imgName:'sprites.png',
               retinaImgName: 'sprites@2x.png',
               imgPath:'../img/sprites.png',
               retinaImgPath:'../img/sprites@2x.png'
           }))
       sprites.img.pipe(gulp.dest('./src/img'));
       sprites.css.pipe(gulp.dest('./src/style'));
       return sprites;
   })
   ```

   With [Webpack's](https://webpack.js.org/) code-splitting utilities, I successfully seperate out unneccessary bundle for first-screen loading including resume generation and editing pages.

   ```javascript
   //router.js
   {
               name: 'generate',
               path:'/generate_resume/:resumeName',
               props: true,
               component: (resolve)=>{
                   require.ensure(['../src/components/resumeTemplate.vue'], ()=>{
      			resolve(require('../src/components/resumeTemplate.vue'));
                   },'resume-template')
               },
           }
   }
   ```

   ​

### 4. Future work and conclusion

Future work will focus on the following tasks:

1. Implement effective login and sign up back-end mechanism to enable saving resume templates of one's own,
2. Introduce online preview of resumes and add automatic deployment to GitHub io respository and
3. Introduce various templates with more styles.

Building a large-scaled application with full front-end and back-end funtionalities still seems a long way to go for an independent developer like me. Yet I'll continue to strike all my effort in delivering the best product that will benefit every one who used to be confused and lost like me to avoid unneccessary effort of going in the wrong direction in their academic and career path.