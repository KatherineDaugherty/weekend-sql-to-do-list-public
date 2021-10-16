console.log('JS');

$(document).ready(function() {
    console.log('Jquery');
    
});

function getList() {
    console.log('in GetList');
    $.ajax({
        method: "GET",
        url: "/list",
    })
    .then(function (response) {
        console.log(response);
        renderList(response);
    }).catch(function (error) {
        console.log('error', error);
    });
} //END GET LIST 