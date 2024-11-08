// Signup Form Validation and Data Storage
document.getElementById('signup-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error');  
    const passMsg = document.getElementById('pass')
    const emlPtn = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const pass = /^[a-zA-Z0-9!@#$%^&]{6,}$/
    errorMsg.innerText = ''
    passMsg.innerText = ''

    if((name || email || password) == '') {
        alert('Please fill in all fields.');
        e.preventDefault()
      }

     if(name == '') {
        errorMsg.innerText = 'Please enter your full name'
        e.preventDefault()
    }
    else if(!emlPtn.test(email)){
        errorMsg.innerText = 'Enter a valid email'
        e.preventDefault()  
    }
    else if(!pass.test(password)){
        errorMsg.innerText = 'Enter a valid password'
        passMsg.innerText = 'password must be at least 6 characters, alphabets, numbers and these symbols, !@#$%^& , are allowed'
        e.preventDefault()
    }
    
else  {
      localStorage.setItem('user', JSON.stringify({ name, email, password }));
      alert('Signup successful! You can now log in.');
      window.location.href = 'login.html';
    } 
  });
  
  // Login Form Validation
  document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
  
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.email === email && user.password === password) {
      localStorage.setItem('loggedInUser', user.name);
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid email or password.');
    }
  });
  
  // Displaying User Name on Dashboard and Updating Time
  function updateTime() {
  const now = new Date();
  
    // Update Local Time and Date
    document.getElementById('time').textContent = now.toLocaleTimeString();
    document.getElementById('date').textContent = now.toLocaleDateString();
  
  }
  setInterval(updateTime, 1000);

  const selectedTimezonesContainer = document.getElementById('selected-timezones');
document.getElementById('add-timezone').addEventListener('click', () => {
  const timezone = document.getElementById('timezone').value;
  addTimezoneClock(timezone);
  });

  function addTimezoneClock(timezone) {
    const timezoneDiv = document.createElement('div');
    timezoneDiv.classList.add('timezone');
    timezoneDiv.innerHTML = `<h3>${timezone}</h3><p id="${timezone}-time">--:--</p>`;
    selectedTimezonesContainer.appendChild(timezoneDiv);
    
    setInterval(() => {
      document.getElementById(`${timezone}-time`).textContent = new Date().toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }, 1000);
  }
  
  
  if (document.getElementById('user-name')) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    document.getElementById('user-name').textContent = loggedInUser || 'Guest';
    setInterval(updateTime, 1000);
  }
  