function GameObject(category, language, numberOfTilesX, numberOfTilesY, difficulty, questionArray)
{
	//private data
	var _category = null;
	var _language = null;
	var _nrOfTilesX = new Number();
	var _nrOfTilesY = new Number();
	var _difficulty = null;
	var _questions = new Array();

	if(undefined != category)
		_category = category;
	if(undefined != language)
		_language = language;
	if(undefined != numberOfTilesX)
		_nrOfTilesX = numberOfTilesX;
	if(undefined != numberOfTilesY)
		_nrOfTilesY = numberOfTilesY;
	if(undefined != difficulty)
		_difficulty = difficulty;
	if(undefined != questionArray && (questionArray instanceof Array))
		_questions = questionArray;

	//privilaged functions
	/**
	 * \brief Getters
	 */
	this.getCategory = function()
	{
		return _category;
	};

	this.getLanguage = function()
	{
		return _language;
	};

	this.getNrOfTilesX = function()
	{
		return _nrOfTilesX;
	};

	this.getNrOfTilesY = function()
	{
		return _nrOfTilesY;
	};

	this.getDifficulty = function()
	{
		return _difficulty;
	};

	this.getQuestion = function(index)
	{
		if(index < _questions.length) return _questions[index];
	};

	this.getQuestions  = function()
	{
		return _questions;
	};
	
	/**
	 * \brief Setters
	 */
	this.setCategory = function(category)
	{
		_category = category;
	};

	this.setLanguage = function(language)
	{
		_language = language;
	};

	this.setNrOfTilesX = function(nrOfTilesX)
	{
		_nrOfTilesX = nrOfTilesX;
	};

	this.setNrOfTilesY = function(nrOfTilesY)
	{
		_nrOfTilesY = nrOfTilesY;
	};

	this.setDifficulty = function(difficulty)
	{
		_difficulty = difficulty;
	};

	this.setQuestions = function(questions)
	{
		if(questions instanceof Array)
		{
			 _questions = questions;
		}
		else _questions = undefined;
	};
	
	/**
	 * \brief Sets the value of the question from the index gave as parameter
	 * @param index the index of the question
	 * @param questionValue the value of the question
	 */
	this.setQuestion = function(index, questionValue)
	{
		if(index < _questions.length)
		{
			_questions[index] = questionValue;
		}
	};
	
	/**
	 * \brief Adds a question to the question array
	 * @param question the question that needs to be added
	 */
	this.addQuestion = function(question)
	{
		_questions.push(question);
	};
};

