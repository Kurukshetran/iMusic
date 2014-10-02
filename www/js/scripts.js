var numDirs = 0;
var numFiles = 0;
var objectType;
var root = null;
var Entries = null;
var MusicFileName = new Array();
var MusicFilePath = new Array();
var readerTimeout = null, millisecondsBetweenReadSuccess = 1000;
var c = 1;
var Application =
{
	initApplication: function() 
	{
		console.log("initApplication");
		Application.initFilesListPage();
		/*
		$(document).on('pageinit', '#scan-page',
        function()
        {
			console.log("initApplication");
			Application.initFilesListPage();
        });
		*/
	},
	initFilesListPage: function() 
	{
		console.log("initFilesListPage");
		Application.GetAllImageFromSD();
		//Application.createFilesList('files-list', AppFile.getAppFiles());
	},
	//createFilesList: function(idElement, files){},
	GetAllImageFromSD: function() 
	{
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, Application.onFileSystemSuccess, Application.fail);
	},
	onFileSystemSuccess: function(fileSystem)
	{
		root = fileSystem.root;
		Application.getDirSuccess(root);
		//fileSystem.root.getDirectory("file://", { create: false, exclusive: false }, Application.getDirSuccess, Application.fail);
	},
	getDirSuccess: function(dirEntry)
	{
		var directoryReader = dirEntry.createReader();

		// Get a list of all the entries in the directory
		directoryReader.readEntries(Application.readerSuccess, Application.fail);
	},
	readerSuccess: function(entries)
	{
		String.prototype.startsWith = function (str)
		{ return (this.match("^" + str) == str) }

		var i = 0, len = entries.length;
		for (; i < len; i++) 
		{
			if (entries[i].isFile) 
			{
				if (entries[i].name.indexOf(".mp3") != -1)// || (entries[i].name.indexOf(".png") != -1) || (entries[i].name.indexOf(".jpg") != -1)) 
				{
					objectType = 'MP3';
					var fileName = entries[i].name;
					if (!fileName.startsWith(".")) 
					{
						numFiles++;
						MusicFileName.push(entries[i].name)
						MusicFilePath.push(entries[i].toURI())
						console.log("file "+entries[i].fullPath)
						
						//if(c == 1)
						//{
							//c++;
							//Application.getMetaData(entries[i].fullPath);
						//}
						
						//$('#directoryList').append('<li><h3>' + entries[i].name + '</h3><p>' + entries[i].toURI() + '</p><p class="ui-li-aside">Type: <strong>' + objectType + '</strong></p></li>');
					}
				}
			}
			else if (entries[i].isDirectory) 
			{
				numDirs++;
				//console.log("directory "+entries[i].name)
				var dirName = entries[i].name;
				if (!dirName.startsWith(".")) 
				{
					Application.getDirSuccess(entries[i]);
				}
			}
			
			Entries = entries;
			if (readerTimeout) 
			{
				window.clearTimeout(readerTimeout);
			}
			
			//$('#directoryList').append('<li><h3>' + entries[i].name + '</h3><p>' + entries[i].toURI() + '</p><p class="ui-li-aside">Type: <strong>' + objectType + '</strong></p></li>');
		}
		//$('#directoryList').listview("refresh");
		
		if (readerTimeout) 
		{
			window.clearTimeout(readerTimeout);
		}
		readerTimeout = window.setTimeout(Application.loadData, millisecondsBetweenReadSuccess);
	},
	fail: function(error) 
	{
		alert("Failed to list directory contents: " + error.code);
		console.log(error);
	},
	loadData: function()
	{
		console.log("No Of Files: "+numFiles);
	
		for(var j = 0; j < MusicFileName.length; j++)
		{
			$('#directoryList').append('<li>' + MusicFileName[j] + '<p>Type: <strong>' + objectType + '</strong></p></li>'); //class="ui-li-aside"
			
			console.log(MusicFileName[j]+":"+MusicFilePath[j]);
		}
	
	$('#directoryList').listview("refresh");
	},
	getMetaData: function(songpath)
	{
		var filepath = songpath;
		console.log("SONGPATH : "+songpath);
		console.log("FILEPATH : "+filepath);
		var success = function(result) 
		{
			console.log("Metadata received successfully"+ result);
			var data = JSON.parse(result);
			
			console.log("Metadata1: "+data["album"]);
			console.log("Metadata2: "+data["artist"]); 
			console.log("Metadata3: "+data["genre"]);
			
			alert(data["album"]+","+data["artist"]+","+data["genre"]);
		};
		var error = function(message) { alert("Metadata received unsuccessfully: " + message); };
		songPlugin.createEvent(filepath, success, error);
	}
};