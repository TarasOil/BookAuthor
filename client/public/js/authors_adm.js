let serverUrl = 'http://localhost:8080/';
    $(document).ready(function() {
         $('#emailError').hide();
        $('#emailSuccess').hide();
        $('#addAuthorForm button').prop('disabled', true);
        getAuthors();
        $('#email').keyup(function(e) {
             console.log($(this).val());
             let email = $(this).val();
             $.get(serverUrl + 'authors/check-email?email=' + email, function(data, status)  {
                console.log(data);
                if(data) {
                    $('#emailError').show();
                    $('#emailSuccess').hide();
                    $('#addAuthorForm button').prop('disabled', true);
                } else {
                    $('#emailError').hide();
                    $('#emailSuccess').show();
                    $('#addAuthorForm button').prop('disabled', false);
                }
            });
        })
        $('#addAuthorForm').submit(function(e) {
            e.preventDefault();
            let firstName = $('#firstName').val();
            let lastName = $('#lastName').val();
            let email = $('#email').val();
            let image = $('#image').val();
            let dayOfBirth = $('#dateOfBirth').val();
            console.log(firstName, lastName, email, image, dayOfBirth);
             let author = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                imageUrl: image,
                dateOfBirth: dayOfBirth
            };
            $.ajax({
                url: serverUrl + 'authors',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(author),
                complete: function(data) {
                    if(data.status == 500) {
                        console.log('Error has occured');
                    }
                    if(data.status == 201) {
                        $('#addAuthorForm')[0].reset();
                        $('#authorsTable tbody').empty();
                        getAuthors();
                    }
                }
            })
        });
    });
    function getAuthors() {
        $.ajax({
            url: serverUrl + 'authors',
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $.each(response, function(key, value) {
                    $('#authorsTable tbody').append(
                        `
                        <tr>
                            <td>${ value.authorId }</td>
                            <td>${ value.firstName }</td>
                            <td>${ value.lastName }</td>
                            <td>${ value.email }</td>
                        </tr>
                        `
                    );
                })
            }
        })
    }