import FormMain from './FormMain';
import FormDND from './FormDND';
import PicsContainer from './PicsContainer';
import Gallery from './Gallery';

const form = new FormMain();

const formDND = new FormDND();

const picsContainer = new PicsContainer();

const gallery = new Gallery(form, picsContainer, formDND);
gallery.init();
