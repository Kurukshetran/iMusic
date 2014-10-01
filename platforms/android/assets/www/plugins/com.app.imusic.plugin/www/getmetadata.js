cordova.define("com.app.imusic.plugin.MusicData", function(require, exports, module) { var songPlugin = 
{
	createEvent: function(filepath, successCallback, errorCallback) 
	{
		cordova.exec(successCallback, errorCallback, 'MyPlugin', 'GET_METADATA', [{"FilePath": filepath,}]);
	}
}

module.exports = songPlugin;
});
