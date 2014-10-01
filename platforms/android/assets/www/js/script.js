window.addEventListener('load', function () 
{
    document.addEventListener('deviceready', onDeviceReady, false);
}, false);

var numDirs = 0;
var numFiles = 0;
var objectType;
var root = null;
var Entries = null;
var MusicFileName = new Array();
var MusicFilePath = new Array();

var currentDir = null; // Current DirectoryEntry listed
var parentDir = null; // Parent of the current directory

//document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady()
{
	getFileSystem();
}

function getFileSystem() 
{
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
}

function onFileSystemSuccess(fileSystem) 
{
	root = fileSystem.root;
	getDirSuccess(root);
    //fileSystem.root.getDirectory("/sdcard", { create: false, exclusive: false }, getDirSuccess, fail);
}

function getDirSuccess(dirEntry) 
{
    var directoryReader = dirEntry.createReader();

    // Get a list of all the entries in the directory
	//$.mobile.showPageLoadingMsg("a", "Please Wait", true); // show loading message
    directoryReader.readEntries(readerSuccess, fail);
	//$.mobile.hidePageLoadingMsg(); // hide loading message
}

var readerTimeout = null, millisecondsBetweenReadSuccess = 1000;

function readerSuccess(entries) //(directoryEntry)
{	
    String.prototype.startsWith = function (str)
    {
		return (this.match("^" + str) == str) 
	}
	
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
                    numFiles++;
					MusicFileName.push(entries[i].name)
                    MusicFilePath.push(entries[i].fullPath)
					//console.log("FileName: "+filename);
                    //console.log("FilePath: "+entries[i].fullPath)
					
					//$('#directoryList').append('<li><h3>' + entries[i].name + '</h3><p>' + entries[i].toURI() + '</p><p class="ui-li-aside">Type: <strong>' + objectType + '</strong></p></li>');
                }
            }
        }
		else if (entries[i].isDirectory) 
		{
            numDirs++;
            // console.log("directory "+entries[i].name)
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
    readerTimeout = window.setTimeout(weAreDone, millisecondsBetweenReadSuccess);
}

function weAreDone()
{
	console.log("No Of Files: "+numFiles);
	
	for(var j = 0; j < MusicFileName.length; j++)
	{
		$('#directoryList').append('<li><h3>' + MusicFileName[j] + '</h3><p>' + MusicFilePath[j] + '</p><p class="ui-li-aside">Type: <strong>' + objectType + '</strong></p></li>');
		
		console.log(MusicFileName[j]+":"+MusicFilePath[j]);
	}
	
	$('#directoryList').listview("refresh");
}

function fail(error) 
{
	alert("Failed to list directory contents: " + error.code);
	//console.log(error);
}