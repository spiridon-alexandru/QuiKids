function MainMenuViewController(pushScreenCallback)
{
	var _fileManagerInitialized = false;
	var _mainMenuView = new MainMenuView("QuiKids\n", function(eventType)
	{
		switch(eventType)
		{
			case MainMenuEventTypes.PushQuickScreen:
				_quickGameController = new QuickGameViewController(function()
				{
					_quickGameController.pushScreen();
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
		if (!_fileManagerInitialized)
		{
			initFileManager(
				// success - the main directory has been set
				function()
				{
					_fileManagerInitialized = true;
					
					readMainScreenLanguageFile(function ()
					{
						// the language file was read, we need to update the view
						updateUI();
						pushScreenCallback();
					});
				});
		}
		else
		{
			readMainScreenLanguageFile(function ()
			{
				updateUI();
				pushScreenCallback();
			});
		}
	};
	
	var updateUI = function()
	{
		_mainMenuView.setQuickPlayButtonText(mainScreenText.quickPlay);
		_mainMenuView.setPlayButtonText(mainScreenText.play);
		_mainMenuView.setSettingsButtonText(mainScreenText.settings);
		_mainMenuView.setAchievementsButtonText(mainScreenText.achievements);
	};
	
	this.pushScreen = function()
	{
		_mainMenuView.getScreen().pushTo(mainStackScreen);
	};
}