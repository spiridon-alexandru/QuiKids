/**
 * @brief The quick game view controller handles the game screen and handles all the
 * 		  business logic related to a quick game (creates a random game object filled with
 * 		  questions, initializes the game view with it and handless all the user actions.
 * @param pushScreenCallback A callback the announces the main menu view controller that the 
 *        loading of the screen is done.
 */
function QuickGameViewController(pushScreenCallback)
{
	// keeps a randomly generated game object used for quick play
	var _randomGameObject;
	// solvedQuestion[i] = 0 if the question was not flaged as solved, 1 otherwise
	var solvedQuestion = [];
	var _quickGameView;
	var _score = 0;

	generateRandomGameObject();

	// Maps the questions to the tile text.
	var questionTileMap = new Object();
	
	// the number of unsolved questions
	var remainingQuestions = _randomGameObject.getNrOfTilesX() * _randomGameObject.getNrOfTilesY();
	// the index of the current question to be answered
	var currentQuestionIndex;
	
	/**
	 * Reads the screen language data from xml and shows the screen.
	 */
	function loadScreen()
	{
		readQuickPlayLanguageFile(function ()
		{
			updateUI();
			pushScreenCallback();
		});
	};
	
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
		var questionNumber = Math.floor(Math.random() * 4 + 1);
		if (questionNumber === 1)
			questionNumber = 2;
		
		var qArray = [];
		_randomGameObject = new GameObject("Colors", "EN", 3, 3, "easy", qArray);

		for(var i = 0; i < (_randomGameObject.getNrOfTilesX() * _randomGameObject.getNrOfTilesY()); i++)
		{
			solvedQuestion[i] = 0;
		}

		var gRepo = new GameRepo();

		gRepo.fillGameObjectQuestions(_randomGameObject, function()
			{
				generateQuestionToTileMapping();
				setNextQuestion(function()
					{
						// create a default value
						_quickGameView =  new GameView(_randomGameObject, function(tileName)
							{
								if (questionTileMap[tileName] == currentQuestionIndex)
								{
									alert("CORRECT");
									_score += 2;
									_quickGameView.setGreenBorder(questionTileMap[tileName]);
									_quickGameView.updateScoreValue(_score);

									setNextQuestion(function()
										{
											//end game
											if (currentQuestion === null)
											{
												alert("Jocul a luat sfarsit! Felicitari!");
												// pop the screen from the stack
												popGameScreen();
											}

											_quickGameView.setQuestionText(currentQuestion.getText());
										});
								}
								else
								{
									//alert("INCORRECT");
									_score -= 1;
									_quickGameView.updateScoreValue(_score);
									_quickGameView.setRedBorder(questionTileMap[tileName]);
									var interval = setInterval(function(){ _quickGameView.setBlueBorder(questionTileMap[tileName]); clearInterval(interval); }, 500);
								}
							});

						_quickGameView.setQuestionText(currentQuestion.getText());

						//alert("current question" + currentQuestion);
						// loads the localization data onto the screen widgets
						loadScreen();
					});
				});
	}

	/**
	 * Maps every tile name to the question index.
	 * ex: questionTileMap["00"] = 0 // the first random question will occupy the
	 * tile at coordinates (0,0) inside the game view
	 *     questionTileMap["01"] = 0 ...
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
				questionTileMap[tile] = index;
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
		var questionNumber = Math.floor(Math.random() * (remainingQuestions - 1) + 1);
		var nrNotUsed = 0;
		for (var i = 0; i < (_randomGameObject.getNrOfTilesX() * _randomGameObject.getNrOfTilesY()); i++)
		{
			if (solvedQuestion[i] === 0)
			{
				nrNotUsed++;
				if (nrNotUsed === questionNumber)
				{
					remainingQuestions--;
					solvedQuestion[i] = 1;
					currentQuestionIndex = i;
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
		stackScreen.pop();
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
}