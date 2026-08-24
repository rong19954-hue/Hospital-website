# Hospital-website

## 项目功能

- 响应式首页与移动端折叠菜单
- 医院服务、特色科室和专家团队展示
- 医生科室筛选
- 科室详情与预约跳转
- 预约挂号表单
- 科室与医生联动选择
- 预约日期、手机号和必填项验证
- 国际医疗服务介绍
- Toast 消息和表单状态反馈
- 键盘焦点与减少动画等无障碍支持

## 技术栈

- HTML5
- CSS3
- 原生 JavaScript（ES6）
- Font Awesome 6 图标库（CDN）
- 浏览器 `localStorage` 本地存储

## 目录结构

```text
Hospital-website-main/
├─ index.html                    # 网站首页
├─ README.md                     # 项目说明
├─ css/
│  ├─ style.css                  # 全局基础样式
│  ├─ components.css             # 通用组件样式
│  ├─ responsive.css             # 响应式样式
│  ├─ modern.css                 # 现代视觉与交互增强
│  └─ pages/
│     ├─ appointment.css         # 预约页面样式
│     ├─ departments.css         # 科室页面样式
│     ├─ doctors.css             # 医生页面样式
│     └─ international.css       # 国际医疗页面样式
├─ js/
│  ├─ data.js                    # 医院、科室、医生和统计数据
│  ├─ main.js                    # 导航、首页和公共组件逻辑
│  ├─ appointment.js             # 预约表单逻辑
│  └─ pages/
│     ├─ departments.js          # 科室页面逻辑
│     └─ doctors.js              # 医生筛选和展示逻辑
└─ pages/
   ├─ appointment.html           # 预约挂号页面
   ├─ departments.html           # 科室导航页面
   ├─ doctors.html               # 专家团队页面
   └─ international.html         # 国际医疗页面
```

## 运行项目

### 方法一：直接打开

双击根目录中的 `index.html`，即可使用浏览器打开网站。

### 方法二：使用 VS Code Live Server

1. 使用 VS Code 打开项目目录。
2. 安装 `Live Server` 扩展。
3. 右键 `index.html`。
4. 选择 **Open with Live Server**。

使用本地服务器运行可以减少浏览器缓存和本地文件路径造成的问题。

## 修改网站内容

### 医院基本信息

编辑 `js/data.js` 中的 `HOSPITAL_DATA.info`：

### 首页医生数据

编辑 `js/data.js` 中的 `HOSPITAL_DATA.doctors`。

### 医生筛选数据

编辑 `js/pages/doctors.js` 中的 `extendedDoctors`。


新增医生后，还需要在 `pages/appointment.html` 的医生下拉选项中添加对应医生，并使用 `data-department` 标明所属科室：

```html
<option value="Dr. 张医生" data-department="儿科">
  Dr. 张医生 - 儿科
</option>
```

### 科室数据

- 首页科室：`js/data.js`
- 科室详情：`js/pages/departments.js`
- 预约科室选项：`pages/appointment.html`

修改时应保持三个位置的科室名称一致。

### 视觉样式

- 基础配色与布局：`css/style.css`
- 通用组件：`css/components.css`
- 现代视觉覆盖：`css/modern.css`
- 手机和平板适配：`css/responsive.css`

## 预约数据说明

当前项目是纯前端静态网站，没有连接服务器或数据库。提交的预约信息仅保存在当前浏览器的 `localStorage` 中：

## 浏览器支持

建议使用较新版本的：

- Microsoft Edge
- Google Chrome
- Firefox
- Safari
