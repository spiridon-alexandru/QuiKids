function QuickGameViewController(pushScreenCallback)
{
	// keeps a randomly generated game object used for quick play
	var _randomGameObject;
	// solvedQuestion[i] = 0 if the question was not flaged as solved, 1 otherwise
	var solvedQuestion = [];
	
	generateRandomGameObject();

	// Maps the questions to the tile text.
	var questionTileMap = new Object();
	generateQuestionToTileMapping();
	
	var remainingQuestions = _randomGameObject.getNrOfTiles();
	var currentQuestionIndex;
	setNextQuestion();
	
	// create a default value
	var _quickGameView =  new GameView(_randomGameObject, function(tileName)
		{
			if (questionTileMap[tileName] === currentQuestionIndex)
			{
				alert("CORRECT");
				setNextQuestion();
				//end game
				if (currentQuestion === null)
				{
					alert("Jocul a luat sfarsit! Felicitari!");
					
					// pop the screen from the stack
					popGameScreen();
				}
				
				_quickGameView.setQuestionText(currentQuestion.getText());
			}
			else
			{
				alert("INCORRECT");
			}
		});
	_quickGameView.setQuestionText(currentQuestion.getText());
	
	
	// loads the localization data onto the screen widgets
	loadScreen();
	
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
	var updateUI = function()
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
		for (var i = 0; i < questionNumber * questionNumber; i++)
		{
			var text = "Question " + i;
			var imgPath = "" + i;
			var soundPath = "s" + i;
			var question = new QuestionObject(text, imgPath, soundPath);
			qArray[i] = question;
			solvedQuestion[i] = 0;
		}

		_randomGameObject = new GameObject("Colors", "EN", questionNumber * questionNumber, 2, qArray);
	}
	
	/**
	 * Maps every tile name to the question index.
	 * ex: questionTileMap["00"] = 0 // the first random question will occupy the
	 * tile at coordinates (0,0) inside the game view
	 *     questionTileMap["01"] = 0 ...
	 */
	function generateQuestionToTileMapping()
	{
		var tilesPerAxis = Math.sqrt(_randomGameObject.getNrOfTiles());
		var index = 0;
		for (var i = 0; i < tilesPerAxis; i++)
		{
			for (var j = 0; j < tilesPerAxis; j++)
			{
				var tile = "" + i + j;
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
	function setNextQuestion()
	{
		var questionNumber = Math.floor(Math.random() * (remainingQuestions - 1) + 1);
		var nrNotUsed = 0;
		for (var i = 0; i < _randomGameObject.getNrOfTiles(); i++)
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
					
					return;
				}
			}
		}
			
		currentQuestion = null;	
	}
	
	function popGameScreen()
	{
		var stackScreen = document.getNativeElementById(mainStackScreen);
		stackScreen.pop();
	}
	
	this.getScreen = function()
	{
		return _quickGameView.getScreen();
	};
	
	this.pushScreen = function()
	{
		_quickGameView.getScreen().pushTo(mainStackScreen);
	};
}