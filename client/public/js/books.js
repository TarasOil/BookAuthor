let serverUrl = 'http://localhost:8080/';
$(document).ready(function() {
    getBooks();
    
});

function getBooks() {
    $.ajax({
        url: serverUrl + 'books',
        method: 'GET',
        dataType: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
            $('#booksList').empty();
            $.each(response, function(key, value) {
                $('#booksList').append(
                    `
                    <div class="col-sm-4">
                        <div class="card mb-2">
                            <img class="card-img-top" src="${value.imageUrl}" height="270" width="186">
                            <div class="card-header">
                                ${value.title}
                            </div>
                            <div class="card-header">
                                ${value.authors[0].firstName} ${value.authors[0].lastName}
                            </div>
                        </div>
                    </div>
                    `
                );
            }) 
        }
    })
}