import FormMain from '../FormMain';

const form = new FormMain();

test('create FormMain', () => {
  const obj = form.getForm();
  expect(obj.classList.contains('form-main')).toBeTruthy();
});
