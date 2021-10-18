console.log('JS');

$(document).ready(function () {
    console.log('Jquery');
    setupClickListeners();  //delete set up... complete still needed AND SUBMIT 
    getList();  //get existing list
});

function setupClickListeners() {
    $(`#toDoTableBody`).on(`click`, `.deleteBtn`, deleteListItem); //DELETE WORKS 
    $(`#toDoButton`).on(`click`, inputToObject), // button in html on load 
        $(`#toDoTableBody`).on(`click`, `.completeBtn`, completeFunction);
}
function completeFunction() {
    console.log('IN COMPLETE FUNCTION ');

    let finishedItemId = $(this).closest(`tr`).data(`id`);

    $.ajax({
        method: "PUT",
        url: `/list/${finishedItemId}`,
    })
    .then(function (response) {
        console.log(response);
        getList();
    }).catch(function (err) {
        console.log('Error in completed item', err);
    })
}

function inputToObject() {
    let boolean;
    if ($(`#completeIn`).val() === `true`) {
        boolean = true;
    } else if ($(`#completeIn`).val() === "false") {
        boolean = false;
    }
    console.log(boolean);
    let listItemToSend = {
        item: $("#toDoInput").val(),
        complete: boolean,
    };
    console.log(listItemToSend);
    saveItem(listItemToSend);
} //GET User input and put in OBJECT - Call SaveItem() - TESTED. WORKS 

function deleteListItem() {
    console.log('inside Delete btn');
    let idToDelete = $(this).closest(`tr`).data(`id`);
    console.log(idToDelete);

    $.ajax({
        method: `DELETE`,
        url: `/list/${idToDelete}`
    }).then(function (response) {
        console.log(response);
        getList();
    }).catch(function (error) {
        alert(`Error`, error)
    });
}; //end deleteListItem  - TESTED 

function renderList(response) {
    $("#toDoTableBody").empty();

    for (let i = 0; i < response.length; i++) {
        let idToCheck = response[i].id;
        let completeBtn = ``;

        if (!response[i].complete) {
            completeBtn = `<button class="completeBtn btn-success"> COMPLETE </button>`;
            let display = $(`
    <tr data-id="${idToCheck}"> 
        <td> ${response[i].item} </td>
        <td> ${response[i].complete} </td>
        <td> ${completeBtn} </td>
        <td> <button class="deleteBtn btn-danger"> DELETE</button></td>
    </tr>`);
            $("#toDoTableBody").append(display);
        }
        else if (response[i].complete) {
            let display = $(`
    <tr class= "completedItem" data-id="${idToCheck}"> 
        <td> ${response[i].item} </td>
        <td> ${response[i].complete} </td>
        <td> <label> Finished </label> </td>
        <td> <button class="deleteBtn"> DELETE</button></td>
        </tr>`);
            $("#toDoTableBody").append(display);
        }; //else if 
    }; //loop
} // render function 

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

function saveItem(newListItem) {
    console.log('In saveItem on Client ', newListItem);
    $.ajax({
        method: "POST",
        url: "/list",
        data: newListItem,
    })
        .then(function (response) {
            $(`#toDoInput`).val(``);
            $(`#completeIn`).val(``);
            getList();
        })
        .catch(function (err) {
            console.log('ERROR', err);
        });
} // end saveItem - calls getList 