const path = require('path');
const options = { 
    format: 'A4',
    base: 'file://' + __dirname + '/assets/',
    header: {
		height: '0mm'
	},
};
const htmlTemplate = (data) => `<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Receipt</title>
    
    <style>
        #invoice-POS {
	 box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
	 padding: 2mm;
	 margin: 0 auto;
	 width: 100mm;
	 background: #fff;
}
 #invoice-POS ::selection {
	 background: #f31544;
	 color: #fff;
}
 #invoice-POS ::moz-selection {
	 background: #f31544;
	 color: #fff;
}
 #invoice-POS h1 {
	 font-size: 1.5em;
	 color: #222;
}
 #invoice-POS h2 {
	 font-size: 0.9em;
}
 #invoice-POS h3 {
	 font-size: 1.2em;
	 font-weight: 300;
	 line-height: 2em;
}
 #invoice-POS p {
	 font-size: 0.7em;
	 color: #666;
	 line-height: 1.2em;
}
 #invoice-POS #top, #invoice-POS #mid, #invoice-POS #bot {
	/* Targets all id with 'col-' */
	 border-bottom: 1px solid #eee;
}
 #invoice-POS #top {
	 min-height: 100px;
}
 #invoice-POS #mid {
	 min-height: 80px;
}
 #invoice-POS #bot {
	 min-height: 50px;
}
 #invoice-POS #top .logo {
	 height: 60px;
	 width: 60px;
	 background: url(http://michaeltruong.ca/images/logo1.png) no-repeat;
	 background-size: 60px 60px;
}
 #invoice-POS .clientlogo {
	 float: left;
	 height: 60px;
	 width: 60px;
	 background: url(http://michaeltruong.ca/images/client.jpg) no-repeat;
	 background-size: 60px 60px;
	 border-radius: 50px;
}
 #invoice-POS .info {
	 display: block;
	 margin-left: 0;
}
 #invoice-POS .title {
	 float: right;
}
 #invoice-POS .title p {
	 text-align: right;
}
 #invoice-POS table {
	 width: 100%;
	 border-collapse: collapse;
}
 #invoice-POS .tabletitle {
	 font-size: 0.5em;
	 background: #eee;
}
 #invoice-POS .service {
	 border-bottom: 1px solid #eee;
}
 #invoice-POS .item {
	 width: 24mm;
}
 #invoice-POS .itemtext {
	 font-size: 0.5em;
}
 #invoice-POS #legalcopy {
	 margin-top: 5mm;
}
 
    </style>
</head>

<body>
    
  <div id="invoice-POS">
    
    <center id="top">
      <div class="logo"></div>
      <div class="info"> 
        <h2>Test Project</h2>
      </div><!--End Info-->
    </center><!--End InvoiceTop-->
    
    <div id="mid">
      <div class="info">
        <h2>Payment Details</h2>
        <p> 
            Name : ${data.name}</br>
            Email   : ${data.email}</br>
            Phone   : ${data.phone}</br>
        </p>
      </div>
    </div><!--End Invoice Mid-->
    
    <div id="bot">

					<div id="table">
						<table>
							<tr class="tabletitle">
								<td class="item"><h2>Type</h2></td>
								<td class="Hours"><h2>To</h2></td>
								<td class="Rate"><h2>Sub Total</h2></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Donation</p></td>
								<td class="tableitem"><p class="itemtext">Sparks Foundation</p></td>
								<td class="tableitem"><p class="itemtext">${data.amount}</p></td>
							</tr>

							<tr class="tabletitle">
								<td></td>
								<td class="Rate"><h2>Total</h2></td>
								<td class="payment"><h2>${data.amount}</h2></td>
							</tr>

						</table>
					</div><!--End Table-->

					<div id="legalcopy">
						<p class="legal"><strong>Thank you for your business!</strong>  Payment is expected within 31 days; please process this invoice within that time. There will be a 5% interest charge per month on late invoices. 
						</p>
					</div>

				</div><!--End InvoiceBot-->
  </div><!--End Invoice-->

</body>
</html>`

// function guidGenerator() {
//     var S4 = function() {
//        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
//     };
//     return (S4()+S4()+S4()+S4());
// }

// function generateApplicationId() {
//     var S4 = function() {
//        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
//     };
//     return (S4()+"-"+S4()+"-"+S4());
// }

module.exports = {
    options: options,
    // guidGenerator : guidGenerator,
    htmlTemplate: htmlTemplate,
    // generateApplicationId: generateApplicationId
}