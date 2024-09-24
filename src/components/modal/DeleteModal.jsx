const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed z-[999] inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="relative max-w-md p-5 bg-white border rounded-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Konfirmasi Hapus
                </h3>
                <p className="py-2 mt-1 text-sm text-gray-500">
                    Apakah Anda yakin ingin menghapus produk ini?
                </p>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 mr-2 text-base font-medium text-gray-500 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-base font-medium text-white rounded-lg bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
