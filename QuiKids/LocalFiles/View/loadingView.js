function LoadingScreen()
{
	var _screen = mosync.nativeui.create("Screen", "loadingScreen",
	{
	});
	
	// create the main screen layout
	var _mainVerticalLayout = mosync.nativeui.create("VerticalLayout", "loadingScreenMainLayout",
	{
		"width": "100%",
		"height": "100%",
		"childHorizontalAlignment" : "center"
	});
	
	var _separatorVerticalLayout1 = mosync.nativeui.create("VerticalLayout", "loadingScreenSeparatorLayout1",
	{
		"width": "100%",
		"height": "100%"
	});

	// the activity indicator will be located in the center of the screen and will occupy 5% of the 
	// min(screenWidth, screenHeight)
	var activityIndicatorSize = Math.floor((screenWidth<screenHeight?screenWidth:screenHeight)/20);
	var _activityIndicator = mosync.nativeui.create("ActivityIndicator", "loadingScreenActivityIndicator",
	{
		"width" : "100%",
		"height": activityIndicatorSize,
		"inProgress": "true"
	});

	if(isAndroid)
	{
		_activityIndicator.setProperty("width", activityIndicatorSize);
	}
	
	var _separatorVerticalLayout2 = mosync.nativeui.create("VerticalLayout", "loadingScreenSeparatorLayout2",
	{
		"width": "100%",
		"height": "100%"
	});
	
	_separatorVerticalLayout1.addTo("loadingScreenMainLayout");
	_activityIndicator.addTo("loadingScreenMainLayout");
	_separatorVerticalLayout2.addTo("loadingScreenMainLayout");
	_mainVerticalLayout.addTo("loadingScreen");
	
	/**
	 * Shows the loading screen.
	 */
	this.show = function()
	{
		_screen.show();
	};
}