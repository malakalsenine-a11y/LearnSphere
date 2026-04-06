fetch('./data/data.json')
  .then(res => res.json())
  .then(data => {
    // ===== Stats =====
    document.getElementById('coursesCount').innerText = data.stats.courses;
    document.getElementById('studentsCount').innerText = data.stats.students;
    document.getElementById('instructorsCount').innerText = data.stats.instructors;

    // ===== Featured Courses =====
    const featured = document.getElementById('featuredCourses');
    featured.innerHTML = data.courses.map(course => `
      <div class="col-md-4 mb-3">
        <div class="card p-3 shadow-sm">
          <h5>${course.title}</h5>
          <span class="badge bg-info">${course.category}</span>
          <p class="mt-2">Instructor: ${course.instructor}</p>
          <p>Rating: ${"⭐".repeat(course.rating)}</p>
          <p>Duration: ${course.duration}</p>
          <span class="badge bg-warning text-dark">${course.level}</span>
        </div>
      </div>
    `).join('');

    // ===== Categories =====
const categories = [
  { name: "Web Development", icon: "fa-solid fa-code", count: 24 },
  { name: "Data Science", icon: "fa-solid fa-chart-line", count: 18 },
  { name: "Design", icon: "fa-solid fa-palette", count: 12 },
  { name: "Cybersecurity", icon: "fa-solid fa-shield-halved", count: 8 },
  { name: "Mobile Dev", icon: "fa-solid fa-mobile-screen", count: 15 },
  { name: "DevOps", icon: "fa-solid fa-gears", count: 10 }
];

const row = document.getElementById("categories-row");

categories.forEach(cat => {
  row.innerHTML += `
    <div class="col-md-4 mb-4">
      <div class="category-card text-center p-4">

        <div class="icon-box">
          <i class="${cat.icon}"></i>
        </div>

        <h5 class="mt-3 fw-bold">${cat.name}</h5>
        <p class="text-muted">${cat.count} Courses</p>

      </div>
    </div>
  `;
});

    // ===== Navbar badge count =====
    document.getElementById('count').innerText = data.courses.length;
  });



  // للتحقق من صحة الايميل 
  function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ===== Subscribe function =====
function subscribeUser() {
  const emailInput = document.getElementById("emailInput");
  const messageEl = document.getElementById("subscribeMessage");

  const email = emailInput.value.trim();

  // تحقق من الحقل فارغ
  if (email === "") {
    messageEl.style.display = "block";
    messageEl.style.color = "red";
    messageEl.textContent = "Please enter your email.";

    // اختفاء الرسالة بعد 3 ثواني
    setTimeout(() => {
      messageEl.style.display = "none";
    }, 3000);

    return;
  }

  // تحقق من صحة الإيميل
  if (!isValidEmail(email)) {
    messageEl.style.display = "block";
    messageEl.style.color = "red";
    messageEl.textContent = "Please enter a valid email address.";

    // اختفاء الرسالة بعد 3 ثواني
    setTimeout(() => {
      messageEl.style.display = "none";
    }, 3000);

    return;
  }

  // رسالة نجاح
  messageEl.style.display = "block";
  messageEl.style.color = "lightgreen";
  messageEl.textContent = "Thank you for subscribing!";

  // اختفاء الرسالة بعد 3 ثواني
  setTimeout(() => {
    messageEl.style.display = "none";
  }, 3000);

  // افرغي الحقل
  emailInput.value = "";
}