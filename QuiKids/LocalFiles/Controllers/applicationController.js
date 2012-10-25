/**
 * @brief The application controller contains the main application stack screen.
 * 		  It shows the stack screen and the first controller (the mainMenuController).
 * @param stackScreen The main application stack screen.
 */
function ApplicationController(stackScreen)
{
	var _stackScreen = stackScreen;
	// the main screen is already inside the stack screen so we don't need to show it (only the
	// stack screen needs to be shown
	var _mainMenuViewController;
	
	/**
	 * Initializes the main repository, shows the loading screen and when the main menu controller
	 * is ready, pushes the main menu screen.
	 */
	this.show = function ()
	{
		// until the main menu screen is loaded, a loading screen will be visible
		loadingScreen.show();

		initFileManager(
			// success - the main directory has been set
			function()
			{
				// we push the screen only when the localized data has been loaded
				_mainMenuViewController = new MainMenuViewController(function()
				{
					_mainMenuViewController.pushScreen();
					_stackScreen.show();
				});
			});
	};	
}