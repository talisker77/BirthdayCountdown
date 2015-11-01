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

  var CounterDetails = React.createClass({
    render : function(){
      return (<ul>
        <li>{this.props.text}{": "}{this.props.left.toFixed(3)}</li>
			<li>{"Timer igjen: "}{this.props.hoursLeft.toFixed(3)}</li>
			</ul>);
}
});
		
var BirthdayHeader = React.createClass({
  render: function(){
    var daysLeft = timeCalc.days(this.props.eventday, this.props.now );
    var hoursLeft = timeCalc.hours(this.props.eventday, this.props.now );
    var details = [{text: 'Dager igjen', left: daysLeft, hoursLeft: hoursLeft}];
    var counterDetails = details.map(function(d){
      return (<CounterDetails text={d.text} left={d.left} hoursLeft={d.hoursLeft} />);
});
var format = this.props.eventtype=="birthday"?"d": "dd.MM";
return <div>
<p>{this.props.name}{" - "}{this.props.text}{": "}{this.props.eventday.toString(format)}
{counterDetails}
</p>
</div>;
}
});
	
var Header = React.createClass({
  render : function(){
    return <div data-role="header"></div>;
  }
});

var Footer = React.createClass({
  render : function(){
    return <div data-role="footer"></div>;
  }
});

var Content = React.createClass({
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
      return (<BirthdayHeader name={bDay.name} text={bDay.text} eventday={bDay.eventday } now={currentState} eventtype={bDay.event} />);
});
return <div data-role="content" >
{birthdays}
</div>;
}
});

var Page = React.createClass({
  render : function(){
    return <div data-theme="b" data-role="page" id={this.props.pageId} data-position="fixed">
		<Header />
		<Content birthdayList={list} />
		<Footer />
		</div>;
  }
});

React.render(<Page pageId="main" />, document.getElementById('app'));

})();