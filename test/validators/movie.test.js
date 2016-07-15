'use strict';

const Joi = require('joi');

const MovieValidator = require('../../lib/validators/movie');

describe('movie validator', () => {

  describe('title', () => {

    it('is required', () => {
      const payload = {};
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path).to.eql('title');
      expect(result.error.details[0].type).to.eql('any.required');
    });

    it('is less than 255 characters', () => {
      const payload = { title: '2long'.repeat(300) };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path).to.eql('title');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

  describe('release_year', () => {

    it('is after 1878', () => {
      const payload = { title: 'Independence Day: The Original', release_year: 1776 };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const payload = { title: 'Fast n Furious Still', release_year: 10000 };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

});
