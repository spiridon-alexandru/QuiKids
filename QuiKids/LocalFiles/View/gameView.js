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
		
		var width = mosync.nativeui.screenWidth / 3.3;
		var height =  (mosync.nativeui.screenHeight - width * _gameObj.getNrOfTilesY()) / 3;

		_scoreLabel = mosync.nativeui.create("Label", "scoreLabel",
		{
			"width": mosync.nativeui.screenWidth,
			"height": height,
			"fontSize": 20,
			"textHorizontalAlignment": "left",
			"textVerticalAlignment" : "center",
			"text" : "Score:"
		});

		_scoreLabel.addTo("gameMainLayout");

		createTileUI();

		// create the question
		_questionLabel = mosync.nativeui.create("Label", "questionLabel",
		{
			"width": "100%",
			"height": height,
			"fontSize": 20,
			"textHorizontalAlignment": "center",
			"textVerticalAlignment" : "center"
		});
		_questionLabel.addTo("gameMainLayout");
	}
	
	function createTileUI()
	{
		var index = 0;
		for (var i = 0; i < _gameObj.getNrOfTilesX(); i++)
		{
			var horizontalLayoutName = "horizontalLayout" + i;
			addLayout(horizontalLayoutName, "gameMainLayout", "100%", "100%");

			var width = mosync.nativeui.screenWidth / 3.3;
			var height = width;
			
			for (var j = 0; j < _gameObj.getNrOfTilesY(); j++)
			{
				var tileButtonName = _gameObj.getQuestion(index).getQuestionId();
				addTileButton(tileButtonName, horizontalLayoutName, width, height, _borderBlue, _gameObj.getQuestion(index).getImagePathMedium());
				index++;
			}
		}
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
			"width": layoutWidth,
			"height": layoutHeight
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
				"width": buttonWidth,
				"height": buttonHeight
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