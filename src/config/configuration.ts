export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type : 'mongodb',
    url : 'mongodb+srv://me:1234@matchingservice.n6acs.mongodb.net/Restaurant?retryWrites=true&w=majority'
  },
  rmq: {
    host: process.env.RMQ_HOST || 'rabbitmq3',
    port: parseInt(process.env.RMQ_PORT, 10) || 5672,
    consumerQueue: process.env.RMQ_CONSUMER_QUEUE || 'restaurant_queue',
  },
});
