# @spiritex/exchange-client

> Version: 0.2.7

# Test Results

```


  100) Server Tests
    ✔ should authenticate (973ms)
    ✔ should get server info
    ✔ should get asset type
    ✔ should get user
    ✔ should lookup user (19ms)

  200) Accounts Tests
    ✔ should authenticate (653ms)
    ✔ should create an account (24ms)
    ✔ should get an account (12ms)
    ✔ should list accounts
    ✔ should rename an account (24ms)
    ✔ should deposit funds to an account (17ms)
    ✔ should withdraw funds from an account (17ms)

  900) Permissions Tests
    ✔ should authenticate (1309ms)
    ✔ should create accounts (31ms)
    ✔ should create offerings (166ms)
    ✔ should manipulate permissions (42ms)
    ✔ should not allow an illegal elevation of permissions (39ms)
    ✔ should get the owner-ship of an account (1766ms)
    ✔ should get the admin-ship of an account (374ms)
    ✔ should get the user-ship of an account (278ms)
    ✔ should get the viewer-ship of an account (218ms)
    ✔ should not allow anonymous access to an account (173ms)

  999) Market Flow Test
    ✔ should sign in (636ms)
    ✔ should create an account (36ms)
    ✔ should rename an account (20ms)
    ✔ should deposit funds to an account (14ms)
    ✔ should withdraw funds from an account (14ms)
    ✔ should create a 'whiskey-casks' offering (12ms)
    ✔ should update an offering (18ms)
    ✔ should activate an offering (50ms)
    ✔ should issue a sale order that expires immediately (73ms)
    ✔ should issue a sale order that doesn't expire (58ms)
    ✔ should create another account (29ms)
    ✔ should create a buy order that will partially fill the sell order (348ms)
    ✔ should create another buy order that will completely fill the sell order (130ms)


  35 passing (8s)

```
