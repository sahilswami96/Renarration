window.ArticleUrl = 'hello'
window.ArticleTitle = 'hello'

function getArticleUrlTitle(article, divid)
{
	var fileurl2 = "https://raw.githubusercontent.com/sahilswami96/Renarration/master/tempDocs/";
	githuburl2 = fileurl2 + article

	var jsonFile2 = new XMLHttpRequest();
	jsonFile2.open("GET",githuburl2,true);
	jsonFile2.send();

	jsonFile2.onreadystatechange = function(){
		if (jsonFile2.readyState== 4 && jsonFile2.status == 200){
			text2 = jsonFile2.responseText;
			text2 = text2.split('\n');

			// var UrlTitle = [text2[0], text2[1]]
			window.ArticleUrl = text2[0];
			window.ArticleTitle = text2[1];
			var aTag = document.createElement('a');
			aTag.setAttribute('href',window.ArticleUrl);
			aTag.setAttribute('id',divid);
			aTag.setAttribute('target','_blank');
			aTag.innerHTML = window.ArticleTitle;
			document.getElementById('myDivId').appendChild(aTag);
			document.getElementById('myDivId').innerHTML += "<br>";
		}
	}
}

function showText(url)
{

	var fileurl = "https://raw.githubusercontent.com/sahilswami96/Renarration/master/Similarity/";
	githuburl = fileurl + url + ".txt"

	var jsonFile = new XMLHttpRequest();
	jsonFile.open("GET",githuburl,true);
	jsonFile.send();

	jsonFile.onreadystatechange = function(){
		if (jsonFile.readyState== 4 && jsonFile.status == 200){
			text = jsonFile.responseText;
			text = text.split('\n');
			list_size = 3;
			i=list_size - 1;
			while(i>=0)
			{
				line = text[i];
				line = line.split(' ');
				var divid = 'relatedArticle' + i
				getArticleUrlTitle(line[1], divid);
				i=i-1;
			}
		}
	}
	var fileurl3 = "https://raw.githubusercontent.com/sahilswami96/Renarration/master/EntitySimilarDocs/";
	githuburl3 = fileurl3 + url + ".txt"

	var jsonFile3 = new XMLHttpRequest();
	jsonFile3.open("GET",githuburl3,true);
	jsonFile3.send();

	jsonFile3.onreadystatechange = function(){
		if (jsonFile3.readyState== 4 && jsonFile3.status == 200){
			text3 = jsonFile3.responseText;
			text3 = text3.split('\n');

			list_size = text3.length;
			list_size = list_size - 1;
			i=0;
			while(i < list_size)
			{
				line = text3[i];
				var bTag = document.createElement('b');
				var divid = 'text' + i;
				bTag.setAttribute('id', divid);
				bTag.innerHTML = line;
				document.getElementById('myDivId').appendChild(bTag);
				document.getElementById('myDivId').innerHTML += "<br>";
				var j;
				for(j=i+3; j > i; j--)
				{
					line2 = text3[j]
					line2 = line2.split(' ')
					var divid = 'related' + j;
					getArticleUrlTitle(line2[1], divid)
				}
				i = i+4;
			}
		}
	}
}

function getURL()
{
	url = document.URL;
	// url = 'http://www.thehindu.com/sport/the-year-that-was-sports/article4225524.ece';
	console.assert(typeof url == 'string', 'tab.url should be a string');
	url = url.split('/')
	url_sz = url.length
	url = url[url_sz - 1]
	article = url.split('.')
	article = article[0]
	showText(article);
}

document.documentElement.style.height = '100%';
document.body.style.height = '100%';
document.documentElement.style.width = '10%';
document.body.style.width = '60%';

var div = document.createElement( 'div' );
// var btnForm = document.createElement( 'form' );
// var btn = document.createElement( 'input' );

//append all elements
div.id = 'myDivId';
div.style.position = 'fixed';
div.style.top = '10%';
div.style.left = '80%';
div.style.width = '100%';   
div.style.height = '100%';
div.style.backgroundColor = 'white';
div.style.overflow = 'scroll';
document.body.appendChild( div );

// document.addEventListener('DOMContentLoaded', getURL)
getURL()