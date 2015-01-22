var db;
var albumlist = new Array();
var mediaData = [];
var content = '';

window.addEventListener('load', function()
{
	document.addEventListener("deviceready", onDeviceReady, false);
}, false);

function onDeviceReady()
{
	var jsondata = JSON.parse(window.localStorage.getItem("mfiles"));
	getArtistdata(jsondata);
}

function getArtistdata(jd)
{	
	for(var i = 0; i < jd.length; i++)
	{
		artistlist.push(jd[i].album);
	}
	
	tempArr(albumlist);
	
	for(var l = 0; l < albumlist.length; l++)
	{
		content += '<div data-role="collapsible"><h3>' + albumlist[l] + '</h3><ul data-role="listview">';
		for(var k = 0; k < jd.length; k++)
		{
			if(albumlist[l] === jd[k].album)
			{
				content += '<li><a href="#">' + jd[k].songname + '</a></li>';
			}
		}
		content += '</ul></div>';
	}
	
	$('#album-display').append(content);
	$('div[data-role=collapsible]').collapsible({theme:'c',refresh:true});
}
	
function tempArr(arr)
{
	newArr = new Array();
	for (i = 0; i < arr.length; i++) 
	{
		if (!duplValuescheck(newArr, arr[i])) 
		{
			newArr.length += 1;
			newArr[newArr.length - 1] = arr[i];
		}
	}
	artistlist = newArr;
}

function duplValuescheck(arr, e) 
{
	for (j = 0; j < arr.length; j++) if (arr[j] == e) return true;
	return false;
}