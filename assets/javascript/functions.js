function random(array){
    return Math.floor(Math.random()*array.length);
    // return Math.floor(Math.random()*array.length)
}

var city;
var urban;
var urbanURL;
var cityID;
var timezone;
var cityURL;

var activityOption = [
    "4d4b7104d754a06370d81259", //ArtsAndEntertainment
    "4d4b7105d754a06376d81259", //NightlifeSpot 
    "4d4b7105d754a06377d81259", //OutdoorsRecreation 
    "4d4b7105d754a06373d81259"  //OtherEvent
];


function pickCity(){

    var queryURL = "https://api.teleport.org/api/urban_areas/";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        var cities = response._links["ua:item"];
        cityRoot = cities[random(cities)];
        urbanURL = cityRoot.href;
            
        city = cityRoot.name;

        $(".city-name").text(city);
        //   console.log(urbanURL);
          urbanInfo();
          fourSquare(3);
          fourSquare(0);
    });
}      

function urbanInfo() {
    $.ajax({
        url: urbanURL,
        method: "GET"
    }).done(function (response) {
        // console.log(response);
        urban = response;
        // console.log(urban);
        cityInfo();
    });      
}

function cityInfo() {
    cityURL = urban._links["ua:identifying-city"].href;
    // console.log(cityURL);

    $.ajax({
        url: cityURL,
        method: "GET"
    }).done(function (response) {
        // console.log(response);
        timezone = response._links["city:timezone"].name;
        // console.log(timezone);
    });      
}

//JOEY'S VARIABLES:
//  CITY NAME : var city
//  TIMEZONE : var timezone

$("body").on("click" , ".wunderlust-btn" , pickCity);







//API link with "city" variable plugged in between.  Parameter "near" takes the city name.

function fourSquare(query){
var queryURL = "https://api.foursquare.com/v2/venues/explore?client_id=APG3IG5Z23XQFAHJ2OEIL315CCY4ZIYVNJHNNKSV4X5SIZPB&client_secret=BI42KWF4MSAGRFOYX1H0LO4ERS2GEFF3UL32VGIPQKLPLGW5&near=" + city + "&v=20180323&" + activityOption[query];


// var fourSheader = 
// var fourSlink = 
// var fourDescription =

// var activyOption = [
//     "ArtsAndEntertainment: 4d4b7104d754a06370d81259",
//     "NightlifeSpot: 4d4b7105d754a06376d81259",
//     "OutdoorsRecreation: 4d4b7105d754a06377d81259",
//     "OtherEvent: 4d4b7105d754a06373d81259"
// ];

// Arts and Entertainment:  4d4b7104d754a06370d81259
// Nightlife Spot:  4d4b7105d754a06376d81259
// Outdoors & Recreation:  4d4b7105d754a06377d81259
// Event:  4d4b7105d754a06373d81259

$.ajax({
   url: queryURL,
   method: "GET"
}).done(function (response) {
   console.log(response);
   var itemsArr = response.response.groups["0"].items;
   console.log(itemsArr);
    for(i = 0; i < 3; i++){
        //determines if itemsArr still has content
        if(itemsArr){
            //rand grabs random index from itemsArr
            var rand = random(itemsArr)
            // console.log(itemsArr[rand]);
            //After printing itemsArr[rand] this array element is removed to prevent it from appearing again
            var venue = itemsArr[rand]["venue"];
            var name = $("<h3>").text(venue.name);
            var category = $("<span>").text("Category:" + venue.categories[0].name);
            console.log(category);
            var address = $("<span>").text(venue.location.address);
            console.log(address);
            // console.log(category);
            var container = $("<div class='venue-card'>").append(name,category,address);
            $(".content-"+query).append(container);
            itemsArr.splice(rand,1);
        }
    }

//    console.log(response.response.groups["0"].items["0"].venue.name);
//    console.log(response.response.groups["0"].items["0"].venue.categories["0"].name);
//    for (var i = 0; i < response.response.groups["0"].items["0"].venue.location.formattedAddress.length; i++) {
//        console.log(response.response.groups["0"].items["0"].venue.location.formattedAddress[i])
   
//    }
   
});
}