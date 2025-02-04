'use strict';

const ASSERT = require( 'assert' );

const CONFIG = require( './~test-config' );
const EXCHANGE_CLIENT = require( '../src/ExchangeClient' );


//---------------------------------------------------------------------
describe( `150) Directory Tests`, function ()
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
	it( `should list all items`,
		async function ()
		{
			var items = await AliceClient.Directory.FindItems();
			ASSERT.ok( items );
			ASSERT.ok( items.length );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should find some items`,
		async function ()
		{
			var items = await AliceClient.Directory.FindItems( '45th', 'richmond' );
			ASSERT.ok( items );
			ASSERT.ok( items.length );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should get a facility`,
		async function ()
		{
			var items = await AliceClient.Directory.FindItems( '', '', 1 );
			ASSERT.ok( items );
			ASSERT.ok( items.length === 1 );

			var item = await AliceClient.Directory.GetFacility( items[ 0 ].facility_id );
			ASSERT.ok( item );
			ASSERT.ok( item.facility_id === items[ 0 ].facility_id );

			return;
		} );


	//---------------------------------------------------------------------
	it( `should get a brand`,
		async function ()
		{
			var items = await AliceClient.Directory.FindItems( '', '', 1 );
			ASSERT.ok( items );
			ASSERT.ok( items.length === 1 );

			var item = await AliceClient.Directory.GetBrand( items[ 0 ].brand_id );
			ASSERT.ok( item );
			ASSERT.ok( item.brand_id === items[ 0 ].brand_id );

			return;
		} );


	//---------------------------------------------------------------------
	it( `should get facility brands`,
		async function ()
		{
			var items = await AliceClient.Directory.FindItems( '45th', '', 1 );
			ASSERT.ok( items );
			ASSERT.ok( items.length === 1 );

			var brands = await AliceClient.Directory.GetFacilityBrands( items[ 0 ].facility_id );
			ASSERT.ok( brands );
			ASSERT.ok( brands.length );

			return;
		} );


	//---------------------------------------------------------------------
	return;
} );
