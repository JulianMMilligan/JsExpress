$(function ()
{
    $.ajaxSetup({cache:false});

    $("#add_button").click(AddStudentClick);
})

function AddStudentClick(e)
{
    //console.log("Button clicked") //testing
    let json = {
        Name: $("#name_textbox").val(),
        Age: parseInt($("#age_numberbox").val()),
        Course: $("#course_textbox").val()
    };

    $.ajax({
        cache:false,
        type: "POST",
        url: "http://localhost:1339/mike",
        data: JSON.stringify(json),
        contentType:"application/json; charset=utf-8",
        dataType: "json",
        success :(json , status , req) => console.log("Its added the student."),
        error : (req , status , error) => console.log ("Something has gone wrong")
    });

    e.preventDefault();
    return false;
}