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
		d.resolve();
	});
	return d.promise;
}

module.exports.getAllUsers = function() {
	var d = when.defer();
	db.get('_users', function(err, value){
		var users = [];
		if (value !== null) {
			users = util.parseList(value);
		}
		return d.resolve(users);
	});
	return d.promise;
}

module.exports.getAllMessages = function() {
	var d = when.defer();
	return d.promise;
}

module.exports.getMessagesById = function() {
	var d = when.defer();
	return d.promise;
}

module.exports.deleteUser = function(username) {
	var d = when.defer(),
		users = [];
	db.get('_users', function(err, value){
		if (err) {
			return d.resolve();
		}
		else {
			users = util.parseList(value);
		}
		users.splice(users.indexOf('username'), 1);
		if (users.length){
			db.put('_users', util.makeList(users), function(err){
				d.resolve();
			});	
		}
		else {
			db.del('_users', function(err){
				d.resolve();
			})
		}
		
	});
	return d.promise;
}

module.exports.createUser = function(username) {
	var d = when.defer(),
		users = '';
	db.get('_users', function(err, value){
		if (err || value == null) {
			users = username;
		}
		else {
			users = value + ',' + username;
		}
		db.put('_users', users, function(err){
			d.resolve();
		});
	});
	return d.promise;
}