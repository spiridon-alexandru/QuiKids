/**
 * @brief The application controller contains the main application stack screen.
 * 		  It shows the stack screen and the first controller (the mainMenuController).
 * @param stackScreen The main application stack screen.
 */
function ApplicationController()
{
	var _stackScreen;
	// the main screen is already inside the stack screen so we don't need to show it (only the
	// stack screen needs to be shown
	var _mainMenuViewController;
	
	/**
	 * Initializes the screen and it's dependencies.
	 * Should be called before pushing the screen.
	 */
	this.initUI = function()
	{
		_stackScreen = document.getNativeElementById(mainStackScreen);
	}
	
	/**
	 * Initializes the main repository, shows the loading screen and when the main menu controller
	 * is ready, pushes the main menu screen.
	 */
	this.pushScreen = function ()
	{
		// until the main menu screen is loaded, a loading screen will be visible
		loadingScreen.showUI();

		initFileManager(fileManagerInitialized, fileManagerFailedToInitialize);
	};	
	
	/**
	 * Gets called when the file manager has been initialized.
	 */
	function fileManagerInitialized()
	{
		// we push the screen only when the localized data has been loaded
		_mainMenuViewController = new MainMenuViewController(function()
		{
			// this gets called after as a result of the initUI call
			_mainMenuViewController.pushScreen();
			showMainStackScreen();
		});
		_mainMenuViewController.initUI();
	}
	
	/**
	 * Gets called when an error has occured while initializing the file manager.
	 */
	function fileManagerFailedToInitialize(errorString)
	{
		// TODO: handle the error properly
		alert(errorString);
	}
	
	/**
	 * Shows the main stack screen/
	 */
	function showMainStackScreen()
	{
		_stackScreen.show();
	}
}