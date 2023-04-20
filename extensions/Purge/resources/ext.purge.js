$( function () {

	$( "#ca-purge a" ).on( 'click', function ( e ) {
		var postArgs = { action: 'purge', titles: mw.config.get( 'wgPageName' ) };
		var mwApi = new mw.Api();
		mwApi.post( postArgs ).then( function () {
			location.reload();
		}, function () {
			mw.notify( mw.msg( 'purge-failed' ), { type: 'error' } );
		} );
		e.preventDefault();
	} );

} );
