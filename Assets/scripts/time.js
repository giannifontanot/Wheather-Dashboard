

///////////////////////////
//
// Google-Fu
// 100% Fresh !
// found at:
// http://danhounshell.com/blog/how-to-convert-a-10-digit-timestamp-json-to-a-javascript-date/
//
///////////////////////////

function fWhatIsThatNumber(pTimestamp){

    var weekday=new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
    var monthname=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");

    var pubDate = new Date();
    pubDate.setTime(pTimestamp * 1000); //expects milliseconds

    var formattedDate = weekday[pubDate.getDay()] + ' '
      + monthname[pubDate.getMonth()] + ' '
      + pubDate.getDate() + ', ' + pubDate.getFullYear()

    return formattedDate;
  }