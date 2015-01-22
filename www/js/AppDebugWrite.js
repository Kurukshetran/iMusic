var content = '';

function debugWrite()
{
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function gotFS(fileSystem) 
{
	fileSystem.root.getFile("debug-imusic.txt", {create: true, exclusive: false}, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) 
{
	fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) 
{
	writer.onwrite = function(evt) 
	{
        alert("write success");
    };
	writer.write(content);
}

function fail(error) 
{
	console.log(error.code);
}