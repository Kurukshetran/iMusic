var db;
var data = [];
var objectType = 'MP3';
var root = null;
//var _ls = window.localStorage;
var readerTimeout = null, millisecondsBetweenReadSuccess = 1000;

window.addEventListener('load',function()
{
	document.addEventListener("deviceready", onDeviceReady, false);
}, false);

function onDeviceReady()
{
	db = window.openDatabase("Mpdb", "1.0", "Mediadb", 200000);
	db.transaction(createTable, errorCB, successCB);
}

function createTable(u)
{
	u.executeSql('CREATE TABLE IF NOT EXISTS MEDIAFILES (id unique, filename, filepath, album, artist, genre)');
	u.executeSql('CREATE TABLE IF NOT EXISTS PLAYLISTS (id unique, listname, listdata)');
}

function successCB()
{
	db.transaction(queryDB, errorCB);
}

function errorCB(err) 
{
	console.log("Error processing SQL: "+err.code);
}

function queryDB(u)
{
	u.executeSql('SELECT * FROM MEDIAFILES', [], querySuccess, errorCB);
}

function querySuccess(u, results) 
{
	var len = results.rows.length;
	
	if(len > 0)
	{
		console.log("len: "+len+": has rows");
		//alert("len: "+len+": has rows");
		//Use update button
		//Drop Table
		//Create New List
		db.transaction(readDB, errorCB);
	}
	else
	{
		$.mobile.loading('show', {theme:"a", text:"Scanning...", textonly:true, textVisible: true});
		initApp();
	}
}

function initApp()
{
	getAllMusicFromSD();
}

function getAllMusicFromSD()
{
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
}

function onFileSystemSuccess(fileSystem)
{
	root = fileSystem.root;
	getDirSuccess(root);
}

function getDirSuccess(dirEntry)
{
	var directoryReader = dirEntry.createReader();
	directoryReader.readEntries(readerSuccess, fail);
}

function readerSuccess(entries)
{
	String.prototype.startsWith = function (str)
	{ return (this.match("^" + str) == str) }

	var i = 0, len = entries.length;
	for (; i < len; i++) 
	{
		if (entries[i].isFile) 
		{
			if (entries[i].name.indexOf(".mp3") != -1)
			{
				objectType = 'MP3';
				var fileName = entries[i].name;
				if (!fileName.startsWith(".")) 
				{
					getMetaData(entries[i].name, entries[i].fullPath);
				}
			}
		}
		else if (entries[i].isDirectory) 
		{
			var dirName = entries[i].name;
			if (!dirName.startsWith(".")) 
			{
				getDirSuccess(entries[i]);
			}
		}
		if (readerTimeout) 
		{
			window.clearTimeout(readerTimeout);
		}
	}
	if (readerTimeout)
	{
		window.clearTimeout(readerTimeout);
	}
	readerTimeout = window.setTimeout(loadData, millisecondsBetweenReadSuccess);
}

function fail(error) 
{
	alert("Failed to list directory contents: " + error.code);
}

function loadData()
{
	db.transaction(writeDB, errorCB);
	db.transaction(readDB, errorCB);
	//_ls.setItem("mfiles", JSON.stringify(data));
	$.mobile.loading('hide');
}

function writeDB(u)
{
	for(var id = 0; id < data.length; id++)
	{
		var c = id + 1;
		u.executeSql('INSERT INTO MEDIAFILES (id, filename, filepath, album, artist, genre) VALUES ("' + c + '", "' + data[id].songname + '", "' + data[id].filepath + '", "' + data[id].album + '", "' + data[id].artist + '", "' + data[id].genre + '")');
	}
}

function readDB(u)
{
	u.executeSql('SELECT * FROM MEDIAFILES', [], readSuccess, errorCB);
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
		
		populateList(getMusicName);  
	}
}

function getMetaData(songname, songpath)
{
	var filepath = songpath;
	var success = function(result) 
	{
		data.push(JSON.parse(result));
	};
	var error = function(message) { alert("Metadata received unsuccessfully: " + message); };
	songPlugin.createEvent(songname, filepath, success, error);
}

function populateList(musicname)
{
	$('#directoryList').append('<li><h6>' + musicname + '</h6><p>Type: <strong>' + objectType + '</strong></p></li>');
    $('#directoryList').listview("refresh");
}