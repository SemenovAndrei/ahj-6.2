/**
 * @class Gallery
 */
export default class Gallery {
  /**
   *
   * @param {Class} form - FormMain
   * @param {Class} picsContainer - PicsContainer
   */
  constructor(form, picsContainer, formDND) {
    // this.form = form;
    this.formDND = formDND;
    this.picsContainer = picsContainer;
    this.contentArray = [];
    this.storage = localStorage;
  }

  /**
   * App init()
   */
  init() {
    this.addContainer();
    // this.addForm();
    this.addFormDND();
    this.loadData();
    this.showPicture();
    this.addListeners();
  }

  /**
   * Add container on page
   */
  addContainer() {
    this.pictureContainer = document.createElement('div');
    this.pictureContainer.classList.add('pics-container');

    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.container.appendChild(this.pictureContainer);

    this.body = document.querySelector('body');
    this.body.insertBefore(this.container, this.body.childNodes[0]);
  }

  /**
   * Add listeners
   */
  addListeners() {
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-delete')) { this.deletePicture(e); }
      if (e.target.classList.contains('btn-submit')) { this.addPicture(e); }
      if (e.target.closest('.form-dnd')) { this.showSelectWindow(); }
    });

    this.addInputListeners();
    this.addDropElEventListener();
  }

  /**
   * Add listeners to input type file
   */
  addInputListeners() {
    const inputFiles = document.querySelector('.overlapped');
    inputFiles.addEventListener('click', (e) => {
      e.target.value = '';
    });

    inputFiles.addEventListener('change', this.addFiles.bind(this));
  }

  /**
   * Add listeners to drop area
   */
  addDropElEventListener() {
    const dropEl = document.querySelector('.form-dnd');

    dropEl.addEventListener('dragover', (evt) => {
      evt.preventDefault();
    });

    dropEl.addEventListener('drop', (evt) => {
      evt.preventDefault();

      let files = Array.from(evt.dataTransfer.files);

      files = files.filter((el) => el.type.match(/image\/./));

      files.forEach((e) => {
        this.pushPicture(e);
      });
    });
  }

  /**
   * Add form on page
   */
  addForm() {
    this.container.insertBefore(this.form.getForm(), this.container.childNodes[0]);

    this.fieldTitle = document.querySelector('.field-title');
    this.fieldUrl = document.querySelector('.field-url');
  }

  /**
   * Add formDND on page
   */
  addFormDND() {
    this.container.insertBefore(this.formDND.getForm(), this.container.childNodes[0]);
  }

  /**
   * Show message on page
   *
   * @param {String} message - message
   * @param {Object} element - HTML object
   */
  static showMessage(message, element) {
    const hint = element.nextElementSibling;
    hint.textContent = message;
    hint.style.left = `${element.getBoundingClientRect().left}px`;

    if (window.screen.width > 640) {
      hint.style.top = `${element.getBoundingClientRect().top - 30}px`;
    } else {
      hint.style.top = `${element.getBoundingClientRect().top + 30}px`;
    }

    setTimeout(() => {
      hint.textContent = '';
      hint.removeAttribute('style');
    }, 2000);
  }

  /**
   * Get ID
   */
  getID() {
    let cnt = 0;
    // eslint-disable-next-line no-loop-func
    while (this.contentArray.some((e) => e.id === String(cnt))) {
      cnt += 1;
    }
    return String(cnt);
  }

  /**
   * Add picture in this.contentArray
   *
   * @param {event} e - event
   */
  addPicture(e) {
    e.preventDefault();

    if (!this.fieldTitle.value) {
      Gallery.showMessage('Нужно заполнить поле', this.fieldTitle);
      return;
    }

    const img = document.createElement('img');
    img.src = this.fieldUrl.value;
    img.alt = this.fieldTitle.value;

    img.onerror = () => Gallery.showMessage('Неверный URL изображения', this.fieldUrl);

    img.onload = () => {
      img.classList.add('pic');
      img.dataset.id = this.getID();

      const container = {
        title: img.alt,
        url: img.src,
        id: img.dataset.id,
        node: this.picsContainer.getContainer(),
      };
      container.node.classList.remove('empty');
      container.node.appendChild(img);
      this.contentArray.push(container);

      this.fieldUrl.value = '';
      this.fieldTitle.value = '';

      this.showPicture();
    };
  }

  /**
   * Generate MouseEvent on input type file
   */
  showSelectWindow() {
    this.container.querySelector('.overlapped').dispatchEvent(new MouseEvent('click'));
  }

  /**
   * Show the picture on page
   */
  showPicture() {
    this.cleanPictureContainer();

    this.contentArray.forEach((e) => {
      this.pictureContainer.appendChild(e.node);
    });

    this.addEmptyPicture();

    this.saveData();
  }

  /**
   * Add files on page
   *
   * @param {event`} event - event
   */
  addFiles(event) {
    let files = Array.from(event.currentTarget.files);

    files = files.filter((el) => el.type.match(/image\/./));

    files.forEach((e) => {
      this.pushPicture(e);
    });
  }

  /**
   * Push img to this.contentArray
   *
   * @param {element} e - element file
   */
  pushPicture(e) {
    const reader = new FileReader();
    const blob = new Blob([e], {
      lastModified: e.lastModified,
      lastModifiedDate: e.lastModifiedDate,
      name: e.name,
      size: e.size,
      type: e.type,
    });
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const img = document.createElement('img');
      img.src = reader.result;
      img.alt = e.name;
      img.classList.add('pic');
      img.dataset.id = this.getID();

      const container = {
        title: img.alt,
        url: img.src,
        id: img.dataset.id,
        node: this.picsContainer.getContainer(),
      };

      container.node.classList.remove('empty');
      container.node.appendChild(img);
      this.contentArray.push(container);

      this.showPicture();
    };
  }

  /**
   * Delete picture
   *
   * @param {event} e - event
   */
  deletePicture(e) {
    e.preventDefault();

    const elementToDelete = e.target.closest('.pic-container');
    const img = elementToDelete.querySelector('img');

    if (img) {
      this.contentArray = this.contentArray.filter((el) => el.id !== img.dataset.id);
    }
    this.showPicture();
  }

  /**
   * Clean this.pictureContainer
   */
  cleanPictureContainer() {
    this.pictureContainer.innerHTML = '';
  }

  /**
   * Add empty blocks on page
   */
  addEmptyPicture() {
    while (this.pictureContainer.childNodes.length < 2) {
      this.pictureContainer.appendChild(this.picsContainer.getContainer());
    }
    this.pictureContainer.appendChild(this.picsContainer.getContainer());
  }

  /**
   * Save this.contentArray in localStorage
   */
  saveData() {
    this.storage.setItem('data', JSON.stringify(this.contentArray));
  }

  /**
   * Load "data" in this.contentArray
   */
  loadData() {
    if (!this.storage.getItem('data')) { return; }

    const data = JSON.parse(this.storage.getItem('data'));

    data.forEach((e) => {
      const img = document.createElement('img');
      img.classList.add('pic');
      img.src = e.url;
      img.alt = e.title;
      img.dataset.id = e.id;

      e.node = this.picsContainer.getContainer();
      e.node.classList.remove('empty');
      e.node.appendChild(img);
    });

    this.contentArray = data;
  }
}
