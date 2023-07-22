const soap = require('soap');
const url = 'http://soapapp:8000/PriceLookup?wsdl';


function getPrice(xml) {
  return new Promise ((resolve, reject) => {
    soap.createClient(url, function (err, client) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log(client.describe());
      client.MyService.MyPort.PriceLookup(xml, function(err, result, rawResponse, soapHeader, rawRequest) {
        console.log('SOAP: ', result);
        return resolve(result)
      })
    });
  });
}

const getPriceInfo =  async(id) => {
  try {
    console.log(id);
    const info = await getPrice(id);
    return info;
  } catch (error) {
    return error;
  }
}

module.exports = getPriceInfo;