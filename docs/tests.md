# @spiritex/exchange-client

> Version: 0.2.6

# Test Results

```


  100) Server Tests
    ✔ should authenticate (982ms)
    ✔ should get server info
    ✔ should get asset type
    ✔ should get user
    ✔ should lookup user (17ms)

  200) Accounts Tests
    ✔ should authenticate (899ms)
    ✔ should create an account (33ms)
    ✔ should get an account
    ✔ should list accounts (43ms)
    ✔ should rename an account (59ms)
    ✔ should deposit funds to an account (15ms)
    ✔ should withdraw funds from an account (13ms)

  900) Permissions Tests
    ✔ should authenticate (1493ms)
    ✔ should create accounts (34ms)
    ✔ should create offerings (143ms)
    ✔ should manipulate permissions (41ms)
    ✔ should not allow an illegal elevation of permissions (39ms)
    ✔ should get the owner-ship of an account (312ms)
    ✔ should get the admin-ship of an account (353ms)
    ✔ should get the user-ship of an account (271ms)
    ✔ should get the viewer-ship of an account (204ms)
    ✔ should not allow anonymous access to an account (176ms)

  999) Market Flow Test
    ✔ should sign in (976ms)
    ✔ should create an account (58ms)
    ✔ should rename an account (62ms)
    ✔ should deposit funds to an account (13ms)
    ✔ should withdraw funds from an account (13ms)
    ✔ should create a 'whiskey-casks' offering (11ms)
    ✔ should update an offering (17ms)
    ✔ should activate an offering (64ms)
    ✔ should issue a sale order that expires immediately (51ms)
    ✔ should issue a sale order that doesn't expire (33ms)
    ✔ should create another account (28ms)
    ✔ should create a buy order that will partially fill the sell order (92ms)
    ✔ should create another buy order that will completely fill the sell order (106ms)


  35 passing (7s)

```
