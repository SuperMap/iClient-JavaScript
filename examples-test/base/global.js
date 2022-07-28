var chromedriver = require('../../node_modules/chromedriver/lib/chromedriver');

function stopChromeDriver() {
  chromedriver.stop();
}

module.exports = {
  after: function (done) {
    console.log('Close Chromedriver after all tests')
    stopChromeDriver.call(this);
    done();
  }
};