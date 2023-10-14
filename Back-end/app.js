// webSockets Client : http://www.hivemq.com/demos/websocket-client/
// WORKWI simulation : https://wokwi.com/projects/350247087101706835

const express = require('express');
const mqtt = require('mqtt')
const app = express();
const host = 'broker.hivemq.com'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, { 
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: '',
  password: '',
  reconnectPeriod: 1000,
})

var value  ;
var objet ;

const topic = 'EspIng'
client.on('connect', () => {
  console.log('Connected  on port', port)
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
  client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})
client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
  value = payload.toString();
})

app.listen(port,(req,res)=> {
  console.log('Express API is running at port',port);
})
app.get('/getData',(req,res)=> {
  res.json({
    "statusCode":200,
    "statusMessage":"success",
    "value" : value
  })

})


