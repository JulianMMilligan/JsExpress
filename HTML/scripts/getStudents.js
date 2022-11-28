$(function () {

    $.ajaxSetup({ cache:false}); //setup ajax

    $("#studentsGet-button").click(function (e)
    {

        getAllStudents();
        console.log("button clicked"); //Testing only
        e.preventDefault();
        return false;
    });

    function getAllStudents()
    {
        

        $.ajax({
            cache: false,
            type: "GET",
            url: "http://localhost:1339/mike/",
            contentType:"application/json; charset=utf-8",
            datatype:"json",
            success: displayAllStudents,
            error: (reg, status, error) => window.alert("Unable to get all students - " + status)

        });
    }

    function displayAllStudents(json, status, error)
    {
        var postResultsHtml = "";
        //console.table(json);        

    for (let i = 0; i < Object.keys(json).length ; i++)//loop to show all entires for user
    {
        postResultsHtml += "<b>Name - </b>" + json[i].Name + "<br>"
                        +  "<b>Age - </b>" + json[i].Age + "<br>"
                        +  "<b>Course - </b>" + json[i].Course + "<br>"
                        +  "<br>";
    }

    $("#getAllStudents").html(postResultsHtml);


    }



});
