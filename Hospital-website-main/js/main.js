// 主JavaScript逻辑
document.addEventListener('DOMContentLoaded', function() {
  // 渲染顶部信息栏
  renderTopBar();
  // 渲染导航栏
  renderNavbar();
  // 渲染英雄区域
  renderHeroSection();
  // 渲染快速操作
  renderQuickActions();
  // 渲染科室
  renderDepartments();
  // 渲染国际医疗部分
  renderInternationalSection();
  // 渲染医生团队
  renderFeaturedDoctors();
  // 渲染页脚
  renderFooter();
  
  // 绑定事件
  bindEvents();
});

// 根据当前页面层级生成正确链接，避免子页面出现 pages/pages/... 路径。
function pageUrl(fileName) {
  const inPagesDirectory = window.location.pathname.replace(/\\/g, '/').includes('/pages/');
  return inPagesDirectory ? fileName : `pages/${fileName}`;
}

function homeUrl() {
  return window.location.pathname.replace(/\\/g, '/').includes('/pages/') ? '../index.html' : 'index.html';
}

// 渲染顶部信息栏
function renderTopBar() {
  const topBar = document.getElementById('topBar');
  if (!topBar) return;
  
  topBar.innerHTML = `
    <div class="top-bar">
      <div>
        <i class="fas fa-shield-heart"></i> 国际医疗援助热线：<a href="tel:${HOSPITAL_DATA.info.emergencyPhone.replace(/[^+\d]/g, '')}">${HOSPITAL_DATA.info.emergencyPhone}</a>
        <a href="mailto:${HOSPITAL_DATA.info.email}"><i class="fas fa-envelope"></i>${HOSPITAL_DATA.info.email}</a>
      </div>
      <div>
        <span><i class="fas fa-clock"></i> 24小时服务</span>
      </div>
    </div>
  `;
}

// 渲染导航栏
function renderNavbar() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  
  const links = [
    { text: '首页', icon: 'fas fa-house', href: homeUrl() },
    { text: '科室', icon: 'fas fa-stethoscope', href: pageUrl('departments.html') },
    { text: '专家团队', icon: 'fas fa-user-doctor', href: pageUrl('doctors.html') },
    { text: '国际医疗', icon: 'fas fa-earth-asia', href: pageUrl('international.html') }
  ];
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = links.map(link => 
    `<a href="${link.href}" class="${link.href.endsWith(currentFile) ? 'active' : ''}"><i class="${link.icon}"></i><span>${link.text}</span></a>`
  ).join('');
  
  nav.innerHTML = `
    <div class="navbar">
      <a class="logo-area" href="${homeUrl()}" aria-label="国际医疗中心首页">
        <div class="logo-icon">
          <i class="fas fa-heart-pulse"></i>
        </div>
        <div><div class="logo-text">国际<span>医疗</span></div><small class="logo-subtitle">GLOBAL MEDICAL CENTER</small></div>
      </a>
      <button class="mobile-menu-btn" type="button" aria-label="打开导航菜单" aria-expanded="false" aria-controls="primaryNavigation">
        <i class="fas fa-bars"></i>
      </button>
      <div class="nav-links" id="primaryNavigation">
        ${navLinks}
        <button class="btn-primary" onclick="openAppointment()">
          <i class="fas fa-calendar-plus"></i> 快速预约
        </button>
      </div>
    </div>
  `;

  const menuButton = nav.querySelector('.mobile-menu-btn');
  const menu = nav.querySelector('.nav-links');
  menuButton?.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? '关闭导航菜单' : '打开导航菜单');
    menuButton.querySelector('i').className = isOpen ? 'fas fa-xmark' : 'fas fa-bars';
  });
}

// 渲染英雄区域
function renderHeroSection() {
  const hero = document.getElementById('heroSection');
  if (!hero) return;
  
  hero.innerHTML = `
    <section class="hero-section">
      <div class="hero-content">
        <span class="hero-highlight"><i class="fas fa-shield-heart"></i> 全球医疗网络 · 一站式诊疗服务</span>
        <h1>让世界级医疗，<br><span>离您更近</span></h1>
        <p>连接优质医疗资源，为每位患者提供清晰、安心且有人情味的诊疗体验。支持多语言服务、跨境转诊与保险直付。</p>
        <div class="hero-buttons">
          <button class="btn-primary" onclick="openAppointment()">
            <i class="fas fa-calendar-check"></i> 预约专家
          </button>
          <button class="btn-outline" onclick="showOnlineConsultation()">
            <i class="fas fa-video"></i> 在线问诊
          </button>
        </div>
      </div>
      <div class="hero-image">
        <div class="stat-item">
          <div class="stat-icon"><i class="fas fa-user-md"></i></div>
          <div class="stat-text">
            <h4>${HOSPITAL_DATA.stats.doctors}+</h4>
            <p>国际认证医生</p>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon"><i class="fas fa-procedures"></i></div>
          <div class="stat-text">
            <h4>${HOSPITAL_DATA.stats.departments}</h4>
            <p>专科中心</p>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon"><i class="fas fa-globe"></i></div>
          <div class="stat-text">
            <h4>${HOSPITAL_DATA.stats.countries}+</h4>
            <p>合作国家地区</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

// 渲染快速操作
function renderQuickActions() {
  const quickActions = document.getElementById('quickActions');
  if (!quickActions) return;
  
  const actions = HOSPITAL_DATA.quickActions.map(action => `
    <button type="button" class="action-card" onclick="handleQuickAction('${action.title}')" aria-label="${action.title}：${action.desc}">
      <i class="${action.icon}"></i>
      <h3>${action.title}</h3>
      <p>${action.desc}</p>
    </button>
  `).join('');
  
  quickActions.innerHTML = `<div class="quick-actions">${actions}</div>`;
}

// 渲染科室
function renderDepartments() {
  const deptSection = document.getElementById('departmentsSection');
  if (!deptSection) return;
  
  const departments = HOSPITAL_DATA.departments.map(dept => `
    <button type="button" class="dept-item" onclick="viewDepartment('${dept.name}')">
      <i class="${dept.icon}"></i>
      <span>${dept.name}</span>
    </button>
  `).join('');
  
  deptSection.innerHTML = `
    <div class="department-section">
      <h2 class="section-title">
        <i class="fas fa-chevron-circle-right" style="color: #0e7490;"></i> 特色科室
      </h2>
      <p class="section-subtitle">多学科联合诊疗 · 国际标准</p>
      <div class="dept-grid">${departments}</div>
    </div>
  `;
}

// 渲染国际医疗部分
function renderInternationalSection() {
  const intlSection = document.getElementById('internationalSection');
  if (!intlSection) return;
  
  intlSection.innerHTML = `
    <div class="international-section">
      <div class="international-text">
        <h2><i class="fas fa-globe-americas"></i> 国际医疗与跨境转诊</h2>
        <p>我们与世界知名医院（梅奥诊所、约翰霍普金斯等）建立合作，提供远程会诊、海外就医、医疗签证协助。多语言翻译随行。</p>
        <div class="flag-icons">
          <i class="fas fa-flag-usa"></i>
          <i class="fas fa-flag"></i>
          <i class="fas fa-flag-checkered"></i>
          <i class="fas fa-flag"></i>
        </div>
      </div>
      <div class="global-stats">
        <div class="global-stat">
          <h3>${HOSPITAL_DATA.stats.internationalCases}+</h3>
          <p>跨境转诊案例</p>
        </div>
        <div class="global-stat">
          <h3>${HOSPITAL_DATA.stats.insurancePartners}</h3>
          <p>合作国际保险</p>
        </div>
        <div class="global-stat">
          <h3>${HOSPITAL_DATA.stats.languages}</h3>
          <p>语言服务支持</p>
        </div>
      </div>
    </div>
  `;
}

// 渲染医生团队
function renderFeaturedDoctors() {
  const doctorsSection = document.getElementById('doctorsSection');
  if (!doctorsSection) return;
  
  const doctors = HOSPITAL_DATA.doctors.map(doctor => `
    <div class="doctor-card">
      <div class="doctor-avatar"><i class="fas fa-user-md"></i></div>
      <h4>${doctor.name}</h4>
      <p>${doctor.specialty} · ${doctor.country}</p>
      <span class="badge">${doctor.status}</span>
    </div>
  `).join('');
  
  doctorsSection.innerHTML = `
    <div class="doctors-section">
      <h2 class="section-title"><i class="fas fa-users"></i> 国际专家团队</h2>
      <p class="section-subtitle">来自全球顶尖医学院的主任医师</p>
      <div class="doctor-cards">${doctors}</div>
    </div>
  `;
}

// 渲染页脚
function renderFooter() {
  const footer = document.getElementById('mainFooter');
  if (!footer) return;
  
  footer.innerHTML = `
    <footer class="footer">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>${HOSPITAL_DATA.info.name}</h4>
          <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 10px;">
            致力于提供世界一流的医疗服务，连接全球医疗资源。
          </p>
          <p><i class="fas fa-map-marker-alt"></i> ${HOSPITAL_DATA.info.address}</p>
        </div>
        <div class="footer-col">
          <h4>快速链接</h4>
          <a href="${pageUrl('international.html')}">关于国际医疗</a>
          <a href="${pageUrl('international.html')}">国际保险直付</a>
          <a href="${pageUrl('international.html')}">医疗签证</a>
          <a href="${pageUrl('international.html')}">远程会诊</a>
        </div>
        <div class="footer-col">
          <h4>患者服务</h4>
          <a href="${pageUrl('appointment.html')}">预约挂号</a>
          <a href="${pageUrl('departments.html')}">科室导航</a>
          <a href="${pageUrl('doctors.html')}">专家团队</a>
          <a href="mailto:${HOSPITAL_DATA.info.email}">意见反馈</a>
        </div>
        <div class="footer-col">
          <h4>联系我们</h4>
          <a href="tel:${HOSPITAL_DATA.info.phone.replace(/[^+\d]/g, '')}"><i class="fas fa-phone"></i> ${HOSPITAL_DATA.info.phone}</a>
          <a href="mailto:${HOSPITAL_DATA.info.email}"><i class="fas fa-envelope"></i> ${HOSPITAL_DATA.info.email}</a>
          <span><i class="fas fa-clock"></i> 24小时急诊</span>
        </div>
      </div>
    </footer>
  `;
}

// 绑定事件
function bindEvents() {
  // 这里可以添加其他交互事件
}

// 处理快速操作点击
function handleQuickAction(action) {
  console.log('快速操作:', action);
  // 根据不同的操作进行跳转或显示模态框
  switch(action) {
    case '预约挂号':
      openAppointment();
      break;
    case '在线咨询':
      showOnlineConsultation();
      break;
    default:
      showToast(`正在打开${action}...`);
  }
}

// 打开预约页面
function openAppointment() {
  window.location.href = pageUrl('appointment.html');
}

// 查看科室
function viewDepartment(deptName) {
  console.log('查看科室:', deptName);
  window.location.href = `${pageUrl('departments.html')}?dept=${encodeURIComponent(deptName)}`;
}

// 显示在线咨询
function showOnlineConsultation() {
  showToast('在线咨询功能即将上线，敬请期待！');
}

// 显示提示消息
function showToast(message) {
  // 创建toast元素
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // 3秒后移除
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
