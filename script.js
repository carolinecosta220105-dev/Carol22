// NOVA landing page interactions

// ----- Mobile navigation -----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

// Close the menu after choosing a section (mobile)
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// ----- Cart -----
let cartItems = 0;
const cartCount = document.getElementById('cartCount');
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.querySelectorAll('.add-to-cart').forEach((btn) => {
  btn.addEventListener('click', () => {
    cartItems += 1;
    cartCount.textContent = String(cartItems);
    cartCount.hidden = false;
    showToast(`✓ ${btn.dataset.name} added to cart`);
  });
});

document.getElementById('cartBtn').addEventListener('click', () => {
  showToast(cartItems === 0 ? 'Your cart is empty — add something you love!' : `${cartItems} item(s) in your cart`);
});

// ----- Newsletter form -----
const form = document.getElementById('newsletterForm');
const formMsg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!valid) {
    formMsg.textContent = 'Please enter a valid email address.';
    formMsg.classList.add('error');
    return;
  }
  formMsg.classList.remove('error');
  formMsg.textContent = "You're in! Check your inbox for the 10% code. 🎉";
  form.reset();
});

// ----- Reveal on scroll -----
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
