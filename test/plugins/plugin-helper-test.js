var assert = require('assert');
var _ = require('lodash');
var pluginHelper = require('../../src/plugins/plugin-helper');

describe('Plugin helper', function() {

  describe('addSaltToSrc', function() {
    it('should add unique salt to src for each call (for url without previous query parameters)', function() {
      var src = 'http://www.nrk.no/something';
      var srcWithSalt = pluginHelper.addSaltToSrc(src);

      assert(src !== srcWithSalt);
      assert(_.startsWith(srcWithSalt, src), 'srcWithSalt should start with src');
      assert(_.startsWith(srcWithSalt, src + '?salt='), 'srcWithSalt should start with src+salt');

      setTimeout(function() {
        var srcWithSalt2 = pluginHelper.addSaltToSrc(src);
        assert(srcWithSalt2 != srcWithSalt, 'salting two times should give different salts');
      },1);
    });

    it('should add unique salt to src for each call (for url with previous query parameters)', function() {
      var src = 'http://www.nrk.no/something?yes';
      var srcWithSalt = pluginHelper.addSaltToSrc(src);

      assert(src !== srcWithSalt);
      assert(_.startsWith(srcWithSalt, src), 'srcWithSalt should start with src');
      assert(_.includes(srcWithSalt, '&salt='), 'srcWithSalt should start with src');
    });
  });
});
