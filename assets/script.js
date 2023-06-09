// Checks that all elements are rendered so jquery will function properly
$(document).ready(function () {
  console.log("DOM Ready");
  
  // displays current date in header
  // interval refreshes every second to keep display up-to-date
  var todaysDate = function() {
    $('#currentDay').text(dayjs().format('dddd, MMMM D'));
  };
  setInterval(todaysDate, 1000);

  // finds id of parent container of button and text within
  // textarea under that parent; stores both in local storage
  var saveBlock = function() {
   console.log("Saving...");
   var parID = $(this).parent().attr('id');
   console.log(parID);
   var blockTxt = $('#' + parID).children('textarea').val();
   console.log(blockTxt);
   localStorage.setItem(parID, blockTxt)
  }
  $('.saveBtn').on('click', saveBlock);
 
  // current hour in 24-hour format (converted to number)
  var currentHour = parseInt(dayjs().format('HH'));
  console.log(currentHour, typeof(currentHour));

  // compares id of each div for calendar blocks against
  // current hour and assigns classes accordingly
  $('div.time-block').each(function() {
    var parID = $(this).attr('id');
    console.log(parID);
    
    // extracts number from id string
    var blockTime = parseInt(parID.substring(parID.indexOf('-')+1));
    console.log(blockTime,typeof(blockTime));
    
    if (blockTime < currentHour) {
      $(this).attr('class', 'row time-block past');
    } else if (blockTime === currentHour) {
      $(this).attr('class', 'row time-block present');
    } else {
      $(this).attr('class', 'row time-block future');
    }

    // retrieves calendar block text from local storage
    // assigns to calendar block textarea by parent div id's
    var blockTxt = localStorage.getItem(parID);
    $('#' + parID).children('textarea').val(blockTxt);
  });
});
