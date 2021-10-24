export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type : 'mongodb',
    url : process.env.MONGO_URL
  },
});
