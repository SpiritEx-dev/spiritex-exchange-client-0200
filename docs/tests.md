# @spiritex/exchange-client

> Version: 0.2.5

# Test Results

```


  100) Server Tests
    ✔ should authenticate (805ms)
    ✔ should get server info
    ✔ should get asset type
    ✔ should get user
    ✔ should lookup user (17ms)

  200) Accounts Tests
    ✔ should authenticate (753ms)
    ✔ should create an account (33ms)
    ✔ should get an account
    ✔ should list accounts (51ms)
    ✔ should rename an account (56ms)
    ✔ should deposit funds to an account (14ms)
    ✔ should withdraw funds from an account (13ms)

  900) Permissions Tests
    ✔ should authenticate (1297ms)
    ✔ should create accounts (34ms)
    ✔ should create offerings (147ms)
    ✔ should manipulate permissions (38ms)
    ✔ should not allow an illegal elevation of permissions (38ms)
    ✔ should get the owner-ship of an account (307ms)
    ✔ should get the admin-ship of an account (324ms)
    ✔ should get the user-ship of an account (279ms)
    ✔ should get the viewer-ship of an account (211ms)
    ✔ should not allow anonymous access to an account (178ms)

  999) Market Flow Test
    ✔ should sign in (787ms)
    ✔ should create an account (31ms)
    ✔ should rename an account (56ms)
    ✔ should deposit funds to an account (13ms)
    ✔ should withdraw funds from an account (15ms)
    ✔ should create a 'whiskey-casks' offering (11ms)
    ✔ should update an offering (18ms)
    ✔ should activate an offering (61ms)
    ✔ should issue a sale order that expires immediately (52ms)
    ✔ should issue a sale order that doesn't expire (34ms)
    ✔ should create another account (28ms)
    ✔ should create a buy order that will partially fill the sell order (89ms)
    ✔ should create another buy order that will completely fill the sell order (106ms)


  35 passing (6s)

```
