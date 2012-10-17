// this file will contain the settings of the application
Languages = {
	EN : 0,
	RO : 1
};

// the application language used
var applicationLanguage = Languages.EN;

/**
 * Gets a string containing the current language initials.
 */
function getApplicationLanguageString()
{
	var languageString;
	switch (applicationLanguage)
	{
		case Languages.RO:
			languageString = "RO";
			break;
		default:
			languageString = "EN";
	}
	return languageString;
}

/**
 * Global variables (folder/file names etc).
 */
var textResourcesDirName = "TextResources";
var languagesDirName = "Lang";
var languagesFileName = "languages.xml";

/**
 * Contains the language texts for all the screens
 */

// the main screen defaults
var mainScreenText = new Object();
mainScreenText.quickPlay = "QuickPlay";
mainScreenText.play = "Play";
mainScreenText.settings = "Settings";
mainScreenText.achievements = "Achievements";

/**
 * Sets the MainScreen widget texts.
 * @param quickPlayText The quick play button text;
 * @param playText The play button text;
 * @param settingsText The settings button text;
 * @param achievementsText The achievements button text;
 */
function setMainScreenText(quickPlayText, playText,
		settingsText, achievementsText)
{
	mainScreenText.quickPlay = quickPlayText;
	mainScreenText.play = playText;
	mainScreenText.settings = settingsText;
	mainScreenText.achievements = achievementsText;
}