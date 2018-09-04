const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");

const modalHeader = document.querySelector(".modal-header");
const modalContent = document.querySelector(".modal-content");
const modalControls = document.querySelector(".modal-controls");

const buttonsModal = document.querySelectorAll(".modal .btn");
const buttonOpen = document.querySelector(".btn-modal-open");
const buttonUninstall = document.querySelector(".btn-uninstall");
const snackbar = document.querySelector(".snackbar");

const showSnackbar = () => {
    setTimeout(() => snackbar.classList.add('show'), 300);
    setTimeout(() => snackbar.classList.remove('show'), 3000);
};

const toggleModal = e => {
    const currTarget = e.currentTarget;

    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");

    setTimeout(() => modalHeader.classList.add('slideUp'), 300);
    setTimeout(() => modalContent.classList.add('slideUp'), 600);
    setTimeout(() =>  modalControls.classList.add('slideUp'), 900);

    if (currTarget === buttonUninstall) {
        showSnackbar();
    }
};

const windowOnClick = e => {
    const currTarget = e.target;

    if (currTarget === modalOverlay) {
        toggleModal(e);
    }
};

window.addEventListener("click", windowOnClick);
buttonOpen.addEventListener('click', toggleModal);
[...buttonsModal].forEach(item => item.addEventListener('click', toggleModal));
