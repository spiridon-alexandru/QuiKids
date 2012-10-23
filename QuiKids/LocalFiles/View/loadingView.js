function LoadingScreen()
{
	var _screen = mosync.nativeui.create("Screen", "loadingScreen",
	{
	});
	
	// create the main screen layout
	var _mainVerticalLayout = mosync.nativeui.create("VerticalLayout", "loadingScreenMainLayout",
	{
		"width": "100%",
		"height": "100%"
	});
	
	var _activityIndicator = mosync.nativeui.create("ActivityIndicator", "loadingScreenActivityIndicator",
	{
		"width": "100%",
		"height": "100%",
		"inProgress": "true"
	});
	
	_activityIndicator.addTo("loadingScreenMainLayout");
	_mainVerticalLayout.addTo("loadingScreen");
	
	/**
	 * Shows the loading screen.
	 */
	this.show = function()
	{
		_screen.show();
	};
}