const dns = require('dns');

// Configure DNS to use Google's servers
dns.setServers(['8.8.8.8', '8.8.4.4']);

dns.resolveSrv('_mongodb._tcp.dubaifood.yziltwy.mongodb.net', (err, addresses) => {
  if (err) {
    console.error('Failed to resolve SRV:', err);
  } else {
    console.log('SRV Addresses:', addresses);
    
    // Now resolve TXT for options
    dns.resolveTxt('dubaifood.yziltwy.mongodb.net', (err, txtRecords) => {
      if (err) {
         console.log('No TXT records found or failed:', err);
      } else {
         console.log('TXT Records:', txtRecords);
      }
    });
  }
});
