app.controller("mainController", function($scope, $http){
    
    $scope.apiKey = "5352eb129c5c10844ad5ed22ada4bb4c";
    $scope.results = [];
    $scope.filterText = null;
    $scope.availableGenres = [];
    $scope.genreFilter = null;
    $scope.orderFields = ["Air Date", "Rating"];
    $scope.orderDirections = ["Descending", "Ascending"];
    $scope.orderField = "Air Date"; //sets default order for custom filter
    $scope.orderReverse = false; //make true for descending default
    
    $scope.init = function() {
        //API requires start date
        var today = new Date();
        //date string
        var apiDate = today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + "" + ("0" + today.getDate()).slice(-2);
        //json call: modify value after apiDate for number of days after today
        //**Higher values severely effect loading times**
        $http.jsonp('http://api.trakt.tv/calendar/premieres.json/' + $scope.apiKey + '/' + apiDate + '/' + 8 + '/?callback=JSON_CALLBACK').success(function(data) {
            //format data for each day get all the episodes
            angular.forEach(data, function(value, index){
                //API stores full date separately from each episode. Save it for use later
                var date = value.date;
                //for each episodes add it to the results array
                angular.forEach(value.episodes, function(tvshow, index){
                    //create a date string from timestamp to filter based on input
                    tvshow.date = date; //attach date to each episode
                    $scope.results.push(tvshow);
                    //loop through each genre for this episode
                    angular.forEach(tvshow.show.genres, function(genre, index){
                        //add to the availableGenres array if it doesn't already exist
                        var exists = false;
                        angular.forEach($scope.availableGenres, function(avGenre, index){
                            if (avGenre == genre) {
                                exists = true;
                            }
                        });
                        if (exists === false) {
                            $scope.availableGenres.push(genre);
                        }
                    });
                });
            });
        }).error(function(error) {
 
        });
    }; //init
    
    //function so we can click on genre names in episodes and change filter
    $scope.setGenreFilter = function(genre) {
        $scope.genreFilter = genre;
    }
    
    //reusable order function. add new data to create more options
    //make sure data can be ordered
    $scope.customOrder = function(tvshow) {
        switch ($scope.orderField) {
            case "Air Date":
                return tvshow.episode.first_aired;
            break;
            case "Rating":
                return tvshow.episode.ratings.percentage;
            break;
        }
    };
});

app.filter('isGenre', function() {
    return function(input, genre) {
        if (typeof genre == 'undefined' || genre == null) {
            return input;
        } else {
            var array = [];
            for (var i = 0; i < input.length; i++){
                for (var j = 0; j < input[i].show.genres.length; j++){
                    if(input[i].show.genres[j] == genre) {
                        array.push(input[i]);
                    }
                }
            }
            return array;
        }
    };
});



