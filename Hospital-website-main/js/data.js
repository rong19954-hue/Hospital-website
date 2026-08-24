// 医院数据配置文件
const HOSPITAL_DATA = {
  // 医院基本信息
  info: {
    name: "全球健康医疗中心",
    phone: "+86 577 8888 9999",
    email: "intl@rmedical.com",
    address: "浙江省温州市瓯海区",
    emergencyPhone: "+86 577 8888 9999"
  },

  // 顶部导航链接
  navLinks: [
    { text: "首页", icon: "fas fa-home", href: "index.html" },
    { text: "科室", icon: "fas fa-stethoscope", href: "pages/departments.html" },
    { text: "专家团队", icon: "fas fa-user-md", href: "pages/doctors.html" },
    { text: "预约挂号", icon: "fas fa-calendar-check", href: "pages/appointment.html" },
    { text: "国际医疗", icon: "fas fa-globe-americas", href: "pages/international.html" }
  ],

  // 快速操作卡片
  quickActions: [
    { icon: "fas fa-calendar-alt", title: "预约挂号", desc: "线上预约 免排队" },
    { icon: "fas fa-file-medical-alt", title: "报告查询", desc: "电子报告实时看" },
    { icon: "fas fa-pills", title: "药品配送", desc: "国际药品直邮" },
    { icon: "fas fa-ambulance", title: "急救服务", desc: "24小时急救中心" },
    { icon: "fas fa-comments", title: "在线咨询", desc: "多语言客服支持" }
  ],

  // 科室数据
  departments: [
    { icon: "fas fa-child", name: "儿科" },
    { icon: "fas fa-eye", name: "眼科" },
    { icon: "fas fa-teeth", name: "口腔科" },
  ],

  // 医生数据
  doctors: [
    { name: "Dr. 张医生", specialty: "儿科", country: "中国", status: "可预约" },
    { name: "Dr. 王医生", specialty: "眼科", country: "中国", status: "可预约" },
    { name: "Dr. 黄医生", specialty: "口腔科", country: "中国", status: "可预约" },
  ],

  // 统计数字
  stats: {
    doctors: 500,
    departments: 35,
    countries: 60,
    internationalCases: 1200,
    insurancePartners: 45,
    languages: 20
  }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HOSPITAL_DATA;
}
