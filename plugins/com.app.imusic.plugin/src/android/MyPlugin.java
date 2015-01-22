package com.app.imusic.plugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.media.MediaMetadataRetriever;

public class MyPlugin extends CordovaPlugin 
{
	public static final String ACTION_DEMO = "GET_METADATA";
	public static String ALBUM;
	public static String ARTIST;
	public static String GENRE;
	
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException 
	{
		if (ACTION_DEMO.equals(action)) 
		{
			JSONObject argObject = args.getJSONObject(0);
			JSONObject r = new JSONObject();
			
		   // Here goes our custom code
			String path = "/sdcard";
			String getPath = argObject.getString("FilePath");
			String songName = argObject.getString("SongName");
			String fullpath = path.concat(getPath);
			
			MediaMetadataRetriever metaRetriver = new MediaMetadataRetriever(); 
			metaRetriver.setDataSource(fullpath);
			
			try 
			{
				ALBUM = metaRetriver.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ALBUM).toString();
				ARTIST = metaRetriver.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ARTIST).toString(); 
				GENRE = metaRetriver.extractMetadata(MediaMetadataRetriever.METADATA_KEY_GENRE).toString();
			}
			catch (Exception e)
			{
				ALBUM = "unknown-album";
				ARTIST = "unknown-artist";
				GENRE = "unknown-genre";
			}
			
			if(ALBUM.equals("") || ALBUM == null)
			{
				ALBUM = "unknown-album";
			}
			
			if(ARTIST.equals("") || ARTIST == null)
			{
				ARTIST = "unknown-artist";
			}
			
			if(GENRE.equals("") || GENRE == null)
			{
				GENRE = "unknown-genre";
			}
			
			r.put("songname", songName);
			r.put("fullpath", getPath.toString());
			r.put("album", ALBUM.toString());
			r.put("artist", ARTIST.toString());
			r.put("genre", GENRE.toString());
			
			callbackContext.success(r.toString());
			return true;
		}
		else
		{
			callbackContext.error("No such action defined");
			return false;
		}
	}
}