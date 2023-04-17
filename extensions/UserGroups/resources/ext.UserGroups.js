$( function () {
	$( '#groupname' ).on( 'change', function () {
		location = $( '#groupname option:selected' ).val();
	} );
} );
