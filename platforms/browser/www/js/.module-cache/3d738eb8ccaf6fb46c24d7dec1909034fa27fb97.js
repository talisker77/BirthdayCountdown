(function(){
	'use strict';
	var list = [
		{name: 'Oskar', birthday: new Date(2009,6,7)},
		{name: 'Magnus', birthday: new Date(2007,4,22)},
		{name: 'Erlend', birthday: new Date(1977,8,25)},
		{name: 'Karyn', birthday: new Date(1979,10,22)},
		];
		
	var daysDiff = function (d1, d2){
		return (d2-d1)/(1000*60*60*24);
	};	
	var timeCalc = {
		days : function(day, now){
			return daysDiff(now, day);
		},
		hours : function(day, now){},
		months : function(day, now){}
	};
		
var BirthdayHeader = React.createClass({displayName: "BirthdayHeader",
	render: function(){
		var daysLeft = timeCalc.days(this.props.birthday, Date.today());
		return React.createElement("div", null, 
		React.createElement("p", null, "Navn: ", this.props.name, " ", " Fødselsdag:", " ", this.props.birthday.toLocaleDateString(), 
		React.createElement("span", null, "Dager igjen: ", " ", daysLeft)
		)
		);
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
			return (React.createElement(BirthdayHeader, {name: bDay.name, birthday: bDay.birthday}));
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