# <%- Context.Package.name %>

------------------------------------------
> ***<%- Context.Package.description %>***
>
> Version: <%- Context.Package.version %>
>
> Code: [<%- Context.Package.repository.url %>](<%- Context.Package.repository.url %>)
>
> Docs: [<%- Context.Package.homepage %>](<%- Context.Package.homepage %>)
------------------------------------------

This is a client for the SpiritEx Market Exchange API.
SpiritEx Market is an online exchange for trading whiskey as portions of casks.
This client allows you to connect to and interact with a running SpiritEx Market instance.

You will need to have a pre-existing user login on the SpiritEx Market Server
 you wish to connect to.
This can only be done via the SpiritEx Market Website.

All account funding actions must also performed via the SpiritEx Market Website.


## Developer Resources

| **Resource**  	| **Location**                                          	|
|---------------	|-------------------------------------------------------	|
| Documentation 	| https://docs.spiritex.live                            	|
| Testing Website  	| https://market.spiritex.live                          	|
| Testing Server   	| https://market-api.spiritex.live                      	|
| Source Code   	| https://github.com/@SpiritEx/SpiritEx-Exchange-Client 	|
| Npm Package   	| https://www.npmjs.com/package/@spiritex/exchange-client 	|
| JSDelivr Package 	| https://www.jsdelivr.com/package/npm/@spiritex/exchange-client	|

## Getting Started

SpiritEx Exchange Client is designed to be used both in NodeJS as well as the browser.


### Using with NodeJS

The Exchange Client is distributed as an NPM module and can be installed into your environment.

```shell
npm install --save @spiritex/exchange-client
```

The Exchange Client must be initialized by calling `Authenticate()`.

```js
const ClientFactory = require( '@spiritex/exchange-client' );
const Client = ClientFactory( ServerUrl, ClientOptions );
const session_user = Client.Authenticate( 'user@email', 'password' );
```


### Using in a Browser

The Exchange Client can be downloaded from an unpackaging service.

```html
<script
	type='text/javascript'
	src='https://unpkg.com/@spiritex/exchange-client@latest/ExchangeClient.js'
/>
```

The Exchange Client must be initialized by calling `Connect()`.
Exchange Client expects a properly configured Clerk instance to be available in `window`.

```js
var Client = window.SpiritEx.NewExchangeClient( ServerUrl, ClientOptions );
var session_user = Client.Connect();
```


### Create an Instance of an Exchange Client

In both NodeJS and browser environments, you will need to specify the `ServerUrl` 
 of the SpiritEx Market server to connect to.

You can also provide some initialization options in the `ClientOptions` parameter.

```js
ClientOptions = {
	log_requests: false,
	log_responses: false,
	throw_handled_errors: false,
	GlobalCallback: null, // async function ( Err, Result ) { ... }
}
```


### Some Publicly Accessible Functions

There are certain functions which do not require authentication.
(you do not have to call `Authenticate()` or `Connect()` first)
These functions are publicly available and callable.

Some server information is publicly available.

- `Client.Server.GetServerInfo()`
- `Client.Server.GetServerError()`
- `Client.Server.GetAssetType( AssetType )`

Limited information about Offerings are also publicly available.

- `Client.PublicOfferings.List()`
- `Client.PublicOfferings.Get( OfferingID )`
- `Client.PublicOfferings.GetMarket( OfferingID )`


## Exchange Client Reference


### Server Functions

- `Client.Server.GetServerInfo()`
- `Client.Server.GetServerError()`
- `Client.Server.GetAssetType( AssetType )`
- `Client.Server.GetUser()`
- `Client.Server.LookupUser( EmailAddress )`


### Public Offerings

- `Client.PublicOfferings.List()`
- `Client.PublicOfferings.Get( OfferingID )`
- `Client.PublicOfferings.GetMarket( OfferingID )`


### Accounts

- `Client.Accounts.List()`
- `Client.Accounts.Get( AccountID )`
- `Client.Accounts.Create()`
- `Client.Accounts.Destroy( AccountID )`
- `Client.Accounts.Rename( AccountID, AccountName )`
- `Client.Accounts.GetAssets( AccountID )`
- `Client.Accounts.GetAssetSummary( AccountID )`
- `Client.Accounts.GetAudits( AccountID )`
- `Client.Accounts.Funding( AccountID, FundingAction, FundingInfo )`


### Offerings

- `Client.Offerings.List( AccountID )`
- `Client.Offerings.Get( OfferingID )`
- `Client.Offerings.Create( AccountID, AssetType )`
- `Client.Offerings.Destroy( OfferingID )`
- `Client.Offerings.Update( OfferingID, OfferingInfo )`
- `Client.Offerings.Activate( OfferingID )`
- `Client.Offerings.Pause( OfferingID )`


### Orders

- `Client.Orders.List( AccountID, IncludeClosed )`
- `Client.Orders.Get( OrderID )`
- `Client.Orders.Create( AccountID, OfferingID, OrderInfo )`
- `Client.Orders.Close( OrderID )`
- `Client.Orders.GetTransactions( OrderID )`


### Permissions

- `Client.Permissions.List( AccountID )`
- `Client.Permissions.Set( AccountID, UserID, Permission )`
- `Client.Permissions.Unset( AccountID, UserID, Permission )`


