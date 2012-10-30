/**
 * @brief The game language view controller handles the game language screen which presents the
 * 		  available languages for the selected category
 * @param pushScreenCallback A callback the announces the main menu view controller that the 
 *        loading of the screen is done.
 */
function GameLanguageViewController(pushScreenCallback)
{
	// the selected category for the quick game
	var _selectedCategory = null;
	// the quick game controller
	var _quickGameController;

	// this is the game language screen, initialized with the application title and
	// the button pressed callback
	var _gameLanguageView = new GameLanguageView(function(language)
	{
		loadingScreen.show();
		_quickGameController = new QuickGameViewController(language, function()
		{
			_quickGameController.pushScreen();
			showMainStackScreen();
		});
	});
	
	// loads the localization data onto the screen widgets
	loadScreen();
	
	/**
	 * Reads the screen language data from xml and shows the screen.
	 */
	function loadScreen()
	{
		readGameLanguageScreenLanguageFile(function ()
		{
			updateUI();
			readAllCategories(function(categories)
			{
				// select a random category
				var randomIndex = Math.floor(Math.random() * categories.length);
				_selectedCategory = categories[randomIndex];
				
				readCategoryLanguages(_selectedCategory, function(languages)
				{
					_gameLanguageView.createLanguagesList(languages, function()
					{
						pushScreenCallback();
					});
				});
			});
		});
	}
	
	/**
	 * Updates the UI with the localization texts.
	 */
	function updateUI()
	{
		_gameLanguageView.setScreenTitle(gameLanguageScreenText.title);
	}
	
	/**
	 * Pushes the game screen into the main stack screen.
	 */
	this.pushScreen = function()
	{
		_gameLanguageView.getScreen().pushTo(mainStackScreen);
	};
	
	/**
	 * Shows the main stack screen/
	 */
	function showMainStackScreen()
	{
		var stackScreen = document.getNativeElementById(mainStackScreen);
		stackScreen.show();
	}
}