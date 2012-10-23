MainMenuEventTypes = {PushQuickScreen:0,
		PushPlayScreen:1,
		PushSettingsScreen:2,
		PushAchievementsScreen:3,
		PushHelpScreen:4,
		PushAboutScreen:5
		}

function MainMenuView(title, eventCallback)
{
	var _screen;
	var _mainVerticalLayout;
	var _titleLabel;
	var _title = title;
	
	// the main menu buttons
	var _quickPlayButton;
	var _playButton;
	var _settingsButton;
	var _achievementsButton;
	var _helpButton;
	var _aboutButton;	
	
	createUI();
	
	/**
	 * Creates the UI of the quick game.
	 */
	function createUI()
	{
		// create the screen
		_screen = mosync.nativeui.create("Screen", "mainMenuScreen",
		{
		});
		
		// create the main screen layout
		_mainVerticalLayout = mosync.nativeui.create("VerticalLayout", "mainMenuMainLayout",
		{
			"width": "100%",
			"height": "100%"
		});
		
		// create the title label
		_titleLabel = mosync.nativeui.create("Label", "mainMenuScreenTitleLabel",
		{
			"width": "100%",
			"text": _title,
			"fontSize": 60,
			"textHorizontalAlignment": "center"
		});
		
		_titleLabel.addTo("mainMenuMainLayout");
		_mainVerticalLayout.addTo("mainMenuScreen");
		
		createButtonUI();
		addButtonEventHandlers();
	}
	
	function createButtonUI()
	{
		// create the horizontal layout that will contain the quick play and play buttons
		var _firstHorizontalLayout = mosync.nativeui.create("HorizontalLayout", "firstHorizontalLayout",
		{
			"width": "100%",
			"height": "100%"
		});
		
		_quickPlayButton = mosync.nativeui.create("Button", "quickPlayButton",
		{
			"width": "100%",
			"fontSize": 20
		});
		
		_playButton = mosync.nativeui.create("Button", "playButton",
		{
			"width": "100%",
			"fontSize": 20
		});
		
		_quickPlayButton.addTo("firstHorizontalLayout");
		_playButton.addTo("firstHorizontalLayout");
		_firstHorizontalLayout.addTo("mainMenuMainLayout");
		
		// create the horizontal layout that will contain the settings and achievements buttons
		var _secondHorizontalLayout = mosync.nativeui.create("HorizontalLayout", "secondHorizontalLayout",
		{
			"width": "100%",
			"height": "100%"
		});
		
		_settingsButton = mosync.nativeui.create("Button", "settingsButton",
		{
			"width": "100%",
			"fontSize": 20
		});
		
		_achievementsButton = mosync.nativeui.create("Button", "achievementsButton",
		{
			"width": "100%",
			"fontSize": 20
		});
		
		_settingsButton.addTo("secondHorizontalLayout");
		_achievementsButton.addTo("secondHorizontalLayout");
		_secondHorizontalLayout.addTo("mainMenuMainLayout");
		
		// create horizontal layout that will contain the help and about buttons
		var _thirdHorizontalLayout = mosync.nativeui.create("HorizontalLayout", "thirdHorizontalLayout",
		{
			"width": "100%",
			"height": "100%"
		});
		
		_helpButton = mosync.nativeui.create("Button", "helpButton",
		{
			"width": "80",
			"height": "80",
			"text": "?",
			"fontSize": 16
		});
		
		_horizontalLayout = mosync.nativeui.create("HorizontalLayout", "separatorHorizontalLayout",
		{
			"width": "100%"
		});
		
		_aboutButton = mosync.nativeui.create("Button", "aboutButton",
		{
			"width": "80",
			"height": "80",
			"text": "i",
			"fontSize": 16
		});
		
		_helpButton.addTo("thirdHorizontalLayout");
		_horizontalLayout.addTo("thirdHorizontalLayout");
		_aboutButton.addTo("thirdHorizontalLayout");
		_thirdHorizontalLayout.addTo("mainMenuMainLayout");
	}
	
	function addButtonEventHandlers()
	{
		_quickPlayButton.addEventListener("Clicked", function()
		{
			eventCallback(MainMenuEventTypes.PushQuickScreen);
		});

		_playButton.addEventListener("Clicked", function()
		{
			eventCallback(MainMenuEventTypes.PushPlayScreen);
			alert("play!");
		});
		
		_settingsButton.addEventListener("Clicked", function()
		{
			eventCallback(MainMenuEventTypes.PushSettingsScreen);
			alert("settings!");
		});

		_achievementsButton.addEventListener("Clicked", function()
		{
			eventCallback(MainMenuEventTypes.PushAchievementsScreen);
			alert("achievements!");
		});
		
		_helpButton.addEventListener("Clicked", function()
		{
			eventCallback(MainMenuEventTypes.PushHelpScreen);
			alert("help!");
		});

		_aboutButton.addEventListener("Clicked", function()
		{
			eventCallback(MainMenuEventTypes.PushAboutScreen);
			alert("about!");
		});
	}
	
	this.setQuickPlayButtonText = function(text)
	{
		_quickPlayButton.setProperty("text", text);
	};
	
	this.setPlayButtonText = function(text)
	{
		_playButton.setProperty("text", text);
	};
	
	this.setSettingsButtonText = function(text)
	{
		_settingsButton.setProperty("text", text);
	};
	
	this.setAchievementsButtonText = function(text)
	{
		_achievementsButton.setProperty("text", text);
	};
	
	/**
	 * Returns the game screen.
	 * @return The game screen.
	 */
	this.getScreen = function()
	{
		return _screen;
	};
	
	/**
	 * Returns the screen title.
	 * @return The screen title.
	 */
	this.getScreenTitle = function()
	{
		return _title;
	};
}