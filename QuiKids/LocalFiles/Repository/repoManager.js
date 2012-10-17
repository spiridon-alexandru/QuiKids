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
