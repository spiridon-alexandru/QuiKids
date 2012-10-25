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
	var _mainMenuView = new MainMenuView("QuiKids", function(eventType)
	{
		switch(eventType)
		{
			case MainMenuEventTypes.PushQuickScreen:
				loadingScreen.show();
				_quickGameController = new QuickGameViewController(function()
				{
					_quickGameController.pushScreen();
					showMainStackScreen();
				});
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
	});
	
	// the other controllers
	var _quickGameController;
	
	// loads the localization data onto the screen widgets
	loadScreen();
	
	/**
	 * Reads the screen language data from xml and shows the screen.
	 */
	function loadScreen()
	{
		readMainScreenLanguageFile(function ()
		{
			updateUI();
			pushScreenCallback();
		});
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
	
	/**
	 * Pushes the main menu screen to the main stack screen.
	 */
	this.pushScreen = function()
	{
		_mainMenuView.getScreen().pushTo(mainStackScreen);
	};
}