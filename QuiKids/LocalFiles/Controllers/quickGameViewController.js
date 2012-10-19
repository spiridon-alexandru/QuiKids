function QuickGameViewController()
{
	// create a default value
	var _quickGameView =  new GameView("Quick game", "game_object");
	
	// add the back button listener
	document.addEventListener("backbutton", popScreen, true);
	
	this.getScreen = function()
	{
		return _quickGameView.getScreen();
	};
	
	this.pushScreen = function()
	{
		_quickGameView.getScreen().pushTo(mainStackScreen);
	};
	
	/**
	 * Handle the backbutton event.
	 */
	function popScreen()
	{
		var applicationStackScreen = document.getNativeElementById(mainStackScreen);
		applicationStackScreen.pop();
	}
}
