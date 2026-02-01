export function initForm() {

  document.getElementById("bookingForm")
    .addEventListener("submit", function(e) {

    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const phoneNum = document.getElementById("phoneNum").value.trim();

    const phoneCheck = /^(0[3|5|7|8|9])[0-9]{8}$/;

    if(!phoneCheck.test(phoneNum)){
      e.preventDefault();
      alert("Số điện thoại không hợp lệ!");
      return;
    }

    if(new Date(endDate) <= new Date(startDate)){
      e.preventDefault();
      alert("Ngày về phải sau ngày đi!");
    }

  });
}

export function showForm(id) {
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}

export function closeForm() {
  document.getElementById('booking').classList.remove('active');
  document.body.style.overflow = '';
}