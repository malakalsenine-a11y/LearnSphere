fetch('./data/data.json')
  .then(res => res.json())
  .then(data => {

    // ===== Stats =====
document.getElementById('coursesCount').innerText = data.stats.totalCourses;
document.getElementById('studentsCount').innerText = data.stats.studentsEnrolled;
document.getElementById('instructorsCount').innerText = data.stats.instructors;

    // ===== Featured Courses (أول 3 فقط) =====
    const featured = document.getElementById('featuredCourses');

    const firstThree = data.courses.slice(0, 3);

    featured.innerHTML = firstThree.map(course => `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm p-3">

          <h5>${course.title}</h5>

          <span class="badge bg-info">${course.category}</span>

          <p class="mt-2">👨‍🏫 ${course.instructor}</p>

          <p>
            ${"⭐".repeat(course.rating)}${"☆".repeat(5 - course.rating)}
          </p>

          <p>⏱ ${course.duration}</p>

          <span class="badge bg-warning text-dark">${course.level}</span>

          <button class="btn btn-success w-100 mt-3">
            Enroll Now
          </button>

        </div>
      </div>
    `).join('');


    // ===== Categories (من JSON + icons نحددها هنا) =====
    
    const iconMap = {
      "Web Development": "fa-solid fa-code",
      "Data Science": "fa-solid fa-chart-line",
      "Design": "fa-solid fa-palette",
      "Cybersecurity": "fa-solid fa-shield-halved",
      "Mobile Dev": "fa-solid fa-mobile-screen",
      "DevOps": "fa-solid fa-gears"
    };

    const colorMap = {
  "Web Development": "primary",
  "Data Science": "success",
  "Design": "warning",
  "Cybersecurity": "danger",
  "Mobile Dev": "info",
  "DevOps": "dark"
};

    const categories = data.categories;
    const row = document.getElementById("categories-row");

    row.innerHTML = categories.map(cat => `
      <div class="col-md-4 mb-4">
        <div class="category-card text-center p-4">

          <div class="icon-box">
<i class="${iconMap[cat.name]} text-${colorMap[cat.name]}"></i>          </div>

          <h5 class="mt-3 fw-bold">${cat.name}</h5>
          <p class="text-muted">${cat.count} Courses</p>

        </div>
      </div>
    `).join('');


    // ===== Navbar badge count (مؤقت) =====
document.getElementById('count').innerText = data.stats.totalCourses;
  });

// ===== Email Validation =====
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


// ===== Subscribe =====
function subscribeUser() {
  const emailInput = document.getElementById("emailInput");
  const messageEl = document.getElementById("subscribeMessage");

  const email = emailInput.value.trim();

  if (email === "") {
    messageEl.style.display = "block";
    messageEl.style.color = "red";
    messageEl.textContent = "Please enter your email.";
    setTimeout(() => messageEl.style.display = "none", 3000);
    return;
  }

  if (!isValidEmail(email)) {
    messageEl.style.display = "block";
    messageEl.style.color = "red";
    messageEl.textContent = "Please enter a valid email address.";
    setTimeout(() => messageEl.style.display = "none", 3000);
    return;
  }

  messageEl.style.display = "block";
  messageEl.style.color = "lightgreen";
  messageEl.textContent = "Thank you for subscribing!";

  setTimeout(() => messageEl.style.display = "none", 3000);

  emailInput.value = "";
}









// Dark Mode

const toggleBtn = document.getElementById("toggle_btn");
const body = document.body;

// استعادة الوضع من localStorage
const savedTheme = localStorage.getItem("theme");

// إذا الوضع المحفوظ هو dark
if (savedTheme === "dark") {
  body.classList.add("dark");
  toggleBtn.checked = true; // خلي الـ checkbox checked
}

// حدث عند التغيير
toggleBtn.addEventListener("change", () => {
  body.classList.toggle("dark");

  // حفظ الوضع
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});