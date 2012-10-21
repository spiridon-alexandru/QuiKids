/**
 * The application controller contains the main application stack screen.
 * It shows the stack screen and the first controller (the mainMenuController).
 * @param stackScreen
 */
function ApplicationController(stackScreen)
{
	var _stackScreen = stackScreen;
	// the main screen is already inside the stack screen so we don't need to show it (only the
	// stack screen needs to be shown
	var _mainMenuViewController;
	
	this.show = function ()
	{
		_stackScreen.show();
		
		// we push the screen only when the localized data has been loaded
		_mainMenuViewController = new MainMenuViewController(function()
		{
			_mainMenuViewController.pushScreen();
		});
	};	
}