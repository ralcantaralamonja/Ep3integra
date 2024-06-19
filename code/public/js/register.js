$(document).ready(function () {
    $('#registration-form').on('submit', function (e) {
        e.preventDefault();
        const data = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            password: $('#password').val(),
        };
        $.ajax({
            url: '/api/register',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                alert(response.message);
                window.location.href = '/';
            },
            error: function (jqXHR) {
                alert(jqXHR.responseJSON.error);
            },
        });
    });
});