const POPUP_OPENED_CLASSNAME = 'popup_open';
const BODY_FIXED_CLASSNAME = 'body_fixed';

const bodyNode = document.querySelector('body');
const popupNode = document.querySelector('.js-popup');
const popupContentNode = document.querySelector('.js-popup__content');
const btnCloseNode = document.querySelector('.js-popup__close-btn');
const popupItems = document.querySelectorAll('.js-popup-item');
const popupInputNode = document.querySelector('.popup-input');
const popupSelectNode = document.querySelector('.popup-select');
const popupLimitNode = document.querySelector('.popup-limit');



popupNode.addEventListener('click', (event) => {
	const isClickOutsideContent = !event.composedPath().includes(popupContentNode);

	if (isClickOutsideContent) {
		togglePopup();
	}
});

function togglePopup(elem) {
	popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
	bodyNode.classList.toggle(BODY_FIXED_CLASSNAME);

	popupItems.forEach((item) => {
		item.classList.add('invisible');
	});

	switch (elem) {
		case 1:
			popupInputNode.classList.remove('invisible');
			break;
		case 2:
			popupSelectNode.classList.remove('invisible');
			break;
		case 3:
			popupLimitNode.classList.remove('invisible');
			break;
		default:
			//console.log('default');
	}
}

btnCloseNode.addEventListener('click', togglePopup);