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
	var _topSpacer;
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
	// the button separator layout height/width
	var _separatorSize;
	var _separatorWidth;
	
	var _topSpacerHeight;
	var _titleSpacerHeight;
	var _bottomBarHeight;
	var _labelHeight;

	var _titleFontSize;
	var _textFontSize;
	
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
		// button width = 80% of the min(screenWidth,screenHeight) / 2
		_buttonWidth = ((screenWidth<screenHeight?screenWidth:screenHeight) * (70/100)) / 2;
		// the separator width/height = 20% from min(screenWidth,screenHeight) / 3 
		_separatorSize = ((screenWidth<screenHeight?screenWidth:screenHeight) * (20/100)) / 3;
		_separatorWidth = ((screenWidth<screenHeight?screenWidth:screenHeight) * (30/100)) / 3;
		
		_labelHeight = Math.floor(((screenWidth<screenHeight?screenWidth:screenHeight) * (20/100)) / 3);
		
		var remainingHeight = screenHeight - 2 * _buttonWidth - 2 * _separatorSize - 2 * _labelHeight;
		
		// create the screen
		_screen = mosync.nativeui.create("Screen", "mainMenuScreen",
		{
			"title" : _title
		});
		
		// create the main screen layout
		_mainVerticalLayout = mosync.nativeui.create("VerticalLayout", "mainMenuMainLayout",
		{
			"width": "100%",
			"height": "100%"
		});

		if(isIPhoneOS)
		{
			// the top spacer will occupy 30 % of the remaining height
			_topSpacerHeight = 10/100 * remainingHeight;
			// the bottom bar (containing the help and about buttons) will occupy 70%
			// of the remaining height
			_bottomBarHeight = 80/100 * remainingHeight;

			_textFontSize = 11;
				
			// create the top spacer 
			_topSpacer = mosync.nativeui.create("HorizontalLayout", "mainMenuScreenTopSpacer",
			{
				"width": "100%",
				"height": Math.floor(_topSpacerHeight)
			});
			
			_topSpacer.addTo("mainMenuMainLayout");
		}
		else
		{
			_titleSpacerHeight = 33/100 * remainingHeight;
			_bottomBarHeight = 66/100 * remainingHeight;
			
			_titleFontSize = 60;
			_textFontSize = 16;
			
			_titleLabel = mosync.nativeui.create("Label", "mainMenuScreenTitleLabel",
			{
				"width" : "100%",
				"height": Math.floor(_titleSpacerHeight),
				"fontSize": _titleFontSize,
				"text" : _title
			});

			_titleLabel.addTo("mainMenuMainLayout");
		}

		_mainVerticalLayout.addTo("mainMenuScreen");
		
		createButtonUI();
		
		switch (screenType) {
		case SMALL_SCREEN:
			addButtonImages("SMALL");
			break;
		case MEDIUM_SCREEN:
			addButtonImages("MEDIUM");
			break;
		case LARGE_SCREEN:
			addButtonImages("LARGE");
			break;
		default:
			addButtonImages("XLARGE");
			break;
		}
		
		addButtonEventHandlers();
	}
	
	function createButtonUI()
	{
		createFirstButtonRow();
		
		// separator layout between the button rows
		separatorHorizontalLayoutName = "mainMenuSeparatorHorizontalLayout2";	  	
		addSeparatorToLayout(separatorHorizontalLayoutName, "mainMenuMainLayout", "100%", Math.floor(_separatorSize));

		createSecondButtonRow();
		
		// separator layout between the buttons and the bottom bar
		separatorHorizontalLayoutName = "mainMenuSeparatorHorizontalLayout3";	  	
		addSeparatorToLayout(separatorHorizontalLayoutName, "mainMenuMainLayout", "100%", Math.floor(_separatorSize));

		
		// create horizontal layout that will contain the help and about buttons
		var _thirdHorizontalLayout = mosync.nativeui.create("HorizontalLayout", "thirdHorizontalLayout",
		{
			"width": "100%",
			"height": Math.floor(_bottomBarHeight)
		});
		
		_helpButton = mosync.nativeui.create("ImageButton", "helpButton",
		{
			"width": "80",
			"height": "80",
			"fontSize": _textFontSize
		});
		
		_horizontalLayout = mosync.nativeui.create("HorizontalLayout", "separatorHorizontalLayout",
		{
			"width": "100%"
		});
		
		_aboutButton = mosync.nativeui.create("ImageButton", "aboutButton",
		{
			"width": "80",
			"height": "80",
			"fontSize": _textFontSize
		});
		
		_helpButton.addTo("thirdHorizontalLayout");
		_horizontalLayout.addTo("thirdHorizontalLayout");
		_aboutButton.addTo("thirdHorizontalLayout");
		_thirdHorizontalLayout.addTo("mainMenuMainLayout");
	}
	
	/**
	 * Adds images to the main menu buttons.
	 * TODO SA: use xml values for the image paths
	 * @param screenSize expects a string; "SMALL", "MEDIUM", "LARGE" or "XLARGE"
	 */
	function addButtonImages(screenSize)
	{
		 mosync.resource.loadImage("./img/Menu/"+ screenSize + "/quick play.png", "img", function(imageID, imageHandle){
			 	_quickPlayButton.setProperty("backgroundImage", imageHandle);
	        });
		 
		 mosync.resource.loadImage("./img/Menu/" + screenSize + "/play.png", "PlayButtonImage", function(imageID, imageHandle){
	            _playButton.setProperty("backgroundImage", imageHandle);
	        });
		 
		 mosync.resource.loadImage("./img/Menu/" + screenSize + "/settings.png", "SettingsButtonImage", function(imageID, imageHandle){
	            _settingsButton.setProperty("backgroundImage", imageHandle);
	        });
		 
		 mosync.resource.loadImage("./img/Menu/" + screenSize + "/about.png", "AboutButtonImage", function(imageID, imageHandle){
	            _aboutButton.setProperty("backgroundImage", imageHandle);
	        });
		 
		 mosync.resource.loadImage("./img/Menu/" + screenSize + "/help.png", "HelpButtonImage", function(imageID, imageHandle){
	            _helpButton.setProperty("backgroundImage", imageHandle);
	        });
	}
	
	function createFirstButtonRow()
	{
		// create the horizontal layout that will contain the quick play and play buttons
		var _firstHorizontalLayout = mosync.nativeui.create("HorizontalLayout", "firstHorizontalLayout",
		{
			"width": "100%",
			"height": Math.floor(_buttonWidth) + _labelHeight // the height of the horizontal layout = the height of a button + the height of the label
		});

		var buttonSeparatorLayoutName = "buttonSeparatorHorizontalLayout1";
		addSeparatorToLayout(buttonSeparatorLayoutName, "firstHorizontalLayout", Math.floor(_separatorWidth), "100%");
	
		// create the quick play layout, button and label
		createQuickPlayLayout("firstHorizontalLayout");		
		
		buttonSeparatorLayoutName = "buttonSeparatorHorizontalLayout2";
		addSeparatorToLayout(buttonSeparatorLayoutName, "firstHorizontalLayout", Math.floor(_separatorWidth), "100%");
		
		// create the play layout, button and label
		createPlayLayout("firstHorizontalLayout");
		
		buttonSeparatorLayoutName = "buttonSeparatorHorizontalLayout3";
		addSeparatorToLayout(buttonSeparatorLayoutName, "firstHorizontalLayout", Math.floor(_separatorWidth), "100%");
		
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
			"width": Math.floor(_buttonWidth),
			"height": Math.floor(_buttonWidth)
		});
		_quickPlayLabel = mosync.nativeui.create("Label", "quickPlayLabel",
		{
			"width": Math.floor(_buttonWidth),
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
			"width": Math.floor(_buttonWidth),
			"height": Math.floor(_buttonWidth)
		});
		_playLabel = mosync.nativeui.create("Label", "playLabel",
		{
			"width": Math.floor(_buttonWidth),
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
			"height": Math.floor(_buttonWidth) + _labelHeight// the height of the horizontal layout = the height of a button
		});
		
		var buttonSeparatorLayoutName = "buttonSeparatorHorizontalLayout4";
		addSeparatorToLayout(buttonSeparatorLayoutName, "secondHorizontalLayout", Math.floor(_separatorWidth), "100%");
		
		// create the settings layout, button and label
		createSettingsLayout("secondHorizontalLayout");		
		
		buttonSeparatorLayoutName = "buttonSeparatorHorizontalLayout5";
		addSeparatorToLayout(buttonSeparatorLayoutName, "secondHorizontalLayout", Math.floor(_separatorWidth), "100%");
		
		// create the achievements layout, button and label
		createAchievementsLayout("secondHorizontalLayout");
		
		buttonSeparatorLayoutName = "buttonSeparatorHorizontalLayout6";
		addSeparatorToLayout(buttonSeparatorLayoutName, "secondHorizontalLayout", Math.floor(_separatorWidth), "100%");
		
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
			"width": Math.floor(_buttonWidth),
			"height": Math.floor(_buttonWidth)
		});
		_settingsLabel = mosync.nativeui.create("Label", "settingsLabel",
		{
			"width": Math.floor(_buttonWidth),
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
			"width": Math.floor(_buttonWidth),
			"height": Math.floor(_buttonWidth)
		});
		_achievementsLabel = mosync.nativeui.create("Label", "achievementsLabel",
		{
			"width": Math.floor(_buttonWidth),
			"textHorizontalAlignment": "center"
		});
		
		_achievementsButton.addTo("aVerticalLayout");
		_achievementsLabel.addTo("aVerticalLayout");
		_aVerticalLayout.addTo(parentLayoutName);
	}
	
	/**  	
	 * Creates and adds a separator layout to a parent layout.
	 * @param separatorName The name of the separator layout.
	 * @param layoutName The name of the parent layout.
	 * @param separatorWidth The separator width.
	 * @param separatorHeight The separator height.
	 */
	function addSeparatorToLayout(separatorName, layoutName, separatorWidth, separatorHeight)
	{
		var separator = mosync.nativeui.create("HorizontalLayout", separatorName,
		{
			"width": separatorWidth,
			"height": separatorHeight
		});
		
		separator.addTo(layoutName);
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