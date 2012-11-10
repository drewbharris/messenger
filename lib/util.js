"use strict";


module.exports.parseList = function(list) {
	return list.split(',');
}

module.exports.makeList = function(list) {
	var stringList = list[0];
	for (var i=1; i<list.length; i++){
		stringList += ',' + list[i];
	}
	return stringList;
}