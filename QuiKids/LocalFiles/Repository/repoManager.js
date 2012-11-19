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

/**
 * This function initializes the file manager.
 */
function initFileManager(successCallback, failureCallback)
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
					var errorString = "initFileManager1 error: " + error;
					failureCallback(errorString);
				});
		},
		// Error callback.
		function(error)
		{
			var errorString = "initFileManager2 error: " + error;
			failureCallback(errorString);
		});
}


/**
 * @brief Reads all the available application categories.
 */
function readAllCategories(successCallback, failureCallback)
{
	var categories = [];
	var catCounter = 0;
	
	if (localFilesDir != undefined)
	{
		// set the success callback
		callback = successCallback;
		// read the list of directories under the resources rootDir
		var dirReader = localFilesDir.createReader();
		dirReader.readEntries(function(entries)
		{
			//find the "Category" dir
			for(var i in entries)
			{
				if(entries[i].name === categoriesDirName && entries[i].isDirectory)
				{
					var categoriesReader = entries[i].createReader();
					categoriesReader.readEntries(function(entries)
					{
						for(var i = 0; i < entries.length; i++)
						{
							if (entries[i].isDirectory)
							{
								categories[catCounter] = entries[i];
								catCounter++;
							}
						}
						successCallback(categories);
					},
					function(error)
					{
						var errorString = "readAllCategories1 error: " + error;
						failureCallback(errorString);
					});
					break;
				}
			}
		},
		function(error)
		{
			var errorString = "readAllCategories2 error: " + error;
			failureCallback(errorString);
		});
	}
}

function readCategoryLanguages(categoryEntry, successCallback, failureCallback)
{
	var languages = [];
	var langCount = 0;

	// read all the languages of the current category
	var languageReader = categoryEntry.createReader();
	languageReader.readEntries(function(entries)
	{
		for(var i = 0; i < entries.length; i++)
		{
			if (entries[i].isDirectory)
			{
				languages[langCount] = entries[i].name;
				langCount++;
			}
		}
			
		successCallback(languages);
	},
	function(error)
	{
		var errorString = "readCategoryLanguage error:" + error;
		failureCallback(errorString);
	});
}
