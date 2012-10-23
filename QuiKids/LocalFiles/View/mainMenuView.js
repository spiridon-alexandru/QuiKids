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
	
	// the height/width of a button
	var _buttonWidth;
	
	var _titleHeight;
	var _contentHeight;
	var _bottomBarHeight;
	
	// the labels located bellow the buttons
	var _quickPlayLabel;
	var _playLabel;
	var _settingsLabel;
	var _achievementsLabel;

	createUI();
	
	/**
	 * Creates the UI of the quick game.
	 */
	function createUI()
	{
		// set the button width value based on the device screen width
		_buttonWidth = mosync.nativeui.screenWidth/3;
		
		// the title will occupy 20 % of the screen height
		_titleHeight = 20/100 * mosync.nativeui.screenHeight;
		// the content will be 60% of the screen height
		_contentHeight = 60/100 * mosync.nativeui.screenHeight;
		// the bottom bar (containing the help and about buttons) will occupy 20%
		// of the screen height
		_bottomBarHeight = 20/100 * mosync.nativeui.screenHeight;
		
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
			"height": _titleHeight,
			"text": _title,
			"fontSize": 60,
			"textHorizontalAlignment": "center"
		});
		
		_titleLabel.addTo("mainMenuMainLayout");
		_mainVerticalLayout.addTo("mainMenuScreen");
		
		createButtonUI();
		addButtonImages();
		addButtonEventHandlers();
	}
	
	function createButtonUI()
	{
		createFirstButtonRow();
		createSecondButtonRow();
		
		// create horizontal layout that will contain the help and about buttons
		var _thirdHorizontalLayout = mosync.nativeui.create("HorizontalLayout", "thirdHorizontalLayout",
		{
			"width": "100%",
			"height": _bottomBarHeight
		});
		
		_helpButton = mosync.nativeui.create("ImageButton", "helpButton",
		{
			"width": "80",
			"height": "80",
			"fontSize": 16
		});
		
		_horizontalLayout = mosync.nativeui.create("HorizontalLayout", "separatorHorizontalLayout",
		{
			"width": "100%"
		});
		
		_aboutButton = mosync.nativeui.create("ImageButton", "aboutButton",
		{
			"width": "80",
			"height": "80",
			"fontSize": 16
		});
		
		_helpButton.addTo("thirdHorizontalLayout");
		_horizontalLayout.addTo("thirdHorizontalLayout");
		_aboutButton.addTo("thirdHorizontalLayout");
		_thirdHorizontalLayout.addTo("mainMenuMainLayout");
	}
	
	/**
	 * Adds images to the main menu buttons.
	 * TODO SA: use xml values for the image paths
	 */
	function addButtonImages()
	{
		 mosync.resource.loadImage("./img/Menu/MEDIUM/quick play.png", "img", function(imageID, imageHandle){
			 	_quickPlayButton.setProperty("backgroundImage", imageHandle);
	        });
		 
		 mosync.resource.loadImage("./img/Menu/MEDIUM/play.png", "PlayButtonImage", function(imageID, imageHandle){
	            _playButton.setProperty("backgroundImage", imageHandle);
	        });
		 
		 mosync.resource.loadImage("./img/Menu/MEDIUM/settings.png", "SettingsButtonImage", function(imageID, imageHandle){
	            _settingsButton.setProperty("backgroundImage", imageHandle);
	        });
		 
		 mosync.resource.loadImage("./img/Menu/MEDIUM/about.png", "AboutButtonImage", function(imageID, imageHandle){
	            _aboutButton.setProperty("backgroundImage", imageHandle);
	        });
		 
		 mosync.resource.loadImage("./img/Menu/MEDIUM/help.png", "HelpButtonImage", function(imageID, imageHandle){
	            _helpButton.setProperty("backgroundImage", imageHandle);
	        });
	}
	
	function createFirstButtonRow()
	{
		// create the horizontal layout that will contain the quick play and play buttons
		var _firstHorizontalLayout = mosync.nativeui.create("HorizontalLayout", "firstHorizontalLayout",
		{
			"width": "100%",
			"height": _contentHeight/2
		});
		// create the quick play layout, button and label
		createQuickPlayLayout("firstHorizontalLayout");		
		
		// create the play layout, button and label
		createPlayLayout("firstHorizontalLayout");
		
		_firstHorizontalLayout.addTo("mainMenuMainLayout");
	}
	
	function createQuickPlayLayout(parentLayoutName)
	{
		var _qpVerticalLayout = mosync.nativeui.create("VerticalLayout", "qpVerticalLayout",
		{
			"width": "100%",
			"height": "100%"
		});
		
		_quickPlayButton = mosync.nativeui.create("ImageButton", "quickPlayButton",
		{
			"width": _buttonWidth,
			"height": _buttonWidth
		});
		_quickPlayLabel = mosync.nativeui.create("Label", "quickPlayLabel",
		{
			"textHorizontalAlignment": "center"
		});
		
		_quickPlayButton.addTo("qpVerticalLayout");
		_quickPlayLabel.addTo("qpVerticalLayout");
		_qpVerticalLayout.addTo(parentLayoutName);
	}
	
	function createPlayLayout(parentLayoutName)
	{
		var _pVerticalLayout = mosync.nativeui.create("VerticalLayout", "pVerticalLayout",
		{
			"width": "100%",
			"height": "100%"
		});

		_playButton = mosync.nativeui.create("ImageButton", "playButton",
		{
			"width": _buttonWidth,
			"height": _buttonWidth
		});
		_playLabel = mosync.nativeui.create("Label", "playLabel",
		{
			"textHorizontalAlignment": "center"
		});
		
		_playButton.addTo("pVerticalLayout");
		_playLabel.addTo("pVerticalLayout");
		_pVerticalLayout.addTo(parentLayoutName);
	}
	
	function createSecondButtonRow()
	{
		var _secondHorizontalLayout = mosync.nativeui.create("HorizontalLayout", "secondHorizontalLayout",
		{
			"width": "100%",
			"height": _contentHeight/2
		});
		// create the settings layout, button and label
		createSettingsLayout("secondHorizontalLayout");		
		
		// create the achievements layout, button and label
		createAchievementsLayout("secondHorizontalLayout");
		
		_secondHorizontalLayout.addTo("mainMenuMainLayout");
	}
	
	function createSettingsLayout(parentLayoutName)
	{
		var _sVerticalLayout = mosync.nativeui.create("VerticalLayout", "sVerticalLayout",
		{
			"width": "100%",
			"height": "100%"
		});
		
		_settingsButton = mosync.nativeui.create("ImageButton", "settingsButton",
		{
			"width": _buttonWidth,
			"height": _buttonWidth
		});
		_settingsLabel = mosync.nativeui.create("Label", "settingsLabel",
		{
			"textHorizontalAlignment": "center"
		});
		
		_settingsButton.addTo("sVerticalLayout");
		_settingsLabel.addTo("sVerticalLayout");
		_sVerticalLayout.addTo(parentLayoutName);
	}
	
	function createAchievementsLayout(parentLayoutName)
	{
		var _aVerticalLayout = mosync.nativeui.create("VerticalLayout", "aVerticalLayout",
		{
			"width": "100%",
			"height": "100%"
		});
		
		_achievementsButton = mosync.nativeui.create("ImageButton", "achievementsButton",
		{
			"width": _buttonWidth,
			"height": _buttonWidth
		});
		_achievementsLabel = mosync.nativeui.create("Label", "achievementsLabel",
		{
			"textHorizontalAlignment": "center"
		});
		
		_achievementsButton.addTo("aVerticalLayout");
		_achievementsLabel.addTo("aVerticalLayout");
		_aVerticalLayout.addTo(parentLayoutName);
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
	
	this.setQuickPlayLabelText = function(text)
	{
		_quickPlayLabel.setProperty("text", text);
	};
	
	this.setPlayLabelText = function(text)
	{
		_playLabel.setProperty("text", text);
	};
	
	this.setSettingsLabelText = function(text)
	{
		_settingsLabel.setProperty("text", text);
	};
	
	this.setAchievementsLabelText = function(text)
	{
		_achievementsLabel.setProperty("text", text);
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