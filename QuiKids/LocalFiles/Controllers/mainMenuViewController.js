/**
 * @brief The main menu view controller handles the main menu screen and does the
 * 		  business logic when one of the buttons is pressed.
 * @param pushScreenCallback A callback the announces the application controller that the 
 *        loading of the screen is done.
 */
function MainMenuViewController(pushScreenCallback)
{
	// this is the main menu screen, initialized with the application title and
	// the button pressed callback
	var _mainMenuView;
	
	// the other controllers
	var _gameLanguageController;
	
	/**
	 * Initializes the screen and it's dependencies.
	 * Should be called before pushing the screen.
	 */
	this.initUI = function()
	{
		_mainMenuView = new MainMenuView("QuiKids", handleMainMenuViewEvent);
		_mainMenuView.createUI();
		
		document.addEventListener("backbutton", close, true);
		// loads the localization data onto the screen widgets
		loadScreen();
	};
	
	/**
	 * Pushes the main menu screen to the main stack screen.
	 */
	this.pushScreen = function()
	{
		_mainMenuView.getScreen().pushTo(mainStackScreen);
	};
	
	/**
	 * Handle the backbutton event.
	 */
	function close()
	{
		if (_screenVisible)
		{
			// Close the application if the back key is pressed and the main menu screen is visible.
			mosync.bridge.send(["close"]);
		}
		
	}
	
	/**
	 * Reads the screen language data from xml and shows the screen.
	 */
	function loadScreen()
	{
		readMainScreenLanguageFile(function ()
		{
			updateUI();
			pushScreenCallback();
		}, mainScreenLanguageFileReadingFailed);
	}
	
	/**
	 * Gets called when the main screen language file reading failed.
	 */
	function mainScreenLanguageFileReadingFailed(errorString)
	{
		// TODO: handle the error properly
		alert(errorString);
	}
	
	
	/**
	 * Handles a main menu view event. Initializes and pushes new screens if needed.
	 * @param eventType One of the MainMenuEventTypes (see events.js).
	 */
	function handleMainMenuViewEvent(eventType)
	{
		switch(eventType)
		{
			case MainMenuEventTypes.PushQuickScreen:
				loadingScreen.showUI();
				_gameLanguageController = new GameLanguageViewController(gameLanguageControllerLoaded);
				// gets called before the above callback
				_gameLanguageController.initUI();
				break;
			case MainMenuEventTypes.PushPlayScreen:
				break;
			case MainMenuEventTypes.PushSettingsScreen:
				break;
			case MainMenuEventTypes.PushAchievementsScreen:
				break;
			case MainMenuEventTypes.PushHelpScreen:
				break;
			case MainMenuEventTypes.PushAboutScreen:
				break;
			default:
				alert("Wrong MainMenuEventType");
		}
	}
	
	/**
	 * Gets called when the game language controller has finished loading.
	 */
	function gameLanguageControllerLoaded()
	{
		_gameLanguageController.pushScreen();
		showMainStackScreen();
	}
	
	/**
	 * Updates the UI with the localization texts.
	 */
	function updateUI()
	{
		_mainMenuView.setQuickPlayLabelText(mainScreenText.quickPlay);
		_mainMenuView.setPlayLabelText(mainScreenText.play);
		_mainMenuView.setSettingsLabelText(mainScreenText.settings);
		_mainMenuView.setAchievementsLabelText(mainScreenText.achievements);
	}
	
	/**
	 * Shows the main stack screen/
	 */
	function showMainStackScreen()
	{
		var stackScreen = document.getNativeElementById(mainStackScreen);
		stackScreen.show();
	}
}