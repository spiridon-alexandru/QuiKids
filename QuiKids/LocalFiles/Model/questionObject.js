function QuestionObject(text, imagePathSmall, imagePathMedium, imagePathLarge, imagePathXLarge, soundPath)
{
	//private member data
	var _text = null;
	var _questionId = null;
	var _imagePathLarge = null;
	var _imagePathSmall = null
	var _imagePathMedium = null;
	var _imagePathXLarge = null;
	var _soundPath = null;

	if(undefined != text)
		_text = text;
	if(undefined != imagePathSmall)
		_imagePathSmall = imagePathSmall;
	if(undefined != imagePathMedium)
		_imagePathMedium = imagePathMedium;
	if(undefined != imagePathLarge)
		_imagePathLarge = imagePathLarge;
	if(undefined != imagePathXLarge)
		_imagePathXLarge = imagePathXLarge;
	if(undefined != soundPath)
		_soundPath = soundPath;

	//Privileged functions
	/**
	 * \brief Getters
	 */
	this.getText = function()
	{
		return _text;
	};

	this.getImagePathLarge = function()
	{
		return _imagePathLarge;
	};

	this.getImagePathLarge = function()
	{
		return _imagePathLarge;
	};

	this.getImagePathSmall = function()
	{
		return _imagePathSmall;
	};

	this.getImagePathMedium = function()
	{
		return _imagePathMedium;
	};

	this.getImagePathXLarge = function()
	{
		return _imagePathXLarge;
	};

	this.getSoundPath = function()
	{
		return _soundPath;
	};

	this.getQuestionId = function()
	{
		return _questionId;
	};

	/**
	 * \brief Setters
	 */
	this.setText = function(value)
	{
		_text = value;
	};

	this.setImagePathLarge = function(value)
	{
		_imagePathLarge = value;
	};

	this.setImagePathMedium = function(value)
	{
		_imagePathMedium = value;
	};

	this.setImagePathSmall = function(value)
	{
		_imagePathSmall = value;
	};

	this.setImagePathXLarge = function(value)
	{
		_imagePathXLarge = value;
	};

	this.setSoundPath = function(value)
	{
		_soundPath = value;
	};

	this.setQuestionId = function(value)
	{
		_questionId = value;
	};

	this.toString = function()
	{
		return "QuestionID: " + _questionId + "\n Text: " + _text + "\n Large image path: " +
				_imagePathLarge + "\n XLarge image path: " + _imagePathXLarge + "\n Medium image path: " +
				_imagePathMedium + "\n Small image path: " + _imagePathSmall + "\n Sound path: " + _soundPath;
	}
};
