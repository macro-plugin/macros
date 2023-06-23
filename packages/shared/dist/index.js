'use strict';

var core = require('@macro-plugin/core');
var B = require('fs');
var p = require('path');
var cn = require('module');
var process$1 = require('process');
var core$1 = require('@swc/core');

function L(n){return /^\\\\\?\\/.test(n)?n:n.replace(/\\/g,"/")}function S(n,s){for(;;){const t=p.posix.join(n,s);if(B.existsSync(t))return t;const e=p.dirname(n);if(e===n)return;n=e;}}const W=/^\.{1,2}(\/.*)?$/,M=n=>L(W.test(n)?n:`./${n}`);function un(n,s=!1){const t=n.length;let e=0,i="",l=0,c=16,a=0,g=0,v=0,k=0,r=0;function F(o,f){let u=0,j=0;for(;u<o||!f;){let T=n.charCodeAt(e);if(T>=48&&T<=57)j=j*16+T-48;else if(T>=65&&T<=70)j=j*16+T-65+10;else if(T>=97&&T<=102)j=j*16+T-97+10;else break;e++,u++;}return u<o&&(j=-1),j}function U(o){e=o,i="",l=0,c=16,r=0;}function A(){let o=e;if(n.charCodeAt(e)===48)e++;else for(e++;e<n.length&&_(n.charCodeAt(e));)e++;if(e<n.length&&n.charCodeAt(e)===46)if(e++,e<n.length&&_(n.charCodeAt(e)))for(e++;e<n.length&&_(n.charCodeAt(e));)e++;else return r=3,n.substring(o,e);let f=e;if(e<n.length&&(n.charCodeAt(e)===69||n.charCodeAt(e)===101))if(e++,(e<n.length&&n.charCodeAt(e)===43||n.charCodeAt(e)===45)&&e++,e<n.length&&_(n.charCodeAt(e))){for(e++;e<n.length&&_(n.charCodeAt(e));)e++;f=e;}else r=3;return n.substring(o,f)}function b(){let o="",f=e;for(;;){if(e>=t){o+=n.substring(f,e),r=2;break}const u=n.charCodeAt(e);if(u===34){o+=n.substring(f,e),e++;break}if(u===92){if(o+=n.substring(f,e),e++,e>=t){r=2;break}switch(n.charCodeAt(e++)){case 34:o+='"';break;case 92:o+="\\";break;case 47:o+="/";break;case 98:o+="\b";break;case 102:o+="\f";break;case 110:o+=`
`;break;case 114:o+="\r";break;case 116:o+="	";break;case 117:const T=F(4,!0);T>=0?o+=String.fromCharCode(T):r=4;break;default:r=5;}f=e;continue}if(u>=0&&u<=31)if(N(u)){o+=n.substring(f,e),r=2;break}else r=6;e++;}return o}function O(){if(i="",r=0,l=e,g=a,k=v,e>=t)return l=t,c=17;let o=n.charCodeAt(e);if(R(o)){do e++,i+=String.fromCharCode(o),o=n.charCodeAt(e);while(R(o));return c=15}if(N(o))return e++,i+=String.fromCharCode(o),o===13&&n.charCodeAt(e)===10&&(e++,i+=`
`),a++,v=e,c=14;switch(o){case 123:return e++,c=1;case 125:return e++,c=2;case 91:return e++,c=3;case 93:return e++,c=4;case 58:return e++,c=6;case 44:return e++,c=5;case 34:return e++,i=b(),c=10;case 47:const f=e-1;if(n.charCodeAt(e+1)===47){for(e+=2;e<t&&!N(n.charCodeAt(e));)e++;return i=n.substring(f,e),c=12}if(n.charCodeAt(e+1)===42){e+=2;const u=t-1;let j=!1;for(;e<u;){const T=n.charCodeAt(e);if(T===42&&n.charCodeAt(e+1)===47){e+=2,j=!0;break}e++,N(T)&&(T===13&&n.charCodeAt(e)===10&&e++,a++,v=e);}return j||(e++,r=1),i=n.substring(f,e),c=13}return i+=String.fromCharCode(o),e++,c=16;case 45:if(i+=String.fromCharCode(o),e++,e===t||!_(n.charCodeAt(e)))return c=16;case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return i+=A(),c=11;default:for(;e<t&&E(o);)e++,o=n.charCodeAt(e);if(l!==e){switch(i=n.substring(l,e),i){case"true":return c=8;case"false":return c=9;case"null":return c=7}return c=16}return i+=String.fromCharCode(o),e++,c=16}}function E(o){if(R(o)||N(o))return !1;switch(o){case 125:case 93:case 123:case 91:case 34:case 58:case 44:case 47:return !1}return !0}function $(){let o;do o=O();while(o>=12&&o<=15);return o}return {setPosition:U,getPosition:()=>e,scan:s?$:O,getToken:()=>c,getTokenValue:()=>i,getTokenOffset:()=>l,getTokenLength:()=>e-l,getTokenStartLine:()=>g,getTokenStartCharacter:()=>l-k,getTokenError:()=>r}}function R(n){return n===32||n===9}function N(n){return n===10||n===13}function _(n){return n>=48&&n<=57}var P;(function(n){n[n.lineFeed=10]="lineFeed",n[n.carriageReturn=13]="carriageReturn",n[n.space=32]="space",n[n._0=48]="_0",n[n._1=49]="_1",n[n._2=50]="_2",n[n._3=51]="_3",n[n._4=52]="_4",n[n._5=53]="_5",n[n._6=54]="_6",n[n._7=55]="_7",n[n._8=56]="_8",n[n._9=57]="_9",n[n.a=97]="a",n[n.b=98]="b",n[n.c=99]="c",n[n.d=100]="d",n[n.e=101]="e",n[n.f=102]="f",n[n.g=103]="g",n[n.h=104]="h",n[n.i=105]="i",n[n.j=106]="j",n[n.k=107]="k",n[n.l=108]="l",n[n.m=109]="m",n[n.n=110]="n",n[n.o=111]="o",n[n.p=112]="p",n[n.q=113]="q",n[n.r=114]="r",n[n.s=115]="s",n[n.t=116]="t",n[n.u=117]="u",n[n.v=118]="v",n[n.w=119]="w",n[n.x=120]="x",n[n.y=121]="y",n[n.z=122]="z",n[n.A=65]="A",n[n.B=66]="B",n[n.C=67]="C",n[n.D=68]="D",n[n.E=69]="E",n[n.F=70]="F",n[n.G=71]="G",n[n.H=72]="H",n[n.I=73]="I",n[n.J=74]="J",n[n.K=75]="K",n[n.L=76]="L",n[n.M=77]="M",n[n.N=78]="N",n[n.O=79]="O",n[n.P=80]="P",n[n.Q=81]="Q",n[n.R=82]="R",n[n.S=83]="S",n[n.T=84]="T",n[n.U=85]="U",n[n.V=86]="V",n[n.W=87]="W",n[n.X=88]="X",n[n.Y=89]="Y",n[n.Z=90]="Z",n[n.asterisk=42]="asterisk",n[n.backslash=92]="backslash",n[n.closeBrace=125]="closeBrace",n[n.closeBracket=93]="closeBracket",n[n.colon=58]="colon",n[n.comma=44]="comma",n[n.dot=46]="dot",n[n.doubleQuote=34]="doubleQuote",n[n.minus=45]="minus",n[n.openBrace=123]="openBrace",n[n.openBracket=91]="openBracket",n[n.plus=43]="plus",n[n.slash=47]="slash",n[n.formFeed=12]="formFeed",n[n.tab=9]="tab";})(P||(P={}));var h$1;(function(n){n.DEFAULT={allowTrailingComma:!1};})(h$1||(h$1={}));function fn(n,s=[],t=h$1.DEFAULT){let e=null,i=[];const l=[];function c(g){Array.isArray(i)?i.push(g):e!==null&&(i[e]=g);}return rn(n,{onObjectBegin:()=>{const g={};c(g),l.push(i),i=g,e=null;},onObjectProperty:g=>{e=g;},onObjectEnd:()=>{i=l.pop();},onArrayBegin:()=>{const g=[];c(g),l.push(i),i=g,e=null;},onArrayEnd:()=>{i=l.pop();},onLiteralValue:c,onError:(g,v,k)=>{s.push({error:g,offset:v,length:k});}},t),i[0]}function rn(n,s,t=h$1.DEFAULT){const e=un(n,!1),i=[];function l(m){return m?()=>m(e.getTokenOffset(),e.getTokenLength(),e.getTokenStartLine(),e.getTokenStartCharacter()):()=>!0}function c(m){return m?()=>m(e.getTokenOffset(),e.getTokenLength(),e.getTokenStartLine(),e.getTokenStartCharacter(),()=>i.slice()):()=>!0}function a(m){return m?w=>m(w,e.getTokenOffset(),e.getTokenLength(),e.getTokenStartLine(),e.getTokenStartCharacter()):()=>!0}function g(m){return m?w=>m(w,e.getTokenOffset(),e.getTokenLength(),e.getTokenStartLine(),e.getTokenStartCharacter(),()=>i.slice()):()=>!0}const v=c(s.onObjectBegin),k=g(s.onObjectProperty),r=l(s.onObjectEnd),F=c(s.onArrayBegin),U=l(s.onArrayEnd),A=g(s.onLiteralValue),b=a(s.onSeparator),O=l(s.onComment),E=a(s.onError),$=t&&t.disallowComments,o=t&&t.allowTrailingComma;function f(){for(;;){const m=e.scan();switch(e.getTokenError()){case 4:u(14);break;case 5:u(15);break;case 3:u(13);break;case 1:$||u(11);break;case 2:u(12);break;case 6:u(16);break}switch(m){case 12:case 13:$?u(10):O();break;case 16:u(1);break;case 15:case 14:break;default:return m}}}function u(m,w=[],H=[]){if(E(m),w.length+H.length>0){let I=e.getToken();for(;I!==17;){if(w.indexOf(I)!==-1){f();break}else if(H.indexOf(I)!==-1)break;I=f();}}}function j(m){const w=e.getTokenValue();return m?A(w):(k(w),i.push(w)),f(),!0}function T(){switch(e.getToken()){case 11:const m=e.getTokenValue();let w=Number(m);isNaN(w)&&(u(2),w=0),A(w);break;case 7:A(null);break;case 8:A(!0);break;case 9:A(!1);break;default:return !1}return f(),!0}function sn(){return e.getToken()!==10?(u(3,[],[2,5]),!1):(j(!1),e.getToken()===6?(b(":"),f(),V()||u(4,[],[2,5])):u(5,[],[2,5]),i.pop(),!0)}function on(){v(),f();let m=!1;for(;e.getToken()!==2&&e.getToken()!==17;){if(e.getToken()===5){if(m||u(4,[],[]),b(","),f(),e.getToken()===2&&o)break}else m&&u(6,[],[]);sn()||u(4,[],[2,5]),m=!0;}return r(),e.getToken()!==2?u(7,[2],[]):f(),!0}function ln(){F(),f();let m=!0,w=!1;for(;e.getToken()!==4&&e.getToken()!==17;){if(e.getToken()===5){if(w||u(4,[],[]),b(","),f(),e.getToken()===4&&o)break}else w&&u(6,[],[]);m?(i.push(0),m=!1):i[i.length-1]++,V()||u(4,[],[4,5]),w=!0;}return U(),m||i.pop(),e.getToken()!==4?u(8,[4],[]):f(),!0}function V(){switch(e.getToken()){case 3:return ln();case 1:return on();case 10:return j(!0);default:return T()}}return f(),e.getToken()===17?t.allowEmptyContent?!0:(u(4,[],[]),!1):V()?(e.getToken()!==17&&u(9,[],[]),!0):(u(4,[],[]),!1)}var X;(function(n){n[n.None=0]="None",n[n.UnexpectedEndOfComment=1]="UnexpectedEndOfComment",n[n.UnexpectedEndOfString=2]="UnexpectedEndOfString",n[n.UnexpectedEndOfNumber=3]="UnexpectedEndOfNumber",n[n.InvalidUnicode=4]="InvalidUnicode",n[n.InvalidEscapeCharacter=5]="InvalidEscapeCharacter",n[n.InvalidCharacter=6]="InvalidCharacter";})(X||(X={}));var Y;(function(n){n[n.OpenBraceToken=1]="OpenBraceToken",n[n.CloseBraceToken=2]="CloseBraceToken",n[n.OpenBracketToken=3]="OpenBracketToken",n[n.CloseBracketToken=4]="CloseBracketToken",n[n.CommaToken=5]="CommaToken",n[n.ColonToken=6]="ColonToken",n[n.NullKeyword=7]="NullKeyword",n[n.TrueKeyword=8]="TrueKeyword",n[n.FalseKeyword=9]="FalseKeyword",n[n.StringLiteral=10]="StringLiteral",n[n.NumericLiteral=11]="NumericLiteral",n[n.LineCommentTrivia=12]="LineCommentTrivia",n[n.BlockCommentTrivia=13]="BlockCommentTrivia",n[n.LineBreakTrivia=14]="LineBreakTrivia",n[n.Trivia=15]="Trivia",n[n.Unknown=16]="Unknown",n[n.EOF=17]="EOF";})(Y||(Y={}));const pn=fn;var Z;(function(n){n[n.InvalidSymbol=1]="InvalidSymbol",n[n.InvalidNumberFormat=2]="InvalidNumberFormat",n[n.PropertyNameExpected=3]="PropertyNameExpected",n[n.ValueExpected=4]="ValueExpected",n[n.ColonExpected=5]="ColonExpected",n[n.CommaExpected=6]="CommaExpected",n[n.CloseBraceExpected=7]="CloseBraceExpected",n[n.CloseBracketExpected=8]="CloseBracketExpected",n[n.EndOfFileExpected=9]="EndOfFileExpected",n[n.InvalidCommentToken=10]="InvalidCommentToken",n[n.UnexpectedEndOfComment=11]="UnexpectedEndOfComment",n[n.UnexpectedEndOfString=12]="UnexpectedEndOfString",n[n.UnexpectedEndOfNumber=13]="UnexpectedEndOfNumber",n[n.InvalidUnicode=14]="InvalidUnicode",n[n.InvalidEscapeCharacter=15]="InvalidEscapeCharacter",n[n.InvalidCharacter=16]="InvalidCharacter";})(Z||(Z={}));const q=n=>pn(B.readFileSync(n,"utf8")),{existsSync:D}=B,gn=()=>{const{findPnpApi:n}=cn;return n&&n(process.cwd())};function d(n){const s=q(n);return p.join(n,"..",s&&"tsconfig"in s?s.tsconfig:"tsconfig.json")}function mn(n,s){let t=n;const e=n[0]===".";if(e||p.isAbsolute(n)){if(e&&(t===".."&&(t+="/tsconfig.json"),t=p.resolve(s,t)),D(t)&&B.statSync(t).isFile()||!t.endsWith(".json")&&(t+=".json",D(t)))return t;throw new Error(`File '${n}' not found.`)}const i=gn();if(i){const{resolveRequest:c}=i,[a,g]=n.split("/"),v=a.startsWith("@")?`${a}/${g}`:a;try{if(v===n){const k=c(p.join(v,"package.json"),s);if(k){const r=d(k);if(D(r))return r}}else {let k;try{k=c(n,s,{extensions:[".json"]});}catch{k=c(p.join(n,"tsconfig.json"),s);}if(k)return k}}catch{}}let l=S(s,p.join("node_modules",t));if(l){if(B.statSync(l).isDirectory()){const c=p.join(l,"package.json");if(D(c)?l=d(c):l=p.join(l,"tsconfig.json"),D(l))return l}else if(l.endsWith(".json"))return l}if(!t.endsWith(".json")&&(t+=".json",l=S(s,p.join("node_modules",t)),l))return l;throw new Error(`File '${n}' not found.`)}const an=(n,s)=>{var t;const e=mn(n,s),i=J(e);if(delete i.references,(t=i.compilerOptions)!=null&&t.baseUrl){const{compilerOptions:l}=i;l.baseUrl=p.relative(s,p.join(p.dirname(e),l.baseUrl))||"./";}return i.files&&(i.files=i.files.map(l=>p.relative(s,p.join(p.dirname(e),l)))),i.include&&(i.include=i.include.map(l=>p.relative(s,p.join(p.dirname(e),l)))),i},J=n=>{let s;try{s=B.realpathSync(n);}catch{throw new Error(`Cannot resolve tsconfig at path: ${n}`)}const t=p.dirname(s);let e=q(s)||{};if(typeof e!="object")throw new SyntaxError(`Failed to parse tsconfig at: ${n}`);if(e.extends){const i=Array.isArray(e.extends)?e.extends:[e.extends];delete e.extends;for(const l of i.reverse()){const c=an(l,t),a={...c,...e,compilerOptions:{...c.compilerOptions,...e.compilerOptions}};c.watchOptions&&(a.watchOptions={...c.watchOptions,...e.watchOptions}),e=a;}}if(e.compilerOptions){const{compilerOptions:i}=e;i.baseUrl&&(i.baseUrl=M(i.baseUrl)),i.outDir&&(Array.isArray(e.exclude)||(e.exclude=[]),e.exclude.push(i.outDir),i.outDir=M(i.outDir));}else e.compilerOptions={};if(e.files&&(e.files=e.files.map(M)),e.include&&(e.include=e.include.map(L)),e.watchOptions){const{watchOptions:i}=e;i.excludeDirectories&&(i.excludeDirectories=i.excludeDirectories.map(l=>L(p.resolve(t,l))));}return e};function kn(n=process.cwd(),s="tsconfig.json"){const t=S(L(n),s);if(!t)return null;const e=J(t);return {path:t,config:e}}p.posix;process.platform==="win32";

const nodeTargetDefaults = new Map([
    ["12", "es2018"],
    ["13", "es2019"],
    ["14", "es2020"],
    ["15", "es2021"],
    ["16", "es2021"],
    ["17", "es2022"],
]);
const SWC_OPTION_KEYS = [
    // "test",
    // "exclude",
    "env",
    "jsc",
    "module",
    "minify",
    "sourceMaps",
    "inlineSourcesContent",
    "script",
    "cwd",
    "caller",
    // "filename",
    "root",
    "rootMode",
    "envName",
    // "configFile",
    // "swcrc",
    // "swcrcRoots",
    "inputSourceMap",
    "sourceFileName",
    "sourceRoot",
    // "plugin",
    "isModule",
    "outputPath"
];
const TS_CACHE = new Map();
const CWD = process.cwd();
const SCRIPT_EXTENSIONS = [".js", ".ts", ".jsx", ".tsx", ".mjs", ".cjs"];
const fileExists = (path) => {
    return B.promises.access(path, B.constants.F_OK)
        .then(() => true)
        .catch(() => false);
};
const importLib = (moduleId, dir = CWD) => cn.createRequire(p.resolve(dir, "noop.js"))(moduleId);
async function autoRequire(id, defaultExport = false) {
    try {
        return require(id);
    }
    catch (_a) {
    }
    const exports = (await import(id) || {});
    return defaultExport ? exports.default : exports;
}
function writeDts(p, dts) {
    const emit = () => B.writeFile(p, dts, () => { });
    if (B.existsSync(p)) {
        B.readFile(p, (err, data) => {
            if ((err == null && dts !== data.toString()) || err)
                emit();
        });
    }
    else {
        emit();
    }
}
/** extract only swc options from an object */
function extractSwcOptions(o) {
    const output = {};
    for (const [k, v] of Object.entries(o)) {
        if (SWC_OPTION_KEYS.includes(k))
            output[k] = v;
    }
    return output;
}
/**
 * resolve typescript compiler options, for support `paths`, `target`...
 */
const resolveTsOptions = (cwd, tsconfig) => {
    var _a, _b, _c;
    const cacheKey = `${cwd}:${tsconfig !== null && tsconfig !== void 0 ? tsconfig : "undefined"}`;
    if (TS_CACHE.has(cacheKey)) {
        return (_a = TS_CACHE.get(cacheKey)) !== null && _a !== void 0 ? _a : {};
    }
    if (tsconfig && p.isAbsolute(tsconfig)) {
        const compilerOptions = (_b = J(tsconfig).compilerOptions) !== null && _b !== void 0 ? _b : {};
        TS_CACHE.set(cacheKey, compilerOptions);
        return compilerOptions;
    }
    let result = kn(cwd, tsconfig || "tsconfig.json");
    // Only fallback to `jsconfig.json` when tsconfig can not be resolved AND custom tsconfig filename is not provided
    if (!result && !tsconfig) {
        result = kn(cwd, "jsconfig.json");
    }
    const compilerOptions = (_c = result === null || result === void 0 ? void 0 : result.config.compilerOptions) !== null && _c !== void 0 ? _c : {};
    TS_CACHE.set(cacheKey, compilerOptions);
    return compilerOptions;
};
function resolveSwcOptions(config) {
    const swcOptions = extractSwcOptions(config);
    swcOptions.swcrc = false;
    swcOptions.configFile = false;
    if (!swcOptions.jsc)
        swcOptions.jsc = {};
    if (!swcOptions.jsc.target) {
        swcOptions.jsc.target = nodeTargetDefaults.get(process.version.match(/v(\d+)/)[1]) || "es2018";
    }
    if (!swcOptions.sourceMaps)
        swcOptions.sourceMaps = "inline";
    return swcOptions;
}
function patchTsOptions(options, tsOptions, isTypeScript, isTsx, isJsx) {
    var _a, _b;
    if (!options.jsc)
        options.jsc = {};
    options.jsc.minify = undefined;
    options.jsc.parser = isTypeScript
        ? {
            syntax: "typescript",
            tsx: isTsx,
            decorators: tsOptions === null || tsOptions === void 0 ? void 0 : tsOptions.experimentalDecorators
        }
        : {
            syntax: "ecmascript",
            jsx: isJsx,
            decorators: tsOptions === null || tsOptions === void 0 ? void 0 : tsOptions.experimentalDecorators
        };
    if (!tsOptions)
        return options;
    options.jsc.transform = Object.assign(Object.assign({}, options.jsc.transform || {}), { decoratorMetadata: tsOptions.emitDecoratorMetadata, react: Object.assign(Object.assign({}, ((_a = options.jsc.transform) === null || _a === void 0 ? void 0 : _a.react) || {}), { runtime: "automatic", importSource: tsOptions.jsxImportSource, pragma: tsOptions.jsxFactory, pragmaFrag: tsOptions.jsxFragmentFactory, development: tsOptions.jsx === "react-jsxdev" ? true : undefined }) });
    options.jsc.externalHelpers = tsOptions.importHelpers;
    options.jsc.target = (_b = tsOptions.target) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    options.jsc.baseUrl = tsOptions.baseUrl;
    options.jsc.paths = tsOptions.paths;
    return options;
}
function resolveDepends(depends) {
    const output = [];
    for (const pkg of depends) {
        for (const v of Object.values(importLib(pkg))) {
            if (core.isMacroPlugin(v))
                output.push(v);
        }
    }
    return output;
}
function resolveExternals(externals) {
    const output = {};
    for (const pkg of externals) {
        output[pkg] = {};
        for (const [k, v] of Object.entries(importLib(pkg))) {
            if (core.isMacroPlugin(v))
                output[pkg][k] = v;
        }
    }
    return output;
}
function resolveMacroOptions(config) {
    if (config.emitDts && !config.onEmitDts) {
        config.onEmitDts = (dts) => writeDts(p.resolve(config.dtsOutputPath || "./macros.d.ts"), dts);
    }
    if (config.depends) {
        if (!config.macros)
            config.macros = [];
        config.macros.push(...(resolveDepends(config.depends)));
    }
    if (Array.isArray(config.externals)) {
        config.externals = resolveExternals(config.externals);
    }
    return config;
}
function createTsLib() {
    let source;
    let version;
    try {
        const require = cn.createRequire(p.resolve(process.cwd(), "noop.js"));
        const tslibPackage = require("tslib/package.json");
        const tslibPath = require.resolve("tslib/" + tslibPackage.module);
        source = B.readFileSync(tslibPath, "utf8");
        version = tslibPackage.version;
        return { lib: "tslib", virtual: "\0tslib.js", source, version };
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.warn("macros: Error loading `tslib` helper library.");
        throw e;
    }
}
function normalizePath(filename) {
    return filename.split(p.win32.sep).join(p.posix.sep);
}
function createModuleResolver(ts, host) {
    const compilerOptions = host.getCompilationSettings();
    const cache = ts.createModuleResolutionCache(process.cwd(), host.getCanonicalFileName, compilerOptions);
    const moduleHost = Object.assign(Object.assign({}, ts.sys), host);
    return (moduleName, containingFile, redirectedReference, mode) => {
        const resolved = ts.resolveModuleName(moduleName, containingFile, compilerOptions, moduleHost, cache, redirectedReference, mode);
        return resolved.resolvedModule;
    };
}
function createFormattingHost(ts, compilerOptions) {
    return {
        /** Returns the compiler options for the project. */
        getCompilationSettings: () => compilerOptions,
        /** Returns the current working directory. */
        getCurrentDirectory: () => process.cwd(),
        /** Returns the string that corresponds with the selected `NewLineKind`. */
        getNewLine() {
            switch (compilerOptions.newLine) {
                case ts.NewLineKind.CarriageReturnLineFeed:
                    return "\r\n";
                case ts.NewLineKind.LineFeed:
                    return "\n";
                default:
                    return ts.sys.newLine;
            }
        },
        /** Returns a lower case name on case insensitive systems, otherwise the original name. */
        getCanonicalFileName: (fileName) => ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
    };
}
/** create a rollup/vite typescript file resolver */
function createTsResolver(tslib, compilerOptions, filter) {
    const ts = importLib("typescript");
    const formatHost = createFormattingHost(ts, {});
    const resolveModule = createModuleResolver(ts, formatHost);
    return (importee, importer) => {
        if (importee === tslib.lib)
            return tslib.virtual;
        if (!importer)
            return null;
        // Convert path from windows separators to posix separators
        const containingFile = normalizePath(importer);
        // when using node16 or nodenext module resolution, we need to tell ts if
        // we are resolving to a commonjs or esnext module
        const mode = typeof ts.getImpliedNodeFormatForFile === "function"
            ? ts.getImpliedNodeFormatForFile(
            // @ts-expect-error
            containingFile, undefined, Object.assign(Object.assign({}, ts.sys), formatHost), compilerOptions)
            : undefined; // eslint-disable-line no-undefined
        // eslint-disable-next-line no-undefined
        const resolved = resolveModule(importee, containingFile, undefined, mode);
        if (resolved) {
            if (/\.d\.[cm]?ts/.test(resolved.extension))
                return null;
            if (!filter(resolved.resolvedFileName))
                return null;
            return p.normalize(resolved.resolvedFileName);
        }
        return null;
    };
}
/** create a rollup/vite file resolver */
function createResolver(extensions) {
    const resolveFile = async (resolved, index = false) => {
        const fileWithoutExt = resolved.replace(/\.\w+$/, "");
        for (const ext of extensions) {
            const file = index ? p.join(resolved, `index${ext}`) : `${fileWithoutExt}${ext}`;
            // We only check one file at a time, and we can return early
            // eslint-disable-next-line no-await-in-loop
            if (await fileExists(file))
                return file;
        }
        return null;
    };
    return async (importee, importer) => {
        // ignore IDs with null character, these belong to other plugins
        if (importee.startsWith("\0")) {
            return null;
        }
        if (importer && importee[0] === ".") {
            const resolved = p.resolve(importer ? p.dirname(importer) : process.cwd(), importee);
            let file = await resolveFile(resolved);
            if (file)
                return file;
            if (!file && await fileExists(resolved) && (await B.promises.stat(resolved)).isDirectory()) {
                file = await resolveFile(resolved, true);
                if (file)
                    return file;
            }
        }
    };
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var lib = {exports: {}};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addHook = addHook;

	var _module = _interopRequireDefault(cn);

	var _path = _interopRequireDefault(p);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* (c) 2015 Ari Porad (@ariporad) <http://ariporad.com>. License: ariporad.mit-license.org */
	const nodeModulesRegex = /^(?:.*[\\/])?node_modules(?:[\\/].*)?$/; // Guard against poorly mocked module constructors.

	const Module = module.constructor.length > 1 ? module.constructor : _module.default;
	const HOOK_RETURNED_NOTHING_ERROR_MESSAGE = '[Pirates] A hook returned a non-string, or nothing at all! This is a' + ' violation of intergalactic law!\n' + '--------------------\n' + 'If you have no idea what this means or what Pirates is, let me explain: ' + 'Pirates is a module that makes is easy to implement require hooks. One of' + " the require hooks you're using uses it. One of these require hooks" + " didn't return anything from it's handler, so we don't know what to" + ' do. You might want to debug this.';
	/**
	 * @param {string} filename The filename to check.
	 * @param {string[]} exts The extensions to hook. Should start with '.' (ex. ['.js']).
	 * @param {Matcher|null} matcher A matcher function, will be called with path to a file. Should return truthy if the file should be hooked, falsy otherwise.
	 * @param {boolean} ignoreNodeModules Auto-ignore node_modules. Independent of any matcher.
	 */

	function shouldCompile(filename, exts, matcher, ignoreNodeModules) {
	  if (typeof filename !== 'string') {
	    return false;
	  }

	  if (exts.indexOf(_path.default.extname(filename)) === -1) {
	    return false;
	  }

	  const resolvedFilename = _path.default.resolve(filename);

	  if (ignoreNodeModules && nodeModulesRegex.test(resolvedFilename)) {
	    return false;
	  }

	  if (matcher && typeof matcher === 'function') {
	    return !!matcher(resolvedFilename);
	  }

	  return true;
	}
	/**
	 * @callback Hook The hook. Accepts the code of the module and the filename.
	 * @param {string} code
	 * @param {string} filename
	 * @returns {string}
	 */

	/**
	 * @callback Matcher A matcher function, will be called with path to a file.
	 *
	 * Should return truthy if the file should be hooked, falsy otherwise.
	 * @param {string} path
	 * @returns {boolean}
	 */

	/**
	 * @callback RevertFunction Reverts the hook when called.
	 * @returns {void}
	 */

	/**
	 * @typedef {object} Options
	 * @property {Matcher|null} [matcher=null] A matcher function, will be called with path to a file.
	 *
	 * Should return truthy if the file should be hooked, falsy otherwise.
	 *
	 * @property {string[]} [extensions=['.js']] The extensions to hook. Should start with '.' (ex. ['.js']).
	 * @property {string[]} [exts=['.js']] The extensions to hook. Should start with '.' (ex. ['.js']).
	 *
	 * @property {string[]} [extension=['.js']] The extensions to hook. Should start with '.' (ex. ['.js']).
	 * @property {string[]} [ext=['.js']] The extensions to hook. Should start with '.' (ex. ['.js']).
	 *
	 * @property {boolean} [ignoreNodeModules=true] Auto-ignore node_modules. Independent of any matcher.
	 */

	/**
	 * Add a require hook.
	 *
	 * @param {Hook} hook The hook. Accepts the code of the module and the filename. Required.
	 * @param {Options} [opts] Options
	 * @returns {RevertFunction} The `revert` function. Reverts the hook when called.
	 */


	function addHook(hook, opts = {}) {
	  let reverted = false;
	  const loaders = [];
	  const oldLoaders = [];
	  let exts; // We need to do this to fix #15. Basically, if you use a non-standard extension (ie. .jsx), then
	  // We modify the .js loader, then use the modified .js loader for as the base for .jsx.
	  // This prevents that.

	  const originalJSLoader = Module._extensions['.js'];
	  const matcher = opts.matcher || null;
	  const ignoreNodeModules = opts.ignoreNodeModules !== false;
	  exts = opts.extensions || opts.exts || opts.extension || opts.ext || ['.js'];

	  if (!Array.isArray(exts)) {
	    exts = [exts];
	  }

	  exts.forEach(ext => {
	    if (typeof ext !== 'string') {
	      throw new TypeError(`Invalid Extension: ${ext}`);
	    }

	    const oldLoader = Module._extensions[ext] || originalJSLoader;
	    oldLoaders[ext] = Module._extensions[ext];

	    loaders[ext] = Module._extensions[ext] = function newLoader(mod, filename) {
	      let compile;

	      if (!reverted) {
	        if (shouldCompile(filename, exts, matcher, ignoreNodeModules)) {
	          compile = mod._compile;

	          mod._compile = function _compile(code) {
	            // reset the compile immediately as otherwise we end up having the
	            // compile function being changed even though this loader might be reverted
	            // Not reverting it here leads to long useless compile chains when doing
	            // addHook -> revert -> addHook -> revert -> ...
	            // The compile function is also anyway created new when the loader is called a second time.
	            mod._compile = compile;
	            const newCode = hook(code, filename);

	            if (typeof newCode !== 'string') {
	              throw new Error(HOOK_RETURNED_NOTHING_ERROR_MESSAGE);
	            }

	            return mod._compile(newCode, filename);
	          };
	        }
	      }

	      oldLoader(mod, filename);
	    };
	  });
	  return function revert() {
	    if (reverted) return;
	    reverted = true;
	    exts.forEach(ext => {
	      // if the current loader for the extension is our loader then unregister it and set the oldLoader again
	      // if not we can not do anything as we cannot remove a loader from within the loader-chain
	      if (Module._extensions[ext] === loaders[ext]) {
	        if (!oldLoaders[ext]) {
	          delete Module._extensions[ext];
	        } else {
	          Module._extensions[ext] = oldLoaders[ext];
	        }
	      }
	    });
	  };
	} 
} (lib, lib.exports));

var libExports = lib.exports;

const h = Object.prototype.hasOwnProperty;
const hasProp = (target, prop) => h.call(target, prop);
function isModule() {
    try {
        require("fs");
        return false;
    }
    catch (_a) { }
    return true;
}
function transformConfig(code, isModule = false) {
    return core$1.transformSync(code, { module: { type: isModule ? "es6" : "commonjs" }, jsc: { parser: { syntax: "typescript" }, target: "esnext" }, swcrc: false, configFile: false }).code;
}
function hookRequire(id) {
    const revert = libExports.addHook((code) => transformConfig(code, isModule()), { extensions: [".js", ".ts"] });
    const r = require(id);
    revert();
    return r;
}
// TODO: maybe change module import to createRequire
async function loadConfigFile() {
    const cwd = process$1.cwd();
    const jsConfigFile = p.join(cwd, "macros.config.js");
    if (B.existsSync(jsConfigFile)) {
        // {type: "module" | "commonjs"} & "macros.config.js"
        const config = await autoRequire(jsConfigFile, true);
        return [jsConfigFile, config];
    }
    const tsConfigFile = p.join(cwd, "macros.config.ts");
    if (B.existsSync(tsConfigFile)) {
        // {type: "module"} & "macros.config.ts"
        if (isModule()) {
            const jsConfigFile = p.join(cwd, ".macros.config.js");
            const code = B.readFileSync(tsConfigFile).toString();
            const transformed = transformConfig(code, true);
            await B.writeFile(jsConfigFile, transformed, (err) => {
                if (err != null)
                    throw new Error(err.message);
            });
            const config = (await import(jsConfigFile) || {}).default;
            B.rm(jsConfigFile, (err) => {
                if (err != null)
                    throw new Error(err.message);
            });
            return [tsConfigFile, config];
        }
        // {type: "commonjs"} & "macros.config.ts"
        const config = hookRequire(tsConfigFile);
        return [tsConfigFile, (config === null || config === void 0 ? void 0 : config.default) || {}];
    }
    return [undefined, {}];
}
/**
 * sync version of load config, not handing { type: "module" }
 */
function loadConfigFileSync() {
    const cwd = process$1.cwd();
    const jsConfigFile = p.join(cwd, "macros.config.js");
    if (B.existsSync(jsConfigFile)) {
        const config = require(jsConfigFile);
        return [jsConfigFile, config];
    }
    const tsConfigFile = p.join(cwd, "macros.config.ts");
    if (B.existsSync(tsConfigFile)) {
        const config = hookRequire(tsConfigFile);
        return [tsConfigFile, (config === null || config === void 0 ? void 0 : config.default) || {}];
    }
    return [undefined, {}];
}
async function buildTransformOptions(inputOptions) {
    const [configPath, config] = await loadConfigFile();
    const combinedOptions = Object.assign(Object.assign({}, (inputOptions || {})), config);
    return [resolveSwcOptions(combinedOptions), resolveMacroOptions(combinedOptions), configPath];
}
function buildTransformOptionsSync(inputOptions) {
    const [configPath, config] = loadConfigFileSync();
    const combinedOptions = Object.assign(Object.assign({}, (inputOptions || {})), config);
    return [resolveSwcOptions(combinedOptions), resolveMacroOptions(combinedOptions), configPath];
}

var utils$3 = {};

const path$1 = p;
const WIN_SLASH = '\\\\/';
const WIN_NO_SLASH = `[^${WIN_SLASH}]`;

/**
 * Posix glob regex
 */

const DOT_LITERAL = '\\.';
const PLUS_LITERAL = '\\+';
const QMARK_LITERAL = '\\?';
const SLASH_LITERAL = '\\/';
const ONE_CHAR = '(?=.)';
const QMARK = '[^/]';
const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
const NO_DOT = `(?!${DOT_LITERAL})`;
const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
const STAR = `${QMARK}*?`;

const POSIX_CHARS = {
  DOT_LITERAL,
  PLUS_LITERAL,
  QMARK_LITERAL,
  SLASH_LITERAL,
  ONE_CHAR,
  QMARK,
  END_ANCHOR,
  DOTS_SLASH,
  NO_DOT,
  NO_DOTS,
  NO_DOT_SLASH,
  NO_DOTS_SLASH,
  QMARK_NO_DOT,
  STAR,
  START_ANCHOR
};

/**
 * Windows glob regex
 */

const WINDOWS_CHARS = {
  ...POSIX_CHARS,

  SLASH_LITERAL: `[${WIN_SLASH}]`,
  QMARK: WIN_NO_SLASH,
  STAR: `${WIN_NO_SLASH}*?`,
  DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
  NO_DOT: `(?!${DOT_LITERAL})`,
  NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
  NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
  START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
  END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
};

/**
 * POSIX Bracket Regex
 */

const POSIX_REGEX_SOURCE$1 = {
  alnum: 'a-zA-Z0-9',
  alpha: 'a-zA-Z',
  ascii: '\\x00-\\x7F',
  blank: ' \\t',
  cntrl: '\\x00-\\x1F\\x7F',
  digit: '0-9',
  graph: '\\x21-\\x7E',
  lower: 'a-z',
  print: '\\x20-\\x7E ',
  punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
  space: ' \\t\\r\\n\\v\\f',
  upper: 'A-Z',
  word: 'A-Za-z0-9_',
  xdigit: 'A-Fa-f0-9'
};

var constants$2 = {
  MAX_LENGTH: 1024 * 64,
  POSIX_REGEX_SOURCE: POSIX_REGEX_SOURCE$1,

  // regular expressions
  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,

  // Replace globs with equivalent patterns to reduce parsing time.
  REPLACEMENTS: {
    '***': '*',
    '**/**': '**',
    '**/**/**': '**'
  },

  // Digits
  CHAR_0: 48, /* 0 */
  CHAR_9: 57, /* 9 */

  // Alphabet chars.
  CHAR_UPPERCASE_A: 65, /* A */
  CHAR_LOWERCASE_A: 97, /* a */
  CHAR_UPPERCASE_Z: 90, /* Z */
  CHAR_LOWERCASE_Z: 122, /* z */

  CHAR_LEFT_PARENTHESES: 40, /* ( */
  CHAR_RIGHT_PARENTHESES: 41, /* ) */

  CHAR_ASTERISK: 42, /* * */

  // Non-alphabetic chars.
  CHAR_AMPERSAND: 38, /* & */
  CHAR_AT: 64, /* @ */
  CHAR_BACKWARD_SLASH: 92, /* \ */
  CHAR_CARRIAGE_RETURN: 13, /* \r */
  CHAR_CIRCUMFLEX_ACCENT: 94, /* ^ */
  CHAR_COLON: 58, /* : */
  CHAR_COMMA: 44, /* , */
  CHAR_DOT: 46, /* . */
  CHAR_DOUBLE_QUOTE: 34, /* " */
  CHAR_EQUAL: 61, /* = */
  CHAR_EXCLAMATION_MARK: 33, /* ! */
  CHAR_FORM_FEED: 12, /* \f */
  CHAR_FORWARD_SLASH: 47, /* / */
  CHAR_GRAVE_ACCENT: 96, /* ` */
  CHAR_HASH: 35, /* # */
  CHAR_HYPHEN_MINUS: 45, /* - */
  CHAR_LEFT_ANGLE_BRACKET: 60, /* < */
  CHAR_LEFT_CURLY_BRACE: 123, /* { */
  CHAR_LEFT_SQUARE_BRACKET: 91, /* [ */
  CHAR_LINE_FEED: 10, /* \n */
  CHAR_NO_BREAK_SPACE: 160, /* \u00A0 */
  CHAR_PERCENT: 37, /* % */
  CHAR_PLUS: 43, /* + */
  CHAR_QUESTION_MARK: 63, /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: 62, /* > */
  CHAR_RIGHT_CURLY_BRACE: 125, /* } */
  CHAR_RIGHT_SQUARE_BRACKET: 93, /* ] */
  CHAR_SEMICOLON: 59, /* ; */
  CHAR_SINGLE_QUOTE: 39, /* ' */
  CHAR_SPACE: 32, /*   */
  CHAR_TAB: 9, /* \t */
  CHAR_UNDERSCORE: 95, /* _ */
  CHAR_VERTICAL_LINE: 124, /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279, /* \uFEFF */

  SEP: path$1.sep,

  /**
   * Create EXTGLOB_CHARS
   */

  extglobChars(chars) {
    return {
      '!': { type: 'negate', open: '(?:(?!(?:', close: `))${chars.STAR})` },
      '?': { type: 'qmark', open: '(?:', close: ')?' },
      '+': { type: 'plus', open: '(?:', close: ')+' },
      '*': { type: 'star', open: '(?:', close: ')*' },
      '@': { type: 'at', open: '(?:', close: ')' }
    };
  },

  /**
   * Create GLOB_CHARS
   */

  globChars(win32) {
    return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
  }
};

(function (exports) {

	const path = p;
	const win32 = process.platform === 'win32';
	const {
	  REGEX_BACKSLASH,
	  REGEX_REMOVE_BACKSLASH,
	  REGEX_SPECIAL_CHARS,
	  REGEX_SPECIAL_CHARS_GLOBAL
	} = constants$2;

	exports.isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);
	exports.hasRegexChars = str => REGEX_SPECIAL_CHARS.test(str);
	exports.isRegexChar = str => str.length === 1 && exports.hasRegexChars(str);
	exports.escapeRegex = str => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1');
	exports.toPosixSlashes = str => str.replace(REGEX_BACKSLASH, '/');

	exports.removeBackslashes = str => {
	  return str.replace(REGEX_REMOVE_BACKSLASH, match => {
	    return match === '\\' ? '' : match;
	  });
	};

	exports.supportsLookbehinds = () => {
	  const segs = process.version.slice(1).split('.').map(Number);
	  if (segs.length === 3 && segs[0] >= 9 || (segs[0] === 8 && segs[1] >= 10)) {
	    return true;
	  }
	  return false;
	};

	exports.isWindows = options => {
	  if (options && typeof options.windows === 'boolean') {
	    return options.windows;
	  }
	  return win32 === true || path.sep === '\\';
	};

	exports.escapeLast = (input, char, lastIdx) => {
	  const idx = input.lastIndexOf(char, lastIdx);
	  if (idx === -1) return input;
	  if (input[idx - 1] === '\\') return exports.escapeLast(input, char, idx - 1);
	  return `${input.slice(0, idx)}\\${input.slice(idx)}`;
	};

	exports.removePrefix = (input, state = {}) => {
	  let output = input;
	  if (output.startsWith('./')) {
	    output = output.slice(2);
	    state.prefix = './';
	  }
	  return output;
	};

	exports.wrapOutput = (input, state = {}, options = {}) => {
	  const prepend = options.contains ? '' : '^';
	  const append = options.contains ? '' : '$';

	  let output = `${prepend}(?:${input})${append}`;
	  if (state.negated === true) {
	    output = `(?:^(?!${output}).*$)`;
	  }
	  return output;
	}; 
} (utils$3));

const utils$2 = utils$3;
const {
  CHAR_ASTERISK,             /* * */
  CHAR_AT,                   /* @ */
  CHAR_BACKWARD_SLASH,       /* \ */
  CHAR_COMMA,                /* , */
  CHAR_DOT,                  /* . */
  CHAR_EXCLAMATION_MARK,     /* ! */
  CHAR_FORWARD_SLASH,        /* / */
  CHAR_LEFT_CURLY_BRACE,     /* { */
  CHAR_LEFT_PARENTHESES,     /* ( */
  CHAR_LEFT_SQUARE_BRACKET,  /* [ */
  CHAR_PLUS,                 /* + */
  CHAR_QUESTION_MARK,        /* ? */
  CHAR_RIGHT_CURLY_BRACE,    /* } */
  CHAR_RIGHT_PARENTHESES,    /* ) */
  CHAR_RIGHT_SQUARE_BRACKET  /* ] */
} = constants$2;

const isPathSeparator = code => {
  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
};

const depth = token => {
  if (token.isPrefix !== true) {
    token.depth = token.isGlobstar ? Infinity : 1;
  }
};

/**
 * Quickly scans a glob pattern and returns an object with a handful of
 * useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
 * `glob` (the actual pattern), `negated` (true if the path starts with `!` but not
 * with `!(`) and `negatedExtglob` (true if the path starts with `!(`).
 *
 * ```js
 * const pm = require('picomatch');
 * console.log(pm.scan('foo/bar/*.js'));
 * { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {Object} Returns an object with tokens and regex source string.
 * @api public
 */

const scan$1 = (input, options) => {
  const opts = options || {};

  const length = input.length - 1;
  const scanToEnd = opts.parts === true || opts.scanToEnd === true;
  const slashes = [];
  const tokens = [];
  const parts = [];

  let str = input;
  let index = -1;
  let start = 0;
  let lastIndex = 0;
  let isBrace = false;
  let isBracket = false;
  let isGlob = false;
  let isExtglob = false;
  let isGlobstar = false;
  let braceEscaped = false;
  let backslashes = false;
  let negated = false;
  let negatedExtglob = false;
  let finished = false;
  let braces = 0;
  let prev;
  let code;
  let token = { value: '', depth: 0, isGlob: false };

  const eos = () => index >= length;
  const peek = () => str.charCodeAt(index + 1);
  const advance = () => {
    prev = code;
    return str.charCodeAt(++index);
  };

  while (index < length) {
    code = advance();
    let next;

    if (code === CHAR_BACKWARD_SLASH) {
      backslashes = token.backslashes = true;
      code = advance();

      if (code === CHAR_LEFT_CURLY_BRACE) {
        braceEscaped = true;
      }
      continue;
    }

    if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
      braces++;

      while (eos() !== true && (code = advance())) {
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }

        if (code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          continue;
        }

        if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }

          break;
        }

        if (braceEscaped !== true && code === CHAR_COMMA) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }

          break;
        }

        if (code === CHAR_RIGHT_CURLY_BRACE) {
          braces--;

          if (braces === 0) {
            braceEscaped = false;
            isBrace = token.isBrace = true;
            finished = true;
            break;
          }
        }
      }

      if (scanToEnd === true) {
        continue;
      }

      break;
    }

    if (code === CHAR_FORWARD_SLASH) {
      slashes.push(index);
      tokens.push(token);
      token = { value: '', depth: 0, isGlob: false };

      if (finished === true) continue;
      if (prev === CHAR_DOT && index === (start + 1)) {
        start += 2;
        continue;
      }

      lastIndex = index + 1;
      continue;
    }

    if (opts.noext !== true) {
      const isExtglobChar = code === CHAR_PLUS
        || code === CHAR_AT
        || code === CHAR_ASTERISK
        || code === CHAR_QUESTION_MARK
        || code === CHAR_EXCLAMATION_MARK;

      if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
        isGlob = token.isGlob = true;
        isExtglob = token.isExtglob = true;
        finished = true;
        if (code === CHAR_EXCLAMATION_MARK && index === start) {
          negatedExtglob = true;
        }

        if (scanToEnd === true) {
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              code = advance();
              continue;
            }

            if (code === CHAR_RIGHT_PARENTHESES) {
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          continue;
        }
        break;
      }
    }

    if (code === CHAR_ASTERISK) {
      if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
      isGlob = token.isGlob = true;
      finished = true;

      if (scanToEnd === true) {
        continue;
      }
      break;
    }

    if (code === CHAR_QUESTION_MARK) {
      isGlob = token.isGlob = true;
      finished = true;

      if (scanToEnd === true) {
        continue;
      }
      break;
    }

    if (code === CHAR_LEFT_SQUARE_BRACKET) {
      while (eos() !== true && (next = advance())) {
        if (next === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }

        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
          isBracket = token.isBracket = true;
          isGlob = token.isGlob = true;
          finished = true;
          break;
        }
      }

      if (scanToEnd === true) {
        continue;
      }

      break;
    }

    if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
      negated = token.negated = true;
      start++;
      continue;
    }

    if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
      isGlob = token.isGlob = true;

      if (scanToEnd === true) {
        while (eos() !== true && (code = advance())) {
          if (code === CHAR_LEFT_PARENTHESES) {
            backslashes = token.backslashes = true;
            code = advance();
            continue;
          }

          if (code === CHAR_RIGHT_PARENTHESES) {
            finished = true;
            break;
          }
        }
        continue;
      }
      break;
    }

    if (isGlob === true) {
      finished = true;

      if (scanToEnd === true) {
        continue;
      }

      break;
    }
  }

  if (opts.noext === true) {
    isExtglob = false;
    isGlob = false;
  }

  let base = str;
  let prefix = '';
  let glob = '';

  if (start > 0) {
    prefix = str.slice(0, start);
    str = str.slice(start);
    lastIndex -= start;
  }

  if (base && isGlob === true && lastIndex > 0) {
    base = str.slice(0, lastIndex);
    glob = str.slice(lastIndex);
  } else if (isGlob === true) {
    base = '';
    glob = str;
  } else {
    base = str;
  }

  if (base && base !== '' && base !== '/' && base !== str) {
    if (isPathSeparator(base.charCodeAt(base.length - 1))) {
      base = base.slice(0, -1);
    }
  }

  if (opts.unescape === true) {
    if (glob) glob = utils$2.removeBackslashes(glob);

    if (base && backslashes === true) {
      base = utils$2.removeBackslashes(base);
    }
  }

  const state = {
    prefix,
    input,
    start,
    base,
    glob,
    isBrace,
    isBracket,
    isGlob,
    isExtglob,
    isGlobstar,
    negated,
    negatedExtglob
  };

  if (opts.tokens === true) {
    state.maxDepth = 0;
    if (!isPathSeparator(code)) {
      tokens.push(token);
    }
    state.tokens = tokens;
  }

  if (opts.parts === true || opts.tokens === true) {
    let prevIndex;

    for (let idx = 0; idx < slashes.length; idx++) {
      const n = prevIndex ? prevIndex + 1 : start;
      const i = slashes[idx];
      const value = input.slice(n, i);
      if (opts.tokens) {
        if (idx === 0 && start !== 0) {
          tokens[idx].isPrefix = true;
          tokens[idx].value = prefix;
        } else {
          tokens[idx].value = value;
        }
        depth(tokens[idx]);
        state.maxDepth += tokens[idx].depth;
      }
      if (idx !== 0 || value !== '') {
        parts.push(value);
      }
      prevIndex = i;
    }

    if (prevIndex && prevIndex + 1 < input.length) {
      const value = input.slice(prevIndex + 1);
      parts.push(value);

      if (opts.tokens) {
        tokens[tokens.length - 1].value = value;
        depth(tokens[tokens.length - 1]);
        state.maxDepth += tokens[tokens.length - 1].depth;
      }
    }

    state.slashes = slashes;
    state.parts = parts;
  }

  return state;
};

var scan_1 = scan$1;

const constants$1 = constants$2;
const utils$1 = utils$3;

/**
 * Constants
 */

const {
  MAX_LENGTH,
  POSIX_REGEX_SOURCE,
  REGEX_NON_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_BACKREF,
  REPLACEMENTS
} = constants$1;

/**
 * Helpers
 */

const expandRange = (args, options) => {
  if (typeof options.expandRange === 'function') {
    return options.expandRange(...args, options);
  }

  args.sort();
  const value = `[${args.join('-')}]`;

  try {
    /* eslint-disable-next-line no-new */
    new RegExp(value);
  } catch (ex) {
    return args.map(v => utils$1.escapeRegex(v)).join('..');
  }

  return value;
};

/**
 * Create the message for a syntax error
 */

const syntaxError = (type, char) => {
  return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
};

/**
 * Parse the given input string.
 * @param {String} input
 * @param {Object} options
 * @return {Object}
 */

const parse$1 = (input, options) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }

  input = REPLACEMENTS[input] || input;

  const opts = { ...options };
  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;

  let len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }

  const bos = { type: 'bos', value: '', output: opts.prepend || '' };
  const tokens = [bos];

  const capture = opts.capture ? '' : '?:';
  const win32 = utils$1.isWindows(options);

  // create constants based on platform, for windows or posix
  const PLATFORM_CHARS = constants$1.globChars(win32);
  const EXTGLOB_CHARS = constants$1.extglobChars(PLATFORM_CHARS);

  const {
    DOT_LITERAL,
    PLUS_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOT_SLASH,
    NO_DOTS_SLASH,
    QMARK,
    QMARK_NO_DOT,
    STAR,
    START_ANCHOR
  } = PLATFORM_CHARS;

  const globstar = opts => {
    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
  };

  const nodot = opts.dot ? '' : NO_DOT;
  const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
  let star = opts.bash === true ? globstar(opts) : STAR;

  if (opts.capture) {
    star = `(${star})`;
  }

  // minimatch options support
  if (typeof opts.noext === 'boolean') {
    opts.noextglob = opts.noext;
  }

  const state = {
    input,
    index: -1,
    start: 0,
    dot: opts.dot === true,
    consumed: '',
    output: '',
    prefix: '',
    backtrack: false,
    negated: false,
    brackets: 0,
    braces: 0,
    parens: 0,
    quotes: 0,
    globstar: false,
    tokens
  };

  input = utils$1.removePrefix(input, state);
  len = input.length;

  const extglobs = [];
  const braces = [];
  const stack = [];
  let prev = bos;
  let value;

  /**
   * Tokenizing helpers
   */

  const eos = () => state.index === len - 1;
  const peek = state.peek = (n = 1) => input[state.index + n];
  const advance = state.advance = () => input[++state.index] || '';
  const remaining = () => input.slice(state.index + 1);
  const consume = (value = '', num = 0) => {
    state.consumed += value;
    state.index += num;
  };

  const append = token => {
    state.output += token.output != null ? token.output : token.value;
    consume(token.value);
  };

  const negate = () => {
    let count = 1;

    while (peek() === '!' && (peek(2) !== '(' || peek(3) === '?')) {
      advance();
      state.start++;
      count++;
    }

    if (count % 2 === 0) {
      return false;
    }

    state.negated = true;
    state.start++;
    return true;
  };

  const increment = type => {
    state[type]++;
    stack.push(type);
  };

  const decrement = type => {
    state[type]--;
    stack.pop();
  };

  /**
   * Push tokens onto the tokens array. This helper speeds up
   * tokenizing by 1) helping us avoid backtracking as much as possible,
   * and 2) helping us avoid creating extra tokens when consecutive
   * characters are plain text. This improves performance and simplifies
   * lookbehinds.
   */

  const push = tok => {
    if (prev.type === 'globstar') {
      const isBrace = state.braces > 0 && (tok.type === 'comma' || tok.type === 'brace');
      const isExtglob = tok.extglob === true || (extglobs.length && (tok.type === 'pipe' || tok.type === 'paren'));

      if (tok.type !== 'slash' && tok.type !== 'paren' && !isBrace && !isExtglob) {
        state.output = state.output.slice(0, -prev.output.length);
        prev.type = 'star';
        prev.value = '*';
        prev.output = star;
        state.output += prev.output;
      }
    }

    if (extglobs.length && tok.type !== 'paren') {
      extglobs[extglobs.length - 1].inner += tok.value;
    }

    if (tok.value || tok.output) append(tok);
    if (prev && prev.type === 'text' && tok.type === 'text') {
      prev.value += tok.value;
      prev.output = (prev.output || '') + tok.value;
      return;
    }

    tok.prev = prev;
    tokens.push(tok);
    prev = tok;
  };

  const extglobOpen = (type, value) => {
    const token = { ...EXTGLOB_CHARS[value], conditions: 1, inner: '' };

    token.prev = prev;
    token.parens = state.parens;
    token.output = state.output;
    const output = (opts.capture ? '(' : '') + token.open;

    increment('parens');
    push({ type, value, output: state.output ? '' : ONE_CHAR });
    push({ type: 'paren', extglob: true, value: advance(), output });
    extglobs.push(token);
  };

  const extglobClose = token => {
    let output = token.close + (opts.capture ? ')' : '');
    let rest;

    if (token.type === 'negate') {
      let extglobStar = star;

      if (token.inner && token.inner.length > 1 && token.inner.includes('/')) {
        extglobStar = globstar(opts);
      }

      if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
        output = token.close = `)$))${extglobStar}`;
      }

      if (token.inner.includes('*') && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
        // Any non-magical string (`.ts`) or even nested expression (`.{ts,tsx}`) can follow after the closing parenthesis.
        // In this case, we need to parse the string and use it in the output of the original pattern.
        // Suitable patterns: `/!(*.d).ts`, `/!(*.d).{ts,tsx}`, `**/!(*-dbg).@(js)`.
        //
        // Disabling the `fastpaths` option due to a problem with parsing strings as `.ts` in the pattern like `**/!(*.d).ts`.
        const expression = parse$1(rest, { ...options, fastpaths: false }).output;

        output = token.close = `)${expression})${extglobStar})`;
      }

      if (token.prev.type === 'bos') {
        state.negatedExtglob = true;
      }
    }

    push({ type: 'paren', extglob: true, value, output });
    decrement('parens');
  };

  /**
   * Fast paths
   */

  if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
    let backslashes = false;

    let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
      if (first === '\\') {
        backslashes = true;
        return m;
      }

      if (first === '?') {
        if (esc) {
          return esc + first + (rest ? QMARK.repeat(rest.length) : '');
        }
        if (index === 0) {
          return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : '');
        }
        return QMARK.repeat(chars.length);
      }

      if (first === '.') {
        return DOT_LITERAL.repeat(chars.length);
      }

      if (first === '*') {
        if (esc) {
          return esc + first + (rest ? star : '');
        }
        return star;
      }
      return esc ? m : `\\${m}`;
    });

    if (backslashes === true) {
      if (opts.unescape === true) {
        output = output.replace(/\\/g, '');
      } else {
        output = output.replace(/\\+/g, m => {
          return m.length % 2 === 0 ? '\\\\' : (m ? '\\' : '');
        });
      }
    }

    if (output === input && opts.contains === true) {
      state.output = input;
      return state;
    }

    state.output = utils$1.wrapOutput(output, state, options);
    return state;
  }

  /**
   * Tokenize input until we reach end-of-string
   */

  while (!eos()) {
    value = advance();

    if (value === '\u0000') {
      continue;
    }

    /**
     * Escaped characters
     */

    if (value === '\\') {
      const next = peek();

      if (next === '/' && opts.bash !== true) {
        continue;
      }

      if (next === '.' || next === ';') {
        continue;
      }

      if (!next) {
        value += '\\';
        push({ type: 'text', value });
        continue;
      }

      // collapse slashes to reduce potential for exploits
      const match = /^\\+/.exec(remaining());
      let slashes = 0;

      if (match && match[0].length > 2) {
        slashes = match[0].length;
        state.index += slashes;
        if (slashes % 2 !== 0) {
          value += '\\';
        }
      }

      if (opts.unescape === true) {
        value = advance();
      } else {
        value += advance();
      }

      if (state.brackets === 0) {
        push({ type: 'text', value });
        continue;
      }
    }

    /**
     * If we're inside a regex character class, continue
     * until we reach the closing bracket.
     */

    if (state.brackets > 0 && (value !== ']' || prev.value === '[' || prev.value === '[^')) {
      if (opts.posix !== false && value === ':') {
        const inner = prev.value.slice(1);
        if (inner.includes('[')) {
          prev.posix = true;

          if (inner.includes(':')) {
            const idx = prev.value.lastIndexOf('[');
            const pre = prev.value.slice(0, idx);
            const rest = prev.value.slice(idx + 2);
            const posix = POSIX_REGEX_SOURCE[rest];
            if (posix) {
              prev.value = pre + posix;
              state.backtrack = true;
              advance();

              if (!bos.output && tokens.indexOf(prev) === 1) {
                bos.output = ONE_CHAR;
              }
              continue;
            }
          }
        }
      }

      if ((value === '[' && peek() !== ':') || (value === '-' && peek() === ']')) {
        value = `\\${value}`;
      }

      if (value === ']' && (prev.value === '[' || prev.value === '[^')) {
        value = `\\${value}`;
      }

      if (opts.posix === true && value === '!' && prev.value === '[') {
        value = '^';
      }

      prev.value += value;
      append({ value });
      continue;
    }

    /**
     * If we're inside a quoted string, continue
     * until we reach the closing double quote.
     */

    if (state.quotes === 1 && value !== '"') {
      value = utils$1.escapeRegex(value);
      prev.value += value;
      append({ value });
      continue;
    }

    /**
     * Double quotes
     */

    if (value === '"') {
      state.quotes = state.quotes === 1 ? 0 : 1;
      if (opts.keepQuotes === true) {
        push({ type: 'text', value });
      }
      continue;
    }

    /**
     * Parentheses
     */

    if (value === '(') {
      increment('parens');
      push({ type: 'paren', value });
      continue;
    }

    if (value === ')') {
      if (state.parens === 0 && opts.strictBrackets === true) {
        throw new SyntaxError(syntaxError('opening', '('));
      }

      const extglob = extglobs[extglobs.length - 1];
      if (extglob && state.parens === extglob.parens + 1) {
        extglobClose(extglobs.pop());
        continue;
      }

      push({ type: 'paren', value, output: state.parens ? ')' : '\\)' });
      decrement('parens');
      continue;
    }

    /**
     * Square brackets
     */

    if (value === '[') {
      if (opts.nobracket === true || !remaining().includes(']')) {
        if (opts.nobracket !== true && opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError('closing', ']'));
        }

        value = `\\${value}`;
      } else {
        increment('brackets');
      }

      push({ type: 'bracket', value });
      continue;
    }

    if (value === ']') {
      if (opts.nobracket === true || (prev && prev.type === 'bracket' && prev.value.length === 1)) {
        push({ type: 'text', value, output: `\\${value}` });
        continue;
      }

      if (state.brackets === 0) {
        if (opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError('opening', '['));
        }

        push({ type: 'text', value, output: `\\${value}` });
        continue;
      }

      decrement('brackets');

      const prevValue = prev.value.slice(1);
      if (prev.posix !== true && prevValue[0] === '^' && !prevValue.includes('/')) {
        value = `/${value}`;
      }

      prev.value += value;
      append({ value });

      // when literal brackets are explicitly disabled
      // assume we should match with a regex character class
      if (opts.literalBrackets === false || utils$1.hasRegexChars(prevValue)) {
        continue;
      }

      const escaped = utils$1.escapeRegex(prev.value);
      state.output = state.output.slice(0, -prev.value.length);

      // when literal brackets are explicitly enabled
      // assume we should escape the brackets to match literal characters
      if (opts.literalBrackets === true) {
        state.output += escaped;
        prev.value = escaped;
        continue;
      }

      // when the user specifies nothing, try to match both
      prev.value = `(${capture}${escaped}|${prev.value})`;
      state.output += prev.value;
      continue;
    }

    /**
     * Braces
     */

    if (value === '{' && opts.nobrace !== true) {
      increment('braces');

      const open = {
        type: 'brace',
        value,
        output: '(',
        outputIndex: state.output.length,
        tokensIndex: state.tokens.length
      };

      braces.push(open);
      push(open);
      continue;
    }

    if (value === '}') {
      const brace = braces[braces.length - 1];

      if (opts.nobrace === true || !brace) {
        push({ type: 'text', value, output: value });
        continue;
      }

      let output = ')';

      if (brace.dots === true) {
        const arr = tokens.slice();
        const range = [];

        for (let i = arr.length - 1; i >= 0; i--) {
          tokens.pop();
          if (arr[i].type === 'brace') {
            break;
          }
          if (arr[i].type !== 'dots') {
            range.unshift(arr[i].value);
          }
        }

        output = expandRange(range, opts);
        state.backtrack = true;
      }

      if (brace.comma !== true && brace.dots !== true) {
        const out = state.output.slice(0, brace.outputIndex);
        const toks = state.tokens.slice(brace.tokensIndex);
        brace.value = brace.output = '\\{';
        value = output = '\\}';
        state.output = out;
        for (const t of toks) {
          state.output += (t.output || t.value);
        }
      }

      push({ type: 'brace', value, output });
      decrement('braces');
      braces.pop();
      continue;
    }

    /**
     * Pipes
     */

    if (value === '|') {
      if (extglobs.length > 0) {
        extglobs[extglobs.length - 1].conditions++;
      }
      push({ type: 'text', value });
      continue;
    }

    /**
     * Commas
     */

    if (value === ',') {
      let output = value;

      const brace = braces[braces.length - 1];
      if (brace && stack[stack.length - 1] === 'braces') {
        brace.comma = true;
        output = '|';
      }

      push({ type: 'comma', value, output });
      continue;
    }

    /**
     * Slashes
     */

    if (value === '/') {
      // if the beginning of the glob is "./", advance the start
      // to the current index, and don't add the "./" characters
      // to the state. This greatly simplifies lookbehinds when
      // checking for BOS characters like "!" and "." (not "./")
      if (prev.type === 'dot' && state.index === state.start + 1) {
        state.start = state.index + 1;
        state.consumed = '';
        state.output = '';
        tokens.pop();
        prev = bos; // reset "prev" to the first token
        continue;
      }

      push({ type: 'slash', value, output: SLASH_LITERAL });
      continue;
    }

    /**
     * Dots
     */

    if (value === '.') {
      if (state.braces > 0 && prev.type === 'dot') {
        if (prev.value === '.') prev.output = DOT_LITERAL;
        const brace = braces[braces.length - 1];
        prev.type = 'dots';
        prev.output += value;
        prev.value += value;
        brace.dots = true;
        continue;
      }

      if ((state.braces + state.parens) === 0 && prev.type !== 'bos' && prev.type !== 'slash') {
        push({ type: 'text', value, output: DOT_LITERAL });
        continue;
      }

      push({ type: 'dot', value, output: DOT_LITERAL });
      continue;
    }

    /**
     * Question marks
     */

    if (value === '?') {
      const isGroup = prev && prev.value === '(';
      if (!isGroup && opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        extglobOpen('qmark', value);
        continue;
      }

      if (prev && prev.type === 'paren') {
        const next = peek();
        let output = value;

        if (next === '<' && !utils$1.supportsLookbehinds()) {
          throw new Error('Node.js v10 or higher is required for regex lookbehinds');
        }

        if ((prev.value === '(' && !/[!=<:]/.test(next)) || (next === '<' && !/<([!=]|\w+>)/.test(remaining()))) {
          output = `\\${value}`;
        }

        push({ type: 'text', value, output });
        continue;
      }

      if (opts.dot !== true && (prev.type === 'slash' || prev.type === 'bos')) {
        push({ type: 'qmark', value, output: QMARK_NO_DOT });
        continue;
      }

      push({ type: 'qmark', value, output: QMARK });
      continue;
    }

    /**
     * Exclamation
     */

    if (value === '!') {
      if (opts.noextglob !== true && peek() === '(') {
        if (peek(2) !== '?' || !/[!=<:]/.test(peek(3))) {
          extglobOpen('negate', value);
          continue;
        }
      }

      if (opts.nonegate !== true && state.index === 0) {
        negate();
        continue;
      }
    }

    /**
     * Plus
     */

    if (value === '+') {
      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        extglobOpen('plus', value);
        continue;
      }

      if ((prev && prev.value === '(') || opts.regex === false) {
        push({ type: 'plus', value, output: PLUS_LITERAL });
        continue;
      }

      if ((prev && (prev.type === 'bracket' || prev.type === 'paren' || prev.type === 'brace')) || state.parens > 0) {
        push({ type: 'plus', value });
        continue;
      }

      push({ type: 'plus', value: PLUS_LITERAL });
      continue;
    }

    /**
     * Plain text
     */

    if (value === '@') {
      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        push({ type: 'at', extglob: true, value, output: '' });
        continue;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Plain text
     */

    if (value !== '*') {
      if (value === '$' || value === '^') {
        value = `\\${value}`;
      }

      const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
      if (match) {
        value += match[0];
        state.index += match[0].length;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Stars
     */

    if (prev && (prev.type === 'globstar' || prev.star === true)) {
      prev.type = 'star';
      prev.star = true;
      prev.value += value;
      prev.output = star;
      state.backtrack = true;
      state.globstar = true;
      consume(value);
      continue;
    }

    let rest = remaining();
    if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
      extglobOpen('star', value);
      continue;
    }

    if (prev.type === 'star') {
      if (opts.noglobstar === true) {
        consume(value);
        continue;
      }

      const prior = prev.prev;
      const before = prior.prev;
      const isStart = prior.type === 'slash' || prior.type === 'bos';
      const afterStar = before && (before.type === 'star' || before.type === 'globstar');

      if (opts.bash === true && (!isStart || (rest[0] && rest[0] !== '/'))) {
        push({ type: 'star', value, output: '' });
        continue;
      }

      const isBrace = state.braces > 0 && (prior.type === 'comma' || prior.type === 'brace');
      const isExtglob = extglobs.length && (prior.type === 'pipe' || prior.type === 'paren');
      if (!isStart && prior.type !== 'paren' && !isBrace && !isExtglob) {
        push({ type: 'star', value, output: '' });
        continue;
      }

      // strip consecutive `/**/`
      while (rest.slice(0, 3) === '/**') {
        const after = input[state.index + 4];
        if (after && after !== '/') {
          break;
        }
        rest = rest.slice(3);
        consume('/**', 3);
      }

      if (prior.type === 'bos' && eos()) {
        prev.type = 'globstar';
        prev.value += value;
        prev.output = globstar(opts);
        state.output = prev.output;
        state.globstar = true;
        consume(value);
        continue;
      }

      if (prior.type === 'slash' && prior.prev.type !== 'bos' && !afterStar && eos()) {
        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;

        prev.type = 'globstar';
        prev.output = globstar(opts) + (opts.strictSlashes ? ')' : '|$)');
        prev.value += value;
        state.globstar = true;
        state.output += prior.output + prev.output;
        consume(value);
        continue;
      }

      if (prior.type === 'slash' && prior.prev.type !== 'bos' && rest[0] === '/') {
        const end = rest[1] !== void 0 ? '|$' : '';

        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;

        prev.type = 'globstar';
        prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
        prev.value += value;

        state.output += prior.output + prev.output;
        state.globstar = true;

        consume(value + advance());

        push({ type: 'slash', value: '/', output: '' });
        continue;
      }

      if (prior.type === 'bos' && rest[0] === '/') {
        prev.type = 'globstar';
        prev.value += value;
        prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
        state.output = prev.output;
        state.globstar = true;
        consume(value + advance());
        push({ type: 'slash', value: '/', output: '' });
        continue;
      }

      // remove single star from output
      state.output = state.output.slice(0, -prev.output.length);

      // reset previous token to globstar
      prev.type = 'globstar';
      prev.output = globstar(opts);
      prev.value += value;

      // reset output with globstar
      state.output += prev.output;
      state.globstar = true;
      consume(value);
      continue;
    }

    const token = { type: 'star', value, output: star };

    if (opts.bash === true) {
      token.output = '.*?';
      if (prev.type === 'bos' || prev.type === 'slash') {
        token.output = nodot + token.output;
      }
      push(token);
      continue;
    }

    if (prev && (prev.type === 'bracket' || prev.type === 'paren') && opts.regex === true) {
      token.output = value;
      push(token);
      continue;
    }

    if (state.index === state.start || prev.type === 'slash' || prev.type === 'dot') {
      if (prev.type === 'dot') {
        state.output += NO_DOT_SLASH;
        prev.output += NO_DOT_SLASH;

      } else if (opts.dot === true) {
        state.output += NO_DOTS_SLASH;
        prev.output += NO_DOTS_SLASH;

      } else {
        state.output += nodot;
        prev.output += nodot;
      }

      if (peek() !== '*') {
        state.output += ONE_CHAR;
        prev.output += ONE_CHAR;
      }
    }

    push(token);
  }

  while (state.brackets > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ']'));
    state.output = utils$1.escapeLast(state.output, '[');
    decrement('brackets');
  }

  while (state.parens > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ')'));
    state.output = utils$1.escapeLast(state.output, '(');
    decrement('parens');
  }

  while (state.braces > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', '}'));
    state.output = utils$1.escapeLast(state.output, '{');
    decrement('braces');
  }

  if (opts.strictSlashes !== true && (prev.type === 'star' || prev.type === 'bracket')) {
    push({ type: 'maybe_slash', value: '', output: `${SLASH_LITERAL}?` });
  }

  // rebuild the output if we had to backtrack at any point
  if (state.backtrack === true) {
    state.output = '';

    for (const token of state.tokens) {
      state.output += token.output != null ? token.output : token.value;

      if (token.suffix) {
        state.output += token.suffix;
      }
    }
  }

  return state;
};

/**
 * Fast paths for creating regular expressions for common glob patterns.
 * This can significantly speed up processing and has very little downside
 * impact when none of the fast paths match.
 */

parse$1.fastpaths = (input, options) => {
  const opts = { ...options };
  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  const len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }

  input = REPLACEMENTS[input] || input;
  const win32 = utils$1.isWindows(options);

  // create constants based on platform, for windows or posix
  const {
    DOT_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOTS,
    NO_DOTS_SLASH,
    STAR,
    START_ANCHOR
  } = constants$1.globChars(win32);

  const nodot = opts.dot ? NO_DOTS : NO_DOT;
  const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
  const capture = opts.capture ? '' : '?:';
  const state = { negated: false, prefix: '' };
  let star = opts.bash === true ? '.*?' : STAR;

  if (opts.capture) {
    star = `(${star})`;
  }

  const globstar = opts => {
    if (opts.noglobstar === true) return star;
    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
  };

  const create = str => {
    switch (str) {
      case '*':
        return `${nodot}${ONE_CHAR}${star}`;

      case '.*':
        return `${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '*.*':
        return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '*/*':
        return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;

      case '**':
        return nodot + globstar(opts);

      case '**/*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;

      case '**/*.*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '**/.*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;

      default: {
        const match = /^(.*?)\.(\w+)$/.exec(str);
        if (!match) return;

        const source = create(match[1]);
        if (!source) return;

        return source + DOT_LITERAL + match[2];
      }
    }
  };

  const output = utils$1.removePrefix(input, state);
  let source = create(output);

  if (source && opts.strictSlashes !== true) {
    source += `${SLASH_LITERAL}?`;
  }

  return source;
};

var parse_1 = parse$1;

const path = p;
const scan = scan_1;
const parse = parse_1;
const utils = utils$3;
const constants = constants$2;
const isObject = val => val && typeof val === 'object' && !Array.isArray(val);

/**
 * Creates a matcher function from one or more glob patterns. The
 * returned function takes a string to match as its first argument,
 * and returns true if the string is a match. The returned matcher
 * function also takes a boolean as the second argument that, when true,
 * returns an object with additional information.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch(glob[, options]);
 *
 * const isMatch = picomatch('*.!(*a)');
 * console.log(isMatch('a.a')); //=> false
 * console.log(isMatch('a.b')); //=> true
 * ```
 * @name picomatch
 * @param {String|Array} `globs` One or more glob patterns.
 * @param {Object=} `options`
 * @return {Function=} Returns a matcher function.
 * @api public
 */

const picomatch$2 = (glob, options, returnState = false) => {
  if (Array.isArray(glob)) {
    const fns = glob.map(input => picomatch$2(input, options, returnState));
    const arrayMatcher = str => {
      for (const isMatch of fns) {
        const state = isMatch(str);
        if (state) return state;
      }
      return false;
    };
    return arrayMatcher;
  }

  const isState = isObject(glob) && glob.tokens && glob.input;

  if (glob === '' || (typeof glob !== 'string' && !isState)) {
    throw new TypeError('Expected pattern to be a non-empty string');
  }

  const opts = options || {};
  const posix = utils.isWindows(options);
  const regex = isState
    ? picomatch$2.compileRe(glob, options)
    : picomatch$2.makeRe(glob, options, false, true);

  const state = regex.state;
  delete regex.state;

  let isIgnored = () => false;
  if (opts.ignore) {
    const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
    isIgnored = picomatch$2(opts.ignore, ignoreOpts, returnState);
  }

  const matcher = (input, returnObject = false) => {
    const { isMatch, match, output } = picomatch$2.test(input, regex, options, { glob, posix });
    const result = { glob, state, regex, posix, input, output, match, isMatch };

    if (typeof opts.onResult === 'function') {
      opts.onResult(result);
    }

    if (isMatch === false) {
      result.isMatch = false;
      return returnObject ? result : false;
    }

    if (isIgnored(input)) {
      if (typeof opts.onIgnore === 'function') {
        opts.onIgnore(result);
      }
      result.isMatch = false;
      return returnObject ? result : false;
    }

    if (typeof opts.onMatch === 'function') {
      opts.onMatch(result);
    }
    return returnObject ? result : true;
  };

  if (returnState) {
    matcher.state = state;
  }

  return matcher;
};

/**
 * Test `input` with the given `regex`. This is used by the main
 * `picomatch()` function to test the input string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.test(input, regex[, options]);
 *
 * console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
 * // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp} `regex`
 * @return {Object} Returns an object with matching info.
 * @api public
 */

picomatch$2.test = (input, regex, options, { glob, posix } = {}) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected input to be a string');
  }

  if (input === '') {
    return { isMatch: false, output: '' };
  }

  const opts = options || {};
  const format = opts.format || (posix ? utils.toPosixSlashes : null);
  let match = input === glob;
  let output = (match && format) ? format(input) : input;

  if (match === false) {
    output = format ? format(input) : input;
    match = output === glob;
  }

  if (match === false || opts.capture === true) {
    if (opts.matchBase === true || opts.basename === true) {
      match = picomatch$2.matchBase(input, regex, options, posix);
    } else {
      match = regex.exec(output);
    }
  }

  return { isMatch: Boolean(match), match, output };
};

/**
 * Match the basename of a filepath.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.matchBase(input, glob[, options]);
 * console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
 * @return {Boolean}
 * @api public
 */

picomatch$2.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
  const regex = glob instanceof RegExp ? glob : picomatch$2.makeRe(glob, options);
  return regex.test(path.basename(input));
};

/**
 * Returns true if **any** of the given glob `patterns` match the specified `string`.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.isMatch(string, patterns[, options]);
 *
 * console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
 * console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
 * ```
 * @param {String|Array} str The string to test.
 * @param {String|Array} patterns One or more glob patterns to use for matching.
 * @param {Object} [options] See available [options](#options).
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

picomatch$2.isMatch = (str, patterns, options) => picomatch$2(patterns, options)(str);

/**
 * Parse a glob pattern to create the source string for a regular
 * expression.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const result = picomatch.parse(pattern[, options]);
 * ```
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {Object} Returns an object with useful properties and output to be used as a regex source string.
 * @api public
 */

picomatch$2.parse = (pattern, options) => {
  if (Array.isArray(pattern)) return pattern.map(p => picomatch$2.parse(p, options));
  return parse(pattern, { ...options, fastpaths: false });
};

/**
 * Scan a glob pattern to separate the pattern into segments.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.scan(input[, options]);
 *
 * const result = picomatch.scan('!./foo/*.js');
 * console.log(result);
 * { prefix: '!./',
 *   input: '!./foo/*.js',
 *   start: 3,
 *   base: 'foo',
 *   glob: '*.js',
 *   isBrace: false,
 *   isBracket: false,
 *   isGlob: true,
 *   isExtglob: false,
 *   isGlobstar: false,
 *   negated: true }
 * ```
 * @param {String} `input` Glob pattern to scan.
 * @param {Object} `options`
 * @return {Object} Returns an object with
 * @api public
 */

picomatch$2.scan = (input, options) => scan(input, options);

/**
 * Compile a regular expression from the `state` object returned by the
 * [parse()](#parse) method.
 *
 * @param {Object} `state`
 * @param {Object} `options`
 * @param {Boolean} `returnOutput` Intended for implementors, this argument allows you to return the raw output from the parser.
 * @param {Boolean} `returnState` Adds the state to a `state` property on the returned regex. Useful for implementors and debugging.
 * @return {RegExp}
 * @api public
 */

picomatch$2.compileRe = (state, options, returnOutput = false, returnState = false) => {
  if (returnOutput === true) {
    return state.output;
  }

  const opts = options || {};
  const prepend = opts.contains ? '' : '^';
  const append = opts.contains ? '' : '$';

  let source = `${prepend}(?:${state.output})${append}`;
  if (state && state.negated === true) {
    source = `^(?!${source}).*$`;
  }

  const regex = picomatch$2.toRegex(source, options);
  if (returnState === true) {
    regex.state = state;
  }

  return regex;
};

/**
 * Create a regular expression from a parsed glob pattern.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const state = picomatch.parse('*.js');
 * // picomatch.compileRe(state[, options]);
 *
 * console.log(picomatch.compileRe(state));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `state` The object returned from the `.parse` method.
 * @param {Object} `options`
 * @param {Boolean} `returnOutput` Implementors may use this argument to return the compiled output, instead of a regular expression. This is not exposed on the options to prevent end-users from mutating the result.
 * @param {Boolean} `returnState` Implementors may use this argument to return the state from the parsed glob with the returned regular expression.
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */

picomatch$2.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
  if (!input || typeof input !== 'string') {
    throw new TypeError('Expected a non-empty string');
  }

  let parsed = { negated: false, fastpaths: true };

  if (options.fastpaths !== false && (input[0] === '.' || input[0] === '*')) {
    parsed.output = parse.fastpaths(input, options);
  }

  if (!parsed.output) {
    parsed = parse(input, options);
  }

  return picomatch$2.compileRe(parsed, options, returnOutput, returnState);
};

/**
 * Create a regular expression from the given regex source string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.toRegex(source[, options]);
 *
 * const { output } = picomatch.parse('*.js');
 * console.log(picomatch.toRegex(output));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `source` Regular expression source string.
 * @param {Object} `options`
 * @return {RegExp}
 * @api public
 */

picomatch$2.toRegex = (source, options) => {
  try {
    const opts = options || {};
    return new RegExp(source, opts.flags || (opts.nocase ? 'i' : ''));
  } catch (err) {
    if (options && options.debug === true) throw err;
    return /$^/;
  }
};

/**
 * Picomatch constants.
 * @return {Object}
 */

picomatch$2.constants = constants;

/**
 * Expose "picomatch"
 */

var picomatch_1 = picomatch$2;

var picomatch = picomatch_1;

var picomatch$1 = /*@__PURE__*/getDefaultExportFromCjs(picomatch);

const DEFAULT_INCLUDE = [/\.[cm]?[jt]sx?$/];
const DEFAULT_EXCLUDE = [/node_modules/];
const createFilter = (include = DEFAULT_INCLUDE, exclude = DEFAULT_EXCLUDE) => {
    const includes = include.map(i => typeof i === "string" ? picomatch$1.makeRe(i) : i);
    const excludes = exclude.map(i => typeof i === "string" ? picomatch$1.makeRe(i) : i);
    return (id) => {
        for (const ignore of excludes) {
            if (ignore.test(id))
                return false;
        }
        for (const isMatch of includes) {
            if (isMatch.test(id))
                return true;
        }
        return false;
    };
};
const matchPattern = (pattern, options = { cwd: process.cwd(), ignore: [] }) => {
    const entryDir = options.cwd;
    function globDirectory(dirname, isMatch, ignoreDirMatch, options) {
        if (!B.existsSync(dirname))
            return [];
        const list = B.readdirSync(dirname);
        const result = [];
        for (const file of list) {
            const resolvePath = p.resolve(dirname, file);
            const fileStat = B.statSync(resolvePath);
            if (fileStat.isDirectory() && ignoreDirMatch(resolvePath.replace(entryDir, ""))) {
                const childs = globDirectory(resolvePath, isMatch, ignoreDirMatch);
                result.push(...childs);
            }
            else if (fileStat.isFile() && isMatch(resolvePath.replace(entryDir, "")))
                result.push(resolvePath);
        }
        return result;
    }
    return globDirectory(entryDir, picomatch$1(pattern, {
        ignore: options.ignore || [],
    }), picomatch$1("**", {
        ignore: options.ignore || [],
    }));
};
/** split (file | pattern)[] to { files, patterns } */
function extractInput(input) {
    const patts = [];
    const files = [];
    const defaultPatt = "**/*.{js,ts,jsx,tsx}";
    for (const f of input) {
        if (B.existsSync(f) && B.statSync(f).isFile())
            files.push(p.resolve(f));
        else
            patts.push(f);
    }
    if (files.length === 0 && patts.length === 0)
        patts.push(defaultPatt);
    return { files, patts };
}
/** Extract files from (file | pattern)[] */
function extractFiles(input) {
    const { files, patts } = extractInput(input);
    return [
        ...files,
        ...matchPattern(patts, {
            cwd: process.cwd(),
            ignore: ["**/node_modules/**"],
        }),
    ];
}
/**
 * Filter out undefined | null | false from input array
 * @param items any array
 * @returns array without undefined | null | false
 */
function ensureArray(items) {
    if (Array.isArray(items)) {
        return items.filter(Boolean);
    }
    if (items) {
        return [items];
    }
    return [];
}
/**
 * Turn `config.external` into a function, for rollup and vite plugin usage.
 * @param external config.external from rollup config
 * @returns
 */
const getIdMatcher = (external) => {
    if (external === true) {
        return () => true;
    }
    if (typeof external === "function") {
        return (id, ...parameters) => (!id.startsWith("\0") && external(id, ...parameters)) || false;
    }
    if (external) {
        const ids = new Set();
        const matchers = [];
        for (const value of ensureArray(external)) {
            if (value instanceof RegExp) {
                matchers.push(value);
            }
            else {
                ids.add(value);
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (id, ..._arguments) => ids.has(id) || matchers.some(matcher => matcher.test(id));
    }
    return () => false;
};
const getHasModuleSideEffects = (moduleSideEffectsOption) => {
    if (typeof moduleSideEffectsOption === "boolean") {
        return () => moduleSideEffectsOption;
    }
    if (moduleSideEffectsOption === "no-external") {
        return (_id, external) => !external;
    }
    if (typeof moduleSideEffectsOption === "function") {
        return (id, external) => id.startsWith("\0") ? true : moduleSideEffectsOption(id, external) !== false;
    }
    if (Array.isArray(moduleSideEffectsOption)) {
        const ids = new Set(moduleSideEffectsOption);
        return (id) => ids.has(id);
    }
    return () => true;
};
const matchScriptType = (id, extensions) => {
    const ext = p.extname(id);
    if (!extensions.includes(ext))
        return null;
    return { isTypeScript: ext.includes("ts"), isTsx: ext === ".tsx", isJsx: ext === ".jsx" };
};

exports.CWD = CWD;
exports.DEFAULT_EXCLUDE = DEFAULT_EXCLUDE;
exports.DEFAULT_INCLUDE = DEFAULT_INCLUDE;
exports.SCRIPT_EXTENSIONS = SCRIPT_EXTENSIONS;
exports.addHook = libExports.addHook;
exports.autoRequire = autoRequire;
exports.buildTransformOptions = buildTransformOptions;
exports.buildTransformOptionsSync = buildTransformOptionsSync;
exports.createFilter = createFilter;
exports.createFormattingHost = createFormattingHost;
exports.createModuleResolver = createModuleResolver;
exports.createResolver = createResolver;
exports.createTsLib = createTsLib;
exports.createTsResolver = createTsResolver;
exports.ensureArray = ensureArray;
exports.extractFiles = extractFiles;
exports.extractInput = extractInput;
exports.extractSwcOptions = extractSwcOptions;
exports.fileExists = fileExists;
exports.getHasModuleSideEffects = getHasModuleSideEffects;
exports.getIdMatcher = getIdMatcher;
exports.hasProp = hasProp;
exports.hookRequire = hookRequire;
exports.importLib = importLib;
exports.isModule = isModule;
exports.loadConfigFile = loadConfigFile;
exports.loadConfigFileSync = loadConfigFileSync;
exports.matchPattern = matchPattern;
exports.matchScriptType = matchScriptType;
exports.normalizePath = normalizePath;
exports.patchTsOptions = patchTsOptions;
exports.picomatch = picomatch$1;
exports.resolveDepends = resolveDepends;
exports.resolveExternals = resolveExternals;
exports.resolveMacroOptions = resolveMacroOptions;
exports.resolveSwcOptions = resolveSwcOptions;
exports.resolveTsOptions = resolveTsOptions;
exports.transformConfig = transformConfig;
exports.writeDts = writeDts;
