// public/js/index.js
$(document).ready(function () {
    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        const data = {
            email: $('#emailLogin').val(),
            password: $('#passwordLogin').val(),
        };
        $.ajax({
            url: '/api/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                alert(response.message);
                window.location.href = '/home';
            },
            error: function (jqXHR) {
                // Clear previous error styles
                $('#emailLogin').css('border-color', '#ddd');
                $('#passwordLogin').css('border-color', '#ddd');
                $('.error-message').text('').hide();

                // Highlight input fields with error
                if (jqXHR.status === 401) {
                    $('#emailLogin').css('border-color', 'red');
                    $('#passwordLogin').css('border-color', 'red');
                    $('.error-message').text('Credenciales incorrectas').show();
                } else {
                    alert(jqXHR.responseJSON.message);
                }
            },
        });
    });
});
