app.controller("mainController", function($scope, $http){
    
    $scope.apiKey = "5352eb129c5c10844ad5ed22ada4bb4c";
    $scope.results = [];
    $scope.filterText = null;
    
    $scope.init = function() {
        //API requires start date
        var today = new Date();
        //date string
        var apiDate = today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + "" + ("0" + today.getDate()).slice(-2);
        $http.jsonp('http://api.trakt.tv/calendar/premieres.json/' + $scope.apiKey + '/' + apiDate + '/' + 30 + '/?callback=JSON_CALLBACK').success(function(data) {
            //format data for each day get all the episodes
            angular.forEach(data, function(value, index){
                //API stores full date separately from each episode. Save it for use later
                var date = value.date;
                //for each episodes add it to the results array
                angular.forEach(value.episodes, function(tvshow, index){
                    //create a date string from timestamp to filter based on input
                    tvshow.date = date; //attach date to each episode
                    $scope.results.push(tvshow);
                });
            });
        }).error(function(error) {
 
        });
    }; //init
});



