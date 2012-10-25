/**
 * This file contains the global settings of the application.
 */

/***************************************************************
 * Language related settings.
 ***************************************************************/
// The languages available
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

/***************************************************************
 * Global variables (folder/file names etc).
 ***************************************************************/
var textResourcesDirName = "TextResources";
var languagesDirName = "Lang";
var mainScreenLanguagesFileName = "mainScreenLanguages.xml";
var quickPlayScreenLanguagesFileName = "quickPlayScreenLanguages.xml";
var categoriesDirName = "Categories";
var questionsFileName = "questions.xml";

// the main stack screen name
var mainStackScreen = "mainStackScreen";

/**
 * Contains the language texts for all the screens
 */

// the main screen defaults
var mainScreenText = new Object();
mainScreenText.quickPlay = "QuickPlay";
mainScreenText.play = "Play";
mainScreenText.settings = "Settings";
mainScreenText.achievements = "Achievements";

//the main screen defaults
var quickPlayScreenText = new Object();
quickPlayScreenText.title = "Quick Play";

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

/**
 * Sets the QuickPlay screen widget texts.
 * @param title The title of the quick play page.
 */
function setQuickPlayScreenText(title)
{
	quickPlayScreenText.title = title;
}

/***************************************************************
 * Loading screen initialization.
 ***************************************************************/
var loadingScreen = new LoadingScreen();