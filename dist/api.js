
/*!
* Walrus-compatible exchange API js layer
*
* Copyright Lynxline LLC, yshurik, 2019-2025,
* Common Clause license https://commonsclause.com/
*/

/*!
 * STARTUP API
 */

/*!
 * Start the system. 
 * Initialize the data and start the sync.
 * If there is valid non-expired jwt token in cookies, 
 * then user data is loaded from the server and login is not required
 * (still login key is not initialized and user needs to be asked for the password on first api call)
 * 
 * @param {object} callbacks
 * @param {function} callbacks.on_sync_connecting() - show "syncing...", hide all visible data
 * @param {function} callbacks.on_sync_connection_lost() - to indicate error from sync connection lost
 * @param {function} callbacks.on_sync_connection_error(err) - report error from call_init() data initialization
 * @param {function} callbacks.on_sync_data_init - data init is complete, can now fill gui with datas (get calls)
 * @param {function} callbacks.on_sync_ready - data init and sync connection established - switch to "ready" state
 * @param {function} callbacks.on_sync_message - handle sync messages
 * @param {function} callbacks.on_sync_data_update - notify about data updates
 *   available data:
 *     - login()
 *     - logout()
 *     - market(market)
 *     - coininfo(coininfo)
 *     - buys(market_name, coina, coinb, buys), buys - see details in get_buys()
 *     - sells(market_name, coina, coinb, sells), sells - see details in get_sells()
 *     - trades(market_name, coina, coinb, trades), trades - see details in get_trades()
 *     - balance(coin, balance)
 *     - txouts(coin, txouts)
 *     - user_buys(market_name, coina, coinb, buys), buys - see details in get_buys()
 *     - user_sells(market_name, coina, coinb, sells), sells - see details in get_sells()
 *     - user_trades(market_name, coina, coinb, trades), trades - see details in get_trades()
 * @returns null
 */
ychapi.start = function(base_uri, callbacks) {
  return ychapi._start(base_uri, callbacks);
};

/*!
 * Request the server for initial data.
 * It is called automatically on start().
 * Use only for cases like logout or force data reload.
 * @returns {Promise}
 * - resolved (no data)
 * - rejected with the error from the server
 */
ychapi.call_init = async function() {
  return ychapi._call_init();
};

/*!
 * Process the login and initialize data same as start()/call_init().
 * @param {string} login
 * @param {string} pass
 * @param {string} otp_code (2FA)
 * @returns {Promise}
 * - resolved (no data)
 * - rejected with the error from the server
 * @security
 * - pass is not sent to the server
 * - login/pass converted to uprvk/upubk and kept in memory (login key)
 */
ychapi.call_login = async function(login, pass, otp_code) {
  return ychapi._call_login(login, pass, otp_code);
};

/*!
 * Logout: clear the user data and remove jwt from cookies.
 * @returns null
 */
ychapi.call_logout = async function() {
  return ychapi._call_logout();
};

/*!
 * GET DATA API
 */

/*!
 * Get the server-sorted-ordered list of coin names
 * @returns {string[]}
 */
ychapi.get_coin_names = function() {
  return ychapi._get_coin_names();
};

/*!
 * Get the coininfo by coin name
 * @param {string} coin
 * @returns {object}
 */
ychapi.get_coin_info = function(coin) {
  return ychapi._get_coin_info(coin);
};

/*!
 * Get the server-sorted-ordered list of market groups names
 * @returns {string[]}
 */
ychapi.get_markets_groups_names = function() {
  return ychapi._get_markets_groups_names();
};

/*!
 * Get the market group by group name
 * @param {string} group_name
 * @returns {object}
 */
ychapi.get_market_group = function(group_name) {
  return ychapi._get_market_group(group_name);
};

/*!
 * Get the market group by coinb (grouped by coinb)
 * @param {string} coinb
 * @returns {object}
 */
ychapi.get_market_group_by_coinb = function(coinb) {
  return ychapi._get_market_group_by_coinb(coinb);
};

/*!
 * Get the list of markets names in a group
 * @param {string} group_name
 * @returns {string[]}
 */
ychapi.get_markets_names_in_group = function(group_name) {
  return ychapi._get_markets_names_in_group(group_name);
};

/*!
 * Get the server-sorted-ordered list of markets names
 * @returns {string[]}
 */
ychapi.get_markets_names = function() {
  return ychapi._get_markets_names();
};

/*!
 * Get the market info by market name
 * @param {string} market_name
 * @returns {object}
 */
ychapi.get_market_info = function(market_name) {
  return ychapi._get_market_info(market_name);
};

/*!
 * Get the coin balance by coin name
 * @param {string} coin
 * @returns {Balance object}
 * {
 *   coin: {string} - coin name
 *   sum: {BigInt} - total amount
 *   free: {BigInt} - available amount for operations
 *   debit: {BigInt} - debit (others owe to the user)
 *   credit: {BigInt} - credit (the user owes to others)
 *   txouts: {BigInt} - txouts sum
 *   offtrade: {BigInt} - allocated txouts, (can not trade)
 *   orders: {BigInt} - orders sum
 *   ordersindebit: {BigInt} - orders in debit sum
 *   ordersintxouts: {BigInt} - orders in txouts sum
 *   deposits: {BigInt} - deposits in processing sum
 *   withdraws: {BigInt} - withdrawals in processing sum
 *   clearance: {BigInt} - processing now sum (a change on the blockchain)
 *   cycle: {number} - cycle number for peg-based coins (peg_t1)
 * }
 */
ychapi.get_coin_balance = function(coin) {
  return ychapi._get_coin_balance(coin);
};

/*!
 * Get the coin usd rate by coin name
 * @param {string} coin
 * @returns {number} one coin value estimate in usd
 */
ychapi.get_coin_usd_rate = function(coin) {
  return ychapi._get_coin_usd_rate(coin);
};

/*!
 * Get deposits by coin name
 * @param {string} coin
 * @returns {object[]}
 */
ychapi.get_coin_deposits = function(coin) {
  return ychapi._get_coin_deposits(coin);
};

/*!
 * Get withdrawals by coin name
 * @param {string} coin
 * @returns {object[]}
 */
ychapi.get_coin_withdrawals = function(coin) {
  return ychapi._get_coin_withdrawals(coin);
};

/*!
 * Get txouts by coin name
 * @param {string} coin
 * @returns {object[]}
 */
ychapi.get_coin_txouts = function(coin) {
  return ychapi._get_coin_txouts(coin);
};

/*!
 * REGISTRATION API
 */

/*!
 * Register a new user
 * @param {string} login - the login
 * @param {string} pass - the password
 * @param {string} invitation_code - the invitation code
 * @returns {Promise}
 * - resolved (no data)
 * - rejected with the error from the server
 * @security
 * - pass is not sent to the server
 * - login/pass are not kept in memory
 */
ychapi.call_register = async function(login, pass, invitation_code) {
  return ychapi._call_register(login, pass, invitation_code);
};

/*!
 * Get the email from the redeem code
 * @param {string} redeem_code - the redeem code
 * @returns {Promise}
 * - resolved with the email {string} from the server, 
 * - rejected with the error from the server
 */
ychapi.call_get_email_from_redeem = async function(redeem_code) {
  return ychapi._call_get_email_from_redeem(redeem_code);
};

/*!
 * Get the login from the registration code
 * @param {string} code - the confirmation code from email
 * @returns {Promise}
 * - resolved with the login {string} from the server, 
 * - rejected with the error from the server
 */
ychapi.call_get_registration_login = async function(code) {
  return ychapi._call_get_registration_login(code);
};

/*!
 * Confirm the registration login and get the 2FA setup data
 * @param {string} login - the login
 * @param {string} pass - the password
 * @param {string} email_code - the confirmation code from email
 * @returns {Promise} 
 * - resolved with the data {qr, url, mob} from the server, 
 * - rejected with the error from the server
 * @security
 * - pass is not sent to the server
 * - login/pass are not kept in memory
 */
ychapi.call_confirm_registration_login = async function(login, pass, email_code) {
  return ychapi._call_confirm_registration_login(login, pass, email_code);
};

/*!
 * Confirm the registration 2FA
 * @param {string} login - the login
 * @param {string} pass - the password
 * @param {string} email_code - the confirmation code from email
 * @param {string} otp_code - the OTP code
 * @returns {Promise} 
 * - resolved (no data)
 * - rejected with the error from the server
 * @security
 * - pass is not sent to the server
 * - login/pass are not kept in memory
 */
ychapi.call_confirm_registration_2fa = async function(login, pass, email_code, otp_code) {
  return ychapi._call_confirm_registration_2fa(login, pass, email_code, otp_code);
};

/*!
 * KEYS API
 */

/*!
 * Get the keys from the user login/password
 * @param {string} login
 * @param {string} password
 * @returns [uprvk, upubk]
 */
ychapi.get_user_login_keys_v1 = function(login, password) {
  return ychapi._get_user_login_keys_v1(login, password);
};

/*!
 * Get the user login public key
 * @returns {string}
 */
ychapi.get_user_login_pubk = function() {
  return ychapi._get_user_login_pubk();
};

/*!
 * Check if the user login private key is set
 * @returns {boolean}
 */
ychapi.has_user_login_prvk = function() {
  return ychapi._has_user_login_prvk();
};

/*!
 * Get the user signing public key
 * @returns {string}
 */
ychapi.get_user_signing_pubk = function() {
  return ychapi._get_user_signing_pubk();
};

/*!
 * Check if the user signing private key is set
 * @returns {boolean}
 */
ychapi.has_user_signing_prvk = function() {
  return ychapi._has_user_signing_prvk();
};

/*!
 * Set the user login keys
 * @param {string} pubk
 * @param {string} prvk
 */
ychapi.set_user_login_keys = function(pubk, prvk) {
  return ychapi._set_user_login_keys(pubk, prvk);
};

/*!
 * DEPOSITS API
 */

/*!
 * Check if the user has a holding address for a coin
 * @param {string} coin
 * @returns {boolean}
 */
ychapi.has_coin_holding_address = function(coin) {
  return ychapi._has_coin_holding_address(coin);
};

/*!
 * Get the holding address for a coin
 * @param {string} coin
 * @returns {string}
 */
ychapi.get_coin_holding_address = function(coin) {
  return ychapi._get_coin_holding_address(coin);
};

/*!
 * Get the user current locktime for a coin
 * @param {string} coin
 * @returns {number} time_t
 */
ychapi.get_coin_user_locktime = function(coin) {
  return ychapi._get_coin_user_locktime(coin);
};

/*!
 * Get the server current locktime for a coin
 * @param {string} coin
 * @returns {number} time_t
 */
ychapi.get_coin_server_locktime = function(coin) {
  return ychapi._get_coin_server_locktime(coin);
};

/*!
 * TODO: may obsolete
 *
 * @deprecated
 * ALERT: API below is expected to be obsolete and planned to be removed in next versions
 * 
 */
ychapi.get_coin_allowed_deposit_senders = function(coin) {
  return ychapi._get_coin_allowed_deposit_senders(coin);
};

/*!
 * Register the deposit evm address
 * @param {string} coin
 * @param {string} address
 * @returns {Promise}
 * - resolved (no data),
 * - rejected with the error from the server
 * 
 * @deprecated
 * ALERT: API below is expected to be obsolete and planned to be removed in next versions
 *
 */
ychapi.call_register_deposit_evm_address = function(coin, address) {
  return ychapi._call_register_deposit_evm_address(coin, address);
};

/*!
 * Unregister the deposit evm address
 * @param {string} coin
 * @param {string} address
 * @returns {Promise}
 * - resolved (no data),
 * - rejected with the error from the server
 * 
 * @deprecated
 * ALERT: API below is expected to be obsolete and planned to be removed in next versions
 *
 */
ychapi.call_unregister_deposit_evm_address = function(coin, address) {
  return ychapi._call_unregister_deposit_evm_address(coin, address);
};

/*!
 * TRADING API
 */

/*!
 * Get the user trading discount
 * @returns {number}
 */
ychapi.get_user_trading_discount = function() {
  return ychapi._get_user_trading_discount();
};

/*!
 * Get the buy fee with respect to the market and user discount
 * @param {string} market_name - the market name
 * @param {string} coina - the coin to buy
 * @param {string} coinb - the coin to spend (base)
 * @returns {BigInt}
 */
ychapi.get_buy_fee = function(market_name, coina, coinb) {
  return ychapi._get_buy_fee(market_name, coina, coinb);
};

/*!
 * Get the sell fee with respect to the market and user discount
 * @param {string} market_name - the market name
 * @param {string} coina - the coin to sell
 * @param {string} coinb - the coin to acquire (base)
 * @returns {BigInt}
 */
ychapi.get_sell_fee = function(market_name, coina, coinb) {
  return ychapi._get_sell_fee(market_name, coina, coinb);
};

/*!
 * Get the user buys
 * @param {string} market_name - the market name
 * @returns {object[]}
 */
ychapi.get_user_buys = function(market_name) {
  return ychapi._get_user_buys(market_name);
};

/*!
 * Get the user sells
 * @param {string} market_name - the market name
 * @returns {object[]}
 */
ychapi.get_user_sells = function(market_name) {
  return ychapi._get_user_sells(market_name);
};

/*!
 * Get the user trades
 * @param {string} market_name - the market name
 * @returns {object[]}
 */
ychapi.get_user_trades = function(market_name) {
  return ychapi._get_user_trades(market_name);
};

/*!
 * Get the market buys
 * @param {string} market_name - the market name
 * @returns {object[]}
 */
ychapi.get_market_buys = function(market_name) {
  return ychapi._get_market_buys(market_name);
};

/*!
 * Get the market sells
 * @param {string} market_name - the market name
 * @returns {object[]}
 */
ychapi.get_market_sells = function(market_name) {
  return ychapi._get_market_sells(market_name);
};

/*!
 * Get the market trades
 * @param {string} market_name - the market name
 * @returns {object[]}
 */
ychapi.get_market_trades = function(market_name) {
  return ychapi._get_market_trades(market_name);
};

/*!
 * Buy a coin
 * @param {string} market_name - the market name
 * @param {string} coina - the coin to buy
 * @param {string} coinb - the coin to spend (base)
 * @param {string} price - the price of the coin
 * @param {BigInt} amounta - the amount of the coin to buy
 * @param {BigInt} amountb - the amount of the coin to spend
 * @param {BigInt} feeb - the fee (coinb) to buy
 * @returns {Promise} 
 * - resolved (no data), 
 * - rejected with the error from the preparing/server
 */
ychapi.call_buy = async function(market_name, coina, coinb, price, amounta, amountb, feeb) {
  return ychapi._call_buy(market_name, coina, coinb, price, amounta, amountb, feeb);
};

/*!
 * Sell a coin
 * @param {string} market_name - the market name
 * @param {string} coina - the coin to sell
 * @param {string} coinb - the coin to acquire (base)
 * @param {string} price - the price of the coin
 * @param {BigInt} amounta - the amount of the coin to sell
 * @param {BigInt} amountb - the amount of the coin to acquire
 * @param {BigInt} feea - the fee (coina) to sell
 * @returns {Promise} 
 * - resolved (no data), 
 * - rejected with the error from the preparing/server
 */
ychapi.call_sell = async function(market_name, coina, coinb, price, amounta, amountb, feea) {
  return ychapi._call_sell(market_name, coina, coinb, price, amounta, amountb, feea);
};

/*!
 * Cancel a buy order
 * @param {string} coina - the coin to buy
 * @param {string} coinb - the coin to spend (base)
 * @param {int} index - the index of the order
 * @returns {Promise}
 * - resolved (no data),
 * - rejected with the error from the server
 */
ychapi.call_buy_order_cancel = function(coina, coinb, index) {
  return ychapi._call_buy_order_cancel(coina, coinb, index);
};

/*!
 * Cancel a sell order
 * @param {string} coina - the coin to sell
 * @param {string} coinb - the coin to acquire (base)
 * @param {int} index - the index of the order
 * @returns {Promise}
 * - resolved (no data),
 * - rejected with the error from the server
 */
ychapi.call_sell_order_cancel = function(coina, coinb, index) {
  return ychapi._call_sell_order_cancel(coina, coinb, index);
};

/*!
 * Get the chart data
 * @param {string} market_name
 * @param {string} period (60, 300, 900, 3600, 21600, 86400)
 * @returns {Promise}
 * - resolved with the chart data,
 * - rejected with the error from the server
 */
ychapi.call_get_chart_data = function(market_name, period) {
  return ychapi._call_get_chart_data(market_name, period);
};

/*!
 * WITHDRAW/TRANSFER API
 */

/*!
 * Validate an address
 * @param {string} coin
 * @param {string} address
 * @returns error string or null if address is valid
 */
ychapi.validate_address = function(coin, address) {
  return ychapi._validate_address(coin, address);
};

/*!
 * Get the withdraw rawtx
 * @param {object} withdraw_plan
 * @returns {string}
 */
ychapi.get_withdraw_rawtx = function(withdraw_plan) {
  return ychapi._get_withdraw_rawtx(withdraw_plan);
};

/*!
 * Send an amount of a coin to a receiver - another user (internal transfer)
 * @param {string} coin - the coin to send
 * @param {string} receiver_login - the login of the receiver
 * @param {string} amount - the amount to send
 * @param {string} fee - the fee to send
 * @returns {Promise} 
 * - resolved (no data), 
 * - rejected with the error from the preparing/server
 */
ychapi.call_send = async function(coin, receiver_login, amount, fee) {
  return ychapi._call_send(coin, receiver_login, amount, fee);
};

/*!
 * Create the withdraw plan
 * @param {string} coin
 * @param {string} scope ("available", "allocated")
 */
ychapi.create_withdraw = function(coin, scope) {
  return ychapi._create_withdraw(coin, scope);
};

/*!
 * Update the withdraw plan for inputs or fees change
 * @param {object} withdraw_plan
 */
ychapi.update_withdraw = function(withdraw_plan) {
  return ychapi._update_withdraw(withdraw_plan);
};

/*!
 * Set the withdraw amount
 * @param {object} withdraw_plan
 * @param {BigInt} amount_bn
 * @param {string} mode ("manual", "reduce")
 */
ychapi.set_withdraw_amount = function(withdraw_plan, amount_bn, mode) { 
  return ychapi._set_withdraw_amount(withdraw_plan, amount_bn, mode);
};

/*!
 * Check if the withdraw has an inputs stage
 * @param {object} withdraw_task
 * @returns {boolean}
 */
ychapi.has_withdraw_inputs_stage = function(withdraw_plan) {
  return ychapi._has_withdraw_inputs_stage(withdraw_plan);
};

/*!
 * Prepare the withdraw for the inputs to finalize the transaction to sign.
 * Coin types: txout_t1
 * @param {object} withdraw_plan
 * @returns {Promise}
 * - resolved with the txouts,
 * - rejected with the error from the server
 */
ychapi.call_withdraw_inputs_stage = function(withdraw_plan) {
  return ychapi._call_withdraw_inputs_stage(withdraw_plan);
};

/*!
 * Set the withdraw inputs for the debit
 * @param {object} withdraw_plan
 * @param {object[]} txouts
 * @returns {Promise}
 * - resolved (no data),
 * - rejected with the error from the server
 */
ychapi.set_withdraw_inputs_for_debit = function(withdraw_plan, txouts) {
  return ychapi._set_withdraw_inputs_for_debit(withdraw_plan, txouts);
};

/*!
 * Make the withdraw
 * @param {string} coin
 * @param {string} addr_send
 * @param {string} sendfee
 * @param {object} op1
 * @param {object} op2
 * @returns {Promise}
 * - resolved (no data),
 * - rejected with the error from the server
 */
ychapi.call_withdraw = function(coin, addr_send, sendfee, op1, op2) {
  return ychapi._call_withdraw(coin, addr_send, sendfee, op1, op2);
};

/*!
 * Report the txid of the withdraw (erc20_t1, evm_t1) after the withdraw is broadcasted via web3 api
 * @param {string} coin
 * @param {string} gidx
 * @param {string} txid
 * @returns {Promise}
 * - resolved (no data),
 * - rejected with the error from the server
 */
ychapi.call_withdraw_report_txid = function(coin, gidx, txid) {
  return ychapi._call_withdraw_report_txid(coin, gidx, txid);
};

/*!
 * Cancel the withdraw (erc20_t1, evm_t1)
 * @param {string} coin
 * @param {string} gidx
 * @returns {Promise}
 * - resolved (no data),
 * - rejected with the error from the server
 */
ychapi.call_withdraw_cancel = function(coin, gidx) {
  return ychapi._call_withdraw_cancel(coin, gidx);
};

/*!
 * UTILS API
 */

/*!
 * Get the page size
 * @returns {number}
 */
ychapi.get_page_size = function() {
  return ychapi._get_page_size();
};

/*!
 * Get the evm vault7u abi
 * @returns {string}
 */
ychapi.get_evm_vault7u_abi = function() {
  return ychapi._get_evm_vault7u_abi();
};

/*!
 * Sign the evm vault7u user1
 * @param {string} user
 * @param {string} statehex
 * @param {string} amount
 * @param {string} addr
 * @param {string} tw
 * @returns {string}
 */
ychapi.sign_evm_vault7u_user1 = function(user, statehex, amount, addr, tw) {
  return ychapi._sign_evm_vault7u_user1(user, statehex, amount, addr, tw);
};

/*!
 * Get the user account id
 * @returns {string}
 */
ychapi.get_user_account_id = function() {
  return ychapi._get_user_account_id();
};

/*!
 * Get the user account login
 * @returns {string}
 */
ychapi.get_user_account_login = function() {
  return ychapi._get_user_account_login();
};

/*!
 * Get the user account twofa enabled
 * @returns {boolean}
 */
ychapi.get_user_account_twofa = function() {
  return ychapi._get_user_account_twofa();
};

/*!
 * Get the user rewards
 * @param {string} coin
 * @returns {BigInt}
 */
ychapi.get_user_rewards = function(coin) {
  return ychapi._get_user_rewards(coin);
};

/*!
 * Get the user referral invitation code
 * @returns {string}
 */
ychapi.get_user_referral_invitation_code = function() {
  return ychapi._get_user_referral_invitation_code();
};

/*!
 * Get the user referral invitation title
 * @returns {string}
 */
ychapi.get_user_referral_invitation_title = function() {
  return ychapi._get_user_referral_invitation_title();
};

/*!
 * Check if the user is logged in
 * @returns {boolean}
 */
ychapi.is_logged_in = function() {
  return ychapi._is_logged_in();
};

/*!
 * Check if the user has a profile
 * @returns {boolean}
 */
ychapi.has_profile = function() {
  return ychapi._has_profile();
};
