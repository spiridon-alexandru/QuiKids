/*
Copyright (C) 2012 MoSync AB

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License,
version 2, as published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
MA 02110-1301, USA.
*/

/**
 * @file filenmaneger.js
 *
 * Functions used by the File Storage demo.
 */

var localFilesDir; // DirectoryEntry for the LocalFiles directory.
var textResourcesDirName = "TextResources";
var languagesDirName = "Lang";
var languagesFileName = "languages.xml";

/**
 * This function initializes the file manager.
 */
function initFileManager(successCallback)
{
	window.requestFileSystem(
		LocalFileSystem.PERSISTENT,
		0,
		// Success callback.
		function(fileSystem)
		{
			//The "root" is actually the local file storage
			//directory for our app
			fileSystem.root.getDirectory(
					textResourcesDirName,
				{create: false, exclusive: false},
				function(dirEntry)
				{
					localFilesDir = dirEntry;
					successCallback();
				},
				function(error)
				{
					alert("initFileManager1 error: " + error);
				});
		},
		// Error callback.
		function(error)
		{
			alert("initFileManager2 error: " + error);
		});
}

/**
 * This function refreshes the file list in the file manager panel.
 */
function readLanguageFile()
{	
	// read the list of directories under "LocalFiles"
	var dirReader = localFilesDir.createReader();
	dirReader.readEntries(function(entries)
	{
		// find the "Lang" dir
		for (var i = 0; i < entries.length; i++)
		{
			if (entries[i].name === "Lang" && entries[i].isDirectory)
			{
				var languagesReader = entries[i].createReader();
				languagesReader.readEntries(function(entries)
					{
						// find the "languages.xml" file - it contains all the languages of the application
						for(var i = 0; i < entries.length; i++)
						{
							if (entries[i].name == languagesFileName && entries[i].isFile)
							{
								readFile(entries[i]);
								break;
							}
						}
					},
					function(error)
					{
						alert("readLanguageFile error: " + error);
					});
				break;
			}
		}
	},
	function(error)
	{
		alert("readSettingsFile error: " + error);
	});
}

/**
 * Sets the file editing panel to the selected file.
 * @param file FilEntry with the info about the selected file.
 */
function readFile(file)
{
	var reader = new FileReader();
	reader.onloadend = function(evt){
		alert("Settings file content: " + evt.target.result);
		
		var settingsFileContent = evt.target.result;

		var parser;
		var xmlDoc;
		if (window.DOMParser)
		{
			parser=new DOMParser();
			xmlDoc=parser.parseFromString(settingsFileContent,"text/xml");
		}
		else // Internet Explorer
		{
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async=false;
			xmlDoc.loadXML(settingsFileContent); 
		}
		
		// TODO SA: current language
		var x = xmlDoc.getElementsByTagName("EN");
		if (x.length > 0)
		{
			var quickPlayElement = x[0].getElementsByTagName("QuickPlay")[0];
			var playElement = x[0].getElementsByTagName("Play")[0];
			var settingsElement = x[0].getElementsByTagName("Settings")[0];
			var helpElement = x[0].getElementsByTagName("Help")[0];
			alert("Node text: " + mainScreenElement.nodeValue + " " + playElement.nodeValue);
		}
		else
		{
			alert("The main application language (EN) is not available!");
		}
	};

	// This call will invoke the onloaded callback above.
	reader.readAsText(file);
}
