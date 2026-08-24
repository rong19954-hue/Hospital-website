// 预约挂号相关功能
class AppointmentSystem {
  constructor() {
    this.appointments = [];
    this.init();
  }
  
  init() {
    this.loadAppointments();
    this.bindAppointmentForm();
    this.configureForm();
  }
  
  loadAppointments() {
    // 从localStorage加载预约数据
    try {
      const saved = localStorage.getItem('appointments');
      this.appointments = saved ? JSON.parse(saved) : [];
    } catch (error) {
      this.appointments = [];
    }
  }
  
  saveAppointments() {
    try {
      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    } catch (error) {
      // 隐私模式下存储可能不可用，但不影响当前预约反馈。
    }
  }

  configureForm() {
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
      const today = new Date();
      const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split('T')[0];
      dateInput.min = localDate;
    }

    const params = new URLSearchParams(window.location.search);
    const department = params.get('dept');
    const doctor = params.get('doctor');
    const departmentSelect = document.getElementById('departmentSelect');
    const doctorSelect = document.getElementById('doctorSelect');
    if (department && departmentSelect) departmentSelect.value = department;
    if (doctor && doctorSelect) doctorSelect.value = doctor;

    const syncDoctors = () => {
      if (!departmentSelect || !doctorSelect) return;
      const selectedDepartment = departmentSelect.value;
      let currentDoctorIsAvailable = !doctorSelect.value;

      Array.from(doctorSelect.options).forEach((option, index) => {
        if (index === 0) return;
        const matches = !selectedDepartment || option.dataset.department === selectedDepartment;
        option.hidden = !matches;
        option.disabled = !matches;
        if (matches && option.value === doctorSelect.value) currentDoctorIsAvailable = true;
      });

      if (!currentDoctorIsAvailable) doctorSelect.value = '';
    };

    departmentSelect?.addEventListener('change', syncDoctors);
    syncDoctors();
  }
  
  bindAppointmentForm() {
    const form = document.getElementById('appointmentForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.createAppointment();
      });
    }
  }
  
  createAppointment() {
    const formData = {
      name: document.getElementById('patientName')?.value,
      phone: document.getElementById('patientPhone')?.value,
      department: document.getElementById('departmentSelect')?.value,
      doctor: document.getElementById('doctorSelect')?.value,
      date: document.getElementById('appointmentDate')?.value,
      time: document.getElementById('appointmentTime')?.value,
      notes: document.getElementById('notes')?.value || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // 验证
    if (!formData.name || !formData.phone || !formData.department || !formData.date || !formData.time) {
      this.showMessage('请填写完整信息', 'warning');
      return;
    }

    if (!/^\+?[\d\s()-]{7,20}$/.test(formData.phone.trim())) {
      this.showMessage('请输入有效的联系电话', 'warning');
      document.getElementById('patientPhone')?.focus();
      return;
    }
    
    this.appointments.push(formData);
    this.saveAppointments();
    this.showMessage('预约成功！我们会尽快与您联系确认。', 'success');
    
    // 重置表单
    document.getElementById('appointmentForm')?.reset();
  }
  
  showMessage(message, type = 'info') {
    const alertClass = `alert-${type}`;
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert ${alertClass}`;
    messageDiv.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
    
    const container = document.getElementById('messageContainer');
    if (container) {
      container.innerHTML = '';
      container.appendChild(messageDiv);
      messageDiv.setAttribute('role', type === 'success' ? 'status' : 'alert');
      messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => messageDiv.remove(), 5000);
    }
  }
  
  getAppointments() {
    return this.appointments;
  }
}

// 初始化预约系统
const appointmentSystem = new AppointmentSystem();
