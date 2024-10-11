import React from "react";
import { FaRegFile } from "react-icons/fa";

const ServiceOrderDetails = ({ eventDetails }) => {
  const formatFileSize = (size) => {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`; // Convert to MB
  };

  const handleFileButtonClick = (file) => {
    console.log("button file clicked");
  };

  return (
    <div className="mb-2">
      <div className="mb-1 font-semibold">Detail Acara</div>
      <table className="w-full">
        <tbody>
          <tr className="align-top">
            <td className="text-gray-500">Nama Acara</td>
            <td>{eventDetails.activity_name}</td>
          </tr>
          <tr className="align-top">
            <td className="text-gray-500">Tanggal Acara</td>
            <td>{eventDetails.activity_date}</td>
          </tr>
          <tr className="align-top">
            <td className="text-gray-500">Waktu Acara</td>
            <td>{eventDetails.activity_time}</td>
          </tr>
          <tr className="align-top">
            <td className="text-gray-500">Lokasi</td>
            <td>{`${eventDetails.address}, ${eventDetails.city.name}, ${eventDetails.province.name}`}</td>
          </tr>
          <tr className="align-top">
            <td className="text-gray-500">Peserta</td>
            <td>{eventDetails.attendee}</td>
          </tr>
          <tr className="align-top">
            <td className="text-gray-500">Catatan</td>
            <td>{eventDetails.description}</td>
          </tr>
          {/* {eventDetails.optional_document?.length > 0 && ("ada")} */}
          {/* <tr className="align-top">
            <td className="text-gray-500">Permintaan Khusus</td>
            <td>{eventDetails.specialRequest}</td>
          </tr> */}
          {/* File Display Section */}
          {/* <tr className="align-top">
            <td className="text-gray-500">File Pendukung</td>
            <td>
              {eventDetails.optional_document.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {eventDetails.files.map((file, index) => (
                    <button
                      onClick={() => handleFileButtonClick(file)}
                      key={index}
                      className="flex items-center gap-2 p-2 mb-2 border rounded-lg"
                    >
                      <FaRegFile className="text-gray-500" />
                      <div className="flex flex-col items-start">
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">
                  Tidak ada file yang diunggah.
                </span>
              )}
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceOrderDetails;
