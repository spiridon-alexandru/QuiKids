/**
 * @brief The quick game view controller handles the game screen and handles all the
 * 		  business logic related to a quick game (creates a random game object filled with
 * 		  questions, initializes the game view with it and handless all the user actions.
 * @param pushScreenCallback A callback the announces the main menu view controller that the 
 *        loading of the screen is done.
 */
function QuickGameViewController(language, pushScreenCallback)
{
	var _gameLanguage = language;
	// keeps a randomly generated game object used for quick play
	var _randomGameObject;
	// _solvedQuestion[i] = 0 if the question was not flaged as solved, 1 otherwise
	var _solvedQuestion = [];
	var _quickGameView;
	var _score = 0;

	// Maps the questions to the tile text.
	var _questionTileMap;
	// the number of unsolved questions
	var _remainingQuestions;
	// the index of the current question to be answered
	var _currentQuestionIndex;
	
	/**
	 * Initializes the screen and it's dependencies.
	 * Should be called before pushing the screen.
	 */
	this.initUI = function()
	{
		generateRandomGameObject();
		
		_questionTileMap = new Object();
		_remainingQuestions = _randomGameObject.getNrOfTilesX() * _randomGameObject.getNrOfTilesY();
	}
	
	/**
	 * Returns the game screen.
	 */
	this.getScreen = function()
	{
		return _quickGameView.getScreen();
	};

	/**
	 * Pushes the game screen into the main stack screen.
	 */
	this.pushScreen = function()
	{
		_quickGameView.getScreen().pushTo(mainStackScreen);
	};
	
	/**
	 * Reads the screen language data from xml and shows the screen.
	 */
	function loadScreen()
	{
		readQuickPlayLanguageFile(function ()
		{
			updateUI();
			pushScreenCallback();
		}, readQuickPlayLanguageFileReadingFailed);
	};
	
	/**
	 * Gets called when the quick play language file reading has failed.
	 */
	function readQuickPlayLanguageFileReadingFailed(errorString)
	{
		// TODO: handle the error properly
		alert(errorString);
	}
	
	/**
	 * Updates the game screen UI with the localized text.
	 */
	function updateUI()
	{
		_quickGameView.setQuickPlayScreenTitle(quickPlayScreenText.title);
	};

	/**
	 * Generates random game object (random question numbers, random questions,
	 * random sound path). TODO SA: integrate this with the game repo
	 */
	function generateRandomGameObject()
	{
		var qArray = [];
		
		var randomTileGridSize = getRandomTileGridSize();
		_randomGameObject = new GameObject("Colors", _gameLanguage,
											randomTileGridSize[0], randomTileGridSize[1],
											"easy", qArray);

		for(var i = 0; i < (_randomGameObject.getNrOfTilesX() * _randomGameObject.getNrOfTilesY()); i++)
		{
			_solvedQuestion[i] = 0;
		}

		var gRepo = new GameRepo();

		gRepo.fillGameObjectQuestions(_randomGameObject, gameObjectQuestionsFilled, fillGameObjectFailed);
	}
	
	/**
	 * Gets called when the game object questions have been filled.
	 */
	function gameObjectQuestionsFilled()
	{
		generateQuestionToTileMapping();
		setNextQuestion(createGameView);
	}
	
	/**
	 * Gets called when the 'fillGameObjectQuestions' function encountered a problem.
	 */
	function fillGameObjectFailed(errorString)
	{
		// TODO: handle the error properly
		alert(errorString);
	}
	
	/**
	 * Gets called after the next question has been set.
	 * Creates the gameView.
	 */
	function createGameView()
	{
		// create a default value
		_quickGameView =  new GameView(_randomGameObject, gameViewLoaded);
		_quickGameView.createUI();

		_quickGameView.setQuestionText(currentQuestion.getText());

		//alert("current question" + currentQuestion);
		// loads the localization data onto the screen widgets
		loadScreen();
	}
	
	/**
	 * Gets called when the game view has been loaded.
	 */
	function gameViewLoaded(tileName)
	{
		if (_questionTileMap[tileName] == _currentQuestionIndex)
		{
			_score += 2;
			_quickGameView.setCompleted(_questionTileMap[tileName]);
			_quickGameView.updateScoreValue(_score);
			_quickGameView.removeClickEvent(tileName);
			
			setNextQuestion(handleNextQuestion);
		}
		else
		{
			_score -= 1;
			_quickGameView.updateScoreValue(_score);
			_quickGameView.setRedBorder(_questionTileMap[tileName]);
			var interval = setInterval(function(){ _quickGameView.setBlueBorder(_questionTileMap[tileName]); clearInterval(interval); }, 500);
		}
	}
	
	/**
	 * Gets called after the next question has been set. Checks if the game has ended. If so,
	 * pops the screen; sets the next question text otherwise.
	 */
	function handleNextQuestion()
	{
		//end game
		if (currentQuestion === null)
		{
			alert("Game Over! Your score was: " + _score);
			// pop the screen from the stack
			popGameScreen();
		}

		_quickGameView.setQuestionText(currentQuestion.getText());
	}
	
	/**
	 * Gets an array containing the screen size based on the
	 * available screen sizes.
	 */
	function getRandomTileGridSize()
	{
		var screenSizes = getAvailableTileFormats();
		// we calculate a random index based on the length of the available screen sizes
		var randIndex = Math.floor(Math.random() * screenSizes.length);
		
		var randGridSize = [];
		randGridSize[0] = screenSizes[randIndex][0];
		randGridSize[1] = screenSizes[randIndex][1];
		
		return randGridSize;
	}

	/**
	 * Maps every tile name to the question index.
	 * ex: _questionTileMap["00"] = 0 // the first random question will occupy the
	 * tile at coordinates (0,0) inside the game view
	 *     _questionTileMap["01"] = 0 ...
	 */
	function generateQuestionToTileMapping()
	{
		var tilesPerAxis = Math.sqrt(_randomGameObject.getNrOfTilesX() * _randomGameObject.getNrOfTilesY());
		var index = 0;
		for (var i = 0; i < tilesPerAxis; i++)
		{
			for (var j = 0; j < tilesPerAxis; j++)
			{
				var tile = _randomGameObject.getQuestion(index).getQuestionId();
				_questionTileMap[tile] = index;
				index++;
			}
		}
	}
	
	/**
	 * Sets the currentQuestion and the currentQuestion index by selecting
	 * a random question from the unsolved ones. The currentQuestion is set to 'null'
	 * if there are no more questions to solve.
	 */
	function setNextQuestion(successCallback)
	{
		var questionNumber = Math.floor(Math.random() * (_remainingQuestions - 1) + 1);
		var nrNotUsed = 0;
		for (var i = 0; i < (_randomGameObject.getNrOfTilesX() * _randomGameObject.getNrOfTilesY()); i++)
		{
			if (_solvedQuestion[i] === 0)
			{
				nrNotUsed++;
				if (nrNotUsed === questionNumber)
				{
					_remainingQuestions--;
					_solvedQuestion[i] = 1;
					_currentQuestionIndex = i;
					currentQuestion = _randomGameObject.getQuestion(i);
					successCallback();
					return;
				}
			}
		}
			
		currentQuestion = null;
		successCallback();
	}

	/**
	 * Removes the game screen from the main stack screen.
	 */
	function popGameScreen()
	{
		var stackScreen = document.getNativeElementById(mainStackScreen);
		// pop the game screen
		stackScreen.pop();
		// pop the language screen
		stackScreen.pop();
	}
}