(function () {
  'use strict';

  var form = document.getElementById('lookup-form');
  var orderIdInput = document.getElementById('order-id');
  var phoneInput = document.getElementById('lookup-phone');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var orderId = orderIdInput ? orderIdInput.value.trim() : '';
    var phone = phoneInput ? phoneInput.value.trim() : '';

    if (!orderId || !phone) return;

    /* Placeholder — wire to order lookup API when backend is ready */
    console.log('Look up order:', orderId, phone);
  });

  /* Chat FAB */
  var chatFab = document.querySelector('.chat-fab');
  if (chatFab) {
    chatFab.addEventListener('click', function () {
      console.log('Open chat');
    });
  }

})();
