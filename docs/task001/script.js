const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formMsg.textContent = 'Thanks! Your message is ready to be wired to backend/email webhook in deploy step.';
    form.reset();
  });
}
