# @spiritex/exchange-client

> Version: 0.2.8

# Test Results

```


  100) Server Tests
    ✔ should authenticate (812ms)
    ✔ should get server info
    ✔ should get asset type
    ✔ should get user
    ✔ should lookup user (16ms)

  200) Accounts Tests
    ✔ should authenticate (704ms)
    ✔ should create an account (36ms)
    ✔ should get an account
    ✔ should list accounts (12ms)
    ✔ should rename an account (27ms)
    ✔ should deposit funds to an account (14ms)
    ✔ should withdraw funds from an account (15ms)

  900) Permissions Tests
    ✔ should authenticate (1391ms)
    ✔ should create accounts (46ms)
    ✔ should create offerings (157ms)
    ✔ should manipulate permissions (38ms)
    ✔ should not allow an illegal elevation of permissions (38ms)
    ✔ should get the owner-ship of an account (452ms)
    ✔ should get the admin-ship of an account (459ms)
    ✔ should get the user-ship of an account (372ms)
    ✔ should get the viewer-ship of an account (244ms)
    ✔ should not allow anonymous access to an account (180ms)

  999) Market Flow Test
    ✔ should sign in (737ms)
    ✔ should create an account (31ms)
    ✔ should rename an account (23ms)
    ✔ should deposit funds to an account (15ms)
    ✔ should withdraw funds from an account (14ms)
    ✔ should create a 'whiskey-casks' offering (11ms)
    ✔ should update an offering (16ms)
    ✔ should activate an offering (85ms)
    ✔ should issue a sale order that expires immediately (117ms)
    ✔ should issue a sale order that doesn't expire (82ms)
    ✔ should create another account (38ms)
    ✔ should create a buy order that will partially fill the sell order (155ms)
    ✔ should create another buy order that will completely fill the sell order (185ms)


  35 passing (7s)

```
