var callback;

/**
 * This function refreshes the file list in the file manager panel.
 */
function readLanguageFile(successCallback)
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
		var settingsFileContent = evt.target.result;
		parseFileContent(settingsFileContent);
	};

	// This call will invoke the onloaded callback above.
	reader.readAsText(file);
}

function parseFileContent(content)
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
		var mainScreenElements = languageElements[0].getElementsByTagName("MainScreen");
		if (mainScreenElements.length > 0)
		{
			getAndSetMainScreenTexts(mainScreenElements[0])
		}
	}
	else
	{
		alert("The application language (" + languageString + ") is not available!");
	}
}

/**
 * Gets all the main screen text and then sets it.
 * @param mainScreenElement The node that contains the main screen
 * text data in the current application language.
 */
function getAndSetMainScreenTexts(mainScreenElement)
{
	var quickPlayElements = mainScreenElement.getElementsByTagName("QuickPlay");
	var quickPlayElement = quickPlayElements[0].childNodes[0];
	var playElements = mainScreenElement.getElementsByTagName("Play");
	var playElement = playElements[0].childNodes[0];
	var settingsElements = mainScreenElement.getElementsByTagName("Settings");
	var settingsElement = settingsElements[0].childNodes[0];
	var achievementsElements = mainScreenElement.getElementsByTagName("Achievements");
	var achievementsElement = achievementsElements[0].childNodes[0];
	setMainScreenText(quickPlayElement.nodeValue, playElement.nodeValue,
			settingsElement.nodeValue, achievementsElement.nodeValue);
	
	callback();
}