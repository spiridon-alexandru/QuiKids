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

	var _titleFontSize;
	var _textFontSize;

	// keeps a mapping between a button and its tile text
	var _buttons = [];
	var _buttonToTileMap = new Object();

	//0 if the button is not clicked 1 otherwise
	var buttonClickedCharacteristicArray = [];
	
	createUI();

	/**
	 * Creates the UI of the quick game.
	 */
	function createUI()
	{
		// create the screen
		_screen = mosync.nativeui.create("Screen", "gameScreen",
		{
		});

		// create the main screen layout
		_mainVerticalLayout = mosync.nativeui.create("VerticalLayout", "gameMainLayout",
		{
			"width": "100%",
			"height": "100%",
			"childHorizontalAlignment" : "center"
		});

		_titleFontSize = 60;
		_textFontSize = 20;
		if(isIPhoneOS)
		{
			_titleFontSize = 25;
			_textFontSize = 15;
		}

		// create the title label
		if(!isIPhoneOS)
		{
			_titleLabel = mosync.nativeui.create("Label", "gameScreenTitleLabel",
			{
				"width": "100%",
				"fontSize": _titleFontSize,
				"textHorizontalAlignment": "center"
			});
	
			_titleLabel.addTo("gameMainLayout");
		}
		_mainVerticalLayout.addTo("gameScreen");

		// the width (the same with height) of a tile will be the minimum between height/width divided
		// by the number of tiles horizontally
		var width = (screenWidth<screenHeight?screenWidth:screenHeight) / _gameObj.getNrOfTilesX();
		// the height of the score label will be 20% of (screenHeight - total title height)
		var height = (screenHeight - width * _gameObj.getNrOfTilesY()) * (1/5);

		_scoreLabel = mosync.nativeui.create("Label", "scoreLabel",
		{
			"width": Math.floor(screenWidth),
			"height": Math.floor(height),
			"fontSize": _textFontSize,
			"textHorizontalAlignment": "left",
			"textVerticalAlignment" : "center",
			"text" : "Score:"
		});

		_scoreLabel.addTo("gameMainLayout");

		createTileUI();

		// create the question
		// the question label height will be 80% of (screenHeight - total title height)
		var qLabelHeight = (screenHeight - width * _gameObj.getNrOfTilesY()) * (4/5); //water fuck is this???? not used
		_questionLabel = mosync.nativeui.create("Label", "questionLabel",
		{
			"width": "100%",
			"height": Math.floor(height),
			"fontSize": _textFontSize,
			"textHorizontalAlignment": "center",
			"textVerticalAlignment" : "center"
		});
		_questionLabel.addTo("gameMainLayout");
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

				switch (screenType) {
				case SMALL_SCREEN:
					_completedCard = "./img/Completed/SMALL/back.png";
					_borderRed = "./img/Borders/SMALL/red.png";
					_borderGreen = "./img/Borders/SMALL/green.png";
					_borderDefault = "./img/Borders/SMALL/default.png";
					addTileButton(tileButtonName, horizontalLayoutName, tileWidth, tileHeight, Math.floor(separatorSize), _borderDefault, _gameObj.getQuestion(index).getImagePathSmall());
					break;
				case MEDIUM_SCREEN:
					_completedCard = "./img/Completed/MEDIUM/back.png";
					_borderRed = "./img/Borders/MEDIUM/red.png";
					_borderGreen = "./img/Borders/MEDIUM/green.png";
					_borderDefault = "./img/Borders/MEDIUM/default.png";
					addTileButton(tileButtonName, horizontalLayoutName, tileWidth, tileHeight, Math.floor(separatorSize), _borderDefault, _gameObj.getQuestion(index).getImagePathMedium());
					break;
				case LARGE_SCREEN:
					_completedCard = "./img/Completed/LARGE/back.png";
					_borderRed = "./img/Borders/LARGE/red.png";
					_borderGreen = "./img/Borders/LARGE/green.png";
					_borderDefault = "./img/Borders/LARGE/default.png";
					addTileButton(tileButtonName, horizontalLayoutName, tileWidth, tileHeight, Math.floor(separatorSize), _borderDefault, _gameObj.getQuestion(index).getImagePathLarge());
					break;
				default:
					_completedCard = "./img/Completed/XLARGE/back.png";
					_borderRed = "./img/Borders/XLARGE/red.png";
					_borderGreen = "./img/Borders/XLARGE/green.png";
					_borderDefault = "./img/Borders/XLARGE/default.png";
					addTileButton(tileButtonName, horizontalLayoutName, tileWidth, tileHeight, Math.floor(separatorSize), _borderDefault, _gameObj.getQuestion(index).getImagePathXLarge());
					break;
				}

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
		buttonClickedCharacteristicArray[buttonName] = 0;
		var buttonParentName = "tileButtonParent" + buttonName;
		var tileButtonParent = mosync.nativeui.create("RelativeLayout", buttonParentName, 
		{
			"width" : Math.floor(buttonWidth) + spacerRight,
			"height" : Math.floor(buttonHeight)
		});
		
		if(isWindowsPhone7)
		{
			var heightWP7 = Math.floor(buttonHeight) - 18;
			var widthWP7 = Math.floor(buttonWidth) - 18;
			
			var tileImage = mosync.nativeui.create("Image", "tileImage" + buttonName,
			{
				"top" : 10,
				"left" : 10,
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
				if(0 == buttonClickedCharacteristicArray[buttonName])
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
		
		//setGreenBorder(buttonIndex);
		var interval = setInterval(function()
			{
				//setBlueBorder(buttonIndex);
				
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
		buttonClickedCharacteristicArray[button] = 1;
	}
};