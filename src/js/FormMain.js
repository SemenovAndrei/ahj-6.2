/**
 * @class FormMain
 */
export default class FormMain {
  constructor() {
    this.form = null;
  }

  /**
   * @return this.form
   */
  getForm() {
    this.createForm();

    return this.form;
  }

  /**
   * Create the form width markup
   */
  createForm() {
    const form = document.createElement('form');
    form.classList.add('form-main');
    form.innerHTML = FormMain.addMarkUpForm();
    this.form = form;
  }

  /**
   * Create markup for the form
   */
  static addMarkUpForm() {
    return `
    <label class="label title">
      <div class="label-title">Название</div>
      <input type="text" class="field field-title" placeholder="write the name here" required>
      <div class="hint hint-title"></div>
    </label>
    <label class="label pic-url">
      <div class="label-title">Ссылка на изображение</div>
      <input type="text" class="field field-url" placeholder="write the url here" required>
      <div class="hint hint-url"></div>
    </label>
    <button class="btn btn-submit">Отправить</button>
    `;
  }
}
