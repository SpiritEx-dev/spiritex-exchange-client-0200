'use strict';

const ASSERT = require( 'assert' );

const CONFIG = require( './~test-config' );
const EXCHANGE_CLIENT = require( '../src/ExchangeClient' );


//---------------------------------------------------------------------
describe( `999) Market Flow Test`, function ()
{


	//---------------------------------------------------------------------
	var AliceClient = EXCHANGE_CLIENT( CONFIG.ClientConfig.server_url );
	var AliceUser = null;
	var SupplierAccount = null;
	var SupplierOffering = null;
	var RetailAccount = null;


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
	it( `should sign in`,
		async function ()
		{
			AliceUser = await AliceClient.Authenticate(
				CONFIG.Credentials.Alice.email_address,
				CONFIG.Credentials.Alice.password,
			);
			ASSERT.ok( AliceUser );
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
	it( `should rename an account`,
		async function ()
		{
			ASSERT.ok( SupplierAccount );

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
	it( `should create a 'whiskey-casks' offering`,
		async function ()
		{
			ASSERT.ok( SupplierAccount );

			SupplierOffering = await AliceClient.Offerings.Create( SupplierAccount.account_id, 'whiskey-casks' );
			ASSERT.ok( SupplierOffering );
			ASSERT.equal( SupplierOffering.offering_status, 'draft' );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should update an offering`,
		async function ()
		{
			ASSERT.ok( SupplierAccount );
			ASSERT.ok( SupplierOffering );

			SupplierOffering = await AliceClient.Offerings.Update( SupplierOffering.offering_id, {
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
			} );

			ASSERT.ok( SupplierOffering );
			ASSERT.equal( SupplierOffering.offering_status, 'draft' );
			ASSERT.equal( SupplierOffering.asset_count, 100 );
			ASSERT.equal( SupplierOffering.supplier_fee_rate, 0.025 );

			ASSERT.ok( SupplierOffering.asset_info );
			ASSERT.equal( SupplierOffering.asset_info.validation_errors.length, 0 );
			ASSERT.equal( SupplierOffering.asset_info.bottle_volume, 750 );
			ASSERT.equal( SupplierOffering.asset_info.bottle_count, 100 );
			ASSERT.equal( SupplierOffering.asset_info.reserve_percent, 0.25 );
			ASSERT.equal( SupplierOffering.asset_info.total_liters, 100 );
			ASSERT.equal( SupplierOffering.asset_info.available_liters, 75 );
			ASSERT.equal( SupplierOffering.asset_info.alcohol_percent, 0.212 );
			ASSERT.equal( SupplierOffering.asset_info.Casks.length, 5 );

			return;
		} );


	//---------------------------------------------------------------------
	it( `should activate an offering`,
		async function ()
		{
			ASSERT.ok( SupplierAccount );
			ASSERT.ok( SupplierOffering );

			SupplierOffering = await AliceClient.Offerings.Activate( SupplierOffering.offering_id );

			ASSERT.ok( SupplierOffering );
			ASSERT.equal( SupplierOffering.offering_status, 'active' );
			ASSERT.equal( SupplierOffering.asset_count, 100 );
			ASSERT.equal( SupplierOffering.supplier_fee_rate, 0.025 );

			ASSERT.ok( SupplierOffering.asset_info );
			ASSERT.equal( SupplierOffering.asset_info.validation_errors.length, 0 );
			ASSERT.equal( SupplierOffering.asset_info.bottle_volume, 750 );
			ASSERT.equal( SupplierOffering.asset_info.bottle_count, 100 );
			ASSERT.equal( SupplierOffering.asset_info.reserve_percent, 0.25 );
			ASSERT.equal( SupplierOffering.asset_info.total_liters, 100 );
			ASSERT.equal( SupplierOffering.asset_info.available_liters, 75 );
			ASSERT.equal( SupplierOffering.asset_info.alcohol_percent, 0.212 );
			ASSERT.equal( SupplierOffering.asset_info.Casks.length, 5 );

			var account_assets = await AliceClient.Accounts.GetAssets( SupplierAccount.account_id );
			ASSERT.ok( account_assets );
			ASSERT.equal( account_assets.length, 100 );

			return;
		} );


	//---------------------------------------------------------------------
	it( `should issue a sale order that expires immediately`,
		async function ()
		{
			ASSERT.ok( SupplierAccount );
			ASSERT.ok( SupplierOffering );

			var order = await AliceClient.Orders.Create(
				SupplierAccount.account_id,
				SupplierOffering.offering_id,
				{
					order_type: 'sell',
					unit_count: 10,
					unit_price: 4200,
				} );

			ASSERT.ok( order );
			ASSERT.equal( order.order_type, 'sell' );
			ASSERT.equal( order.offering_id, SupplierOffering.offering_id );
			ASSERT.equal( order.account_id, SupplierAccount.account_id );
			ASSERT.equal( order.user_id, AliceUser.user_id );
			ASSERT.equal( order.unit_count, 10 );
			ASSERT.equal( order.unit_price, 4200 );
			ASSERT.equal( order.expiration, '' );
			ASSERT.equal( order.fill_count, 0 );
			ASSERT.equal( order.order_status, 'closed' );

			return;
		} );


	//---------------------------------------------------------------------
	it( `should issue a sale order that doesn't expire`,
		async function ()
		{
			ASSERT.ok( SupplierAccount );
			ASSERT.ok( SupplierOffering );

			var order = await AliceClient.Orders.Create(
				SupplierAccount.account_id,
				SupplierOffering.offering_id,
				{
					order_type: 'sell',
					unit_count: 10,
					unit_price: 4200,
					expiration: '*',
				} );

			ASSERT.ok( order );
			ASSERT.equal( order.order_type, 'sell' );
			ASSERT.equal( order.offering_id, SupplierOffering.offering_id );
			ASSERT.equal( order.account_id, SupplierAccount.account_id );
			ASSERT.equal( order.user_id, AliceUser.user_id );
			ASSERT.equal( order.unit_count, 10 );
			ASSERT.equal( order.unit_price, 4200 );
			ASSERT.equal( order.expiration, '*' );
			ASSERT.equal( order.fill_count, 0 );
			ASSERT.equal( order.order_status, 'open' );

			return;
		} );


	//---------------------------------------------------------------------
	it( `should create another account`,
		async function ()
		{
			RetailAccount = await AliceClient.Accounts.Create();
			ASSERT.ok( RetailAccount );
			RetailAccount = await AliceClient.Accounts.TestDeposit( RetailAccount.account_id, ( 10000 * 100 ) );
			ASSERT.ok( RetailAccount );
			ASSERT.equal( RetailAccount.balance, 1000000 );
			return;
		} );


	//---------------------------------------------------------------------
	it( `should create a buy order that will partially fill the sell order`,
		async function ()
		{
			ASSERT.ok( SupplierAccount );
			ASSERT.ok( SupplierOffering );
			ASSERT.ok( RetailAccount );

			SupplierAccount = await AliceClient.Accounts.Get( SupplierAccount.account_id );
			ASSERT.ok( SupplierAccount );
			var supplier_balance = SupplierAccount.balance;

			RetailAccount = await AliceClient.Accounts.Get( RetailAccount.account_id );
			ASSERT.ok( RetailAccount );
			var retail_balance = RetailAccount.balance;

			var order = await AliceClient.Orders.Create(
				RetailAccount.account_id,
				SupplierOffering.offering_id,
				{
					order_type: 'buy',
					unit_count: 1,
					unit_price: 4200,
					expiration: '*',
				} );

			ASSERT.ok( order );
			ASSERT.equal( order.order_type, 'buy' );
			ASSERT.equal( order.offering_id, SupplierOffering.offering_id );
			ASSERT.equal( order.account_id, RetailAccount.account_id );
			ASSERT.equal( order.user_id, AliceUser.user_id );
			ASSERT.equal( order.unit_count, 1 );
			ASSERT.equal( order.unit_price, 4200 );
			ASSERT.equal( order.expiration, '*' );
			ASSERT.equal( order.fill_count, 1 );
			ASSERT.equal( order.order_status, 'closed' );

			var transactions = await AliceClient.Orders.GetTransactions( order.order_id );
			for ( var index = 0; index < transactions.length; index++ )
			{
				var transaction = transactions[ index ];
				var transaction_value = transaction.unit_count * transaction.unit_price;
				ASSERT.equal( transaction.supplier_fees, Math.ceil( transaction_value * SupplierOffering.supplier_fee_rate ) );
				supplier_balance += transaction.supplier_fees;
				supplier_balance += transaction_value; //  supplier is also the seller.
				retail_balance -= transaction_value + transaction.agency_fees + transaction.supplier_fees;
			}

			SupplierAccount = await AliceClient.Accounts.Get( SupplierAccount.account_id );
			ASSERT.ok( SupplierAccount );
			ASSERT.equal( SupplierAccount.balance, supplier_balance );

			RetailAccount = await AliceClient.Accounts.Get( RetailAccount.account_id );
			ASSERT.ok( RetailAccount );
			ASSERT.equal( RetailAccount.balance, retail_balance );

			return;
		} );


	//---------------------------------------------------------------------
	it( `should create another buy order that will completely fill the sell order`,
		async function ()
		{
			ASSERT.ok( SupplierAccount );
			ASSERT.ok( SupplierOffering );
			ASSERT.ok( RetailAccount );

			SupplierAccount = await AliceClient.Accounts.Get( SupplierAccount.account_id );
			ASSERT.ok( SupplierAccount );
			var supplier_balance = SupplierAccount.balance;

			RetailAccount = await AliceClient.Accounts.Get( RetailAccount.account_id );
			ASSERT.ok( RetailAccount );
			var retail_balance = RetailAccount.balance;

			var order = await AliceClient.Orders.Create(
				RetailAccount.account_id,
				SupplierOffering.offering_id,
				{
					order_type: 'buy',
					unit_count: 100,
					unit_price: 4200,
					expiration: '',
				} );
			ASSERT.ok( order );
			ASSERT.equal( order.order_type, 'buy' );
			ASSERT.equal( order.offering_id, SupplierOffering.offering_id );
			ASSERT.equal( order.account_id, RetailAccount.account_id );
			ASSERT.equal( order.user_id, AliceUser.user_id );
			ASSERT.equal( order.unit_count, 100 );
			ASSERT.equal( order.unit_price, 4200 );
			ASSERT.equal( order.expiration, '' );
			ASSERT.equal( order.fill_count, 9 );
			ASSERT.equal( order.order_status, 'closed' );

			var transactions = await AliceClient.Orders.GetTransactions( order.order_id );
			for ( var index = 0; index < transactions.length; index++ )
			{
				var transaction = transactions[ index ];
				var transaction_value = transaction.unit_count * transaction.unit_price;
				ASSERT.equal( transaction.supplier_fees, Math.ceil( transaction_value * SupplierOffering.supplier_fee_rate ) );
				supplier_balance += transaction.supplier_fees;
				supplier_balance += transaction_value; //  supplier is also the seller.
				retail_balance -= transaction_value + transaction.agency_fees + transaction.supplier_fees;
			}

			SupplierAccount = await AliceClient.Accounts.Get( SupplierAccount.account_id );
			ASSERT.ok( SupplierAccount );
			ASSERT.equal( SupplierAccount.balance, supplier_balance );

			RetailAccount = await AliceClient.Accounts.Get( RetailAccount.account_id );
			ASSERT.ok( RetailAccount );
			ASSERT.equal( RetailAccount.balance, retail_balance );

			return;
		} );


	//---------------------------------------------------------------------
	return;
} );
