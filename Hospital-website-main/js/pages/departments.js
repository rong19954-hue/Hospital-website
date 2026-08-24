// 科室页面专用逻辑
document.addEventListener('DOMContentLoaded', function() {
  renderTopBar();
  renderNavbar();
  renderDepartmentDetails();
  renderFooter();
  checkDepartmentParam();
});

// 扩展科室数据
const departmentDetails = {
  internalMedicine: [
    { icon: "fas fa-heart", name: "心血管内科", desc: "冠心病、高血压、心律失常", doctors: "28位专家", beds: "120张床位" },
    { icon: "fas fa-lungs", name: "呼吸内科", desc: "哮喘、慢阻肺、肺部感染", doctors: "20位专家", beds: "85张床位" },
    { icon: "fas fa-brain", name: "神经内科", desc: "脑血管病、帕金森、癫痫", doctors: "24位专家", beds: "95张床位" },
    { icon: "fas fa-stomach", name: "消化内科", desc: "胃肠疾病、肝病、胰腺炎", doctors: "22位专家", beds: "90张床位" }
  ],
  surgery: [
    { icon: "fas fa-bone", name: "骨科中心", desc: "关节置换、脊柱外科、运动医学", doctors: "30位专家", beds: "150张床位" },
    { icon: "fas fa-heart", name: "心血管外科", desc: "心脏搭桥、瓣膜手术、介入治疗", doctors: "18位专家", beds: "80张床位" },
    { icon: "fas fa-brain", name: "神经外科", desc: "脑肿瘤、脑血管畸形、脊柱神经", doctors: "20位专家", beds: "75张床位" },
    { icon: "fas fa-cut", name: "普外科", desc: "腹腔镜手术、甲状腺、乳腺", doctors: "25位专家", beds: "100张床位" }
  ],
  specialCenters: [
    { icon: "fas fa-microscope", name: "肿瘤中心", desc: "放疗、化疗、靶向治疗、免疫治疗", doctors: "35位专家", beds: "200张床位" },
    { icon: "fas fa-child", name: "儿科中心", desc: "新生儿科、儿科重症、儿童保健", doctors: "26位专家", beds: "110张床位" },
    { icon: "fas fa-female", name: "妇产科中心", desc: "产科、妇科肿瘤、生殖医学", doctors: "28位专家", beds: "130张床位" },
    { icon: "fas fa-eye", name: "眼科中心", desc: "白内障、青光眼、近视矫正", doctors: "16位专家", beds: "50张床位" },
    { icon: "fas fa-teeth", name: "口腔科", desc: "种植牙、正畸、口腔颌面外科", doctors: "14位专家", beds: "30张床位" },
    { icon: "fas fa-dna", name: "基因检测中心", desc: "遗传病筛查、肿瘤基因检测", doctors: "12位专家", beds: "20张床位" }
  ]
};

// 渲染科室详情
function renderDepartmentDetails() {
  renderCategory('internalMedicine', departmentDetails.internalMedicine);
  renderCategory('surgery', departmentDetails.surgery);
  renderCategory('specialCenters', departmentDetails.specialCenters);
}

function renderCategory(containerId, departments) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = departments.map(dept => `
    <div class="dept-card" onclick="viewDepartment('${dept.name}')">
      <i class="${dept.icon}"></i>
      <h4>${dept.name}</h4>
      <p>${dept.desc}</p>
      <div class="dept-info">
        <span><i class="fas fa-user-md"></i> ${dept.doctors}</span>
        <span><i class="fas fa-bed"></i> ${dept.beds}</span>
      </div>
    </div>
  `).join('');
}

// 检查URL参数并高亮对应科室
function checkDepartmentParam() {
  const urlParams = new URLSearchParams(window.location.search);
  const dept = urlParams.get('dept');
  if (dept) {
    setTimeout(() => {
      const cards = document.querySelectorAll('.dept-card h4');
      cards.forEach(card => {
        if (card.textContent === dept) {
          card.closest('.dept-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.closest('.dept-card').style.backgroundColor = '#f0f9ff';
          card.closest('.dept-card').style.borderColor = '#0e7490';
        }
      });
    }, 500);
  }
}

// 查看科室详情
function viewDepartment(deptName) {
  console.log('查看科室:', deptName);
  // 可以跳转到科室详情页或打开模态框
  window.location.href = `appointment.html?dept=${encodeURIComponent(deptName)}`;
}