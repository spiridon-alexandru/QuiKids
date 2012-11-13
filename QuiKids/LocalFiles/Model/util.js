/**
 * Gets a string containing the current language initials.
 */
function getApplicationLanguageString()
{
	var languageString;
	switch (applicationLanguage)
	{
		case Languages.RO:
			languageString = "RO";
			break;
		default:
			languageString = "EN";
	}
	return languageString;
}

/**
 * Sets the platform
 */
function setPlatform()
{
	var platform = device.platform;
	if("iPhone OS" == platform) isIPhoneOS = true;
	else if("Android" == platform) isAndroid = true;
	else isWindowsPhone7 = true;
}

/**
 * Sets the screen size related variables
 */
function setScreenType()
{
	var value = screenHeight * screenWidth;
	if((426 * 320) >= value) screenType = SMALL_SCREEN;
	else if((470 * 320) >= value) screenType = MEDIUM_SCREEN;
	else if((640 * 800) >= value) screenType = LARGE_SCREEN;
	else screenType = XLARGE_SCREEN;
}

/**
 * Returns an array containing the available screen sizes.
 */
function getAvailableTileFormats()
{
	var screenSizes = [];
	var value = screenHeight * screenWidth;
	
	// 2*2, 3*3 and 4*4 available
	if(value <= (640 * 800))
	{
		screenSizes[0] = [2,2];
		screenSizes[1] = [3,3];
		screenSizes[2] = [4,4];
	}
	else // 5 * 5 available
	{
		screenSizes[3] = [5,5];
	}
	
	return screenSizes;
}