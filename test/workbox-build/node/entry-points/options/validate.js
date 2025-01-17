/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const expect = require('chai').expect;

const baseSchema = require('../../../../../packages/workbox-build/src/entry-points/options/base-schema');
const validate = require('../../../../../packages/workbox-build/src/entry-points/options/validate');

describe(`[workbox-build] entry-points/options/validate.js`, function() {
  const badInputs = [
    [],
    '',
    null,
    0,
    {invalidKey: true},
  ];

  for (const badInput of badInputs) {
    it(`should throw a ValidationError when passed bad input: ${JSON.stringify(badInput)}`, function() {
      expect(
          () => validate(badInput, baseSchema)
      ).to.throw().with.property('name', 'ValidationError');
    });
  }

  it(`should return the default options when passed empty input`, function() {
    const options = validate({}, baseSchema);

    expect(options).to.eql({
      maximumFileSizeToCacheInBytes: 2097152,
      mode: process.env.NODE_ENV,
    });
  });

  it(`should return the default options, honoring any overrides`, function() {
    const maximumFileSizeToCacheInBytes = 1;
    const options = validate({maximumFileSizeToCacheInBytes}, baseSchema);

    expect(options).to.eql({
      maximumFileSizeToCacheInBytes,
      mode: process.env.NODE_ENV,
    });
  });

  it(`should return the default options, honoring any additional options`, function() {
    const dontCacheBustURLsMatching = /test/;
    const options = validate({dontCacheBustURLsMatching}, baseSchema);

    expect(options).to.eql({
      dontCacheBustURLsMatching,
      maximumFileSizeToCacheInBytes: 2097152,
      mode: process.env.NODE_ENV,
    });
  });
});
