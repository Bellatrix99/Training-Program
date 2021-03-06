# Infinitesimally-small-job

Some Infinitesimally small job


1. 第一个练习：使用 fetch 和 API 去完成天气的显示

   + 通过天气 API 获取几个城市的天气情况并且可以通过按钮进行切换

   + 把城市的天气信息包裹到 fetch 方法中去进行请求
   
   + 进阶玩法：切换城市的时候 左侧做一个翻牌效果（使用transform3d
2. 第二个练习：实现 tab 效果的切换

   + 通过这个练习的同时也学习 Vue Router 的原理

   + 额外要求：每当点击一个 tab 时，url 要随着变化并且按需渲染

   + 额外要求2：tab 栏换到左侧
3. 第三个练习：带有输入提示的 input

   + 输入内容会去查提示词并给出提示建议

   + 通过 throttle 限制用户的查询频率

   + 点击下拉的提示词在底部添加一个tag（tag 可被移除
4. 第四个练习：表单验证

   + 通过 Validate.js 对表单进行简单验证

   + 使用美观的 CSS 样式
5. 第五个练习：完成书签插件的设计

   + 可以对书签进行标签管理（而不是传统的文件管理
   + 较顺滑的移动/过渡动画
   + 字符级搜索书签功能
   + 新增书签功能
6. 第六个练习：完成视差滚动的设计

   + 使得页面上下滚动的时候，有的元素可以做到有视差效果

   + 并且可以点击右上角的标签跳转到对应的页面高度

   + 整个页面是根据页面移动高度即时加载的（而非 onload 时全加载

   + 整个页面都添加了较为顺滑的动画
7. 第七个练习：下载 ChaoXing 学习通数据的 Chrome 插件

   + 可以自动分辨是 作业/考试 页面而更替脚本操作的元素
+ 点击插件可以自动下载当前页面已完成的数据
   
   + 包括作业&考试的数据
   
   + 包括数据的题干/选择题答案/填空题答案/判断题答案
   + 并可以一键导出到 excel 并下载
+ 可以方便学生更好的统计自己做过的作业/考试数据, 后期方便复习查缺补漏等。
8. 第八个练习：完成滑动验证码的设计
   - 通过移动滑动条将验证码缺失的那块补全从而完成验证
   - 主要用到 clamp() 函数以及 background-blend-mode 背景融合模式
   - 通过 clip-path 对图片上下左右四个方向进行缩小作为遮罩
   - 未成功验证滑块会回弹，近似成功视为成功
9. 第九个练习：完成文字轮播的设计

   - 使得文字可以有序的轮播效果
   - 主要通过调控待轮播文字的移动即可
   - 并且设置较为美观的样式
10. 第十个练习：完成类似 macOS 中 底部 Dock 样式的布局
    - 通过监听鼠标移动，得到移动的距离相对该元素的比例
    - 通过该比例判断鼠标更加靠左还是靠右
    - 越靠近的元素放大倍数越大，于是通过这样的方式可以变化移动时的大小
    - 点击之后也会有弹跳 Active 效果
11. 第十一个练习：完成透视滚动效果（仿 Apple 官网 Homepod 页面）
    - 完成滚动逐渐显示各透视部分的效果
    - 主要用到 sticky 定位、scroll 监听和 setProperty() 函数

## 可能需要的技术

+ Git 分支、推送、拉取、更新、钩子

+ Node.js

+ Node 包管理器 npm

+ Axios

+ Serve

+ Koa 快速搭建一个 Serve

+ uglify.js

+ Webpack

+ Vue 全家桶

+ TypeScript

+ Echarts

+ xlsx.core.min.js