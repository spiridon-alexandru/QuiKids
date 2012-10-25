function GameView(gameObj, tileClickCallback)
{
	var _gameObj = gameObj;
	var _screen;
	var _mainVerticalLayout;
	var _titleLabel;
	var _scoreLabel;
	var _questionLabel;

	var _borderGreen = "./img/Borders/MEDIUM/green.png";
	var _borderRed = "./img/Borders/MEDIUM/red.png";
	var _borderBlue = "./img/Borders/MEDIUM/blue.png";

	// keeps a mapping between a button and its tile text
	var _buttons = [];
	var _buttonToTileMap = new Object();
	
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
		
		// create the title label
		_titleLabel = mosync.nativeui.create("Label", "gameScreenTitleLabel",
		{
			"width": "100%",
			"fontSize": 60,
			"textHorizontalAlignment": "center"
		});
		
		_titleLabel.addTo("gameMainLayout");
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
			"fontSize": 20,
			"textHorizontalAlignment": "left",
			"textVerticalAlignment" : "center",
			"text" : "Score:"
		});

		_scoreLabel.addTo("gameMainLayout");

		createTileUI();

		// create the question
		// the question label height will be 80% of (screenHeight - total title height)
		var qLabelHeight = (screenHeight - width * _gameObj.getNrOfTilesY()) * (4/5);
		_questionLabel = mosync.nativeui.create("Label", "questionLabel",
		{
			"width": "100%",
			"height": Math.floor(height),
			"fontSize": 20,
			"textHorizontalAlignment": "center",
			"textVerticalAlignment" : "center"
		});
		_questionLabel.addTo("gameMainLayout");
	}
	
	function createTileUI()
	{
		var index = 0;

		// the separator width/height = 5% from min(screenWidth,screenHeight) * (number_of_horizontal_tiles + 1)
		var separatorSize = ((screenWidth<screenHeight?screenWidth:screenHeight) * (5/100)) / (_gameObj.getNrOfTilesX() + 1);
		
		var separatorHorizontalLayoutName = "firstSeparatorHorizontalLayout";	  	
		addSeparatorToLayout(separatorHorizontalLayoutName, "gameMainLayout", "100%", Math.floor(separatorSize));
			
		for (var i = 0; i < _gameObj.getNrOfTilesX(); i++)
		{
			var horizontalLayoutName = "horizontalLayout" + i;
			addLayout(horizontalLayoutName, "gameMainLayout", "100%", "100%");
			
			// add a separator layout before tiles
			var tileSeparatorHorizontalLayoutName = "firstTitleSeparatorHorizontalLayout" + i;
			addSeparatorToLayout(tileSeparatorHorizontalLayoutName, horizontalLayoutName, Math.floor(separatorSize), "100%");

			// the tile width/height = 95% from min(screenWidth,screenHeight) * number_of_horizontal_tiles
			var width = ((screenWidth<screenHeight?screenWidth:screenHeight) * (95/100)) / _gameObj.getNrOfTilesX();
			var height = width;
			
			for (var j = 0; j < _gameObj.getNrOfTilesY(); j++)
			{
				var tileButtonName = _gameObj.getQuestion(index).getQuestionId();
				addTileButton(tileButtonName, horizontalLayoutName, width, height, _borderBlue, _gameObj.getQuestion(index).getImagePathMedium());
				index++;
				
				var tileSeparatorHorizontalLayoutName = "titleSeparatorHorizontalLayout" + i + j;
				addSeparatorToLayout(tileSeparatorHorizontalLayoutName, horizontalLayoutName, Math.floor(separatorSize), "100%");
			}
			
			// add a separator layout
			var separatorHorizontalLayoutName = "separatorHorizontalLayout" + i;	
			addSeparatorToLayout(separatorHorizontalLayoutName, "gameMainLayout", "100%", Math.floor(separatorSize));
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
	function addTileButton(buttonName, parentLayoutName, buttonWidth, buttonHeight, borderPath, imagePath)
	{
		var tileButton = mosync.nativeui.create("ImageButton", buttonName,
			{
				"width": Math.floor(buttonWidth),
				"height": Math.floor(buttonHeight)
			});

		var imageID1 = buttonName + "fg";
		mosync.resource.loadImage(imagePath, imageID1, function(imageID, imageHandle){
			 tileButton.setProperty("backgroundImage", imageHandle);});

		var imageID2 = buttonName + "bg";
		mosync.resource.loadImage(borderPath, imageID2, function(imageID, imageHandle){
			 tileButton.setProperty("image", imageHandle);});

		var buttonIndex = _buttons.length;
		_buttons[buttonIndex] = tileButton;
		_buttonToTileMap[buttonIndex] = buttonName;
		
		_buttons[buttonIndex].addEventListener("Clicked", function()
			{
				tileClickCallback(getButtonTileNumber(buttonIndex));
			});
		_buttons[buttonIndex].addTo(parentLayoutName);
	}

	/**
	 * Returns the tile text of a tile button
	 * @param button The button of interest.
	 * @returns The tile text of the button.
	 */
	function getButtonTileNumber(buttonIndex) 
	{
	    return _buttonToTileMap[buttonIndex];
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
		_titleLabel.setProperty("text", title);
	};
	
	/**
	 * Sets the current question text.
	 */
	this.setQuestionText = function(questionText)
	{
		_questionLabel.setProperty("text", questionText);
	};

	this.setGreenBorder = function(buttonIndex)
	{
		var button = _buttons[buttonIndex];
		var imageID = buttonIndex + "bg";
		mosync.resource.loadImage(_borderGreen, imageID, function(imageID, imageHandle){
			button.setProperty("image", imageHandle);});
	};

	this.setRedBorder = function(buttonIndex)
	{
		var button = _buttons[buttonIndex];
		var imageID = buttonIndex + "bg";
		mosync.resource.loadImage(_borderRed, imageID, function(imageID, imageHandle){
			button.setProperty("image", imageHandle);});
	};

	this.setBlueBorder = function(buttonIndex)
	{
		var button = _buttons[buttonIndex];
		var imageID = buttonIndex + "bg";
		mosync.resource.loadImage(_borderBlue, imageID, function(imageID, imageHandle){
			button.setProperty("image", imageHandle);});
	};

	this.updateScoreValue = function(value)
	{
		_scoreLabel.setProperty("text", "Score: " + value);
	};
};