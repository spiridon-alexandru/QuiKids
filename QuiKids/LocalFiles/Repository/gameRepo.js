function GameRepo()
{
	var _gameObj = null;
	var _fileReader;
	var _dirReader;
	var _textResourcesFile = null;
	var _callback = null;

	function _readQuestions(category, language, difficulty)
	{
		_dirReader = localFilesDir.createReader();
		_dirReader.readEntries(function(entries)
			{
				//find the "Category" dir
				for(var i in entries)
				{
					if(entries[i].name === categoriesDirName && entries[i].isDirectory)
					{
						var categoriesReader = entries[i].createReader();
						categoriesReader.readEntries(function(entries)
							{
								//find the category folder
								for(var i in entries)
								{
									if(entries[i].name === category && entries[i].isDirectory)
									{
										var categoryReader = entries[i].createReader();
										categoryReader.readEntries(function(entries)
											{
												for(var i in entries)
												{
													if(entries[i].name === questionsFileName && entries[i].isFile)
													{
														_readQuestionsFile(entries[i]);
													}
													if(entries[i].name == language && entries[i].isDirectory)
													{
														var textResourcesReader = entries[i].createReader();
														textResourcesReader.readEntries(function(entries)
															{
																for(var i in entries)
																{
																	var name = difficulty + ".xml";
																	if(entries[i].name == name && entries[i].isFile)
																	{
																		_textResourcesFile = entries[i];
																		break;
																	}
																}
															}, function(error)
															{
																alert("readQuestionsFile error: " + error);
															});
													}
												}
											},
											function(error)
											{
												alert("readQuestionsFile error: " + error);
											});
										break;
									}
								}
							},
							function(error)
							{
								alert("readQuestionsFile error: " + error);
							});
						break;
					}
				}
			},
			function(error)
			{
				alert("readQuestionsFile error: " + error);
			});
	};

	/**
	 * Sets the file editing panel to the selected file.
	 * @param file FilEntry with the info about the selected file.
	 */
	function _readQuestionsFile(file)
	{
		var reader = new FileReader();
		reader.onloadend = function(evt){
			var questionsFileContent = evt.target.result;
			_parseQuestionsFileContent(questionsFileContent);
		};

		// This call will invoke the onloaded callback above.
		reader.readAsText(file);
	};

	function _parseQuestionsFileContent(content)
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
		_readQuestionTextResources();
	};

	function _readQuestionTextResources()
	{
		var reader = new FileReader();
		reader.onloadend = function(evt){
			var questionsFileContent = evt.target.result;
			_parseTextResourcesFileContent(questionsFileContent);
		};

		// This call will invoke the onloaded callback above.
		reader.readAsText(_textResourcesFile);
	};

	function _parseTextResourcesFileContent(content)
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

		_callback();
	};

	this.fillGameObjectQuestions = function(gameObject, callbackFunction)
	{
		if(undefined != gameObject && (gameObject instanceof GameObject))
		{
			_callback = callbackFunction;
			_gameObj = gameObject;
			_readQuestions(_gameObj.getCategory(), _gameObj.getLanguage(), _gameObj.getDifficulty());
		}
	};
};