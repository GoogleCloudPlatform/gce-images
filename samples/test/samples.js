/**
 * Copyright 2018 Google LLC
 *
 * Distributed under MIT license.
 * See file LICENSE for detail or copy at https://opensource.org/licenses/MIT
 */

'use strict';

const {assert} = require('chai');
const execa = require('execa');

describe('quickstart', () => {
  it('should return a list of images', async () => {
    const {stdout} = await execa('node', ['quickstart.js']);
    assert.match(stdout, /^{/);
  });
});

describe('from project', () => {
  it('should return an image', async () => {
    const {stdout} = await execa('node', ['fromProject.js']);
    assert.match(stdout, /^{/);
  });
});

describe('latestSpecificOS', () => {
  it('should return an image', async () => {
    const {stdout} = await execa('node', ['latestSpecificOS.js']);
    assert.match(stdout, /^{/);
  });
});

describe('specificOS', () => {
  it('should return an image', async () => {
    const {stdout} = await execa('node', ['specificOS.js']);
    assert.match(stdout, /^{/);
  });
});
