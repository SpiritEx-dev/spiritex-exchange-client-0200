'use strict';

const ASSERT = require( 'assert' );

const CONFIG = require( './~test-config' );
const EXCHANGE_CLIENT = require( '../src/ExchangeClient' );


//---------------------------------------------------------------------
describe( `200) Accounts Tests`, function ()
{


	//---------------------------------------------------------------------
	var AliceClient = EXCHANGE_CLIENT( CONFIG.ClientConfig.server_url );
	var SupplierAccount = null;


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
	it( `should create an account`,
		async function ()
		{
			SupplierAccount = await AliceClient.Accounts.Create();
			ASSERT.ok( SupplierAccount );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should get an account`,
		async function ()
		{
			ASSERT.ok( SupplierAccount );
			var account = await AliceClient.Accounts.Get( SupplierAccount.account_id );
			ASSERT.ok( account );
			ASSERT.equal( account.account_id, SupplierAccount.account_id );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should list accounts`,
		async function ()
		{
			var accounts = await AliceClient.Accounts.List();
			ASSERT.ok( accounts );
			ASSERT.ok( accounts.length );
			ASSERT.ok( accounts.find( item => ( item.account_id === SupplierAccount.account_id ) ) );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should rename an account`,
		async function ()
		{
			var accounts = await AliceClient.Accounts.List();
			var base_name = 'Account Name';
			var new_name = base_name;
			var n = 0;
			while ( accounts.find( item => ( item.account_name === new_name ) ) ) 
			{
				n++;
				new_name = base_name + ' ' + n;
			}
			SupplierAccount = await AliceClient.Accounts.Rename( SupplierAccount.account_id, new_name );
			ASSERT.ok( SupplierAccount );
			ASSERT.equal( SupplierAccount.account_name, new_name );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should deposit funds to an account`,
		async function ()
		{
			ASSERT.ok( SupplierAccount );
			SupplierAccount = await AliceClient.Accounts.TestDeposit( SupplierAccount.account_id, ( 10000 * 100 ) );
			ASSERT.ok( SupplierAccount );
			ASSERT.equal( SupplierAccount.balance, ( 10000 * 100 ) );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should withdraw funds from an account`,
		async function ()
		{
			ASSERT.ok( SupplierAccount );
			SupplierAccount = await AliceClient.Accounts.TestWithdraw( SupplierAccount.account_id, ( 2500 * 100 ) );
			ASSERT.ok( SupplierAccount );
			ASSERT.equal( SupplierAccount.balance, ( 7500 * 100 ) );
			return;
		} );


	//---------------------------------------------------------------------
	return;
} );
