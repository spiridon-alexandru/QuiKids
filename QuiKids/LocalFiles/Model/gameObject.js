function GameObject(category, language, numberOfTiles, difficulty, questionArray)
{
	//private data
	var _category = null;
	var _language = null;
	var _nrOfTiles = null;
	var _difficulty = null;
	var _questions = new Array();

	if(undefined != category)
		_category = category;
	if(undefined != language)
		_language = language;
	if(undefined != numberOfTiles)
		_nrOfTiles = numberOfTiles;
	if(undefined != difficulty)
		_difficulty = difficulty;
	if(undefined != questionArray)
		_setQuestionArray(questionArray);
	
	//private functions
	function _returnCategoryValue()
	{
		return _category;
	};
	
	function _returnLanguageValue()
	{
		return _language;
	};

	function _returnDifficultyValue()
	{
		return _difficulty;
	};
	
	function _returnNrOfTilesValue()
	{
		return _nrOfTiles;
	};
	
	function _returnQuestion(index)
	{
		if(index < _questions.length) return _questions[index];
	};
	
	function _returnQuestionArray()
	{
		return _questions;
	};
	
	function _setCategoryValue(value)
	{
		_category = value;
	};
	
	function _setDifficultyValue(value)
	{
		_difficulty = value;
	};
	
	function _setNrOfTilesValue(value)
	{
		_nrOfTiles = value;
	};
	
	function _setLanguageValue(value)
	{
		_language = value;
	};
	
	function _setQuestionArray(value)
	{
		if(value instanceof Array)
		{
			_questions = value;
		}
		else _questions = undefined;
	}

	//privilaged functions
	/**
	 * \brief Getters
	 */
	this.getCategory = function()
	{
		return _returnCategoryValue();
	};

	this.getLanguage = function()
	{
		return _returnLanguageValue();
	};

	this.getNrOfTiles = function()
	{
		return _returnNrOfTilesValue();
	};

	this.getDifficulty = function()
	{
		return _returnDifficultyValue();
	};

	this.getQuestion = function(index)
	{
		return _returnQuestion(index);
	};

	this.getQuestions  = function()
	{
		return _returnQuestionArray();
	};
	
	/**
	 * \brief Setters
	 */
	this.setCategory = function(category)
	{
		_setCategoryValue(category);
	};

	this.setLanguage = function(language)
	{
		_setLanguageValue(language);
	};

	this.setNrOfTiles = function(nrOfTiles)
	{
		_setNrOfTilesValue(nrOfTiles);
	};

	this.setDifficulty = function(difficulty)
	{
		_setDifficultyValue(difficulty);
	};

	this.setQuestions = function(questions)
	{
		_setQuestionArray(questions);
	};
	
	/**
	 * \brief Sets the value of the question from the index gave as parameter
	 * @param index the index of the question
	 * @param questionValue the value of the question
	 */
	this.setQuestion = function(index, questionValue)
	{
		if(index < (_returnQuestionArray()).length)
		{
			(_returnQuestionArray())[index] = questionValue;
		}
	};
	
	/**
	 * \brief Adds a question to the question array
	 * @param question the question that needs to be added
	 */
	this.addQuestion = function(question)
	{
		(_returnQuestionArray()).push(question);
	};
};

