import slugify from 'slugify';
import unslug from 'unslug';

export function getSlug(input, options = { lower: true }) {
  return slugify(input, options);
}

export function unSlug(input) {
  return unslug(input);
}
