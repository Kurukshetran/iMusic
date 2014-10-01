var GetFiles = 
{
   initGetFiles: function() 
	{
		$(document).on('pageinit', '#scan-page',
         function()
         {
            GetFiles.initFilesListPage();
         }
      );
	},
	initFilesListPage: function() 
	{
		var MFileName = script.MusicFileName;
		var MFilePath = script.MusicFilePath;
		
		for(var j = 0; j < MusicFileName.length; j++)
		{
			$('#directoryList').append('<li><h3>' + MusicFileName[j] + '</h3><p>' + MusicFilePath[j] + '</p><p class="ui-li-aside">Type: <strong>' + objectType + '</strong></p></li>');
		
			//console.log(MFileName[j]+":"+MFilePath[j]);
		}
	
		$('#directoryList').listview("refresh");
	}
};