angular.module('app').service('todoStorage', function ($q) {
    var _this = this;
    this.data = [];
	this.percentage = 0;

    this.findAll = function(callback) {
        chrome.storage.sync.get('todo', function(keys) {
            if (keys.todo != null) {
                _this.data = keys.todo;
                for (var i=0; i<_this.data.length; i++) {
                    _this.data[i]['id'] = i + 1;
                }
                callback(_this.data);
            }
        });
    }

    this.sync = function() {
        chrome.storage.sync.set({todo: this.data}, function() {
            console.log('Data is stored in Chrome storage');
        });
    }

    this.add = function (newContent) {
        var id = this.data.length + 1;
        var todo = {
            id: id,
            content: newContent,
            found: false,
			count: 0,
            createdAt: new Date()
        };
        this.data.push(todo);
        this.sync();
    }
	
	this.find = function (newContent) {
		var n = 0;
        for (i=0; i < this.data.length; i++){
			if (newContent.includes(this.data[i].content)) {
				var re = new RegExp(this.data[i].content, 'g');
				//alert("Item : " + this.data[i].content + " is present? : " + newContent.includes(this.data[i].content));
				this.data[i].count = (newContent.match(re) || []).length;
				this.data[i].found = true;
				n++;
			}
		}
		alert((this.percentage = (n/this.data.length) * 100) + "% of a match.");
        this.sync();
    }
	
	

    this.remove = function(todo) {
        this.data.splice(this.data.indexOf(todo), 1);
        this.sync();
    }

    this.removeAll = function() {
        this.data = [];
        this.sync();
    }

});