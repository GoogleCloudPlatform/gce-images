/**
 * Copyright 2018 Google LLC
 *
 * Distributed under MIT license.
 * See file LICENSE for detail or copy at https://opensource.org/licenses/MIT
 */

'use strict';

var assert = require('assert');
var async = require('async');

var gceImages = require('../src')();

describe('system tests', () => {
  var allImagesByOsName = {
    deprecated: {},
    stable: {},
  };

  before(function(done) {
    // Get counts.
    async.forEachOf(
      allImagesByOsName,

      function(_, key, next) {
        gceImages.getAll({deprecated: key === 'deprecated'}, function(
          err,
          images
        ) {
          if (err) {
            next(err);
            return;
          }

          allImagesByOsName[key] = images;
          next();
        });
      },

      done
    );
  });

  describe('all', function() {
    it('should default to deprecated: false', function(done) {
      gceImages.getAll(function(err, images) {
        assert.ifError(err);

        assert.strictEqual(typeof images, 'object');

        Object.keys(images).forEach(function(osName) {
          assert.strictEqual(
            images[osName].length,
            allImagesByOsName.stable[osName].length
          );
        });

        done();
      });
    });

    it('should get all of the images available for a specific OS', function(done) {
      var osName = 'ubuntu';

      gceImages.getAll(osName, function(err, images) {
        assert.ifError(err);

        assert(Array.isArray(images));
        assert.strictEqual(
          images.length,
          allImagesByOsName.stable[osName].length
        );

        done();
      });
    });
  });

  describe('latest', function() {
    it('should get only the latest image from every OS', function(done) {
      gceImages.getLatest(function(err, images) {
        assert.ifError(err);

        assert.strictEqual(typeof images, 'object');

        Object.keys(images).forEach(function(osName) {
          assert.strictEqual(images[osName].length, 1);
        });

        done();
      });
    });

    it('should get the latest image for a specific OS', function(done) {
      var osName = 'ubuntu';

      gceImages.getLatest(osName, function(err, image) {
        assert.ifError(err);
        assert.strictEqual(typeof image, 'object');
        assert(image.selfLink.indexOf(osName) > -1);
        done();
      });
    });

    it('should get the latest image for a specific OS version', function(done) {
      var osName = 'ubuntu-1410';

      gceImages.getLatest(
        {
          osNames: [osName],
          deprecated: true,
        },
        function(err, image) {
          assert.ifError(err);
          assert.strictEqual(typeof image, 'object');
          assert(image.selfLink.indexOf(osName) > -1);
          done();
        }
      );
    });
  });
});
