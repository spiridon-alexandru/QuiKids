function GameView(title, gameObj)
{
	var _screen;
	var _mainVerticalLayout;
	var _titleLabel;
	var _title = title;
	
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
			"text": _title,
			"fontSize": 60,
			"textHorizontalAlignment": "center"
		});
		
		_titleLabel.addTo("gameMainLayout");
		_mainVerticalLayout.addTo("gameScreen");
		
		createTileUI();
	}
	
	function createTileUI()
	{	
		var nrTiles = 6;
		var backgroundColors = ["0xFF0000", "0x00FF00", "0x0000FF", "0xFF0000", "0x00FF00", "0x0000FF"];
		
		// add a separator layout before everything
		var separatorHorizontalLayoutName = "firstSeparatorHorizontalLayout";
		//addSeparatorToLayout(separatorHorizontalLayoutName, "gameMainLayout", "100%", "20");
		
		for (var i = 0; i < nrTiles; i++)
		{
			var horizontalLayoutName = "horizontalLayout" + i;
			addLayout(horizontalLayoutName, "gameMainLayout", "100%", "100%", null);
			// add a separator layout before tiles
			var tileSeparatorHorizontalLayoutName = "firstTitleSeparatorHorizontalLayout" + i;
		//	addSeparatorToLayout(tileSeparatorHorizontalLayoutName, horizontalLayoutName, "10", "100%");
			
			for (var j = 0; j < nrTiles; j++)
			{
				var tileLayoutName = "tile" + i + j;
				addLayout(tileLayoutName, horizontalLayoutName, "100%", "100%", backgroundColors[j]);
				var tileSeparatorHorizontalLayoutName = "titleSeparatorHorizontalLayout" + i + j;
		//		addSeparatorToLayout(tileSeparatorHorizontalLayoutName, horizontalLayoutName, "10", "100%");
			}
			
			// add a separator layout
			var separatorHorizontalLayoutName = "separatorHorizontalLayout" + i;
		//	addSeparatorToLayout(separatorHorizontalLayoutName, "gameMainLayout", "100%", "20");
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
	/*	var separator = mosync.nativeui.create("HorizontalLayout", separatorName,
		{
			"width": separatorWidth,
			"height": separatorHeight
		});
		separator.addTo(layoutName);*/
	}
	
	/**
	 * Creates and adds a layout to a parent layout.
	 * @param layoutName The name of the layout to be added.
	 * @param parentLayoutName The name of the parent layout.
	 * @param layoutWidth The layout to be added width.
	 * @param layoutHeight The layout to be added height.
	 */
	// TODO SA: remove layout color
	function addLayout(layoutName, parentLayoutName, layoutWidth, layoutHeight, layoutColor)
	{
		var layout;
		if (layoutColor !== null)
		{
			layout = mosync.nativeui.create("Button", layoutName,
			{
				"width": layoutWidth,
				"height": layoutHeight,
				"backgroundColor": layoutColor
			});
		}
		else
		{
			layout = mosync.nativeui.create("HorizontalLayout", layoutName,
			{
				"width": layoutWidth,
				"height": layoutHeight
			});
		}

		layout.addTo(parentLayoutName);
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
}