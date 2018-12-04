/**
 * Copyright 2018 Google LLC
 *
 * Distributed under MIT license.
 * See file LICENSE for detail or copy at https://opensource.org/licenses/MIT
 */

'use strict';

// [START gceimages_latest_os_specific_version]
const {GCEImages} = require('gce-images');
const gceImages = new GCEImages();
gceImages.getLatest('ubuntu-1404', (err, image) => {
  if (err) {
    throw err;
  }
  console.log(image);
});
// [START gceimages_latest_os_specific_version]
