# spiritex-exchange-client

> Version: 0.2.4

# Test Results

```


  100) Server Tests
    ✔ should authenticate (973ms)
    ✔ should get server info
    ✔ should get asset type
    ✔ should get user
    ✔ should lookup user (17ms)

  200) Accounts Tests
    ✔ should authenticate (865ms)
    ✔ should create an account (35ms)
    ✔ should get an account
    ✔ should list accounts (45ms)
    ✔ should rename an account (53ms)
    ✔ should deposit funds to an account (14ms)
    ✔ should withdraw funds from an account (14ms)

  900) Permissions Tests
    ✔ should authenticate (1345ms)
    ✔ should create accounts (48ms)
    ✔ should create offerings (144ms)
    ✔ should manipulate permissions (46ms)
    ✔ should not allow an illegal elevation of permissions (39ms)
    ✔ should get the owner-ship of an account (318ms)
    ✔ should get the admin-ship of an account (353ms)
    ✔ should get the user-ship of an account (267ms)
    ✔ should get the viewer-ship of an account (217ms)
    ✔ should not allow anonymous access to an account (176ms)

  999) Market Flow Test
    ✔ should sign in (579ms)
    ✔ should create an account (31ms)
    ✔ should rename an account (54ms)
    ✔ should deposit funds to an account (14ms)
    ✔ should withdraw funds from an account (14ms)
    ✔ should create a 'whiskey-casks' offering (11ms)
    ✔ should update an offering (17ms)
    ✔ should activate an offering (65ms)
    ✔ should issue a sale order that expires immediately (53ms)
    ✔ should issue a sale order that doesn't expire (34ms)
    ✔ should create another account (28ms)
    ✔ should create a buy order that will partially fill the sell order (87ms)
    ✔ should create another buy order that will completely fill the sell order (97ms)


  35 passing (6s)

```
