let serverUrl = 'http://localhost:8080/';
$(document).ready(function() {
    getBooks();
    getAuthors();
    var authors = [];
    $('#addBookForm').submit(function(e) {
        e.preventDefault();
        // authors = $('#authors').val();
        transfer(authors);
        console.log(authors);

        let title = $('#title').val();
        let description = $('#description').val();
        let image = $('#image').val();
        let price = $('#price').val();
        let publication = $('#publication').val();

        let book = {
            title: title,
            description: description,
            imageUrl: image,
            price: price,
            publicationYear: publication,
            authors: authors
        };

        $.ajax({
            url: serverUrl + 'books',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(book),
            complete: function(data) {
                if(data.status == 500) {
                    console.log('Error has occured');
                }
                if(data.status == 201) {
                    $('#addBookForm')[0].reset();
                    $('#booksTable tbody').empty();
                    getBooks();
                }
            }
        })

        authors = [];
    });
});

function getBooks() {
    $.ajax({
        url: serverUrl + 'books',
        method: 'GET',
        dataType: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
            $.each(response, function(key, value) {
                $('#booksTable tbody').append(
                    `
                    <tr>
                        <td>${ value.bookId }</td>
                        <td>${ value.title }</td>
                        <td>${ value.imageUrl }</td>
                        <td>${ value.price }</td>
                        <td>${ value.publicationYear }</td>
                        <td>${ iterate(value.authors) }</td>
                    </tr>
                    `
                );
            })
        }
    })
}

function iterate(value){
    let authors = '';
    $.each(value, function(key, value) {
        authors = value.firstName + ' ' + value.lastName + '\n';
    })
    return authors;
}

function getAuthors() {
    $.ajax({
        url: serverUrl + 'authors',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function(response) {
            $.each(response, function(key, value) {
                $('#authors').append(
                    `
                    <option value="${value.authorId}">${value.firstName + ' '  +value.lastName}</option>
                    `
                );
            })
        }
    })
}

function transfer(authors){
    let author;
    $('#authors :selected').each(function(key, value) {
        author = {
            'authorId': value.value
        }
        authors.push(author);
    });
}