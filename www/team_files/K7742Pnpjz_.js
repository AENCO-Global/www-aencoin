if (self.CavalryLogger) { CavalryLogger.start_js(["51zND"]); }

__d("ClickableAreaButton.react",["cx","invariant","Focus","React","ReactDOM"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j,k;j=babelHelpers.inherits(l,c("React").Component);k=j&&j.prototype;l.prototype.componentDidMount=function(){"use strict";if(this.$ClickableAreaButton1)c("Focus").relocate(c("ReactDOM").findDOMNode(this.$ClickableAreaButton1),c("ReactDOM").findDOMNode(this))};l.prototype.render=function(){"use strict";var m=this.props,n=m.children,o=m.disabled,p=m.label,q=m.onClick,r=m.pressed,s=c("React").Children.only(n);!s.props.onClick||i(0);var t=q?c("React").createElement("button",{"aria-pressed":r,className:"accessible_elem",disabled:o,label:p,key:"accessible_button",ref:function(u){return this.$ClickableAreaButton1=u}.bind(this)},p):null;return c("React").cloneElement(s,{onClick:o?null:q},[s.props.children,t])};function l(){"use strict";j.apply(this,arguments)}f.exports=l}),null);