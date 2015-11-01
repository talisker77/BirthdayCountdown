(function(){
  'use strict';
  var list = [
		{name: 'Magnus',text:'Fødselsdag', eventday: new Date(2007,4,22), event: "birthday"},
		{name: 'Oskar', text:'Fødselsdag', eventday: new Date(2009,6,5), event: "birthday"},
		{name: 'Erlend', text:'Fødselsdag',eventday: new Date(1977,8,25), event: "birthday"},
		{name: 'Karyn', text:'Fødselsdag',eventday: new Date(1979,10,22), event: "birthday"},
		{name: 'Jul', text:'Dag',eventday: new Date(1,11,24), event: "day"},
  ];
		
  var handleDates = function(day, now, diffMethod){
    day.setYear(now.getFullYear());
    var d = new Date(day);
    var n = new Date(now);
    if(d.clearTime() >= n.clearTime()){
      d.setYear(now.getFullYear()+1);
    }
    if (n.clearTime() < d.clearTime()) {
      n.setYear(now.getFullYear() + 2);
    }
    return diffMethod(d, n);
  };	
  var daysDiff = function (d1, d2){
    return (d2-d1)/(1000*60*60*24);
  };	
  var hoursDiff = function (d1, d2){
    return (d2-d1)/(1000*60*60);
  };
  var timeCalc = {
    days : function(day, now){
			
      return handleDates(now, day, daysDiff);
    },
    hours : function(day, now){
      return handleDates(now, day, hoursDiff);
    },
    months : function(day, now){}
  };

  var CounterDetails = React.createClass({displayName: "CounterDetails",
    render : function(){
      return (React.createElement("ul", null, 
        React.createElement("li", null, this.props.text, ": ", this.props.left.toFixed(3)), 
			React.createElement("li", null, "Timer igjen: ", this.props.hoursLeft.toFixed(3))
			));
}
});
		
var BirthdayHeader = React.createClass({displayName: "BirthdayHeader",
  render: function(){
    var daysLeft = timeCalc.days(this.props.eventday, this.props.now );
    var hoursLeft = timeCalc.hours(this.props.eventday, this.props.now );
    var details = [{text: 'Dager igjen', left: daysLeft, hoursLeft: hoursLeft}];
    var counterDetails = details.map(function(d){
      return (React.createElement(CounterDetails, {text: d.text, left: d.left, hoursLeft: d.hoursLeft}));
});
var format = this.props.eventtype=="birthday"?"d": "dd.MM";
return React.createElement("div", null, 
React.createElement("p", null, this.props.name, " - ", this.props.text, ": ", this.props.eventday.toString(format), 
counterDetails
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
  updateNow : function(){
    this.setState({now : new Date()});
    // console.log('now updated at ' + this.state.now.toString());
  },
  getInitialState : function(){
    return {now: new Date()};
  },
  componentDidMount: function(){
    this.updateNow();
    setInterval(this.updateNow, 10000);
  },
  render : function(){
    var currentState = this.state.now;
    var birthdays = this.props.birthdayList.map(function (bDay){
      return (React.createElement(BirthdayHeader, {name: bDay.name, text: bDay.text, eventday: bDay.eventday, now: currentState, eventtype: bDay.event}));
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