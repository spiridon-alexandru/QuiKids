function QuickGameViewController()
{
	// create a default value
	var _quickGameView =  new GameView("Quick game", "game_object");
	
	this.getScreen = function()
	{
		return _quickGameView.getScreen();
	};
	
	this.pushScreen = function()
	{
		_quickGameView.getScreen().pushTo(mainStackScreen);
	};
}