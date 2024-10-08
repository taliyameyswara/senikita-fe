import React, { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Navbar from "../../../components/navbar/Navbar";
import { IoWalletOutline } from "react-icons/io5";
import { HiOutlineCreditCard } from "react-icons/hi2";
import BalanceTransactionItem from "../../../components/BalanceTransactionItem";
import Modal from "../../../components/Modal";
import SearchInput from "../../../components/form-input/SearchInput";
import TextInput from "../../../components/form-input/TextInput";
import PriceInput from "../../../components/form-input/PriceInput";

const SenimanBalance = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/seniman/dashboard" },
    { label: "Saldo Seniman", to: "/seniman/dashboard/balance" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
  });
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleWithdrawOpenModal = () => setIsWithdrawModalOpen(true);
  const handleWithdrawCloseModal = () => setIsWithdrawModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBankDetails({
      ...bankDetails,
      [name]: value,
    });
  };

  const handleWithdrawInputChange = (e) => {
    setWithdrawAmount(e.target.value);
  };

  const handleBankSelect = (selectedBank) => {
    setBankDetails({
      ...bankDetails,
      bankName: selectedBank,
    });
  };

  const handleSubmitForm = () => {
    if (bankDetails.bankName && bankDetails.accountNumber) {
      console.log("Rekening baru:", bankDetails);
      setIsModalOpen(false);
    } else {
      alert("Harap isi nama bank dan nomor rekening");
    }
  };

  const handleWithdraw = () => {
    if (withdrawAmount) {
      console.log("Jumlah penarikan:", withdrawAmount);
      setIsWithdrawModalOpen(false);
    } else {
      alert("Harap masukkan jumlah saldo yang ingin ditarik");
    }
  };

  const bankList = [
    { id: 1, name: "Bank Mandiri" },
    { id: 2, name: "Bank Rakyat Indonesia (BRI)" },
    { id: 3, name: "Bank Central Asia (BCA)" },
    { id: 4, name: "Bank Negara Indonesia (BNI)" },
    { id: 5, name: "Bank Tabungan Negara (BTN)" },
    { id: 6, name: "Bank Syariah Indonesia (BSI)" },
    { id: 7, name: "CIMB Niaga" },
    { id: 8, name: "OCBC Indonesia" },
    { id: 9, name: "Permata Bank" },
    { id: 10, name: "Bank Danamon" },
  ];

  return (
    <div className="">
      <Navbar />

      <div className="container px-6 py-4 mb-20">
        <div className="flex flex-col gap-2 p-3 border rounded-xl">
          <div className="p-3 py-5 border rounded-xl bg-gray-50">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          <div className="grid grid-cols-5 gap-6 p-3">
            <div className="col-span-1">
              <div className="mb-5">
                <div className="bg-white rounded-xl p-3 border-[0.5px]">
                  <div className="flex items-center mb-3">
                    <div className="p-3 mr-2 rounded-full bg-tertiary/20">
                      <IoWalletOutline className="text-xl text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-sm">Saldo</div>
                      <div className="font-bold font-nunito">Rp 0</div>
                    </div>
                  </div>

                  <button
                    onClick={handleWithdrawOpenModal}
                    className="flex items-center justify-center w-full p-2 mt-2 text-sm font-semibold text-white rounded-lg bg-primary"
                  >
                    Tarik Saldo
                  </button>
                </div>
              </div>

              <div className="mb-5">
                <div className="mb-2 font-semibold">Rekening Anda</div>
                {bankDetails.bankName ? (
                  <div className="bg-white rounded-xl p-2 border-[0.5px]">
                    <div className="flex items-center">
                      <div className="p-3 m-2 rounded-full bg-tertiary/20">
                        <HiOutlineCreditCard className="text-xl text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-sm font-bold">{}</div>
                        <div className="text-sm text-gray-500 font-nunito">
                          {bankDetails.bankName}
                          <span> - </span>
                          {bankDetails.accountNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button onClick={handleOpenModal} className="w-full">
                    <div className="bg-white rounded-xl p-2 border-[0.5px]">
                      <div className="flex items-center gap-1">
                        <div className="p-3 m-2 rounded-full bg-tertiary/20">
                          <HiOutlineCreditCard className="text-xl text-primary" />
                        </div>
                        <div className="">
                          <div className="text-xs text-gray-400 text-start">
                            Belum ada rekening
                          </div>
                          <div className="text-sm font-semibold text-start">
                            Tambah Rekening
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                )}

                {/* Modal tambah rekening */}
                <Modal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  title="Tambah Rekening"
                  subtitle="Masukkan informasi rekening bank Anda"
                  handleSubmit={handleSubmitForm}
                  width="w-1/3"
                >
                  <div className="flex flex-col gap-4">
                    <SearchInput
                      label="Nama Bank"
                      placeholder="Cari Bank"
                      apiUrl=""
                      mapData={(item) => item.name}
                      handleSelect={(selectedBank) =>
                        handleBankSelect(selectedBank.name)
                      }
                      queryParam="name"
                      dataKey={bankList}
                    />
                    <TextInput
                      label="Nomor Rekening"
                      name="accountNumber"
                      value={bankDetails.accountNumber}
                      onChange={handleInputChange}
                      placeholder="Masukkan nomor rekening"
                    />
                  </div>
                </Modal>

                {/* Modal tarik saldo */}
                <Modal
                  isOpen={isWithdrawModalOpen}
                  onClose={handleWithdrawCloseModal}
                  title="Tarik Saldo"
                  subtitle="Masukkan jumlah saldo yang ingin ditarik"
                  handleSubmit={handleWithdraw}
                  width="w-1/3"
                >
                  <div className="flex flex-col gap-4">
                    <div className="bg-white rounded-xl p-3 border-[0.5px]">
                      <div className="flex items-center">
                        <div className="p-3 m-2 rounded-full bg-tertiary/20">
                          <HiOutlineCreditCard className="text-xl text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <div className="font-bold font-nunito">
                            TALIYA MEYSWARA
                          </div>
                          <div className="text-sm font-nunito">
                            BCA - 871264781
                          </div>
                        </div>
                      </div>
                    </div>
                    <PriceInput
                      label="Jumlah Penarikan"
                      name="withdrawAmount"
                      value={withdrawAmount}
                      onChange={handleWithdrawInputChange}
                      placeholder="Masukkan jumlah saldo penarikan"
                    />
                  </div>
                </Modal>
              </div>
            </div>

            <div className="col-span-4">
              <div className="mb-3 text-xl font-semibold">
                Riwayat Transaksi
              </div>
              {/* Example transaction history */}
              <div className="p-5 border rounded-xl">
                <h1 className="mb-2 font-semibold font-nunito">
                  Selasa, 1 Oktober 2024
                </h1>
                <BalanceTransactionItem
                  date="1 Oktober 2024"
                  time="09.50 WIB"
                  title="Penarikan Saldo"
                  amount={100000}
                  type="out"
                />
                <BalanceTransactionItem
                  date="1 Oktober 2024"
                  time="09.45 WIB"
                  title="Pembayaran dari (Nama pembeli)"
                  amount={100000}
                  type="in"
                />
                <h1 className="mb-2 font-semibold font-nunito">
                  Rabu, 2 Oktober 2024
                </h1>
                <BalanceTransactionItem
                  date="1 Oktober 2024"
                  time="09.45 WIB"
                  title="Pembayaran dari (Nama pembeli)"
                  amount={100000}
                  type="in"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SenimanBalance;
