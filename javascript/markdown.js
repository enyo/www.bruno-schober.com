function Markdown()
{var self=this;document.observe('dom:loaded',function(){self.searchAndParse();});this.linkDefinition=function(matches,links)
{var link={id:matches[1],href:self.processURL(matches[2]),title:matches[4]?matches[4]:matches[5]?matches[5]:matches[6]?matches[6]:undefined};links[link.id.toLowerCase()]=link;return '';};this.processURL=function(url){return url;};this.processImageURL=function(url){return url;}
this.referenceLink=function(matches,links)
{var display=matches[1];var linkIndex=matches[2].blank()?display.toLowerCase():matches[2].toLowerCase();if(!(thisLink=links[linkIndex])){return display+' (broken link)';}
return '<a href="'+thisLink.href+'"'+(thisLink.title?' title="'+thisLink.title+'"':'')+'>'+display+'</a>';};this.normalLink=function(matches)
{var prefix=matches[1]?matches[1]:'';var display=matches[2];var href=self.processURL(matches[3]);var title=matches[4]?matches[4]:matches[5]?matches[5]:false;return prefix+'<a href="'+href+'"'+(title?' title="'+title+'"':'')+'>'+display+'</a>';};this.image=function(matches)
{var altText=matches[1];var imagePath=matches[2];var title=matches[3]?matches[3]:matches[4]?matches[4]:false;return self.getImage(imagePath,title,altText);};this.getImage=function(path,title,altText)
{if(title&&(title.startsWith('content-thumb')||title.startsWith('additional-thumb')))
{var folder=title.startsWith('content-thumb')?'Content':'Additional';var originalPath=self.processImageURL('Pictures/'+folder+'/Original/'+path);var path=self.processImageURL('Pictures/'+folder+'/'+path);return '<a target="_blank" rel="lightbox[allImages]" href="'+originalPath+'"><img src="'+path+'" alt="'+altText+'" /></a>'}
else
{var path=self.processImageURL(path);return '<img src="'+path+'" alt="'+altText+'" '+(title?' title="'+title+'"':'')+' />'}};this.strong=function(matches)
{return '<strong>'+(matches[1]?matches[1]:matches[2])+'</strong>';};this.emphasis=function(matches)
{return '<em>'+(matches[1]?matches[1]:matches[2])+'</em>';};this.newLine=function(matches)
{return '<br />';};this.header=function(matches)
{var number=matches[1].length;return '<h'+number+'>'+matches[2]+'</h'+number+'>';};var self=this;this.block=function(matches,links)
{var block=matches[1].strip();if(block.startsWith('<')||block.startsWith('&lt;')){return block;}
else
{block.escapeHTML();self.blockExpressions.each(function(expression)
{block=block.gsub(expression.syntax,function(matches){return expression.handler(matches,links);});},self);return '<p>'+block+'</p>';}};this.expressions=[{syntax:/\[([^\]]+?)\]\:[ \t]*[<]?([^\s\>]+)[>]?\s*("([^"]+)"|'([^"]+)'|\(([^"]+)\))?/,handler:this.linkDefinition},{syntax:/(([^\n]|[\n][^\n])+)/,handler:this.block}];this.blockExpressions=[{syntax:/([=]{3})/,handler:this.newLine},{syntax:/([#]+)\s*([^\#\n]+)[#]*/,handler:this.header},{syntax:/\[(.+?)\][ \t]?\[(.*?)\]/,handler:this.referenceLink},{syntax:/(^|[^\!])\[(.+?)\][ \t]?\((.+?)(?:[ \t]+"([^"]+)"|'([^"]+)')?\)/,handler:this.normalLink},{syntax:/(?:\*\*(.+?)\*\*)|(?:\_\_(.+?)\_\_)/,handler:this.strong},{syntax:/(?:\*(.+?)\*)|(?:\_(.+?)\_)/,handler:this.emphasis},{syntax:/\!\[(.*?)\][ \t]?\((.+?)(?:[ \t]+"([^"]+)"|'([^"]+)')?\)/,handler:this.image}];this.parseElement=function(element)
{var code=this.standardizeLines(element.innerHTML.unescapeHTML());element.update(this.parse(code));};this.parse=function(code)
{var links=[];this.expressions.each(function(expression)
{code=code.gsub(expression.syntax,function(matches){return expression.handler(matches,links);});},this);return code;};this.searchAndParse=function()
{$$('.toParse').each(function(element){this.parseElement($(element));element.removeClassName('toParse');},this)};this.standardizeLines=function(text)
{text=text.gsub(/\\n/,"\n");text=text.gsub(/\r\n/,"\n");text=text.gsub(/\r/,"\n");text=text.gsub(/^[ \t]+$/m,"");return text;}}
var markdown=new Markdown();