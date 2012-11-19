function GameRepo()
{
	var _gameObj = null;
	var _fileReader;
	var _dirReader;
	var _textResourcesFile = null;
	var _questionsResourcesFile = null;
	var _successCallback = null;
	var _failureCallback = null;
	
	var _category = null;
	var _language = null;
	var _difficulty = null;
	
	this.fillGameObjectQuestions = function(gameObject, successCallback, failureCallback)
	{
		if(undefined != gameObject && (gameObject instanceof GameObject))
		{
			_successCallback = successCallback;
			_failureCallback = failureCallback;
			_gameObj = gameObject;
			readQuestions(_gameObj.getCategory(), _gameObj.getLanguage(), _gameObj.getDifficulty());
		}
	};

	function readQuestions(category, language, difficulty)
	{
		_category = category;
		_language = language;
		_difficulty = difficulty;
		
		_dirReader = localFilesDir.createReader();
		_dirReader.readEntries(localFilesDirReadingFinished,
			function(error)
			{
				var errorString = "GameRepo: local files dir read error: " + error;
				_failureCallback(errorString);
			});
	};
	
	/**
	 * Gets called when the local files dir has been read.
	 */
	function localFilesDirReadingFinished(entries)
	{
		//find the "Category" dir
		for(var i in entries)
		{
			if(entries[i].name === categoriesDirName && entries[i].isDirectory)
			{
				var categoriesReader = entries[i].createReader();
				categoriesReader.readEntries(categoriesDirReadingFinished,
					function(error)
					{
						var errorString = "GameRepo: categories dir reading error: " + error;
						_failureCallback(errorString);
					});
				break;
			}
		}
	}
	 
	/**
	 * Gets called when the categories dir has been read.
	 */
	function categoriesDirReadingFinished(entries)
	{
		//find the category folder
		for(var i in entries)
		{
			if(entries[i].name === _category && entries[i].isDirectory)
			{
				var categoryReader = entries[i].createReader();
				categoryReader.readEntries(categoryDirReadingFinished,
					function(error)
					{
						var errorString = "GameRepo: readQuestions2 error: " + error;
						_failureCallback(errorString);
					});
				break;
			}
		}
	}
	
	/**
	 * Gets called when the category dir has been read.
	 */
	function categoryDirReadingFinished(entries)
	{
		for(var i in entries)
		{
			if(entries[i].name === questionsFileName && entries[i].isFile)
			{
				_questionsResourcesFile = entries[i];
				if(null !== _textResourcesFile)
				{
					readQuestionsFile(_questionsResourcesFile);
				}									
			}
			if(entries[i].name === _language && entries[i].isDirectory)
			{
				var textResourcesReader = entries[i].createReader();
				textResourcesReader.readEntries(categoryLanguageFileReadingFinished, function(error)
					{
						var errorString = "GameRepo: readQuestions1 error: " + error;
						_failureCallback(errorString);
					});
			}
		}
	}
	
	/**
	 * Gets called when the category language directory has been read.
	 */
	function categoryLanguageFileReadingFinished(entries)
	{
		for(var i in entries)
		{
			var name = _difficulty + ".xml";
			if(entries[i].name == name && entries[i].isFile)
			{
				_textResourcesFile = entries[i];
				if(null !== _questionsResourcesFile)
				{
					readQuestionsFile(_questionsResourcesFile);
				}
				break;
			}
		}
	}

	/**
	 * Sets the file editing panel to the selected file.
	 * @param file FilEntry with the info about the selected file.
	 */
	function readQuestionsFile(file)
	{
		var reader = new FileReader();
		reader.onloadend = function(evt){
			var questionsFileContent = evt.target.result;
			parseQuestionsFileContent(questionsFileContent);
		};

		// This call will invoke the onloaded callback above.
		reader.readAsText(file);
	};

	function parseQuestionsFileContent(content)
	{
		var parser;
		var xmlDoc;
		if (window.DOMParser)
		{
			parser=new DOMParser();
			xmlDoc=parser.parseFromString(content,"text/xml");
		}
		else // Internet Explorer
		{
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async=false;
			xmlDoc.loadXML(content);
		}

		// get the current application language string
		var questionElementsLength = xmlDoc.getElementsByTagName("question").length;
		var numberOfQuestionsNeeded = _gameObj.getNrOfTilesX() * _gameObj.getNrOfTilesY();

		//0 if the question is not chosen, 1 if it's chosen
		var characteristicArray = [];

		while(0 < numberOfQuestionsNeeded)
		{
			var randomQuestionNumber = Math.floor(Math.random() * questionElementsLength);
			while(1 == characteristicArray[randomQuestionNumber])
			{
				randomQuestionNumber = Math.floor(Math.random() * questionElementsLength);
			}

			var q = new QuestionObject();
			characteristicArray[randomQuestionNumber] = 1;

			//Populate the question object
			q.setQuestionId(xmlDoc.getElementsByTagName("qid")[randomQuestionNumber].childNodes[0].nodeValue);
			q.setImagePathLarge(xmlDoc.getElementsByTagName("imagePathLarge")[randomQuestionNumber].childNodes[0].nodeValue);
			q.setImagePathMedium(xmlDoc.getElementsByTagName("imagePathMedium")[randomQuestionNumber].childNodes[0].nodeValue);
			q.setImagePathSmall(xmlDoc.getElementsByTagName("imagePathSmall")[randomQuestionNumber].childNodes[0].nodeValue);
			q.setImagePathXLarge(xmlDoc.getElementsByTagName("imagePathXLarge")[randomQuestionNumber].childNodes[0].nodeValue);
			q.setSoundPath(xmlDoc.getElementsByTagName("soundPath")[randomQuestionNumber].childNodes[0].nodeValue);

			_gameObj.addQuestion(q);

			numberOfQuestionsNeeded--;
		}
		readQuestionTextResources();
	};

	function readQuestionTextResources()
	{
		var reader = new FileReader();
		reader.onloadend = function(evt){
			var questionsFileContent = evt.target.result;
			parseTextResourcesFileContent(questionsFileContent);
		};

		// This call will invoke the onloaded callback above.
		reader.readAsText(_textResourcesFile);
	};

	function parseTextResourcesFileContent(content)
	{
		var parser;
		var xmlDoc;
		if (window.DOMParser)
		{
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(content,"text/xml");
		}
		else // Internet Explorer
		{
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async=false;
			xmlDoc.loadXML(content); 
		}

		var textElements = xmlDoc.getElementsByTagName("text");

		for(var i = 0; i < _gameObj.getQuestions().length; i++)
		{
			for(var j in textElements)
			{
				if(parseInt(textElements[j].getAttribute("qid"), 10) == parseInt(_gameObj.getQuestions()[i].getQuestionId(), 10))
				{
					_gameObj.getQuestion(i).setText(textElements[j].childNodes[0].nodeValue);
					break;
				}
			}
		}
		_successCallback();
	};
};