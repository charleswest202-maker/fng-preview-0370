/* The audit form posts to FormSubmit's ajax endpoint in the background, then opens thanks.html.
   Without JavaScript the form still posts to FormSubmit, which shows its own thank-you page.
   If FormSubmit answers anything but success, the status line tells the owner to call or text instead. */
(function () {
  var forms = document.querySelectorAll('form[data-form="audit"]');
  if (!forms.length || !window.fetch) return;
  forms.forEach(function (form) {
    var status = form.querySelector('.form-status');
    var button = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (status) status.hidden = true;
      if (button) button.disabled = true;
      fetch(form.getAttribute('data-ajax') || form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json(); })
        .then(function (j) { if (String(j.success) !== 'true') throw new Error(j.message || 'not sent'); window.location.href = 'thanks.html'; })
        .catch(function () { if (status) status.hidden = false; if (button) button.disabled = false; });
    });
  });
})();
