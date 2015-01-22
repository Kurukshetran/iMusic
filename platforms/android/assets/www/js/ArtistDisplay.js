var db;
var artistlist = new Array();
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
	var count = 0;
	
	for(var i = 0; i < jd.length; i++)
	{
		artistlist.push(jd[i].artist);
	}
	
	tempArr(artistlist);
	
	for(var l = 0; l < artistlist.length; l++)
	{
		content += '<div data-role="collapsible"><h3>' + artistlist[l] + '</h3><a id="whichartist"><h4>';
		for(var k = 0; k < jd.length; k++)
		{
			if(artistlist[l] === jd[k].artist)
			{
				count++;
			}
		}
		
		if(count > 1)
		{
			content += count+ " songs" + '</h4></a></div>';
		}
		else
		{
			content += count+ " song" + '</h4></a></div>';
		}
		count = 0;
	}
	$('#collapsibleset-display').append(content);
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

/*
function readDB(u)
{
	u.executeSql('SELECT * FROM MEDIAFILES ', [], readSuccess, errorCB);
}

function errorCB(err) 
{
	console.log("Error processing SQL: "+err.code);
}

function readSuccess(u, results)
{
	var len = results.rows.length;
	
	for (var i = 0; i < len; i++)
	{
		var getID = results.rows.item(i).id;
		var getMusicName = results.rows.item(i).filename;
		var getFilePath = results.rows.item(i).filepath;
		var getAlbum = results.rows.item(i).album;
		var getArtist = results.rows.item(i).artist;
		var getGenre = results.rows.item(i).genre;
		
		var jdata = {};
		jdata["MusicName"] = getMusicName;
		jdata["FilePath"] = getFilePath;
		jdata["Album"] = getAlbum;
		jdata["Artist"] = getArtist;
		jdata["Genre"] = getGenre;
		
		mediaData.push(jdata);
	}
	showlist();
}

function showlist()
{
	console.log(JSON.stringify(mediaData));
	var temp = mediaData;
	for(var i = 0; i < mediaData.length; i++)
	{
		var alb = mediaData[i].Album;
		
		for(var i = )
		{
			if(alb == )
			{
			
			}
		}
	}
}
*/