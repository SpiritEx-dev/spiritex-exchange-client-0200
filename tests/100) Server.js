'use strict';

const ASSERT = require( 'assert' );

const CONFIG = require( './~test-config' );
const EXCHANGE_CLIENT = require( '../src/ExchangeClient' );


//---------------------------------------------------------------------
describe( `100) Server Tests`, function ()
{


	//---------------------------------------------------------------------
	var AliceClient = EXCHANGE_CLIENT( CONFIG.ClientConfig.server_url );


	//---------------------------------------------------------------------
	before( 'Startup',
		async function ()
		{
			return;
		} );


	//---------------------------------------------------------------------
	after( 'Shutdown',
		async function ()
		{
			return;
		} );


	//---------------------------------------------------------------------
	it( `should authenticate`,
		async function ()
		{
			var result = await AliceClient.Authenticate(
				CONFIG.Credentials.Alice.email_address,
				CONFIG.Credentials.Alice.password,
			);
			ASSERT.ok( result );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should get server info`,
		async function ()
		{
			var server_info = await AliceClient.Server.GetServerInfo();
			ASSERT.ok( server_info );
			ASSERT.ok( server_info.server_version );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should get asset type`,
		async function ()
		{
			var asset_type = await AliceClient.Server.GetAssetType( 'whiskey-casks' );
			ASSERT.ok( asset_type );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should get user`,
		async function ()
		{
			var user = await AliceClient.Server.GetUser();
			ASSERT.ok( user );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should lookup user`,
		async function ()
		{
			var user = await AliceClient.Server.GetUser();
			ASSERT.ok( user );
			var user2 = await AliceClient.Server.LookupUser( user.user_email );
			ASSERT.ok( user2 );
			ASSERT.equal( user2.user_id, user.user_id );
			return;
		} );


	//---------------------------------------------------------------------
	return;
} );
