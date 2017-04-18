(function () {
	
angular.module('MenuSearch',[])
.controller('FoodMenuController',FoodMenuController)
.service('RetrieveMenuItemsService', RetrieveMenuItemsService);


FoodMenuController.$inject = ['$scope','RetrieveMenuItemsService'];
function FoodMenuController($scope, RetrieveMenuItemsService) {

	$scope.removeItem = function (index) {
		$scope.menuItems.splice(index,1);
	}

	$scope.narrowItems = function () {
		console.log($scope.menuItems);
		RetrieveMenuItemsService.getMatchedMenuItems($scope.foodDesc)
						.then(function (filteredMenuItems) {
							$scope.menuItems = filteredMenuItems;
							console.log('Returned Menu Items: ')
							console.log($scope.menuItems);
						});	;
	};
}

RetrieveMenuItemsService.$inject = ['$http']
function RetrieveMenuItemsService($http) {
	var menu = this;

	menu.getMatchedMenuItems = function (searchTerm) {
		return $http({	method: "GET",
						url: "https://davids-restaurant.herokuapp.com/menu_items.json"
						})
				.then(function (returnedObject) {
						var menu = returnedObject.data.menu_items;
						var isEmpty = (!searchTerm) || (searchTerm == "");
						var filteredItems = isEmpty? menu : menu.filter(function(item) {
							return (item.description.indexOf(searchTerm)>=0);
						});
						return filteredItems;
				});
	}
}

})();