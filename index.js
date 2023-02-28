const express = require('express');
const app = express();
const braintree = require("braintree");
const axios = require('axios');
const {parse, stringify} = require('flatted');
const { response } = require('express');
app.use(express.json());

// If you need to post from different URLs
// const cors = require('cors');
// app.use(cors({
//   origin: ['https://put-one-website-url-here.com', 'https://another-url-here.com']
// })); */

app.listen(3028);
const get_gateway_config = (request) => {
  return {
    environment: (request.headers.environment === "Sandbox" ? braintree.Environment.Sandbox : braintree.Environment.Production),
    merchantId: request.headers.merchantid,
    publicKey: request.headers.publickey,
    privateKey: request.headers.privatekey
  };
}

app.get('/skeleton/normalize.css', (request, response) => {
  response.sendFile(__dirname + '/html/normalize.css');
});

app.get('/skeleton/skeleton.css', (request, response) => {
  response.sendFile(__dirname + '/html/skeleton.css');
});

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/html/index.html');
});

//https://developer.paypal.com/braintree/docs/reference/request/transaction/sale/node
app.post('/transaction/sale', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.transaction.sale(request.body.body, (err, result) => { (err) == true ? response.send(err) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/request/transaction/void/node
app.post('/transaction/void', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.transaction.void(request.body.body.transactionId, (err, result) => { (err) == true ? response.send(err) : response.send(result) });
});

//https://developer.paypal.com/braintree/docs/reference/request/add-on/all/node
app.post('/add-on/all', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.addOn.all((err, result) => { (err) == true ? response.send(err) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/request/address/create/node
app.post('/address/create', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.address.create(request.body.body, (err, result) => { (err) == true ? response.send(err) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/request/address/delete/node
app.post('/address/delete', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.address.delete(request.body.body.customerId, request.body.body.addressId, (err) => { (err) == true ? response.send(err) : response.end(); });
});

//https://developer.paypal.com/braintree/docs/reference/request/address/find/node
app.post('/address/find', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.address.find(request.body.body.customerId, request.body.body.addressId, (err, result) => { (err) == true ? response.send(err) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/request/address/update/node
app.post('/address/update', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.address.update(request.body.body.customerId, request.body.body.addressId, request.body.body.address, (err, result) => { (err) == true ? response.send(err) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/request/apple-pay/register-domain/php
app.post('/apple-pay/register-domain', (request, response) => {
  const data = request.body;
  const http_options = {
    headers: {
      "Content-Type": "application/json",
      "environment": request.headers.environment,
      "merchantid": request.headers.merchantid,
      "publickey": request.headers.publickey,
      "privatekey": request.headers.privatekey,
    }
  };
axios.post('https://bt.php.middleware.host/apple-pay/register-domain.php', data, http_options)
    .then((res) => {
        response.send(res.data);
    }).catch((err) => {
      response.send(err);
    });
});

//https://developer.paypal.com/braintree/docs/reference/request/apple-pay/registered-domains/php

//https://developer.paypal.com/braintree/docs/reference/request/apple-pay/unregister-domain/php
app.post('/apple-pay/unregister-domain', (request, response) => {
  const data = request.body;
  const http_options = {
    headers: {
      "Content-Type": "application/json",
      "environment": request.headers.environment,
      "merchantid": request.headers.merchantid,
      "publickey": request.headers.publickey,
      "privatekey": request.headers.privatekey,
    }
  };
axios.post('https://bt.php.middleware.host/apple-pay/unregister-domain.php', data, http_options)
    .then((res) => {
        response.send(res.data);
    }).catch((err) => {
      response.send(err);
    });
});

//https://developer.paypal.com/braintree/docs/reference/request/client-token/generate/node
app.post('/client-token/generate', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.clientToken.generate(request.body.body, (err, result) => { (err) == true ? response.send(err) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/request/credit-card/create/node
app.post('/credit-card/create', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.creditCard.create(request.body.body, (err, result) => { (err) == true ? response.send(err) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/request/credit-card/delete/node
app.post('/credit-card/delete', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.creditCard.delete(request.body.body.token, (err) => { (err) == true ? response.send(err) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/request/credit-card/expiring-between/node
app.post('/credit-card/expiring-between', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);
  const before = new Date(request.body.body.startDate);
  const after = new Date(request.body.body.endDate);

  gateway.creditCard.expiringBetween(before, after, (err, result) => { (err) == true ? response.send(err) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/request/credit-card/find/node
app.post('/credit-card/find', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.creditCard.find(request.body.body.token, (err, result) => { (err) == true ? response.send(err) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/request/credit-card/update/node
app.post('/credit-card/update', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.creditCard.update(request.body.body.token, request.body.body.creditCard, (err, result) => { (err) == true ? response.send(err) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/request/credit-card-verification/search


//https://developer.paypal.com/braintree/docs/reference/request/customer/create/node
app.post('/customer/create', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.customer.create(request.body.body, (err, result) => { (err) == true ? response.send(err) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/request/customer/delete/node
app.post('/customer/delete', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.customer.delete(request.body.body.customerId, (err) => { (err) == true ? response.send(err) : response.end(); });
});

//https://developer.paypal.com/braintree/docs/reference/request/customer/find/node
app.post('/customer/find', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.customer.find(request.body.body.customerId, (err, result) => { (err) == true ? response.send(err) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/request/customer/search/node

//https://developer.paypal.com/braintree/docs/reference/request/customer/update/node
app.post('/customer/update', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.customer.update(request.body.body.id, request.body.body.customer, (err, result) => { (err) == true ? response.send(err) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/request/transaction/submit-for-partial-settlement
app.post('/transaction/submit-for-partial-settlement', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);
  gateway.transaction.submitForPartialSettlement(request.body.body.authorizedTransaction, request.body.body.amount, request.body.body.payload, (err, result) => { (err) == true ? (response.send(err), console.log(err), console.log("yeeeeeee")) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/request/transaction/submit-for-settlement
app.post('/transaction/submit-for-settlement', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);
  gateway.transaction.submitForSettlement(request.body.body.transactionId, (err, result) => { (err) == true ? response.send(err) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/request/transaction/submit-for-settlement
app.post('/transaction/submit-for-settlement/batch', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);
  gateway.transaction.search((search) => {
    search.status().is(braintree.Transaction.Status.Authorized);
  }, (err, result) => { 
      if (err) {
        response.send(err);
      } else {
        //Obtained result
        raw_search_results_array = JSON.parse(stringify(result));
        //Length 8 filter because "utf" would be included in results, so use transaction ID length limit
        cleaned_search_results_array = raw_search_results_array.filter(element => typeof element === "string" && element.length === 8);
        response.send(cleaned_search_results_array);
      }
    });
});

handle_submit_for_settlement_all = (result) => {
  response.send("ye");
  if (result.success !== true) {
    response = {"is_error": true, "response": result};
  } else
  if (result.success === true) {
    response = {"is_error": false, "response": result};
  }

  return response;
   /* 
    if (submit_for_settlement_err) {
      errors_array.push(submit_for_settlement_err);
    } else
    if (submit_for_settlement_result.success !== true) {
      errors_array.push(submit_for_settlement_err);
    } else
    if (submit_for_settlement_result.success === true) {
      success_array.push(submit_for_settlement_result.transaction.id);
    } */
};

//https://developer.paypal.com/braintree/docs/reference/request/transaction/search/node#status-changes
//https://developer.paypal.com/braintree/docs/reference/general/searching/search-fields#range-fields
//https://developer.paypal.com/braintree/docs/reference/general/statuses#authorization-expired
app.post('/transaction/submit-for-settlement/all', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);
  gateway.transaction.search((search) => {
    search.status().is(braintree.Transaction.Status.Authorized);
  }, (err, result) => {
      if (err) {
        response.send(err);
      } else {
        //Obtained result
        raw_search_results_array = JSON.parse(stringify(result));
        //Length 8 filter because "utf" would be included in results, so use transaction ID length limit
        cleaned_search_results_array = raw_search_results_array.filter(element => typeof element === "string" && element.length === 8);
        //If not open auths, blank 200 response
        if (cleaned_search_results_array.length === 0) {
          response.end();
        } else {
          //cleaned_search_results_array.push("d251pj3g");
            const errors_array = [];
            const success_array = [ "two" ];
          for (i = 0; i < cleaned_search_results_array.length; i++) {
            submit_for_settlement_response = gateway.transaction.submitForSettlement(cleaned_search_results_array[i],
              (err, result) => {
                if (result.success === true) {
                  console.log(success_array);
                  console.log(result.transaction.id);
                  success_array.push(result.transaction.id);
                  console.log("now...");
                  console.log(success_array);
                  console.log("^^this");
                }
              });
              console.log("outta func:");
              console.log(success_array);
            response.send(success_array);
            response.end();
            break;
          }
        }
      }
    });
});

//https://developer.paypal.com/braintree/docs/reference/request/payment-method/create/node
app.post('/payment-method/create', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.paymentMethod.create(request.body.body, (err, result) => { (err) == true ? response.send(err) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/request/payment-method/delete/node
app.post('/payment-method/delete', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.paymentMethod.delete(request.body.body.token, (err, result) => { (err) == true ? response.send(err) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/request/payment-method/update/node
app.post('/payment-method/update', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.paymentMethod.update(request.body.body.token, request.body.body.payload, (err, result) => { (err) == true ? response.send(err) : response.send(result); });
});

//https://developer.paypal.com/braintree/docs/reference/general/testing/node#settlement-status
app.post('/sandbox/settle', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.testing.settle(request.body.id, (err, result) => { (err) == true ? response.send(err) : response.send(result); });
});


//https://developer.paypal.com/braintree/docs/reference/general/testing/node#settlement-status
app.post('/sandbox/decline', (request, response) => {
  gateway_config = get_gateway_config(request);
  const gateway = new braintree.BraintreeGateway(gateway_config);

  gateway.testing.settlementDecline(request.body.id, (err, result) => { (err) == true ? response.send(err) : response.send(result); });
});
