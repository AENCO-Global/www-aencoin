if (self.CavalryLogger) { CavalryLogger.start_js(["f2c8f"]); }

__d("BUISwitch.react",["cx","fbt","BUIComponent","Event","Keys","React"],(function a(b,c,d,e,f,g,h,i){"use strict";__p&&__p();var j,k,l=c("React").PropTypes;j=babelHelpers.inherits(m,c("BUIComponent"));k=j&&j.prototype;function m(){__p&&__p();var n,o;for(var p=arguments.length,q=Array(p),r=0;r<p;r++)q[r]=arguments[r];return o=(n=k.constructor).call.apply(n,[this].concat(q)),this.$BUISwitch1=function(event){if(this.props.disabled)return;this.props.onToggle&&this.props.onToggle(!this.props.value);if(this.props.preventEventBubbling)event.stopPropagation()}.bind(this),this.$BUISwitch2=function(event){if(this.props.disabled)return;var s=c("Event").getKeyCode(event);if(s===c("Keys").RETURN||s===c("Keys").SPACE){event.preventDefault();this.props.onToggle&&this.props.onToggle(!this.props.value);if(this.props.preventEventBubbling)event.stopPropagation()}}.bind(this),o}m.prototype.render=function(){return c("React").createElement("div",babelHelpers["extends"]({},this.props,{className:"_128j"+(this.props.value?" _128k":"")+(!this.props.value?" _128l":"")+(this.props.disabled?" _128m":"")+(this.props.animate?" _128n":"")+(this.props.inline?" _3n6a":"")}),c("React").createElement("div",{"aria-checked":this.props.value?"true":"false",className:"_128o",onClick:this.$BUISwitch1,onKeyDown:this.$BUISwitch2,onMouseDown:this.$BUISwitch3,role:"checkbox",tabIndex:this.props.disabled?"-1":"0"},c("React").createElement("div",{className:"_128p"})),this.$BUISwitch4())};m.prototype.$BUISwitch4=function(){if(!this.props.showLabel)return null;return c("React").createElement("span",{className:"_128q"},this.props.value?i._("ON"):i._("OFF"))};m.prototype.$BUISwitch3=function(event){event.preventDefault()};m.propTypes={animate:l.bool.isRequired,disabled:l.bool,onToggle:l.func,showLabel:l.bool,value:l.bool.isRequired,preventEventBubbling:l.bool,inline:l.bool};m.defaultProps={animate:true};f.exports=m}),null);