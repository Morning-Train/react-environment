(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{80:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return a})),t.d(n,"metadata",(function(){return c})),t.d(n,"toc",(function(){return p})),t.d(n,"default",(function(){return s}));var r=t(3),o=t(7),i=(t(0),t(88)),a={title:"Environment"},c={unversionedId:"providers/environment",id:"providers/environment",isDocsHomePage:!1,title:"Environment",description:"The Environment component provides an instance of the EnvironmentHelper class using the EnvContext.",source:"@site/docs/providers/environment.md",slug:"/providers/environment",permalink:"/providers/environment",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/providers/environment.md",version:"current",sidebar:"someSidebar",previous:{title:"WhenEnvValueMatches",permalink:"/conditionals/when-env-value-matches"},next:{title:"WithEnvValue",permalink:"/helpers/with-env-value"}},p=[],l={toc:p};function s(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},l,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("p",null,"The Environment component provides an instance of the ",Object(i.b)("inlineCode",{parentName:"p"},"EnvironmentHelper")," class using the ",Object(i.b)("inlineCode",{parentName:"p"},"EnvContext"),"."),Object(i.b)("p",null,"It is possible to pass an ",Object(i.b)("inlineCode",{parentName:"p"},"env")," prop to the component.\nIt is primarily used to ease testing, but it can be used to pass an env instance that will be directly passed to the context."),Object(i.b)("p",null,"Passing the ",Object(i.b)("inlineCode",{parentName:"p"},"data")," prop to the component will instantiate ",Object(i.b)("inlineCode",{parentName:"p"},"EnvironmentHelper")," with a custom data object."),Object(i.b)("p",null,"Not providing either the ",Object(i.b)("inlineCode",{parentName:"p"},"data"),"or ",Object(i.b)("inlineCode",{parentName:"p"},"env")," props will generate an instance of ",Object(i.b)("inlineCode",{parentName:"p"},"EnvironmentHelper")," using ",Object(i.b)("inlineCode",{parentName:"p"},"window.env"),"as base variable."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-jsx"},'import React from "react";\nimport {Environment} from "@morningtrain/react-environment";\n\nexport default function TestComponentUsingEnvironmentProvider() {\n    return (\n      <Environment data={{initial: \'data\'}}>\n        {/* Our children using the environment */}\n      </Environment>\n    );\n}\n')))}s.isMDXComponent=!0},88:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return d}));var r=t(0),o=t.n(r);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=o.a.createContext({}),s=function(e){var n=o.a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},u=function(e){var n=s(e.components);return o.a.createElement(l.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},b=o.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,a=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),u=s(t),b=r,d=u["".concat(a,".").concat(b)]||u[b]||m[b]||i;return t?o.a.createElement(d,c(c({ref:n},l),{},{components:t})):o.a.createElement(d,c({ref:n},l))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,a=new Array(i);a[0]=b;var c={};for(var p in n)hasOwnProperty.call(n,p)&&(c[p]=n[p]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var l=2;l<i;l++)a[l]=t[l];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);