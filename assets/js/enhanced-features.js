console.log("🚀 Enhanced features loading...");
document.addEventListener("DOMContentLoaded", function() {
  const forms = document.querySelectorAll("form");
  forms.forEach(form => {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const msg = document.createElement("div");
      msg.innerHTML = "✅ Message sent successfully!";
      msg.style.cssText = "background:#4CAF50;color:white;padding:15px;margin:10px 0;border-radius:5px;text-align:center;";
      form.parentNode.insertBefore(msg, form.nextSibling);
      form.reset();
      setTimeout(() => msg.remove(), 5000);
    });
  });
  
  // Removed WhatsApp redirect on buttons per request

  // Feature: Lazy-load all images
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });

  // Feature: Smooth scroll for hash links with header offset
  const header = document.querySelector('.header');
  const headerHeight = header?.offsetHeight || 80;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  console.log("✅ Enhanced features ready!");
});
