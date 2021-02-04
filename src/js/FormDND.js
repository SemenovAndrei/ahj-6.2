/**
 * @class FormDND
 */
export default class FormDND {
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
    form.classList.add('form-dnd');
    form.innerHTML = FormDND.addMarkUpForm();
    this.form = form;
  }

  /**
   * Create markup for the form
   */
  static addMarkUpForm() {
    return `
    <input class="overlapped" type='file' accept="image/*" multiple>
    <div class="overlap">
      <h1 class="overlap-title">Drag and Drop files here or click to select</h1>
    </div> 
    `;
  }
}
