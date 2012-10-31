function GameLanguageView (languageClickedCallback)
{
	var _screen;
	var _mainVerticalLayout;
	var _titleLabel;
	var _languagesListView;
	// the height/width of a button
	var _buttonWidth;
	// the height/width of the separator layout
	var _separatorSize;
	
	// keeps a mapping between a button and its tile text
	var _buttons = [];
	var _buttonToTileMap = new Object();
	
	// used to announce the language controller that all the images have
	// been loaded and the screen can be shown
	var listCreatedCallback;
	var languageImagesToLoad;
	
	createUI();

	/**
	 * Creates the UI of the quick game.
	 */
	function createUI()
	{
		// button width = 90% of the min(screenWidth,screenHeight) / 2
		_buttonWidth = Math.floor(((screenWidth<screenHeight?screenWidth:screenHeight) * (90/100)) / 2);
		// separator size (height/width) = 10% of the min(screenWidth,screenHeight) / 2
		_separatorSize = Math.floor(((screenWidth<screenHeight?screenWidth:screenHeight) * (10/100)) / 3);
		
		// create the screen
		_screen = mosync.nativeui.create("Screen", "gameLanguageScreen",
		{
		});
		
		createScreenLayouts();
		
		// create the title label
		if(!isIPhoneOS)
		{
			_titleLabel = mosync.nativeui.create("Label", "gameLanguageScreenTitleLabel",
			{
				"width": "100%",
				"fontSize": fontSizeTitle,
				"textHorizontalAlignment": "center",
				"fontColor" : gameViewFontColor
			});
	
			_titleLabel.addTo("gameLanguageMainLayout");
		}
	}
	
	/**
	 * Creates the layouts of the game language screen and adds a background image.
	 */
	function createScreenLayouts()
	{
		// create the main screen layout
		_mainVerticalLayout = mosync.nativeui.create("VerticalLayout", "gameLanguageMainLayout",
		{
			"width": screenWidth,
			"height": screenHeight,
			"childHorizontalAlignment" : "center"
		});
		
		var gameLanguageScreenParentLayout = mosync.nativeui.create("RelativeLayout", "gameLanguageScreenParentLayout",
		{
			"width" : screenWidth,
			"height" : screenHeight
		});
		
		gameLanguageScreenParentLayout.addTo("gameLanguageScreen");
	
		addBackgroundImage();
	}
	
	/**
	 * Adds a background image to the main vertical layout.
	 */
	function addBackgroundImage()
	{
		var backgroundPath;
		
		switch (screenType) {
		case SMALL_SCREEN:
			backgroundPath = "./img/Background/SMALL/menuBackground.png";
			break;
		case MEDIUM_SCREEN:
			backgroundPath = "./img/Background/MEDIUM/menuBackground.png";
			break;
		case LARGE_SCREEN:
			backgroundPath = "./img/Background/LARGE/menuBackground.png";
			break;
		default:
			backgroundPath = "./img/Background/XLARGE/menuBackground.png";
			break;
		}

		var backgroundImage = mosync.nativeui.create("Image", "gameLanguageViewBackgroundImg",
		{
			"top" : 0,
			"left" : 0,
			"width" : screenWidth,
			"height" : screenHeight
		});
		
		var imageID = "backgroundImageGameLanguageScreen";
		mosync.resource.loadImage(backgroundPath, imageID, function(imageID, imageHandle){
			backgroundImage.setProperty("image", imageHandle);
			backgroundImage.addTo("gameLanguageScreenParentLayout", function()
			{
				_mainVerticalLayout.addTo("gameLanguageScreenParentLayout");
			});
		});
	}
	
	/**
	 * Adds a button to a parent layout.
	 * @param buttonName The button name.
	 * @param parentName The parent name.
	 */
	function addButtonToParent(buttonName, parentName)
	{
		var button = mosync.nativeui.create("ImageButton", buttonName,
		{
			"width": _buttonWidth,
			"height": _buttonWidth
		});

		var buttonIndex = _buttons.length;
		_buttons[buttonIndex] = button;
		_buttonToTileMap[buttonIndex] = buttonName;
		
		addImageToButton(button, buttonName);

		_buttons[buttonIndex].addEventListener("Clicked", function()
		{
			languageClickedCallback(_buttonToTileMap[buttonIndex]);
		});
		
		button.addTo(parentName);
	}
	
	/**
	 * Adds the background image for a image button.
	 * @param button The image button.
	 * @param imageName The name of the image file (without extension).
	 */
	function addImageToButton(button, imageName)
	{
		var imageID = imageName;
		var imagePath = "./img/Languages/";
		switch (screenType) {
		case SMALL_SCREEN:
			imagePath += "SMALL/";
			break;
		case MEDIUM_SCREEN:
			imagePath += "MEDIUM/";
			break;
		case LARGE_SCREEN:
			imagePath += "LARGE/";
			break;
		default:
			imagePath += "XLARGE/";
			break;
		}
		imagePath += imageName.toLowerCase() + ".png";
		
		mosync.resource.loadImage(imagePath, imageID, function(imageID, imageHandle){
			button.setProperty("backgroundImage", imageHandle);
			languageImagesToLoad--;
			if (languageImagesToLoad == 0)
			{
				// all the images have been loaded
				listCreatedCallback();
			}
		});
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
	 * @brief Creates the categories list view.
	 */
	this.createLanguagesList = function (languages, successCallback)
	{
		listCreatedCallback = successCallback;
		languageImagesToLoad = languages.length;
		
		_languagesHorizontalLayout = mosync.nativeui.create("VerticalLayout", "languagesScrollableVerticalLayout",
		{
			"height" : "100%",
			"width" : "100%",
			"scrollable": "true"
		});
		
		// we need to add two language buttons per line
		for (var i = 0; i < languages.length; i+=2)
		{	
			var listItemHorizontalLayoutName = "languageHorizontalLayout" + i;
			var listItemHorizontalLayout = mosync.nativeui.create("HorizontalLayout", listItemHorizontalLayoutName,
			{
				"height" : _buttonWidth,
				"width" : "100%"
			});
			listItemHorizontalLayout.addTo("languagesScrollableVerticalLayout");	
			
			var separatorLayoutName = "firstHorizontalLayoutSeparator" + i;
			addSeparatorToLayout(separatorLayoutName, listItemHorizontalLayoutName, _separatorSize, "100%");
				
			var buttonName = languages[i];
			addButtonToParent(buttonName, listItemHorizontalLayoutName);
			
			separatorLayoutName = "secondHorizontalLayoutSeparator" + i;
			addSeparatorToLayout(separatorLayoutName, listItemHorizontalLayoutName, _separatorSize, "100%");
					
			// if we can add another button on the same line
			if (i + 1 < languages.length)
			{
				var secondButtonName = languages[i+1];
				addButtonToParent(secondButtonName, listItemHorizontalLayoutName);
				
				separatorLayoutName = "thirdHorizontalLayoutSeparator" + i;
				addSeparatorToLayout(separatorLayoutName, listItemHorizontalLayoutName, _separatorSize, "100%");
			}
		}
		
		_languagesHorizontalLayout.addTo("gameLanguageMainLayout");
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
	
	/**
	 * @brief Sets the game language screen title.
	 */
	this.setScreenTitle = function(title)
	{
		_titleLabel.setProperty("text", title);
	};
};