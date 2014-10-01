package com.app.imusic.plugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.media.MediaMetadataRetriever;
import android.util.Log;

public class MyPlugin extends CordovaPlugin 
{
	public static final String ACTION_DEMO = "GET_METADATA";
	
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException 
	{
		try 
		{
			if (ACTION_DEMO.equals(action)) 
			{
				JSONObject argObject = args.getJSONObject(0);
				JSONObject r = new JSONObject();
				
			   // Here goes our custom code
				String path = "/sdcard";
				String getPath = argObject.getString("FilePath");
				String fullpath = path.concat(getPath);
				
				MediaMetadataRetriever metaRetriver = new MediaMetadataRetriever(); 
				metaRetriver.setDataSource(fullpath);
				try 
				{ 
					String src1 = metaRetriver.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ALBUM); 
					String src2 = metaRetriver.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ARTIST); 
					String src3 = metaRetriver.extractMetadata(MediaMetadataRetriever.METADATA_KEY_GENRE);
					
					r.put("album", src1);
					r.put("artist", src2);
					r.put("genre", src3);
					
					Log.d("PATH  : ", fullpath);
					Log.d("ALBUM : ", src1);
					Log.d("ARTIST: ", src2);
					Log.d("GENRE : ", src2);
					
					String result = src1+","+src2+","+src3;
					
					callbackContext.success(r.toString());
					return true;
				}
				catch (Exception e)
				{
					Log.d("GETPATH  : ", getPath);
					Log.d("FULLPATH : ", fullpath);
					callbackContext.error("intry"+fullpath+e.getMessage());
					return false;
				}
			}
			callbackContext.error("No such action defined");
			return false;
		} 
		catch(Exception e) 
		{
			callbackContext.error("outtry"+e.getMessage());
			return false;
		}
	}
}