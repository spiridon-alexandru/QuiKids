function QuickGameViewController(pushScreenCallback)
{
	// create a default value
	var _quickGameView =  new GameView("game_object", function(tileName)
			{
				alert(tileName);
			});
	
	// loads the localization data onto the screen widgets
	loadScreen();
	
	/**
	 * Reads the screen language data from xml and shows the screen.
	 */
	function loadScreen()
	{
		readQuickPlayLanguageFile(function ()
		{
			updateUI();
			pushScreenCallback();
		});
	};
	
	var updateUI = function()
	{
		_quickGameView.setQuickPlayScreenTitle(quickPlayScreenText.title);
	};
	
	this.getScreen = function()
	{
		return _quickGameView.getScreen();
	};
	
	this.pushScreen = function()
	{
		_quickGameView.getScreen().pushTo(mainStackScreen);
	};
}