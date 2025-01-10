'use strict';

const ASSERT = require( 'assert' );

const CONFIG = require( './~test-config' );
const EXCHANGE_CLIENT = require( '../src/ExchangeClient' );


//---------------------------------------------------------------------
describe( `900) Permissions Tests`, function ()
{


	//---------------------------------------------------------------------
	var AliceClient = EXCHANGE_CLIENT( CONFIG.ClientConfig.server_url );
	var BobClient = EXCHANGE_CLIENT( CONFIG.ClientConfig.server_url );
	var AliceUser = null;
	var AliceAccount = null;
	var AliceOffering = null;
	var BobUser = null;
	var BobAccount = null;
	var BobOffering = null;


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
			AliceUser = await AliceClient.Authenticate(
				CONFIG.Credentials.Alice.email_address,
				CONFIG.Credentials.Alice.password,
			);
			ASSERT.ok( AliceUser );
			BobUser = await BobClient.Authenticate(
				CONFIG.Credentials.Bob.email_address,
				CONFIG.Credentials.Bob.password,
			);
			ASSERT.ok( BobUser );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should create accounts`,
		async function ()
		{
			AliceAccount = await AliceClient.Accounts.Create();
			ASSERT.ok( AliceAccount );
			BobAccount = await BobClient.Accounts.Create();
			ASSERT.ok( BobAccount );
			return;
		} );


	const SAMPLE_ASSET = {
		offering_name: 'Whiskey',
		description: 'New Whiskey Casks Offering',
		asset_info: {
			bottle_volume: 750,
			Casks: [
				{ cask_type: 'Barrel', category: 'Speyside', AYS: 0, LOA: 20, ABV: 0.20 },
				{ cask_type: 'Barrel', category: 'Speyside', AYS: 0, LOA: 20, ABV: 0.25 },
				{ cask_type: 'Barrel', category: 'Speyside', AYS: 0, LOA: 20, ABV: 0.18 },
				{ cask_type: 'Barrel', category: 'Speyside', AYS: 0, LOA: 20, ABV: 0.22 },
				{ cask_type: 'Barrel', category: 'Speyside', AYS: 0, LOA: 20, ABV: 0.21 },
			],
		},
		supplier_fee_rate: 0.025,
	};

	//---------------------------------------------------------------------
	it( `should create offerings`,
		async function ()
		{
			ASSERT.ok( AliceAccount );
			ASSERT.ok( BobAccount );

			AliceOffering = await AliceClient.Offerings.Create( AliceAccount.account_id, 'whiskey-casks' );
			ASSERT.ok( AliceOffering );
			AliceOffering = await AliceClient.Offerings.Update( AliceOffering.offering_id, SAMPLE_ASSET );
			ASSERT.ok( AliceOffering );
			AliceOffering = await AliceClient.Offerings.Activate( AliceOffering.offering_id );
			ASSERT.ok( AliceOffering );

			BobOffering = await BobClient.Offerings.Create( BobAccount.account_id, 'whiskey-casks' );
			ASSERT.ok( BobOffering );
			BobOffering = await BobClient.Offerings.Update( BobOffering.offering_id, SAMPLE_ASSET );
			ASSERT.ok( BobOffering );
			BobOffering = await BobClient.Offerings.Activate( BobOffering.offering_id );
			ASSERT.ok( BobOffering );

			return;
		} );


	//---------------------------------------------------------------------
	it( `should manipulate permissions`,
		async function ()
		{
			ASSERT.ok( AliceAccount );
			ASSERT.ok( BobAccount );

			// Alice gives Bob 'admin' permissions.
			var result = await AliceClient.Permissions.Set( AliceAccount.account_id, BobUser.user_id, 'admin' );
			ASSERT.ok( result );

			// List the permissions.
			var list = await AliceClient.Permissions.List( AliceAccount.account_id, BobUser.user_id );
			ASSERT.ok( list );
			ASSERT.equal( list.length, 2 );
			ASSERT.ok( list.find( item => ( item.user_id === AliceUser.user_id ) ) );
			ASSERT.ok( list.find( item => ( item.user_id === BobUser.user_id ) ) );

			// Alice revokes Bob 'admin' permissions.
			var result = await AliceClient.Permissions.Unset( AliceAccount.account_id, BobUser.user_id, 'admin' );
			ASSERT.ok( result );

			// List the permissions.
			var list = await AliceClient.Permissions.List( AliceAccount.account_id, BobUser.user_id );
			ASSERT.ok( list );
			ASSERT.equal( list.length, 1 );
			ASSERT.equal( list[ 0 ].user_id, AliceUser.user_id );
			ASSERT.equal( list[ 0 ].roles[ 0 ], 'owner' );

			return;
		} );


	//---------------------------------------------------------------------
	it( `should not allow an illegal elevation of permissions`,
		async function ()
		{
			ASSERT.ok( AliceAccount );
			ASSERT.ok( BobAccount );

			// Bob gives Alice 'user' permissions.
			var result = await BobClient.Permissions.Set( BobAccount.account_id, AliceUser.user_id, 'user' );
			ASSERT.ok( result );

			// Alice is able to view Bob's account.
			var account = await AliceClient.Accounts.Get( BobAccount.account_id );
			ASSERT.ok( account );
			ASSERT.equal( account.account_id, BobAccount.account_id );

			// Alice gives herself 'admin' permissions to Bob's account, and fails.
			try
			{
				var result = await AliceClient.Permissions.Set( BobAccount.account_id, AliceUser.user_id, 'admin' );
				ASSERT.fail( `Alice, with 'user' permissions was able to grant herself 'admin' permission.` );
			}
			catch ( error )
			{
				ASSERT.ok( error.message.endsWith( 'Not authorized to manage permissions for this account.' ) );
			}

			// Bob revokes Alice's 'user' permissions.
			var result = await BobClient.Permissions.Unset( BobAccount.account_id, AliceUser.user_id, 'user' );
			ASSERT.ok( result );

			return;
		} );


	//---------------------------------------------------------------------
	async function new_test_case( Client )
	{
		var test_case = {};
		test_case.Account = await Client.Accounts.Create();
		ASSERT.ok( test_case.Account );
		test_case.Offering = await Client.Offerings.Create( test_case.Account.account_id, 'whiskey-casks' );
		ASSERT.ok( test_case.Offering );
		test_case.Offering = await Client.Offerings.Update( test_case.Offering.offering_id, SAMPLE_ASSET );
		ASSERT.ok( test_case.Offering );
		test_case.Offering = await Client.Offerings.Activate( test_case.Offering.offering_id );
		ASSERT.ok( test_case.Offering );
		return test_case;
	}


	//---------------------------------------------------------------------
	async function test_permissions( Client, User, TestCase )
	{
		var test = {};

		try
		{
			test.GetAccount = false;
			var account = await Client.Accounts.Get( TestCase.Account.account_id );
			ASSERT.equal( account.account_id, TestCase.Account.account_id );
			ASSERT.ok( typeof account.account_name !== 'undefined' );
			ASSERT.ok( typeof account.balance !== 'undefined' );
			ASSERT.ok( typeof account.leverage !== 'undefined' );
			test.GetAccount = true;
		}
		catch ( error ) 
		{
			if ( !error.message.endsWith( 'Not authorized to view this account.' ) ) { throw error; }
		}

		try
		{
			test.GetAssets = false;
			var assets = await Client.Accounts.GetAssets( TestCase.Account.account_id );
			ASSERT.ok( assets );
			test.GetAssets = true;
		}
		catch ( error ) 
		{
			if ( !error.message.endsWith( 'Not authorized to view this account.' ) ) { throw error; }
		}

		try
		{
			test.GetOrders = false;
			var orders = await Client.Orders.List( TestCase.Account.account_id );
			ASSERT.ok( orders );
			test.GetOrders = true;
		}
		catch ( error ) 
		{
			if ( !error.message.endsWith( 'Not authorized to view this account.' ) ) { throw error; }
		}

		try
		{
			test.CreateOrder = false;
			test.CloseOrder = false;
			var order = await Client.Orders.Create(
				TestCase.Account.account_id,
				TestCase.Offering.offering_id,
				{
					order_type: 'sell',
					unit_count: 1,
					unit_price: 1,
					expiration: '*'
				} );
			ASSERT.ok( order );
			test.CreateOrder = true;
			var result = await Client.Orders.Close( order.order_id );
			ASSERT.ok( result );
			test.CloseOrder = true;
		}
		catch ( error ) 
		{
			if ( !error.message.endsWith( 'Not authorized to manage orders for this account.' ) ) { throw error; }
		}

		try
		{
			test.GetAudits = false;
			var audits = await Client.Accounts.GetAudits( TestCase.Account.account_id );
			ASSERT.ok( audits );
			test.GetAudits = true;
		}
		catch ( error ) 
		{
			if ( !error.message.endsWith( 'Not authorized to manage this account.' ) ) { throw error; }
		}

		try
		{
			test.RenameAccount = false;
			var result = await Client.Accounts.Rename( TestCase.Account.account_id, '**********' );
			ASSERT.ok( result );
			var result = await Client.Accounts.Rename( TestCase.Account.account_id, TestCase.Account.account_name );
			ASSERT.ok( result );
			test.RenameAccount = true;
		}
		catch ( error ) 
		{
			if ( !error.message.endsWith( 'Not authorized to rename this account.' ) ) { throw error; }
		}

		try
		{
			test.CreateOffering = false;
			test.DestroyOffering = false;
			var offering = await Client.Offerings.Create( TestCase.Account.account_id, 'whiskey-casks' );
			ASSERT.ok( offering );
			test.CreateOffering = true;
			var result = await Client.Offerings.Destroy( offering.offering_id );
			ASSERT.ok( result );
			test.DestroyOffering = true;
		}
		catch ( error ) 
		{
			if ( !error.message.endsWith( 'Not authorized to manage offerings for this account.' ) ) { throw error; }
		}

		try
		{
			test.PauseOffering = false;
			var result = await Client.Offerings.Pause( TestCase.Offering.offering_id );
			ASSERT.ok( result );
			test.PauseOffering = true;
		}
		catch ( error ) 
		{
			if ( !error.message.endsWith( 'Not authorized to manage offerings for this account.' ) ) { throw error; }
		}

		try
		{
			test.ActivateOffering = false;
			var result = await Client.Offerings.Activate( TestCase.Offering.offering_id );
			ASSERT.ok( result );
			test.ActivateOffering = true;
		}
		catch ( error ) 
		{
			if ( !error.message.endsWith( 'Not authorized to manage offerings for this account.' ) ) { throw error; }
		}

		try
		{
			test.GetPermissions = false;
			var list = await Client.Permissions.List( TestCase.Account.account_id );
			ASSERT.ok( list );
			test.GetPermissions = true;
		}
		catch ( error ) 
		{
			if ( !error.message.endsWith( 'Not authorized to manage permissions for this account.' ) ) { throw error; }
		}

		try
		{
			test.SetPermissions = false;
			test.UnsetPermissions = false;
			var result = await Client.Permissions.Set( TestCase.Account.account_id, User.user_id, 'admin' );
			ASSERT.ok( result );
			test.SetPermissions = true;
			var result = await Client.Permissions.Unset( TestCase.Account.account_id, User.user_id, 'admin' );
			ASSERT.ok( result );
			test.UnsetPermissions = true;
		}
		catch ( error ) 
		{
			if ( !error.message.endsWith( 'Not authorized to manage permissions for this account.' ) ) { throw error; }
		}

		return test;
	};


	//---------------------------------------------------------------------
	it( `should get the owner-ship of an account`,
		async function ()
		{
			// Create new account and offering.
			var test_case = await new_test_case( AliceClient );

			// Verify permissions.
			var list = await AliceClient.Permissions.List( test_case.Account.account_id );
			ASSERT.equal( list.length, 1 );

			// Test Permisisons
			var permissions = await test_permissions( AliceClient, AliceUser, test_case );
			ASSERT.equal( permissions.GetAccount, true );
			ASSERT.equal( permissions.GetAssets, true );
			ASSERT.equal( permissions.GetOrders, true );
			ASSERT.equal( permissions.CreateOrder, true );
			ASSERT.equal( permissions.CloseOrder, true );
			ASSERT.equal( permissions.GetAudits, true );
			ASSERT.equal( permissions.RenameAccount, true );
			ASSERT.equal( permissions.CreateOffering, true );
			ASSERT.equal( permissions.DestroyOffering, true );
			ASSERT.equal( permissions.PauseOffering, true );
			ASSERT.equal( permissions.ActivateOffering, true );
			ASSERT.equal( permissions.GetPermissions, true );
			ASSERT.equal( permissions.SetPermissions, true );
			ASSERT.equal( permissions.UnsetPermissions, true );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should get the admin-ship of an account`,
		async function ()
		{
			// Create new account and offering.
			var test_case = await new_test_case( AliceClient );

			// Alice gives Bob 'viewer' permissions.
			var result = await AliceClient.Permissions.Set( test_case.Account.account_id, BobUser.user_id, 'admin' );
			ASSERT.ok( result );

			// Verify permissions.
			var list = await AliceClient.Permissions.List( test_case.Account.account_id );
			ASSERT.equal( list.length, 2 );

			// Test Permisisons
			var permissions = await test_permissions( BobClient, BobUser, test_case );
			ASSERT.equal( permissions.GetAccount, true );
			ASSERT.equal( permissions.GetAssets, true );
			ASSERT.equal( permissions.GetOrders, true );
			ASSERT.equal( permissions.CreateOrder, true );
			ASSERT.equal( permissions.CloseOrder, true );
			ASSERT.equal( permissions.GetAudits, true );
			ASSERT.equal( permissions.RenameAccount, true );
			ASSERT.equal( permissions.CreateOffering, true );
			ASSERT.equal( permissions.DestroyOffering, true );
			ASSERT.equal( permissions.PauseOffering, true );
			ASSERT.equal( permissions.ActivateOffering, true );
			ASSERT.equal( permissions.GetPermissions, true );
			ASSERT.equal( permissions.SetPermissions, true );
			ASSERT.equal( permissions.UnsetPermissions, true );

			return;
		} );


	//---------------------------------------------------------------------
	it( `should get the user-ship of an account`,
		async function ()
		{
			// Create new account and offering.
			var test_case = await new_test_case( AliceClient );

			// Alice gives Bob 'viewer' permissions.
			var result = await AliceClient.Permissions.Set( test_case.Account.account_id, BobUser.user_id, 'user' );
			ASSERT.ok( result );

			// Verify permissions.
			var list = await AliceClient.Permissions.List( test_case.Account.account_id );
			ASSERT.equal( list.length, 2 );

			// Test Permisisons
			var permissions = await test_permissions( BobClient, BobUser, test_case );
			ASSERT.equal( permissions.GetAccount, true );
			ASSERT.equal( permissions.GetAssets, true );
			ASSERT.equal( permissions.GetOrders, true );
			ASSERT.equal( permissions.CreateOrder, true );
			ASSERT.equal( permissions.CloseOrder, true );
			ASSERT.equal( permissions.GetAudits, false );
			ASSERT.equal( permissions.RenameAccount, false );
			ASSERT.equal( permissions.CreateOffering, false );
			ASSERT.equal( permissions.DestroyOffering, false );
			ASSERT.equal( permissions.PauseOffering, false );
			ASSERT.equal( permissions.ActivateOffering, false );
			ASSERT.equal( permissions.GetPermissions, false );
			ASSERT.equal( permissions.SetPermissions, false );
			ASSERT.equal( permissions.UnsetPermissions, false );

			return;
		} );


	//---------------------------------------------------------------------
	it( `should get the viewer-ship of an account`,
		async function ()
		{
			// Create new account and offering.
			var test_case = await new_test_case( AliceClient );

			// Alice gives Bob 'viewer' permissions.
			var result = await AliceClient.Permissions.Set( test_case.Account.account_id, BobUser.user_id, 'viewer' );
			ASSERT.ok( result );

			// Verify permissions.
			var list = await AliceClient.Permissions.List( test_case.Account.account_id );
			ASSERT.equal( list.length, 2 );

			// Test Permisisons
			var permissions = await test_permissions( BobClient, BobUser, test_case );
			ASSERT.equal( permissions.GetAccount, true );
			ASSERT.equal( permissions.GetAssets, true );
			ASSERT.equal( permissions.GetOrders, true );
			ASSERT.equal( permissions.CreateOrder, false );
			ASSERT.equal( permissions.CloseOrder, false );
			ASSERT.equal( permissions.GetAudits, false );
			ASSERT.equal( permissions.RenameAccount, false );
			ASSERT.equal( permissions.CreateOffering, false );
			ASSERT.equal( permissions.DestroyOffering, false );
			ASSERT.equal( permissions.PauseOffering, false );
			ASSERT.equal( permissions.ActivateOffering, false );
			ASSERT.equal( permissions.GetPermissions, false );
			ASSERT.equal( permissions.SetPermissions, false );
			ASSERT.equal( permissions.UnsetPermissions, false );

			return;
		} );


	//---------------------------------------------------------------------
	it( `should not allow anonymous access to an account`,
		async function ()
		{
			// Create new account and offering.
			var test_case = await new_test_case( AliceClient );

			// Verify permissions.
			var list = await AliceClient.Permissions.List( test_case.Account.account_id );
			ASSERT.equal( list.length, 1 );

			// Test Permisisons
			var permissions = await test_permissions( BobClient, BobUser, test_case );
			ASSERT.equal( permissions.GetAccount, false );
			ASSERT.equal( permissions.GetAssets, false );
			ASSERT.equal( permissions.GetOrders, false );
			ASSERT.equal( permissions.CreateOrder, false );
			ASSERT.equal( permissions.CloseOrder, false );
			ASSERT.equal( permissions.GetAudits, false );
			ASSERT.equal( permissions.RenameAccount, false );
			ASSERT.equal( permissions.CreateOffering, false );
			ASSERT.equal( permissions.DestroyOffering, false );
			ASSERT.equal( permissions.PauseOffering, false );
			ASSERT.equal( permissions.ActivateOffering, false );
			ASSERT.equal( permissions.GetPermissions, false );
			ASSERT.equal( permissions.SetPermissions, false );
			ASSERT.equal( permissions.UnsetPermissions, false );

			return;
		} );


	//---------------------------------------------------------------------
	return;
} );
