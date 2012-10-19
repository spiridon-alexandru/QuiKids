function QuestionObject(text, imagePath, soundPath)
{
	//private member data
	var _text = null;
	var _imagePath = null;
	var _soundPath = null;

	if(undefined != text)
		_text = text;
	if(undefined != imagePath)
		_imagePath = imagePath;
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

	this.getImagePath = function()
	{
		return _imagePath;
	};

	this.getSoundPath = function()
	{
		return _soundPath;
	};

	/**
	 * \brief Setters
	 */
	this.setText = function(value)
	{
		_text = value;
	};

	this.setImagePath = function(value)
	{
		_imagePath = value;
	};

	this.setSoundPath = function(value)
	{
		_soundPath = value;
	};
};
