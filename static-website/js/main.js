// ===== Counter Animation =====
function animateCounter(id, target) {
  let count = 0;
  const speed = 50;
  const increment = target / speed;

  const element = document.getElementById(id);

  const update = () => {
    count += increment;

    if (count < target) {
      element.innerText = Math.floor(count);
      requestAnimationFrame(update);
    } else {
      element.innerText = target;
    }
  };

  update();
}


// ===== Fetch Data =====
fetch('./data/data.json')
  .then(res => res.json())
  .then(data => {

    // ===== Stats (مع الحركة) =====
    animateCounter("coursesCount", data.stats.totalCourses);
    animateCounter("studentsCount", data.stats.studentsEnrolled);
    animateCounter("instructorsCount", data.stats.instructors);


    // ===== Featured Courses =====
    const featured = document.getElementById('featuredCourses');

    const firstThree = data.courses.slice(0, 3);

    featured.innerHTML = firstThree.map(course => `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm p-3">

          <h5>${course.title}</h5>

          <span class="badge bg-info">${course.category}</span>

          <p class="mt-2">
            <i class="fa-solid fa-chalkboard-user me-2 text-primary"></i>
            ${course.instructor}
          </p>

          <p class="text-warning stars">
            ${generateStars(course.rating)} (${course.rating})
          </p>

          <p>
            <i class="fa-regular fa-clock me-2 text-secondary"></i>
            ${course.duration}
          </p>

          <p>
            <i class="fa-solid fa-signal me-2 text-dark"></i>
            <span class="badge bg-warning text-dark">${course.level}</span>
          </p>

          <button class="btn btn-success w-100 mt-3">
            <i class="fa-solid fa-user-plus me-2"></i>
            Enroll Now
          </button>

        </div>
      </div>
    `).join('');

    function generateStars(rating) {
      let starsHTML = "";
      const fullStars = Math.floor(rating);

      for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
          starsHTML += `<i class="fa-solid fa-star"></i>`;
        } else {
          starsHTML += `<i class="fa-regular fa-star"></i>`;
        }
      }

      return starsHTML;
    }


    // ===== Categories =====
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
            <i class="${iconMap[cat.name]} text-${colorMap[cat.name]}"></i>
          </div>

          <h5 class="mt-3 fw-bold">${cat.name}</h5>
          <p class="text-muted">${cat.count || cat.courseCount} Courses</p>

        </div>
      </div>
    `).join('');


    // ===== Navbar badge count =====
    updateNavbarCount();
  });


// ===== Navbar Count =====
function updateNavbarCount() {
  const enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];
  document.getElementById("count").innerText = enrolled.length;
}


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


// ===== Dark Mode =====
const toggleBtn = document.getElementById("toggle_btn");
const body = document.body;

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
  toggleBtn.checked = true;
}

toggleBtn.addEventListener("change", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});