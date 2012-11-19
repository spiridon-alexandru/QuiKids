/**
 * This file contains the global settings of the application.
 */

/***************************************************************
 * Language related settings.
 ***************************************************************/
// The languages available
Languages = {
	US : 0,
	RO : 1
};

// the application language used
var applicationLanguage = Languages.EN;

/***************************************************************
 * Screen size related variables.
 ***************************************************************/
var SCREENSIZE = 
	{
		SMALL: "SMALL",
		MEDIUM: "MEDIUM",
		LARGE: "LARGE",
		XLARGGE: "XLARGE"
	};

var SMALL_SCREEN = 0;
var MEDIUM_SCREEN = 1;
var LARGE_SCREEN = 2;
var XLARGE_SCREEN = 3;

var screenHeight = mosync.nativeui.screenHeight;
var screenWidth = mosync.nativeui.screenWidth;
var screenType;
var fontSizeIOSTitle = 30;
var fontSizeIOSScreen = 15;
var fontSizeTitle = 60;
var fontSizeScreen = 20;
var fontSizeQuestion = 40;

/***************************************************************
 * Platform related variables
 ***************************************************************/

var isIPhoneOS = false;
var isWindowsPhone7 = false;
var isAndroid = false;

/***************************************************************
 * Global variables (folder/file names etc).
 ***************************************************************/
var rootImageDir = "img";
var backgroundImageDir = "Background";

var textResourcesDirName = "TextResources";
var languagesDirName = "Lang";
var mainScreenLanguagesFileName = "mainScreenLanguages.xml";
var quickPlayScreenLanguagesFileName = "quickPlayScreenLanguages.xml";
var gameLanguageScreenLanguagesFileName = "gameLanguageScreenLanguages.xml";
var categoriesDirName = "Categories";
var questionsFileName = "questions.xml";

// the game view font colors
var gameViewFontColor = "0xFFFFFF";

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

// the game language screen defaults
var gameLanguageScreenText = new Object();
gameLanguageScreenText.title = "Languages";

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

/**
 * Sets the GameLanguage screen widget texts.
 * @param title The title of the game language screen.
 */
function setGameLanguageScreenText(title)
{
	gameLanguageScreenText.title = title;
}

/***************************************************************
 * Loading screen initialization.
 ***************************************************************/
var loadingScreen = new LoadingScreen();
loadingScreen.createUI();