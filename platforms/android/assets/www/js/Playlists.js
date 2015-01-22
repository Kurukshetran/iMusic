window.addEventListener('load', function()
{
	document.addEventListener("deviceready", onDeviceReady, false);
}, false);

function onDeviceReady()
{	
	populateDefault();
}

function populateDefault()
{
	var list = ["Albums", "Artists", "Genres", "Songs"];
	for(var i = 0; i < list.length; i++)
	{
		populateList(list[i]);
	}
}

function populateList(listname)
{
	$('#playlist-list').append('<li><h6>' + listname + '</h6></li>');
	$('#playlist-list').listview("refresh");
}

$(document).on("click", "#playlist-list li" ,function (event) 
{
	setNewTheme('a', '#playlist-list li');
    alert($(this).text());
});

function setNewTheme(newTheme, object) 
{
    $.mobile.activePage.find(object).removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-c ui-btn-up-d ui-btn-up-e ui-btn-hover-a ui-btn-hover-b ui-btn-hover-c ui-btn-hover-d ui-btn-hover-e').addClass('ui-btn-up-' + newTheme ).attr('data-theme', newTheme );
	$('#playlist-list').listview("refresh");
}

$(document).on("click", "#create-playlist" ,function (event) 
{
    textInputDialog.prompt("message", callback, "title", ["OK","Cancel"]);
});

function callback(results)
{
    if(results.buttonIndex == 1)
    {
        // OK clicked, show input value
        alert(results.input1);
    }
    if(results.buttonIndex == 2)
    {
        // Cancel clicked
        alert("Cancel");
    }
};