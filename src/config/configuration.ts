export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type : 'mongodb',
    url : process.env.MONGO_URL
  },
  rmq: {
    host: process.env.RMQ_HOST || 'rabbitmq3',
    port: parseInt(process.env.RMQ_PORT, 10) || 5672,
    consumerQueue: process.env.RMQ_CONSUMER_QUEUE || 'restaurant_queue',
  },
});
