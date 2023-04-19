var g=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function p(f){return f&&f.__esModule&&Object.prototype.hasOwnProperty.call(f,"default")?f.default:f}function y(f){if(f.__esModule)return f;var M=f.default;if(typeof M=="function"){var c=function h(){if(this instanceof h){var u=[null];u.push.apply(u,arguments);var w=Function.bind.apply(M,u);return new w}return M.apply(this,arguments)};c.prototype=M.prototype}else c={};return Object.defineProperty(c,"__esModule",{value:!0}),Object.keys(f).forEach(function(h){var u=Object.getOwnPropertyDescriptor(f,h);Object.defineProperty(c,h,u.get?u:{enumerable:!0,get:function(){return f[h]}})}),c}var I={},b={get exports(){return I},set exports(f){I=f}};/**
 * @license Complex.js v2.1.1 12/05/2020
 *
 * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/(function(f,M){(function(c){var h=Math.cosh||function(t){return Math.abs(t)<1e-9?1-t:(Math.exp(t)+Math.exp(-t))*.5},u=Math.sinh||function(t){return Math.abs(t)<1e-9?t:(Math.exp(t)-Math.exp(-t))*.5},w=function(t){var i=Math.PI/4;if(-i>t||t>i)return Math.cos(t)-1;var r=t*t;return r*(r*(r*(r*(r*(r*(r*(r/20922789888e3-1/87178291200)+1/479001600)-1/3628800)+1/40320)-1/720)+1/24)-1/2)},N=function(t,i){var r=Math.abs(t),n=Math.abs(i);return r<3e3&&n<3e3?Math.sqrt(r*r+n*n):(r<n?(r=n,n=t/i):n=i/t,r*Math.sqrt(1+n*n))},m=function(){throw SyntaxError("Invalid Param")};function l(t,i){var r=Math.abs(t),n=Math.abs(i);return t===0?Math.log(n):i===0?Math.log(r):r<3e3&&n<3e3?Math.log(t*t+i*i)*.5:(t=t/2,i=i/2,.5*Math.log(t*t+i*i)+Math.LN2)}var d=function(t,i){var r={re:0,im:0};if(t==null)r.re=r.im=0;else if(i!==void 0)r.re=t,r.im=i;else switch(typeof t){case"object":if("im"in t&&"re"in t)r.re=t.re,r.im=t.im;else if("abs"in t&&"arg"in t){if(!Number.isFinite(t.abs)&&Number.isFinite(t.arg))return e.INFINITY;r.re=t.abs*Math.cos(t.arg),r.im=t.abs*Math.sin(t.arg)}else if("r"in t&&"phi"in t){if(!Number.isFinite(t.r)&&Number.isFinite(t.phi))return e.INFINITY;r.re=t.r*Math.cos(t.phi),r.im=t.r*Math.sin(t.phi)}else t.length===2?(r.re=t[0],r.im=t[1]):m();break;case"string":r.im=r.re=0;var n=t.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g),s=1,o=0;n===null&&m();for(var a=0;a<n.length;a++){var v=n[a];v===" "||v==="	"||v===`
`||(v==="+"?s++:v==="-"?o++:v==="i"||v==="I"?(s+o===0&&m(),n[a+1]!==" "&&!isNaN(n[a+1])?(r.im+=parseFloat((o%2?"-":"")+n[a+1]),a++):r.im+=parseFloat((o%2?"-":"")+"1"),s=o=0):((s+o===0||isNaN(v))&&m(),n[a+1]==="i"||n[a+1]==="I"?(r.im+=parseFloat((o%2?"-":"")+v),a++):r.re+=parseFloat((o%2?"-":"")+v),s=o=0))}s+o>0&&m();break;case"number":r.im=0,r.re=t;break;default:m()}return isNaN(r.re)||isNaN(r.im),r};function e(t,i){if(!(this instanceof e))return new e(t,i);var r=d(t,i);this.re=r.re,this.im=r.im}e.prototype={re:0,im:0,sign:function(){var t=this.abs();return new e(this.re/t,this.im/t)},add:function(t,i){var r=new e(t,i);return this.isInfinite()&&r.isInfinite()?e.NAN:this.isInfinite()||r.isInfinite()?e.INFINITY:new e(this.re+r.re,this.im+r.im)},sub:function(t,i){var r=new e(t,i);return this.isInfinite()&&r.isInfinite()?e.NAN:this.isInfinite()||r.isInfinite()?e.INFINITY:new e(this.re-r.re,this.im-r.im)},mul:function(t,i){var r=new e(t,i);return this.isInfinite()&&r.isZero()||this.isZero()&&r.isInfinite()?e.NAN:this.isInfinite()||r.isInfinite()?e.INFINITY:r.im===0&&this.im===0?new e(this.re*r.re,0):new e(this.re*r.re-this.im*r.im,this.re*r.im+this.im*r.re)},div:function(t,i){var r=new e(t,i);if(this.isZero()&&r.isZero()||this.isInfinite()&&r.isInfinite())return e.NAN;if(this.isInfinite()||r.isZero())return e.INFINITY;if(this.isZero()||r.isInfinite())return e.ZERO;t=this.re,i=this.im;var n=r.re,s=r.im,o,a;return s===0?new e(t/n,i/n):Math.abs(n)<Math.abs(s)?(a=n/s,o=n*a+s,new e((t*a+i)/o,(i*a-t)/o)):(a=s/n,o=s*a+n,new e((t+i*a)/o,(i-t*a)/o))},pow:function(t,i){var r=new e(t,i);if(t=this.re,i=this.im,r.isZero())return e.ONE;if(r.im===0){if(i===0&&t>0)return new e(Math.pow(t,r.re),0);if(t===0)switch((r.re%4+4)%4){case 0:return new e(Math.pow(i,r.re),0);case 1:return new e(0,Math.pow(i,r.re));case 2:return new e(-Math.pow(i,r.re),0);case 3:return new e(0,-Math.pow(i,r.re))}}if(t===0&&i===0&&r.re>0&&r.im>=0)return e.ZERO;var n=Math.atan2(i,t),s=l(t,i);return t=Math.exp(r.re*s-r.im*n),i=r.im*s+r.re*n,new e(t*Math.cos(i),t*Math.sin(i))},sqrt:function(){var t=this.re,i=this.im,r=this.abs(),n,s;if(t>=0){if(i===0)return new e(Math.sqrt(t),0);n=.5*Math.sqrt(2*(r+t))}else n=Math.abs(i)/Math.sqrt(2*(r-t));return t<=0?s=.5*Math.sqrt(2*(r-t)):s=Math.abs(i)/Math.sqrt(2*(r+t)),new e(n,i<0?-s:s)},exp:function(){var t=Math.exp(this.re);return this.im,new e(t*Math.cos(this.im),t*Math.sin(this.im))},expm1:function(){var t=this.re,i=this.im;return new e(Math.expm1(t)*Math.cos(i)+w(i),Math.exp(t)*Math.sin(i))},log:function(){var t=this.re,i=this.im;return new e(l(t,i),Math.atan2(i,t))},abs:function(){return N(this.re,this.im)},arg:function(){return Math.atan2(this.im,this.re)},sin:function(){var t=this.re,i=this.im;return new e(Math.sin(t)*h(i),Math.cos(t)*u(i))},cos:function(){var t=this.re,i=this.im;return new e(Math.cos(t)*h(i),-Math.sin(t)*u(i))},tan:function(){var t=2*this.re,i=2*this.im,r=Math.cos(t)+h(i);return new e(Math.sin(t)/r,u(i)/r)},cot:function(){var t=2*this.re,i=2*this.im,r=Math.cos(t)-h(i);return new e(-Math.sin(t)/r,u(i)/r)},sec:function(){var t=this.re,i=this.im,r=.5*h(2*i)+.5*Math.cos(2*t);return new e(Math.cos(t)*h(i)/r,Math.sin(t)*u(i)/r)},csc:function(){var t=this.re,i=this.im,r=.5*h(2*i)-.5*Math.cos(2*t);return new e(Math.sin(t)*h(i)/r,-Math.cos(t)*u(i)/r)},asin:function(){var t=this.re,i=this.im,r=new e(i*i-t*t+1,-2*t*i).sqrt(),n=new e(r.re-i,r.im+t).log();return new e(n.im,-n.re)},acos:function(){var t=this.re,i=this.im,r=new e(i*i-t*t+1,-2*t*i).sqrt(),n=new e(r.re-i,r.im+t).log();return new e(Math.PI/2-n.im,n.re)},atan:function(){var t=this.re,i=this.im;if(t===0){if(i===1)return new e(0,1/0);if(i===-1)return new e(0,-1/0)}var r=t*t+(1-i)*(1-i),n=new e((1-i*i-t*t)/r,-2*t/r).log();return new e(-.5*n.im,.5*n.re)},acot:function(){var t=this.re,i=this.im;if(i===0)return new e(Math.atan2(1,t),0);var r=t*t+i*i;return r!==0?new e(t/r,-i/r).atan():new e(t!==0?t/0:0,i!==0?-i/0:0).atan()},asec:function(){var t=this.re,i=this.im;if(t===0&&i===0)return new e(0,1/0);var r=t*t+i*i;return r!==0?new e(t/r,-i/r).acos():new e(t!==0?t/0:0,i!==0?-i/0:0).acos()},acsc:function(){var t=this.re,i=this.im;if(t===0&&i===0)return new e(Math.PI/2,1/0);var r=t*t+i*i;return r!==0?new e(t/r,-i/r).asin():new e(t!==0?t/0:0,i!==0?-i/0:0).asin()},sinh:function(){var t=this.re,i=this.im;return new e(u(t)*Math.cos(i),h(t)*Math.sin(i))},cosh:function(){var t=this.re,i=this.im;return new e(h(t)*Math.cos(i),u(t)*Math.sin(i))},tanh:function(){var t=2*this.re,i=2*this.im,r=h(t)+Math.cos(i);return new e(u(t)/r,Math.sin(i)/r)},coth:function(){var t=2*this.re,i=2*this.im,r=h(t)-Math.cos(i);return new e(u(t)/r,-Math.sin(i)/r)},csch:function(){var t=this.re,i=this.im,r=Math.cos(2*i)-h(2*t);return new e(-2*u(t)*Math.cos(i)/r,2*h(t)*Math.sin(i)/r)},sech:function(){var t=this.re,i=this.im,r=Math.cos(2*i)+h(2*t);return new e(2*h(t)*Math.cos(i)/r,-2*u(t)*Math.sin(i)/r)},asinh:function(){var t=this.im;this.im=-this.re,this.re=t;var i=this.asin();return this.re=-this.im,this.im=t,t=i.re,i.re=-i.im,i.im=t,i},acosh:function(){var t=this.acos();if(t.im<=0){var i=t.re;t.re=-t.im,t.im=i}else{var i=t.im;t.im=-t.re,t.re=i}return t},atanh:function(){var t=this.re,i=this.im,r=t>1&&i===0,n=1-t,s=1+t,o=n*n+i*i,a=o!==0?new e((s*n-i*i)/o,(i*n+s*i)/o):new e(t!==-1?t/0:0,i!==0?i/0:0),v=a.re;return a.re=l(a.re,a.im)/2,a.im=Math.atan2(a.im,v)/2,r&&(a.im=-a.im),a},acoth:function(){var t=this.re,i=this.im;if(t===0&&i===0)return new e(0,Math.PI/2);var r=t*t+i*i;return r!==0?new e(t/r,-i/r).atanh():new e(t!==0?t/0:0,i!==0?-i/0:0).atanh()},acsch:function(){var t=this.re,i=this.im;if(i===0)return new e(t!==0?Math.log(t+Math.sqrt(t*t+1)):1/0,0);var r=t*t+i*i;return r!==0?new e(t/r,-i/r).asinh():new e(t!==0?t/0:0,i!==0?-i/0:0).asinh()},asech:function(){var t=this.re,i=this.im;if(this.isZero())return e.INFINITY;var r=t*t+i*i;return r!==0?new e(t/r,-i/r).acosh():new e(t!==0?t/0:0,i!==0?-i/0:0).acosh()},inverse:function(){if(this.isZero())return e.INFINITY;if(this.isInfinite())return e.ZERO;var t=this.re,i=this.im,r=t*t+i*i;return new e(t/r,-i/r)},conjugate:function(){return new e(this.re,-this.im)},neg:function(){return new e(-this.re,-this.im)},ceil:function(t){return t=Math.pow(10,t||0),new e(Math.ceil(this.re*t)/t,Math.ceil(this.im*t)/t)},floor:function(t){return t=Math.pow(10,t||0),new e(Math.floor(this.re*t)/t,Math.floor(this.im*t)/t)},round:function(t){return t=Math.pow(10,t||0),new e(Math.round(this.re*t)/t,Math.round(this.im*t)/t)},equals:function(t,i){var r=new e(t,i);return Math.abs(r.re-this.re)<=e.EPSILON&&Math.abs(r.im-this.im)<=e.EPSILON},clone:function(){return new e(this.re,this.im)},toString:function(){var t=this.re,i=this.im,r="";return this.isNaN()?"NaN":this.isInfinite()?"Infinity":(Math.abs(t)<e.EPSILON&&(t=0),Math.abs(i)<e.EPSILON&&(i=0),i===0?r+t:(t!==0?(r+=t,r+=" ",i<0?(i=-i,r+="-"):r+="+",r+=" "):i<0&&(i=-i,r+="-"),i!==1&&(r+=i),r+"i"))},toVector:function(){return[this.re,this.im]},valueOf:function(){return this.im===0?this.re:null},isNaN:function(){return isNaN(this.re)||isNaN(this.im)},isZero:function(){return this.im===0&&this.re===0},isFinite:function(){return isFinite(this.re)&&isFinite(this.im)},isInfinite:function(){return!(this.isNaN()||this.isFinite())}},e.ZERO=new e(0,0),e.ONE=new e(1,0),e.I=new e(0,1),e.PI=new e(Math.PI,0),e.E=new e(Math.E,0),e.INFINITY=new e(1/0,1/0),e.NAN=new e(NaN,NaN),e.EPSILON=1e-15,Object.defineProperty(e,"__esModule",{value:!0}),e.default=e,e.Complex=e,f.exports=e})()})(b);const F=p(I);export{F as C,y as a,g as c,p as g};
