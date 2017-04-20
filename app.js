(function () {
	
angular.module('MenuSearch',[])
.controller('FoodMenuController',FoodMenuController)
.service('RetrieveMenuItemsService', RetrieveMenuItemsService)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    }
  };

  return ddo;
}

FoodMenuController.$inject = ['$scope','RetrieveMenuItemsService'];
function FoodMenuController($scope, RetrieveMenuItemsService) {
	var list = this;

	list.removeItem = function (index) {
		list.menuItems.splice(index,1);
	}

	list.narrowItems = function () {
		console.log(list.menuItems);
		if (list.foodDesc != "") {
			RetrieveMenuItemsService.getMatchedMenuItems(list.foodDesc)
							.then(function (filteredMenuItems) {
								list.menuItems = filteredMenuItems;
								console.log('Returned Menu Items: ')
								console.log(list.menuItems);
							});	;
		} else {
			list.menuItems = [];
		}
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
						// var isEmpty = (!searchTerm) || (searchTerm == "");
						// var filteredItems = isEmpty? menu : menu.filter(function(item) {
						// 	return (item.description.indexOf(searchTerm)>=0);
						// });
						var filteredItems = menu.filter(function(item) {
							return (item.description.indexOf(searchTerm)>=0);
						});
						console.log('filteredItems');
						console.log(filteredItems);
						return filteredItems;
				});
	}
}

})();