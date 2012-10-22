function GameView(gameObj, tileClickCallback)
{
	var _screen;
	var _mainVerticalLayout;
	var _titleLabel;
	var _questionLabel;
	
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
			"height": "100%"
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
		
		createTileUI();
		
		// create the question
		_questionLabel = mosync.nativeui.create("Label", "questionLabel",
		{
			"width": "100%",
			"text": "What is the number of the button you will click?",
			"fontSize": 20,
			"textHorizontalAlignment": "center"
		});
		_questionLabel.addTo("gameMainLayout");
	}
	
	function createTileUI()
	{	
		var nrTiles = 3;
		
		for (var i = 0; i < nrTiles; i++)
		{
			var horizontalLayoutName = "horizontalLayout" + i;
			addLayout(horizontalLayoutName, "gameMainLayout", "100%", "100%");
			
			for (var j = 0; j < nrTiles; j++)
			{
				var tileButtonName = "" + i + j;
				addTileButton(tileButtonName, horizontalLayoutName, "100%", "100%");
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
	function addTileButton(buttonName, parentLayoutName, buttonWidth, buttonHeight)
	{
		var tileButton = mosync.nativeui.create("Button", buttonName,
			{
				"width": buttonWidth,
				"height": buttonHeight
			});

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
}