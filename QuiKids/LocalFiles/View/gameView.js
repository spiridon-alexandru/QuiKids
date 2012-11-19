function GameView(gameObj, tileClickCallback)
{
	var _gameObj = gameObj;
	var _screen;
	var _mainVerticalLayout;
	var _titleLabel;
	var _scoreLabel;
	var _questionLabel;

	var _borderGreen;
	var _borderRed;
	var _borderDefault;
	var _completedCard;

	// keeps a mapping between a button and its tile text
	var _buttons = [];
	var _buttonToTileMap = new Object();

	//0 if the button is not clicked 1 otherwise
	var _buttonClickedCharacteristicArray = [];
	
	// variables related to the view resources
	var _borderImagesDirName = "Borders";
	var _completedImagesDirName = "Completed";
	var _gameScreenBackgroundImageName = "background.png";
	var _defaultBorderImageName = "default.png";
	var _wrongAnswerBorderImageName = "red.png";
	var _correctAnswerBorderImageName = "green.png";
	var _answeredTileBorderImageName = "back.png";
	
	// variables related to specific platforms
	var _iosLabelFontColor = "0XFFFFFF";
	var _iosLabelBackgroundColor = "0X00000000";
	
	/**
	 * Creates the UI of the quick game.
	 */
	this.createUI = function()
	{
		// create the screen
		_screen = mosync.nativeui.create("Screen", "gameScreen",
		{
		});

		var parentLayout = mosync.nativeui.create("RelativeLayout", "parentLayout",
		{
			"width" : screenWidth,
			"height" : screenHeight
		});
		
		parentLayout.addTo("gameScreen");
		
		// create the main screen layout
		_mainVerticalLayout = mosync.nativeui.create("VerticalLayout", "gameMainLayout",
		{
			"width": screenWidth,
			"height": screenHeight,
			"childHorizontalAlignment" : "center"
		});

		var backgroundPath = getBackgroundImagePath();

		var backgroundImage = mosync.nativeui.create("Image", "gameViewBackgroundImg",
		{
			"top" : 0,
			"left" : 0,
			"width" : screenWidth,
			"height" : screenHeight
		});
		
		var imageID = "backgroundImageGameScreen";
		mosync.resource.loadImage(backgroundPath, imageID, function(imageID, imageHandle){
			backgroundImage.setProperty("image", imageHandle);
			backgroundImage.addTo("parentLayout", function()
			{
				_mainVerticalLayout.addTo("parentLayout");
			});
		});

		// create the title label
		if(!isIPhoneOS)
		{
			_titleLabel = mosync.nativeui.create("Label", "gameScreenTitleLabel",
			{
				"width": "100%",
				"fontSize": fontSizeTitle,
				"textHorizontalAlignment": "center",
				"fontColor" : gameViewFontColor
			});
	
			_titleLabel.addTo("gameMainLayout");
		}

		// the width (the same with height) of a tile will be the minimum between height/width divided
		// by the number of tiles horizontally
		var width = (screenWidth<screenHeight?screenWidth:screenHeight) / _gameObj.getNrOfTilesX();
		// the height of the score label will be 20% of (screenHeight - total title height)
		var height = (screenHeight - width * _gameObj.getNrOfTilesY()) * (1/5);

		_scoreLabel = mosync.nativeui.create("Label", "scoreLabel",
		{
			"width": Math.floor(screenWidth),
			"height": Math.floor(height),
			"fontSize": fontSizeScreen,
			"textHorizontalAlignment": "left",
			"textVerticalAlignment" : "center",
			"text" : "Score:",
			"fontColor" : gameViewFontColor
		});
		

		_scoreLabel.addTo("gameMainLayout");

		createTileUI();

		// create the question
		// the question label height will be 80% of (screenHeight - total title height)
		_questionLabel = mosync.nativeui.create("Label", "questionLabel",
		{
			"width": "100%",
			"height": Math.floor(height),
			"fontSize": fontSizeQuestion,
			"textHorizontalAlignment": "center",
			"textVerticalAlignment" : "center",
			"fontColor" : gameViewFontColor
		});
		_questionLabel.addTo("gameMainLayout");
		
		if(isIPhoneOS)
		{
			_scoreLabel.setProperty("fontColor", _iosLabelFontColor);
			_scoreLabel.setProperty("backgroundColor", _iosLabelBackgroundColor);
			_questionLabel.setProperty("fontColor", _iosLabelFontColor);
			_questionLabel.setProperty("backgroundColor", _iosLabelBackgroundColor);
		}
	}
	
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
	
	/**
	 * Sets the title of the screen.
	 */
	this.setQuickPlayScreenTitle = function(title)
	{
		if(!isIPhoneOS) _titleLabel.setProperty("text", title);
		else _screen.setProperty("title", title);
	};
	
	/**
	 * Sets the current question text.
	 */
	this.setQuestionText = function(questionText)
	{
		_questionLabel.setProperty("text", questionText);
	};

	this.setCompleted = function(buttonIndex)
	{
		var button = _buttons[buttonIndex];

		this.setGreenBorder(buttonIndex);
		var interval = setInterval(function()
			{
				var imageID = buttonIndex + "bgcompleted";
				mosync.resource.loadImage(_completedCard, imageID, function(imageID, imageHandle){
					button.setProperty("backgroundImage", imageHandle);});
				clearInterval(interval);
			}, 500);
	};

	this.setGreenBorder = function(buttonIndex)
	{
		var button = _buttons[buttonIndex];
		var imageID = buttonIndex + "bg";
		mosync.resource.loadImage(_borderGreen, imageID, function(imageID, imageHandle){
			button.setProperty("backgroundImage", imageHandle);});
	}
	
	this.setRedBorder = function(buttonIndex)
	{
		var button = _buttons[buttonIndex];
		var imageID = buttonIndex + "bg";
		mosync.resource.loadImage(_borderRed, imageID, function(imageID, imageHandle){
			button.setProperty("backgroundImage", imageHandle);});
	};

	this.setBlueBorder = function(buttonIndex)
	{
		var button = _buttons[buttonIndex];
		var imageID = buttonIndex + "bg";
		mosync.resource.loadImage(_borderDefault, imageID, function(imageID, imageHandle){
			button.setProperty("backgroundImage", imageHandle);});
	};

	this.updateScoreValue = function(value)
	{
		_scoreLabel.setProperty("text", "Score: " + value);
	};
	
	this.removeClickEvent = function(button)
	{
		_buttonClickedCharacteristicArray[button] = 1;
	}

	function createTileUI()
	{
		var index = 0;

		// the separator width/height = 5% from min(screenWidth,screenHeight) * (number_of_horizontal_tiles + 1)
		var separatorSize = ((screenWidth<screenHeight?screenWidth:screenHeight) * (20/100)) / (_gameObj.getNrOfTilesX() + 1);
		var separatorHeight = ((screenWidth<screenHeight?screenWidth:screenHeight) * (10/100)) / (_gameObj.getNrOfTilesY() + 1);

		var tileParentHeight = Math.floor(screenHeight * (3/5) / _gameObj.getNrOfTilesX());
		var tileParentWidth = screenWidth;

		// the tile width/height = 95% from min(screenWidth,screenHeight) * number_of_horizontal_tiles
		var tileWidth = ((screenWidth<screenHeight?screenWidth:screenHeight) * (80/100)) / _gameObj.getNrOfTilesX();
		var tileHeight = tileWidth;
		
		var separatorHorizontalLayoutName = "firstSeparatorHorizontalLayout";	  	
		addSeparatorToLayout(separatorHorizontalLayoutName, "gameMainLayout", "100%", Math.floor(separatorHeight));

		for (var i = 0; i < _gameObj.getNrOfTilesX(); i++)
		{
			var horizontalLayoutName = "horizontalLayout" + i;
			addLayout(horizontalLayoutName, "gameMainLayout", tileParentWidth, tileParentHeight);

			// add a separator layout before tiles
			var tileSeparatorHorizontalLayoutName = "firstTitleSeparatorHorizontalLayout" + i;
			addSeparatorToLayout(tileSeparatorHorizontalLayoutName, horizontalLayoutName, Math.floor(separatorSize), screenHeight);
			
			for (var j = 0; j < _gameObj.getNrOfTilesY(); j++)
			{
				var tileButtonName = _gameObj.getQuestion(index).getQuestionId();
				
				setTileImagePaths();
				addTileButton(tileButtonName, horizontalLayoutName, tileWidth, tileHeight, Math.floor(separatorSize), _borderDefault, _gameObj.getQuestion(index).getImagePathLarge());

				index++;
			}

			// add a separator layout
			var separatorHorizontalLayoutName = "separatorHorizontalLayout" + i;	
			addSeparatorToLayout(separatorHorizontalLayoutName, "gameMainLayout", "100%", Math.floor(separatorHeight));
		}
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

	/**
	 * Creates and adds a layout to a parent layout.
	 * @param layoutName The name of the layout to be added.
	 * @param parentLayoutName The name of the parent layout.
	 * @param layoutWidth The layout to be added width.
	 * @param layoutHeight The layout to be added height.
	 */
	function addLayout(layoutName, parentLayoutName, layoutWidth, layoutHeight)
	{
		var layout = mosync.nativeui.create("HorizontalLayout", layoutName,
		{
			"width": Math.floor(layoutWidth),
			"height": Math.floor(layoutHeight)
		});

		layout.addTo(parentLayoutName);
	}

	/**
	 * Creates and adds a button tile to a parent layout.
	 * @param buttonName The name of the tile button to be added.
	 * @param parentLayoutName The name of the parent layout.
	 * @param buttonWidth The button width.
	 * @param buttonHeight The button height.
	 */
	function addTileButton(buttonName, parentLayoutName, buttonWidth, buttonHeight, spacerRight, borderPath, imagePath)
	{
		_buttonClickedCharacteristicArray[buttonName] = 0;
		var buttonParentName = "tileButtonParent" + buttonName;
		var tileButtonParent = mosync.nativeui.create("RelativeLayout", buttonParentName, 
		{
			"width" : Math.floor(buttonWidth) + spacerRight,
			"height" : Math.floor(buttonHeight)
		});
		
		if(isWindowsPhone7)
		{
			var heightWP7 = Math.floor(buttonHeight) - 21;
			var widthWP7 = Math.floor(buttonWidth) - 21;
			
			var tileImage = mosync.nativeui.create("Image", "tileImage" + buttonName,
			{
				"top" : 11,
				"left" : 11,
				"width" : widthWP7,
				"height" : heightWP7,
				"scaleMode" : "scaleXY"
			});
		}
		else
		{
			var tileImage = mosync.nativeui.create("Image", "tileImage" + buttonName,
			{
				"width" : Math.floor(buttonWidth),
				"height" : Math.floor(buttonHeight),
				"scaleMode" : "scaleXY"
			});
		}

		var tileButton = mosync.nativeui.create("ImageButton", buttonName,
		{
			"width": Math.floor(buttonWidth),
			"height": Math.floor(buttonHeight)
		});

		var imageID1 = buttonName + "fg";
		mosync.resource.loadImage(imagePath, imageID1, function(imageID, imageHandle){
			 tileImage.setProperty("image", imageHandle);});

		var imageID2 = buttonName + "bg";
		mosync.resource.loadImage(borderPath, imageID2, function(imageID, imageHandle){
			 tileButton.setProperty("backgroundImage", imageHandle);});

		var buttonIndex = _buttons.length;
		_buttons[buttonIndex] = tileButton;
		_buttonToTileMap[buttonIndex] = buttonName;

		_buttons[buttonIndex].addEventListener("Clicked", function()
			{
				if(0 == _buttonClickedCharacteristicArray[buttonName])
				{
					tileClickCallback(buttonName);
				}
			});

		tileImage.addTo(buttonParentName, function()
		{
			_buttons[buttonIndex].addTo(buttonParentName, function()
			{
				tileButtonParent.addTo(parentLayoutName);
			});
		});
	}

	/**
	 * Returns the tile text of a tile button
	 * @param button The button of interest.
	 * @returns The tile text of the button.
	 */
	function getButtonTileNumber(buttonName) 
	{
	    return buttonName;
	}
	
	/**
	 * Returns the game screen background image path based on the screen size.
	 */
	function getBackgroundImagePath()
	{
		var imagePath = "./" + rootImageDir + "/" + backgroundImageDir;
		var backgroundPath;
		switch (screenType) 
		{
			case SMALL_SCREEN:
				backgroundPath = imagePath + "/" + SCREENSIZE.SMALL;
				break;
			case MEDIUM_SCREEN:
				backgroundPath = imagePath + "/" + SCREENSIZE.MEDIUM;
				break;
			case LARGE_SCREEN:
				backgroundPath = imagePath + "/" + SCREENSIZE.LARGE;
				break;
			default:
				backgroundPath = imagePath + "/" + SCREENSIZE.XLARGE;
				break;
		}
		backgroundPath += "/" + _gameScreenBackgroundImageName;
		return backgroundPath;
	}
	
	/**
	 * Sets the image paths for the default tile images: _completedCard (visible after a tile has been answered correctly),
	 * _borderRed (visible right after a wrong answer), 
	 * _borderGreen (visible right after a correct answer but before the _completedCard image is visible)
	 * and _borderDefault (one does not simply explain everything :)).
	 */
	function setTileImagePaths()
	{
		switch (screenType) 
		{
			case SMALL_SCREEN:
				_completedCard = "./" + rootImageDir + "/" + _completedImagesDirName + "/" + 
						SCREENSIZE.SMALL + "/" + _answeredTileBorderImageName;
				_borderRed = "./" + rootImageDir + "/" + _borderImagesDirName + "/" + 
						SCREENSIZE.SMALL + "/" + _wrongAnswerBorderImageName;
				_borderGreen = "./" + rootImageDir + "/" + _borderImagesDirName + "/" + 
						SCREENSIZE.SMALL + "/" + _correctAnswerBorderImageName;
				_borderDefault = "./" + rootImageDir + "/" + _borderImagesDirName + "/" + 
						SCREENSIZE.SMALL + "/" + _defaultBorderImageName;
				break;
			case MEDIUM_SCREEN:
				_completedCard = "./" + rootImageDir + "/" + _completedImagesDirName + "/" + 
						SCREENSIZE.MEDIUM + "/" + _answeredTileBorderImageName;
				_borderRed = "./" + rootImageDir + "/" + _borderImagesDirName + "/" + 
						SCREENSIZE.MEDIUM + "/" + _wrongAnswerBorderImageName;
				_borderGreen = "./" + rootImageDir + "/" + _borderImagesDirName + "/" + 
						SCREENSIZE.MEDIUM + "/" + _correctAnswerBorderImageName;
				_borderDefault = "./" + rootImageDir + "/" + _borderImagesDirName + "/" + 
						SCREENSIZE.MEDIUM + "/" + _defaultBorderImageName;
				break;
			case LARGE_SCREEN:
				_completedCard = "./" + rootImageDir + "/" + _completedImagesDirName + "/" + 
						SCREENSIZE.LARGE + "/" + _answeredTileBorderImageName;
				_borderRed = "./" + rootImageDir + "/" + _borderImagesDirName + "/" + 
						SCREENSIZE.LARGE + "/" + _wrongAnswerBorderImageName;
				_borderGreen = "./" + rootImageDir + "/" + _borderImagesDirName + "/" + 
						SCREENSIZE.LARGE + "/" + _correctAnswerBorderImageName;
				_borderDefault = "./" + rootImageDir + "/" + _borderImagesDirName + "/" + 
						SCREENSIZE.LARGE + "/" + _defaultBorderImageName;
				break;
			default:
				_completedCard = "./" + rootImageDir + "/" + _completedImagesDirName + "/" + 
						SCREENSIZE.XLARGE + "/" + _answeredTileBorderImageName;
				_borderRed = "./" + rootImageDir + "/" + _borderImagesDirName + "/" + 
						SCREENSIZE.XLARGE + "/" + _wrongAnswerBorderImageName;
				_borderGreen = "./" + rootImageDir + "/" + _borderImagesDirName + "/" + 
						SCREENSIZE.XLARGE + "/" + _correctAnswerBorderImageName;
				_borderDefault = "./" + rootImageDir + "/" + _borderImagesDirName + "/" + 
						SCREENSIZE.XLARGE + "/" + _defaultBorderImageName;
				break;
		}
	}
};