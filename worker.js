var Hapi = require('@hapi/hapi');
var Bull = require('bull');
var Queue = new Bull('my-queue', {
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
});

Queue.process(async (job) => {
  console.log(`Processing job with data: ${JSON.stringify(job.data)}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`Job completed: ${job.id}`);
});

var init = async () => {
  var server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  server.route({
    method: 'POST',
    path: '/add-job',
    handler: async (request, h) => {
      var { data } = request.payload;
      await Queue.add({ data });
      return { message: 'Job added to queue' };
    }
  });

  server.route({
    method: 'GET',
    path: '/job-counts',
    handler: async (request, h) => {
      var counts = await Queue.getJobCounts();
      return counts;
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();