// -----------------------------
// Sign Up Logic
// -----------------------------
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      document.getElementById('signupError').textContent = 'Passwords do not match';
      return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    alert('Signup successful!');
    window.location.href = 'index.html';
  });
}

// -----------------------------
// Login Logic
// -----------------------------
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    if (username === savedUsername && password === savedPassword) {
      sessionStorage.setItem('loggedInUser', username);
      window.location.href = 'home.html';
    } else {
      document.getElementById('loginError').textContent = 'Invalid login credentials';
    }
  });
}

// -----------------------------
// Home Page Logic
// -----------------------------
if (window.location.pathname.includes('home.html')) {
  const user = sessionStorage.getItem('loggedInUser');
  if (!user) {
    window.location.href = 'index.html';
  }

  document.getElementById('usernameDisplay').textContent = user;
  const profileName = document.getElementById('profileName');
  if (profileName) profileName.textContent = user;

  // Live Clock
  function updateClock() {
    const clockElement = document.getElementById('clock');
    if (clockElement) {
      clockElement.textContent = new Date().toLocaleTimeString();
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Calculator
  function calculate(operation) {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const resultElement = document.getElementById("result");
  
    if (isNaN(num1) || isNaN(num2)) {
      resultElement.textContent = "Please enter valid numbers.";
      return;
    }
  
    let result;
    switch (operation) {
      case "add":
        result = num1 + num2;
        break;
      case "subtract":
        result = num1 - num2;
        break;
      case "multiply":
        result = num1 * num2;
        break;
      case "divide":
        if (num2 === 0) {
          resultElement.textContent = "Cannot divide by zero.";
          return;
        }
        result = num1 / num2;
        break;
      default:
        resultElement.textContent = "Invalid operation.";
        return;
    }
  
    resultElement.textContent = `Result: ${result}`;
    };

  // Theme Toggle with icon animation
//   window.toggleTheme = function () {
    //     document.body.classList.toggle('dark-mode');
    
    window.onload = () => {
        const isDark = localStorage.getItem("theme") === "dark";
        const body = document.body;
        const navbar = document.getElementById("mainNavbar");
        const themeIcon = document.getElementById("themeIcon");
        if (isDark) {
            body.classList.add("dark-mode");
            navbar.classList.remove("navbar-light", "bg-white");
            navbar.classList.add("navbar-dark", "bg-dark");
            themeIcon.classList.remove("bi-sun");
            themeIcon.classList.add("bi-moon");
        }
      };
      
      function toggleTheme() {
        const body = document.body;
        const themeIcon = document.getElementById("themeIcon");
        const navbar = document.getElementById("mainNavbar");
      
        body.classList.toggle("dark-mode");
      
        const isDark = body.classList.contains("dark-mode");
      
        // Change icon
        themeIcon.classList.toggle("bi-sun", !isDark);
        themeIcon.classList.toggle("bi-moon", isDark);
      
        // Toggle Navbar classes
        if (isDark) {
          navbar.classList.remove("navbar-light", "bg-white");
          navbar.classList.add("navbar-dark", "bg-dark");
        } else {
          navbar.classList.remove("navbar-dark", "bg-dark");
          navbar.classList.add("navbar-light", "bg-white");
        }
      
        // Save preference
        localStorage.setItem("theme", isDark ? "dark" : "light");
      }
      
  // Logout
  window.logout = function () {
    sessionStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
  };

  // To-Do List
  window.addTask = function () {
    const taskInput = document.getElementById('todoInput');
    const task = taskInput.value.trim();
    if (task) {
      const li = document.createElement('li');
      li.className = 'list-group-item todo-item';
      li.innerHTML = `<span>${task}</span><button class="btn btn-sm remove-btn btn-danger" onclick="this.parentElement.remove()">Remove</button>`;
      document.getElementById('todoList').appendChild(li);
      taskInput.value = '';
    }
  };

  // Static Weather
  window.getWeather = function () {
    const city = document.getElementById('cityInput').value.trim();
    if (city) {
      const temp = Math.floor(Math.random() * 10 + 20);
      const condition = ['Sunny', 'Cloudy', 'Rainy', 'Windy'][Math.floor(Math.random() * 4)];
      document.getElementById('weatherInfo').textContent = `Weather in ${city}: ${temp}°C and ${condition}`;
    }
  };
}
