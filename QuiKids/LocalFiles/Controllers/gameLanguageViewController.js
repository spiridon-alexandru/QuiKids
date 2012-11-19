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
	var _gameLanguageView;
	
	/**
	 * Initializes the screen and it's dependencies.
	 * Should be called before pushing the screen.
	 */
	this.initUI = function()
	{
		_gameLanguageView = new GameLanguageView(gameViewLoaded);
		_gameLanguageView.createUI();
		
		// loads the localization data onto the screen widgets
		loadScreen();
	}
	
	/**
	 * Pushes the game screen into the main stack screen.
	 */
	this.pushScreen = function()
	{
		_gameLanguageView.getScreen().pushTo(mainStackScreen);
	};
	
	/**
	 * Reads the screen language data from xml and shows the screen.
	 */
	function loadScreen()
	{
		readGameLanguageScreenLanguageFile(gameLanguageScreenLanguageFileRead, gameLanguageScreenLanguageFileReadingFailed);
	}
	
	/**
	 * Gets called when the game language screen file has been read.
	 */
	function gameLanguageScreenLanguageFileRead()
	{
		updateUI();
		readAllCategories(allCategoriesRead, categoriesReadingFailed);
	}
	
	/**
	 * Gets called when the game language screen file reading failed.
	 */
	function gameLanguageScreenLanguageFileReadingFailed(errorString)
	{
		// TODO: handle the error properly
		alert(errorString);
	}
	
	/**
	 * Gets called when all categories have been read.
	 */
	function allCategoriesRead(categories)
	{
		// select a random category
		var randomIndex = Math.floor(Math.random() * categories.length);
		_selectedCategory = categories[randomIndex];
		
		readCategoryLanguages(_selectedCategory, categoryLanguageFileRead, categoryLanguageFileReadingFailed);
	}
	
	/**
	 * Gets called when the categories file reading has failed.
	 */
	function categoriesReadingFailed(errorString)
	{
		// TODO: handle the error properly
		alert(errorString);
	}
	
	/**
	 * Gets called when the category language file reading has failed.
	 */
	function categoryLanguageFileReadingFailed(errorString)
	{
		// TODO: handle the error properly
		alert(errorString);
	}
	
	
	/**
	 * Gets called when the category language file has been read.
	 */
	function categoryLanguageFileRead(languages)
	{
		_gameLanguageView.createLanguagesList(languages, gameLanguageViewLoaded);
	}
	
	/**
	 * Gets called when the game language view has been loaded.
	 */
	function gameLanguageViewLoaded()
	{
		pushScreenCallback();
	}
	
	/**
	 * Gets called when the game view has finished loading.
	 */
	function gameViewLoaded(language)
	{
		loadingScreen.showUI();
		_quickGameController = new QuickGameViewController(language, quickGameViewControllerLoaded);
		_quickGameController.initUI();
	}
	
	/**
	 * Gets called when the quick game view controller has finished loading.
	 */
	function quickGameViewControllerLoaded()
	{
		_quickGameController.pushScreen();
		showMainStackScreen();
	}
	
	/**
	 * Updates the UI with the localization texts.
	 */
	function updateUI()
	{
		_gameLanguageView.setScreenTitle(gameLanguageScreenText.title);
	}
	
	/**
	 * Shows the main stack screen/
	 */
	function showMainStackScreen()
	{
		var stackScreen = document.getNativeElementById(mainStackScreen);
		stackScreen.show();
	}
}