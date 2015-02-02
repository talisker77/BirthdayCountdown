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
		return React.createElement("div", {"data-role": "content"})
	}
});

var Page = React.createClass({displayName: "Page",
	render : function(){
		return React.createElement("div", {"data-theme": "b", "data-role": "page", id: this.props.pageId, "data-position": "fixed"}, 
		React.createElement(Header, null), 
		React.createElement(Content, null), 
		React.createElement(Footer, null)
		);
	}
});

React.renderComponent(React.createElement(Page, {pageId: "main"}), document.getElementById('app'));