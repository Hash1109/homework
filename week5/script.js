// Javacript Codes

// Variables Listed
var appointText = "";
var appointTime = "";
var currentDate;
var currentTime;
var currentContainer;
var tempArray = [];
var storedAppointments;
var returnedAppointments;

// Implementing Moment JS
$(window).on("load", function () {
    currentDate = moment().format("dddd MMM Do YYYY, h:mm a");
    $("#currentDay").append(currentDate);
    currentTime = moment().format("H");

    // Finction to store appointmnets to slots 
    function renderAppointments() {
        storedAppointments = JSON.parse(localStorage.getItem("appointments"));
        if (storedAppointments !== null) {
            for (i = 0; i < storedAppointments.length; i++) {
                returnedAppointments = storedAppointments[i];
                details = returnedAppointments.details;
                timeIndex = returnedAppointments.time;
                timeIndex = timeIndex.replace(":00", '');
                if (details !== null) {
                    $("#" + timeIndex).children('div').children('div').children('textarea').val(details);
                }
            }
        }
    }

    renderAppointments();

    // for loop to go through go through the slots whilst time passes
    for (i = 0; i <= 23; i++) {
        currentContainer = i;
        if (currentTime == i) {
            $('#' + currentContainer).addClass("present");
            $('#' + currentContainer).children('div').children('div').children("textarea").addClass("present");
        }
        else if (currentTime > i) {
            $('#' + currentContainer).addClass("past");
            $('#' + currentContainer).children('div').children('div').children("textarea").addClass("past");
        }
        else {
            $('#' + currentContainer).addClass("future");
            $('#' + currentContainer).children('div').children('div').children("textarea").addClass("future");
        }
    }
})


// Added Event Listener to save text in slots
$(".saveBtn").click(function () {
    appointText = $(this).parent('div').children('div').children('textarea').val();
    appointTime = $(this).parent('div').parent().attr("id");
    appointment = {
        time: appointTime,
        details: appointText
    }
    tempArray = JSON.parse(localStorage.getItem("appointments"));
    if (tempArray === null) {
        localStorage.setItem('appointments', JSON.stringify([{ time: appointTime, details: appointText }]));
    }
    else {
        tempArray.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(tempArray));

    }
    $(this).parent('div').children('div').children('textarea').replaceWith($('<textarea>' + appointText.addClass("textarea") + '</textarea>'));
})