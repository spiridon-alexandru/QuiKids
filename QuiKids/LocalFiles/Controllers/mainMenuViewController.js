function MainMenuViewController(screen)
{
	var _fileManagerInitialized = false;
	var _screen = screen;
	
	// Get an instance of the quick game button created in the markup.
	var _quickPlayButton = document.getNativeElementById("quickPlayButton");
	// Get an instance of the play button created in the markup.
	var _playButton = document.getNativeElementById("playButton");
	// Get an instance of the settings button created in the markup.
	var _settingsButton = document.getNativeElementById("settingsButton");
	// Get an instance of the achievements button created in the markup.
	var _achievementsButton = document.getNativeElementById("achievementsButton");
	// Get an instance of the help button created in the markup.
	var _helpButton = document.getNativeElementById("helpButton");
	// Get an instance of the help button created in the markup.
	var _aboutButton = document.getNativeElementById("aboutButton");
	
	_quickPlayButton.addEventListener("Clicked", function()
	{
		_quickGameController = new QuickGameViewController();
		_quickGameController.pushScreen();
	});

	_playButton.addEventListener("Clicked", function()
	{
		alert("play!");
	});
	
	_settingsButton.addEventListener("Clicked", function()
	{
		alert("settings!");
	});

	_achievementsButton.addEventListener("Clicked", function()
	{
		alert("achievements!");
	});
	
	_helpButton.addEventListener("Clicked", function()
	{
		alert("help!");
	});

	_aboutButton.addEventListener("Clicked", function()
	{
		alert("about!");
	});
	
	// the main application controller
	var _applicationController;
	
	// the other controllers
	var _quickGameController;
	
	/**
	 * Reads the screen language data from xml and shows the screen.
	 */
	this.loadScreen = function ()
	{
		if (!_fileManagerInitialized)
		{
			initFileManager(
				// success - the main directory has been set
				function()
				{
					_fileManagerInitialized = true;
					
					readLanguageFile(function ()
					{
						// the language file was read, we need to notify the view for an update
						updateUI();
					});
				});
		}
		else
		{
			readLanguageFile(function ()
			{
				updateUI();
			});
		}
	};
	

	var updateUI = function()
	{
		_quickPlayButton.setProperty("text", mainScreenText.quickPlay);
		_playButton.setProperty("text", mainScreenText.play);
		_settingsButton.setProperty("text", mainScreenText.settings);
		_achievementsButton.setProperty("text", mainScreenText.achievements);
	};
}