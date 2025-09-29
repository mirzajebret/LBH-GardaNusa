document.addEventListener('DOMContentLoaded', function() {
    const paymentRadios = document.querySelectorAll('input[name="payment-method"]');
    const qrisDetails = document.getElementById('qris-details');
    const bankDetails = document.getElementById('bank-details');
    const donationForm = document.getElementById('donation-form');

    function togglePaymentDetails() {
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
        if (!selectedMethod) {
            qrisDetails.classList.add('hidden');
            bankDetails.classList.add('hidden');
            return;
        }

        if (selectedMethod.value === 'qris') {
            qrisDetails.classList.remove('hidden');
            bankDetails.classList.add('hidden');
        } else if (selectedMethod.value === 'bank') {
            qrisDetails.classList.add('hidden');
            bankDetails.classList.remove('hidden');
        }
    }

    if (paymentRadios.length > 0) {
        paymentRadios.forEach(radio => {
            radio.addEventListener('change', togglePaymentDetails);
        });
    }

    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const firstName = document.getElementById('nama-depan').value;
            alert(`Terima kasih, ${firstName}! Donasi Anda sangat berarti bagi kami. Konfirmasi akan kami kirimkan ke email Anda.`);
            donationForm.reset();
            // Hide details again after submission
            qrisDetails.classList.add('hidden');
            bankDetails.classList.add('hidden');
        });
    }

});
