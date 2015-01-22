cordova.define("com.app.imusic.dialog.TextInputDialog", function(require, exports, module) { var exec = require('cordova/exec');

module.exports = {

	prompt: function(message, resultCallback, title, buttonLabels) 
	{
        var _message = (message || "Message");
        var _title = (title || "Title");
        var _buttonLabels = (buttonLabels || ["OK","Cancel"]);
        cordova.exec(resultCallback, null, "TextInputDialog", "prompt", [_message, _title, _buttonLabels]);
    }
};
});
