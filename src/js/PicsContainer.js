/**
 * @class PicsContainer
 */
export default class PicsContainer {
  constructor() {
    this.container = null;
  }

  /**
   * @return this.result
   */
  getContainer() {
    this.createContainer();

    return this.result;
  }

  /**
   * Create the container with markup
   */
  createContainer() {
    const container = document.createElement('div');
    container.classList.add('pic-container', 'empty');
    container.innerHTML = PicsContainer.createMarkupContainer();

    this.result = container;
  }

  /**
   * Create markup for container
   */
  static createMarkupContainer() {
    return `
    <label class="label-btn">
      <button class="btn-delete">X</button>
      <div class="pic-delete"></div>
    </label>
    `;
  }
}
