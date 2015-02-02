(function(){
	'use strict';
	var list = [
		{name: 'Oskar', birthday: new Date(2009,6,7)},
		{name: 'Magnus', birthday: new Date(2007,4,22)},
		{name: 'Erlend', birthday: new Date(1977,8,25)},
		{name: 'Karyn', birthday: new Date(1979,10,22)},
		];
		
var BirthdayCounter = React.createClass({displayName: "BirthdayCounter",
	render: function(){
		return React.createElement("div", null, "Navn: ", this.props.name, " ", " F&#248;dselsdag:", " ", this.props.birthday.toLocaleDateString());
	}
});
	
var Header = React.createClass({displayName: "Header",
	render : function(){
		return React.createElement("div", {"data-role": "header"});
	}
});

var Footer = React.createClass({displayName: "Footer",
	render : function(){
		return React.createElement("div", {"data-role": "footer"});
	}
});

var Content = React.createClass({displayName: "Content",
	render : function(){
		var birthdays = this.props.birthdayList.map(function (bDay){
			return (React.createElement(BirthdayCounter, {name: bDay.name, birthday: bDay.birthday}));
		});
		return React.createElement("div", {"data-role": "content"}, 
		birthdays
		);
	}
});

var Page = React.createClass({displayName: "Page",
	render : function(){
		return React.createElement("div", {"data-theme": "b", "data-role": "page", id: this.props.pageId, "data-position": "fixed"}, 
		React.createElement(Header, null), 
		React.createElement(Content, {birthdayList: list}), 
		React.createElement(Footer, null)
		);
	}
});

React.render(React.createElement(Page, {pageId: "main"}), document.getElementById('app'));

})();