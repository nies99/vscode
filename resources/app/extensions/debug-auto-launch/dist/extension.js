!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=require("path")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.deactivate=t.activate=void 0;const o=n(2),a=n(3),r=n(4).loadMessageBundle(n(0).join(__dirname,"extension.ts")),i=r(0,null),s=r(1,null),c=["autoAttachSmartPattern","autoAttachFilter"];let u,l;function d(){const e=a.workspace.getConfiguration("debug.node");if(e){let t=e.get("autoAttach");t="on"===t?"off":"on";const n=e.inspect("autoAttach");let o=a.ConfigurationTarget.Global;n&&(n.workspaceFolderValue?o=a.ConfigurationTarget.WorkspaceFolder:n.workspaceValue?o=a.ConfigurationTarget.Workspace:n.globalValue?o=a.ConfigurationTarget.Global:n.defaultValue&&a.workspace.workspaceFolders&&(o=a.ConfigurationTarget.Workspace)),e.update("autoAttach",t,o)}}function f(){return a.workspace.getConfiguration("debug.javascript").get("usePreviewAutoAttach",!0)}function g(){switch(a.workspace.getConfiguration("debug.node").get("autoAttach")){case"off":return 1;case"on":return f()?2:3;case"disabled":default:return 0}}function p(e){return l?l.show():(l=a.window.createStatusBarItem(a.StatusBarAlignment.Left),l.command="extension.node-debug.toggleAutoAttach",l.tooltip=r(2,null),l.show(),e.subscriptions.push(l)),l}async function v(e){await e.workspaceState.update("jsDebugIpcState",void 0),await a.commands.executeCommand("extension.js-debug.clearAutoAttachVariables")}t.activate=function(e){var t,n;const o=e.workspaceState.get("lastState",0);u=Promise.resolve(null===(n=(t=m[o]).onActivate)||void 0===n?void 0:n.call(t,e,g())).then(()=>({context:e,state:0,transitionData:null})),e.subscriptions.push(a.commands.registerCommand("extension.node-debug.toggleAutoAttach",d));const r=["debug.node.autoAttach","debug.javascript.usePreviewAutoAttach"],i=c.map(e=>"debug.javascript."+e);e.subscriptions.push(a.workspace.onDidChangeConfiguration(t=>{r.some(e=>t.affectsConfiguration(e))?b():i.some(e=>t.affectsConfiguration(e))&&(u=u.then(async t=>{var n,o,a,r;if(2!==t.state)return t;await(null===(o=(n=m[2]).exit)||void 0===o?void 0:o.call(n,e,t.transitionData)),await v(e);const i=await(null===(r=(a=m[2]).enter)||void 0===r?void 0:r.call(a,e));return{context:e,state:2,transitionData:i}}))})),b()},t.deactivate=async function(){var e,t;const{context:n,state:o,transitionData:a}=await u;await(null===(t=(e=m[o]).exit)||void 0===t?void 0:t.call(e,n,a))};const m={0:{async enter(e){null==l||l.hide(),await v(e)}},1:{enter(e){p(e).text=s}},3:{async enter(e){const t=p(e),n=process.env.VSCODE_PID,o=n?parseInt(n):0;await a.commands.executeCommand("extension.node-debug.startAutoAttach",o),t.text=i},async exit(){await a.commands.executeCommand("extension.node-debug.stopAutoAttach")}},2:{async enter(e){const t=await async function(e){var t,n;const o=e.workspaceState.get("jsDebugIpcState"),r=(null===(t=a.extensions.getExtension("ms-vscode.js-debug-nightly"))||void 0===t?void 0:t.extensionPath)||(null===(n=a.extensions.getExtension("ms-vscode.js-debug"))||void 0===n?void 0:n.extensionPath),i=function(){let e={};const t=a.workspace.getConfiguration("debug.javascript");for(const n of c)e[n]=t.get(n);return JSON.stringify(e)}();if(o&&o.jsDebugPath===r&&o.settingsValue===i)return o.ipcAddress;const s=await a.commands.executeCommand("extension.js-debug.setAutoAttachVariables",null==o?void 0:o.ipcAddress);if(!s)return;const u=s.ipcAddress;return await e.workspaceState.update("jsDebugIpcState",{ipcAddress:u,jsDebugPath:r,settingsValue:i}),u}(e);if(!t)return null;const n=await new Promise((e,n)=>{const r=o.createServer(e=>{let t=[];e.on("data",async n=>{if(0===n[n.length-1]){t.push(n.slice(0,-1));try{await a.commands.executeCommand("extension.js-debug.autoAttachToProcess",JSON.parse(Buffer.concat(t).toString())),e.write(Buffer.from([0]))}catch(t){e.write(Buffer.from([1])),console.error(t)}}else t.push(n)})}).on("error",n).listen(t,()=>e(r))}).catch(console.error);return p(e).text=i,n||null},async exit(e,t){t&&await new Promise(e=>t.close(e)),f()||await v(e)},async onActivate(e,t){3!==t&&0!==t||await v(e)}}};function b(){const e=g();u=u.then(async({context:t,state:n,transitionData:o})=>{var a,r,i,s;if(e===n)return{context:t,state:n,transitionData:o};await(null===(r=(a=m[n]).exit)||void 0===r?void 0:r.call(a,t,o));const c=await(null===(s=(i=m[e]).enter)||void 0===s?void 0:s.call(i,t));return await t.workspaceState.update("lastState",e),{context:t,state:e,transitionData:c}})}},function(e,t){e.exports=require("net")},function(e,t){e.exports=require("vscode")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,a,r,i,s,c=n(0),u=n(5),l=Object.prototype.toString;function d(e){return void 0!==e}function f(e){return"[object Number]"===l.call(e)}function g(e){return"[object String]"===l.call(e)}function p(e){return JSON.parse(u.readFileSync(e,"utf8"))}function v(e,t){return s&&(e="［"+e.replace(/[aouei]/g,"$&$&")+"］"),0===t.length?e:e.replace(/\{(\d+)\}/g,(function(e,n){var o=n[0],a=t[o],r=e;return"string"==typeof a?r=a:"number"!=typeof a&&"boolean"!=typeof a&&null!=a||(r=String(a)),r}))}function m(e){return function(t,n){for(var o=[],a=2;a<arguments.length;a++)o[a-2]=arguments[a];return f(t)?t>=e.length?void console.error("Broken localize call found. Index out of bounds. Stacktrace is\n: "+new Error("").stack):v(e[t],o):g(n)?(console.warn("Message "+n+" didn't get externalized correctly."),v(n,o)):void console.error("Broken localize call found. Stacktrace is\n: "+new Error("").stack)}}function b(e,t){for(var n=[],o=2;o<arguments.length;o++)n[o-2]=arguments[o];return v(t,n)}function h(e,t){return r[e]=t,t}function y(e,t){var n,o,a,r=c.join(i.cacheRoot,e.id+"-"+e.hash+".json"),s=!1,l=!1;try{return n=JSON.parse(u.readFileSync(r,{encoding:"utf8",flag:"r"})),o=r,a=new Date,u.utimes(o,a,a,(function(){})),n}catch(e){if("ENOENT"===e.code)l=!0;else{if(!(e instanceof SyntaxError))throw e;console.log("Syntax error parsing message bundle: "+e.message+"."),u.unlink(r,(function(e){e&&console.error("Deleting corrupted bundle "+r+" failed.")})),s=!0}}if(!(n=function(e,t){var n=i.translationsConfig[e.id];if(n){var o=p(n).contents,a=p(c.join(t,"nls.metadata.json")),r=Object.create(null);for(var s in a){var u=a[s],l=o[e.outDir+"/"+s];if(l){for(var d=[],f=0;f<u.keys.length;f++){var v=u.keys[f],m=l[g(v)?v:v.key];void 0===m&&(m=u.messages[f]),d.push(m)}r[s]=d}else r[s]=u.messages}return r}}(e,t))||s)return n;if(l)try{u.writeFileSync(r,JSON.stringify(n),{encoding:"utf8",flag:"wx"})}catch(e){if("EEXIST"===e.code)return n;throw e}return n}function w(e){try{return function(e){var t=p(c.join(e,"nls.metadata.json")),n=Object.create(null);for(var o in t){var a=t[o];n[o]=a.messages}return n}(e)}catch(e){return void console.log("Generating default bundle from meta data failed.",e)}}function S(e,t){var n;if(!0===i.languagePackSupport&&void 0!==i.cacheRoot&&void 0!==i.languagePackId&&void 0!==i.translationsConfigFile&&void 0!==i.translationsConfig)try{n=y(e,t)}catch(e){console.log("Load or create bundle failed ",e)}if(!n){if(i.languagePackSupport)return w(t);var o=function(e){for(var t=i.locale;t;){var n=c.join(e,"nls.bundle."+t+".json");if(u.existsSync(n))return n;var o=t.lastIndexOf("-");t=o>0?t.substring(0,o):void 0}if(void 0===t){n=c.join(e,"nls.bundle.json");if(u.existsSync(n))return n}}(t);if(o)try{return p(o)}catch(e){console.log("Loading in the box message bundle failed.",e)}n=w(t)}return n}function x(e){if(!e)return b;var t=c.extname(e);if(t&&(e=e.substr(0,e.length-t.length)),i.messageFormat===o.both||i.messageFormat===o.bundle){var n=function(e){for(var t,n=c.dirname(e);t=c.join(n,"nls.metadata.header.json"),!u.existsSync(t);){var o=c.dirname(n);if(o===n){t=void 0;break}n=o}return t}(e);if(n){var a=c.dirname(n),l=r[a];if(void 0===l)try{var f=JSON.parse(u.readFileSync(n,"utf8"));try{var g=S(f,a);l=h(a,g?{header:f,nlsBundle:g}:null)}catch(e){console.error("Failed to load nls bundle",e),l=h(a,null)}}catch(e){console.error("Failed to read header file",e),l=h(a,null)}if(l){var v=e.substr(a.length+1).replace(/\\/g,"/"),y=l.nlsBundle[v];return void 0===y?(console.error("Messages for file "+e+" not found. See console for details."),function(){return"Messages not found."}):m(y)}}}if(i.messageFormat===o.both||i.messageFormat===o.file)try{var w=p(function(e){var t;if(i.cacheLanguageResolution&&t)t=t;else{if(s||!i.locale)t=".nls.json";else for(var n=i.locale;n;){var o=".nls."+n+".json";if(u.existsSync(e+o)){t=o;break}var a=n.lastIndexOf("-");a>0?n=n.substring(0,a):(t=".nls.json",n=null)}i.cacheLanguageResolution&&(t=t)}return e+t}(e));return Array.isArray(w)?m(w):d(w.messages)&&d(w.keys)?m(w.messages):(console.error("String bundle '"+e+"' uses an unsupported format."),function(){return"File bundle has unsupported format. See console for details"})}catch(e){"ENOENT"!==e.code&&console.error("Failed to load single file bundle",e)}return console.error("Failed to load message bundle for file "+e),function(){return"Failed to load message bundle. See console for details."}}!function(e){e.file="file",e.bundle="bundle",e.both="both"}(o=t.MessageFormat||(t.MessageFormat={})),function(e){e.is=function(e){var t=e;return t&&d(t.key)&&d(t.comment)}}(a||(a={})),function(){if(i={locale:void 0,languagePackSupport:!1,cacheLanguageResolution:!0,messageFormat:o.bundle},g(process.env.VSCODE_NLS_CONFIG))try{var e=JSON.parse(process.env.VSCODE_NLS_CONFIG);if(g(e.locale)&&(i.locale=e.locale.toLowerCase()),(!0===(t=e._languagePackSupport)||!1===t)&&(i.languagePackSupport=e._languagePackSupport),g(e._cacheRoot)&&(i.cacheRoot=e._cacheRoot),g(e._languagePackId)&&(i.languagePackId=e._languagePackId),g(e._translationsConfigFile)){i.translationsConfigFile=e._translationsConfigFile;try{i.translationsConfig=p(i.translationsConfigFile)}catch(t){e._corruptedFile&&u.writeFile(e._corruptedFile,"corrupted","utf8",(function(e){console.error(e)}))}}}catch(e){}var t;s="pseudo"===i.locale,void 0,r=Object.create(null)}(),t.loadMessageBundle=x,t.config=function(e){return e&&(g(e.locale)&&(i.locale=e.locale.toLowerCase(),void 0,r=Object.create(null)),void 0!==e.messageFormat&&(i.messageFormat=e.messageFormat)),s="pseudo"===i.locale,x}},function(e,t){e.exports=require("fs")}]));
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/undefined/extensions/debug-auto-launch/dist/extension.js.map