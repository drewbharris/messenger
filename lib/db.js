"use strict";

var leveldb = require('leveldb'),
	fs = require('fs'),
	when = require('when'),
	util = require('./util');

var db;

module.exports.connect = function(){
	var d = when.defer();
	leveldb.open(__dirname + "/messages.db", {create_if_missing: true}, function(err, database){
		console.log('database connected');
		db = database;
		db.get('_users', function(err, value){
			if (value === null){
				db.put('_users', JSON.stringify({
					'users': []
				}), function(err){
					return d.resolve();
				});
			}
			return d.resolve();
		});
	});
	return d.promise;
};

module.exports.getAllUsers = function() {
	var d = when.defer();
	db.get('_users', function(err, value){
		console.log(value);
		var users = {};
		if (value !== null) {
			users = JSON.parse(value);
		}
		return d.resolve(users);
	});
	return d.promise;
};

module.exports.getAllMessages = function() {
	var d = when.defer();
	return d.promise;
};

module.exports.getMessagesById = function() {
	var d = when.defer();
	return d.promise;
};

module.exports.deleteUser = function(username) {
	var d = when.defer();
	db.get('_users', function(err, value){
		if (err) {
			return d.resolve();
		}
		var users = JSON.parse(value),
			i;
		for (i in users.users) {
			if (users.users[i].username === username) {
				users.users.splice(i, 1);
			}
		}
		db.put('_users', JSON.stringify(users), function(err){
			d.resolve(users);
		});
	});
	return d.promise;
};

module.exports.createUser = function(user) {
	var d = when.defer(),
		users;
	db.get('_users', function(err, value){
		if (err) {
			return d.resolve();
		}
		users = JSON.parse(value);
		users.users.push(user);
		db.put('_users', JSON.stringify(users), function(err){
			d.resolve(user);
		});
	});
	return d.promise;
};

module.exports.createUserTable = function() {
	var d = when.defer(),
		users = {
			users: []
		};
	db.put('_users', JSON.stringify(users), function(err){
		d.resolve();
	});
	return d.promise;
};