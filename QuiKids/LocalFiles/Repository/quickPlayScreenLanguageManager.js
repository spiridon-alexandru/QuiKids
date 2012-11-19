var callback;

/**
 * This function refreshes the file list in the file manager panel.
 */
function readQuickPlayLanguageFile(successCallback, failureCallback)
{	
	// set the success callback
	callback = successCallback;

	// read the list of directories under "LocalFiles"
	var dirReader = localFilesDir.createReader();
	dirReader.readEntries(function(entries)
	{
		// find the "Lang" dir
		for (var i = 0; i < entries.length; i++)
		{
			if (entries[i].name === languagesDirName && entries[i].isDirectory)
			{
				var languagesReader = entries[i].createReader();
				languagesReader.readEntries(function(entries)
					{
						// find the "languages.xml" file - it contains all the languages of the application
						for(var i = 0; i < entries.length; i++)
						{
							if (entries[i].name == quickPlayScreenLanguagesFileName && entries[i].isFile)
							{
								readQuickPlayFile(entries[i], failureCallback);
								break;
							}
						}
					},
					function(error)
					{
						var errorString = "readQuickPlayLanguageFile1 error:" + error;
						failureCallback(errorString);
					});
				break;
			}
		}
	},
	function(error)
	{
		var errorString = "readQuickPlayLanguageFile2 error:" + error;
		failureCallback(errorString);
	});
}

/**
 * Sets the file editing panel to the selected file.
 * @param file FilEntry with the info about the selected file.
 */
function readQuickPlayFile(file, failureCallback)
{
	var reader = new FileReader();
	reader.onloadend = function(evt){
		var settingsFileContent = evt.target.result;
		parseQuickPlayFileContent(settingsFileContent, failureCallback);
	};

	// This call will invoke the onloaded callback above.
	reader.readAsText(file);
}

function parseQuickPlayFileContent(content, failureCallback)
{
	var parser;
	var xmlDoc;
	if (window.DOMParser)
	{
		parser=new DOMParser();
		xmlDoc=parser.parseFromString(content,"text/xml");
	}
	else // Internet Explorer
	{
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async=false;
		xmlDoc.loadXML(content); 
	}

	// get the current application language string
	var languageString = getApplicationLanguageString();
	var languageElements = xmlDoc.getElementsByTagName(languageString);
	if (languageElements.length > 0)
	{
		var quickPlayScreenElements = languageElements[0].getElementsByTagName("QuickPlay");
		if (quickPlayScreenElements.length > 0)
		{
			getAndSetQuickPlayScreenTexts(quickPlayScreenElements[0])
		}
	}
	else
	{
		var errorString = "parseQuickPlayFileContent: the application language (" + languageString + ") is not available!";
		failureCallback(errorString);
	}
}

/**
 * Gets all the main screen text and then sets it.
 * @param mainScreenElement The node that contains the main screen
 * text data in the current application language.
 */
function getAndSetQuickPlayScreenTexts(quickPlayScreenElement)
{
	var titleElements = quickPlayScreenElement.getElementsByTagName("Title");
	var titleElement = titleElements[0].childNodes[0];
	setQuickPlayScreenText(titleElement.nodeValue);
	
	callback();
}