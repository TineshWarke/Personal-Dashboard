'use client';
import React from 'react';

const ResetButton = () => {
    const handleReset = () => {
        const modal = document.getElementById('my_modal_5') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };

    const confirmReset = () => {
        localStorage.clear();
        window.location.reload();
    };

    const closeModal = () => {
        const modal = document.getElementById('my_modal_5') as HTMLDialogElement | null;
        if (modal) {
            modal.close();
        }
    };

    return (
        <div>
            {/* Reset Button */}
            <button
                className="btn btn-danger text-base text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition duration-300"
                onClick={handleReset}
            >
                Reset All Data
            </button>

            {/* Modal for confirmation */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure?</h3>
                    <p className="py-4">This will reset all data stored in localStorage. Do you want to continue?</p>
                    <div className="modal-action">
                        <button
                            className="btn"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={confirmReset}
                        >
                            Confirm Reset
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ResetButton;
