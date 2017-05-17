fis.media('qa').match('/dist/**',{
  deploy:fis.plugin('http-push',{
    receiver:'http://icloudinn.live/receiver.php',
    to:'./'
  })
})
