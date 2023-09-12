import{Jt}from"./chunk-BMKRBKO4.js";import{j,k}from"./chunk-JEHWBBA4.js";import{le}from"./chunk-4M2GZMYH.js";var Tokenizer=class{rules;constructor(rules=[]){this.rules=rules}addRule(test,fn){return this.rules.push({test,fn}),this}tokenize(string,receiver=token=>token){function*generator(rules){let index=0;for(let rule of rules){let result=rule.test(string);if(result){let{value,length}=result;index+=length,string=string.slice(length);let token={...rule.fn(value),index};yield receiver(token),yield*generator(rules)}}}let tokenGenerator=generator(this.rules),tokens=[];for(let token of tokenGenerator)tokens.push(token);if(string.length)throw new Error(`parser error: string not fully parsed! ${string.slice(0,25)}`);return tokens}};function digits(value,count=2){return String(value).padStart(count,"0")}function createLiteralTestFunction(value){return string=>string.startsWith(value)?{value,length:value.length}:void 0}function createMatchTestFunction(match){return string=>{let result=match.exec(string);if(result)return{value:result,length:result[0].length}}}var defaultRules=[{test:createLiteralTestFunction("yyyy"),fn:()=>({type:"year",value:"numeric"})},{test:createLiteralTestFunction("yy"),fn:()=>({type:"year",value:"2-digit"})},{test:createLiteralTestFunction("MM"),fn:()=>({type:"month",value:"2-digit"})},{test:createLiteralTestFunction("M"),fn:()=>({type:"month",value:"numeric"})},{test:createLiteralTestFunction("dd"),fn:()=>({type:"day",value:"2-digit"})},{test:createLiteralTestFunction("d"),fn:()=>({type:"day",value:"numeric"})},{test:createLiteralTestFunction("HH"),fn:()=>({type:"hour",value:"2-digit"})},{test:createLiteralTestFunction("H"),fn:()=>({type:"hour",value:"numeric"})},{test:createLiteralTestFunction("hh"),fn:()=>({type:"hour",value:"2-digit",hour12:!0})},{test:createLiteralTestFunction("h"),fn:()=>({type:"hour",value:"numeric",hour12:!0})},{test:createLiteralTestFunction("mm"),fn:()=>({type:"minute",value:"2-digit"})},{test:createLiteralTestFunction("m"),fn:()=>({type:"minute",value:"numeric"})},{test:createLiteralTestFunction("ss"),fn:()=>({type:"second",value:"2-digit"})},{test:createLiteralTestFunction("s"),fn:()=>({type:"second",value:"numeric"})},{test:createLiteralTestFunction("SSS"),fn:()=>({type:"fractionalSecond",value:3})},{test:createLiteralTestFunction("SS"),fn:()=>({type:"fractionalSecond",value:2})},{test:createLiteralTestFunction("S"),fn:()=>({type:"fractionalSecond",value:1})},{test:createLiteralTestFunction("a"),fn:value=>({type:"dayPeriod",value})},{test:createMatchTestFunction(/^(')(?<value>\\.|[^\']*)\1/),fn:match=>({type:"literal",value:match.groups.value})},{test:createMatchTestFunction(/^.+?\s*/),fn:match=>({type:"literal",value:match[0]})}],DateTimeFormatter=class{#format;constructor(formatString,rules=defaultRules){let tokenizer=new Tokenizer(rules);this.#format=tokenizer.tokenize(formatString,({type,value,hour12})=>{let result={type,value};return hour12&&(result.hour12=hour12),result})}format(date,options={}){let string="",utc=options.timeZone==="UTC";for(let token of this.#format)switch(token.type){case"year":{let value=utc?date.getUTCFullYear():date.getFullYear();switch(token.value){case"numeric":{string+=value;break}case"2-digit":{string+=digits(value,2).slice(-2);break}default:throw Error(`FormatterError: value "${token.value}" is not supported`)}break}case"month":{let value=(utc?date.getUTCMonth():date.getMonth())+1;switch(token.value){case"numeric":{string+=value;break}case"2-digit":{string+=digits(value,2);break}default:throw Error(`FormatterError: value "${token.value}" is not supported`)}break}case"day":{let value=utc?date.getUTCDate():date.getDate();switch(token.value){case"numeric":{string+=value;break}case"2-digit":{string+=digits(value,2);break}default:throw Error(`FormatterError: value "${token.value}" is not supported`)}break}case"hour":{let value=utc?date.getUTCHours():date.getHours();switch(value-=token.hour12&&date.getHours()>12?12:0,token.value){case"numeric":{string+=value;break}case"2-digit":{string+=digits(value,2);break}default:throw Error(`FormatterError: value "${token.value}" is not supported`)}break}case"minute":{let value=utc?date.getUTCMinutes():date.getMinutes();switch(token.value){case"numeric":{string+=value;break}case"2-digit":{string+=digits(value,2);break}default:throw Error(`FormatterError: value "${token.value}" is not supported`)}break}case"second":{let value=utc?date.getUTCSeconds():date.getSeconds();switch(token.value){case"numeric":{string+=value;break}case"2-digit":{string+=digits(value,2);break}default:throw Error(`FormatterError: value "${token.value}" is not supported`)}break}case"fractionalSecond":{let value=utc?date.getUTCMilliseconds():date.getMilliseconds();string+=digits(value,Number(token.value));break}case"timeZoneName":break;case"dayPeriod":{string+=token.value?date.getHours()>=12?"PM":"AM":"";break}case"literal":{string+=token.value;break}default:throw Error(`FormatterError: { ${token.type} ${token.value} }`)}return string}parseToParts(string){let parts=[];for(let token of this.#format){let type=token.type,value="";switch(token.type){case"year":{switch(token.value){case"numeric":{value=/^\d{1,4}/.exec(string)?.[0];break}case"2-digit":{value=/^\d{1,2}/.exec(string)?.[0];break}}break}case"month":{switch(token.value){case"numeric":{value=/^\d{1,2}/.exec(string)?.[0];break}case"2-digit":{value=/^\d{2}/.exec(string)?.[0];break}case"narrow":{value=/^[a-zA-Z]+/.exec(string)?.[0];break}case"short":{value=/^[a-zA-Z]+/.exec(string)?.[0];break}case"long":{value=/^[a-zA-Z]+/.exec(string)?.[0];break}default:throw Error(`ParserError: value "${token.value}" is not supported`)}break}case"day":{switch(token.value){case"numeric":{value=/^\d{1,2}/.exec(string)?.[0];break}case"2-digit":{value=/^\d{2}/.exec(string)?.[0];break}default:throw Error(`ParserError: value "${token.value}" is not supported`)}break}case"hour":{switch(token.value){case"numeric":{value=/^\d{1,2}/.exec(string)?.[0],token.hour12&&parseInt(value)>12&&console.error("Trying to parse hour greater than 12. Use 'H' instead of 'h'.");break}case"2-digit":{value=/^\d{2}/.exec(string)?.[0],token.hour12&&parseInt(value)>12&&console.error("Trying to parse hour greater than 12. Use 'HH' instead of 'hh'.");break}default:throw Error(`ParserError: value "${token.value}" is not supported`)}break}case"minute":{switch(token.value){case"numeric":{value=/^\d{1,2}/.exec(string)?.[0];break}case"2-digit":{value=/^\d{2}/.exec(string)?.[0];break}default:throw Error(`ParserError: value "${token.value}" is not supported`)}break}case"second":{switch(token.value){case"numeric":{value=/^\d{1,2}/.exec(string)?.[0];break}case"2-digit":{value=/^\d{2}/.exec(string)?.[0];break}default:throw Error(`ParserError: value "${token.value}" is not supported`)}break}case"fractionalSecond":{value=new RegExp(`^\\d{${token.value}}`).exec(string)?.[0];break}case"timeZoneName":{value=token.value;break}case"dayPeriod":{value=/^(A|P)M/.exec(string)?.[0];break}case"literal":{if(!string.startsWith(token.value))throw Error(`Literal "${token.value}" not found "${string.slice(0,25)}"`);value=token.value;break}default:throw Error(`${token.type} ${token.value}`)}if(!value)throw Error(`value not valid for token { ${type} ${value} } ${string.slice(0,25)}`);parts.push({type,value}),string=string.slice(value.length)}if(string.length)throw Error(`datetime string was not fully parsed! ${string.slice(0,25)}`);return parts}sortDateTimeFormatPart(parts){let result=[],typeArray=["year","month","day","hour","minute","second","fractionalSecond"];for(let type of typeArray){let current=parts.findIndex(el=>el.type===type);current!==-1&&(result=result.concat(parts.splice(current,1)))}return result=result.concat(parts),result}partsToDate(parts){let date=new Date,utc=parts.find(part=>part.type==="timeZoneName"&&part.value==="UTC"),dayPart=parts.find(part=>part.type==="day");utc?date.setUTCHours(0,0,0,0):date.setHours(0,0,0,0);for(let part of parts)switch(part.type){case"year":{let value=Number(part.value.padStart(4,"20"));utc?date.setUTCFullYear(value):date.setFullYear(value);break}case"month":{let value=Number(part.value)-1;dayPart?utc?date.setUTCMonth(value,Number(dayPart.value)):date.setMonth(value,Number(dayPart.value)):utc?date.setUTCMonth(value):date.setMonth(value);break}case"day":{let value=Number(part.value);utc?date.setUTCDate(value):date.setDate(value);break}case"hour":{let value=Number(part.value);parts.find(part2=>part2.type==="dayPeriod")?.value==="PM"&&(value+=12),utc?date.setUTCHours(value):date.setHours(value);break}case"minute":{let value=Number(part.value);utc?date.setUTCMinutes(value):date.setMinutes(value);break}case"second":{let value=Number(part.value);utc?date.setUTCSeconds(value):date.setSeconds(value);break}case"fractionalSecond":{let value=Number(part.value);utc?date.setUTCMilliseconds(value):date.setMilliseconds(value);break}}return date}parse(string){let parts=this.parseToParts(string),sortParts=this.sortDateTimeFormatPart(parts);return this.partsToDate(sortParts)}};function format(date,formatString){return new DateTimeFormatter(formatString).format(date)}function formatDate(dateString){let date=new Date(dateString),diffInDays=Math.floor((new Date().getTime()-date.getTime())/(1e3*60*60*24));return diffInDays<=7?diffInDays===0?"Today":diffInDays===1?"Yesterday":`${diffInDays} days ago`:format(date,"dd/MM")}var History=({isCollapsed,setIsCollapsed,setSelectedItem,shouldRefreshHistory,setShouldRefreshHistory})=>{let[historyData,setHistoryData]=k([]),fetchHistory=async()=>{try{let response=await fetch("/api/fetchHistory");if(!response.ok)throw new Error(`Server responded with ${response.status}: ${response.statusText}`);let contentType=response.headers.get("content-type");if(!contentType||!contentType.includes("application/json"))throw new Error("Received non-JSON response from the server.");let result=await response.json();result.error?console.error("Error fetching history:",result.error):setHistoryData(result.data)}catch(error){console.error("Error fetching history:",error)}};j(()=>{shouldRefreshHistory&&(fetchHistory(),setShouldRefreshHistory(!1))},[shouldRefreshHistory]),j(()=>{fetchHistory()},[]);function formatDateToYYYYMMDD(dateString){return new Date(dateString).toISOString().split("T")[0]}let groupedHistoryData=[...historyData].sort((a,b)=>new Date(b.created_at)-new Date(a.created_at)).reduce((groups,item)=>{let date=formatDateToYYYYMMDD(item.created_at);return groups[date]||(groups[date]=[]),groups[date].push(item),groups},{});return le("div",{class:Jt`relative w-full p-3`},[le("div",{class:Jt`${isCollapsed?"translate-x-[-100%]":""} flex flex-col w-full items-start bg-white shadow-lg p-4 rounded-xl overflow-hidden history-scrollbar`},[le("h2",{class:Jt`text-xl font-bold w-full text-center`},"History"),Object.entries(groupedHistoryData).map(([date,items])=>le("div",{class:Jt`w-full`},[le("h3",{},formatDate(date)),items.map(item=>{let fullGptResponse=item.full_gpt_response?JSON.parse(item.full_gpt_response):{},content=fullGptResponse.choices?fullGptResponse.choices[0].message.function_call.arguments:{};if(content.keywords&&typeof content.keywords=="string")try{content.keywords=JSON.parse(content.keywords)}catch(error){console.error("Error parsing keywords:",error)}return le("div",{class:Jt`w-full mb-4 mt-4 border border-gray-300 p-2 rounded`,onClick:()=>{setSelectedItem(JSON.parse(item.full_gpt_response)),setIsCollapsed(!0)}},[le("p",{class:Jt`text-sm text-gray-500`}),le("p",{class:Jt`font-bold truncate`},item.title),le("p",{class:Jt`truncate`},content.explanation?content.explanation:"")])})]))])])},History_default=History;export{History_default as default};
//# sourceMappingURL=island-unifiedisland_history_default.js.map