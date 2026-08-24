// 医生页面专用逻辑
document.addEventListener('DOMContentLoaded', function() {
  renderTopBar();
  renderNavbar();
  renderDoctors(extendedDoctors);
  renderFooter();
});

// 扩展医生数据
const extendedDoctors = [
  {
    name: "Dr. Emily Carter",
    title: "主任医师 · 教授",
    specialty: "心血管内科",
    category: "internal",
    country: "美国",
    experience: "25年",
    languages: ["英语", "中文"],
    rating: 4.9,
    patients: 15000,
    avatar: "fas fa-user-md"
  },
  {
    name: "Dr. 王立群",
    title: "主任医师 · 博士生导师",
    specialty: "神经外科",
    category: "surgery",
    country: "中国",
    experience: "30年",
    languages: ["中文", "英语"],
    rating: 4.8,
    patients: 20000,
    avatar: "fas fa-user-md"
  },
  {
    name: "Dr. Anika Patel",
    title: "副主任医师",
    specialty: "肿瘤内科",
    category: "oncology",
    country: "英国",
    experience: "18年",
    languages: ["英语", "印地语"],
    rating: 4.7,
    patients: 12000,
    avatar: "fas fa-user-md"
  },
  {
    name: "Dr. Michael Ross",
    title: "主任医师",
    specialty: "骨科",
    category: "surgery",
    country: "德国",
    experience: "22年",
    languages: ["德语", "英语"],
    rating: 4.9,
    patients: 18000,
    avatar: "fas fa-user-md"
  },
  {
    name: "Dr. 李梅",
    title: "主任医师 · 教授",
    specialty: "儿科",
    category: "pediatrics",
    country: "中国",
    experience: "28年",
    languages: ["中文", "英语"],
    rating: 4.8,
    patients: 22000,
    avatar: "fas fa-user-md"
  },
  {
    name: "Dr. Sarah Johnson",
    title: "副主任医师",
    specialty: "妇产科",
    category: "obgyn",
    country: "美国",
    experience: "20年",
    languages: ["英语"],
    rating: 4.6,
    patients: 16000,
    avatar: "fas fa-user-md"
  },
  {
    name: "Dr. 张伟",
    title: "主任医师",
    specialty: "消化内科",
    category: "internal",
    country: "中国",
    experience: "26年",
    languages: ["中文"],
    rating: 4.7,
    patients: 19000,
    avatar: "fas fa-user-md"
  },
  {
    name: "Dr. David Chen",
    title: "主任医师 · 教授",
    specialty: "心脏外科",
    category: "surgery",
    country: "新加坡",
    experience: "27年",
    languages: ["英语", "中文"],
    rating: 4.9,
    patients: 17000,
    avatar: "fas fa-user-md"
  }
];

// 渲染医生列表
function renderDoctors(doctors) {
  const doctorsGrid = document.getElementById('doctorsGrid');
  if (!doctorsGrid) return;
  
  doctorsGrid.innerHTML = doctors.map(doctor => `
    <div class="doctor-profile-card" onclick="viewDoctorProfile('${doctor.name}')">
      <div class="doctor-header">
        <div class="doctor-avatar-large">
          <i class="${doctor.avatar}"></i>
        </div>
      </div>
      <div class="doctor-body">
        <h3 class="doctor-name">${doctor.name}</h3>
        <p class="doctor-title">${doctor.title}</p>
        <p class="doctor-specialty">${doctor.specialty}</p>
        
        <div class="rating">
          ${generateStars(doctor.rating)}
          <span style="color: #64748b; font-size: 0.85rem;">${doctor.rating}</span>
        </div>
        
        <div class="doctor-meta">
          <span><i class="fas fa-flag"></i> ${doctor.country}</span>
          <span><i class="fas fa-briefcase"></i> ${doctor.experience}</span>
          <span><i class="fas fa-users"></i> ${doctor.patients.toLocaleString()}人</span>
        </div>
        
        <div class="doctor-actions">
          <button class="btn-primary" onclick="event.stopPropagation(); openAppointmentWithDoctor('${doctor.name}')">
            <i class="fas fa-calendar-check"></i> 预约
          </button>
          <button class="btn-outline" onclick="event.stopPropagation(); viewDoctorProfile('${doctor.name}')">
            <i class="fas fa-user"></i> 详情
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// 生成星级评分
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }
  
  if (halfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }
  
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }
  
  return stars;
}

// 筛选医生
function filterDoctors(category, btn) {
  // 更新按钮状态
  document.querySelectorAll('.filter-btn').forEach(button => {
    button.classList.remove('active');
    button.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');
  
  // 筛选医生
  let filteredDoctors;
  if (category === 'all') {
    filteredDoctors = extendedDoctors;
  } else {
    filteredDoctors = extendedDoctors.filter(doctor => doctor.category === category);
  }
  
  renderDoctors(filteredDoctors);
}

// 查看医生详情
function viewDoctorProfile(doctorName) {
  console.log('查看医生:', doctorName);
  // 可以跳转到医生详情页或打开模态框
  showToast(`正在加载${doctorName}的详细资料...`);
}

// 预约指定医生
function openAppointmentWithDoctor(doctorName) {
  window.location.href = `appointment.html?doctor=${encodeURIComponent(doctorName)}`;
}
