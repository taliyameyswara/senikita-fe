import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../../components/navbar/Navbar";
import { useProvinceApi } from "../../api/landing/ProvinceApi";
import Heading from "../../components/Heading";
import { Icon } from "leaflet";

import customMarkerIcon from "/assets/custom-marker.png";
import FullPageLoader from "../../components/loading/FullPageLoader";
import MainFooter from "../../components/footer/Footer";
import { Link } from "react-router-dom";

const PetaKesenian = () => {
  const { fetchAllProvince } = useProvinceApi();
  const [province, setProvince] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const customIcon = new Icon({
    iconUrl: customMarkerIcon,
    iconSize: [20, 28],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  useEffect(() => {
    fetchAllProvince()
      .then((provinces) => {
        setProvince(provinces);
      })
      .catch((error) => console.error("Error fetching provinces:", error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <>
      <Navbar />
      <div className="container px-6 py-4 mb-20 mx-auto ">
        <div className="text-center">
          <Heading title="Peta Kesenian" />
          <p className="mb-5">
            Peta ini menunjukkan provinsi-provinsi di Indonesia dengan kesenian
            khas yang unik. <br /> Klik pada setiap provinsi untuk mengetahui
            lebih lanjut tentang budaya dan seni yang dimilikinya.
          </p>
        </div>
        <MapContainer
          center={[-1.1, 130.0]}
          zoom={5}
          className="rounded-2xl z-10 mx-auto"
          style={{ height: "70vh", width: "90%" }}
          maxBounds={[
            [-11.0, 94.0],
            [6.0, 141.0],
          ]}
          maxBoundsViscosity={1.0}
          minZoom={5}
          maxZoom={16}
        >
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.{ext}"
            attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            ext="jpg"
            minZoom={1}
            maxZoom={16}
          />
          {province.map((item) => {
            if (!item.latitude || !item.longitude) {
              console.warn("Skipping invalid province:", item);
              return null;
            }

            return (
              <Marker
                key={item.id}
                position={[
                  parseFloat(item.latitude),
                  parseFloat(item.longitude),
                ]}
                // icon={customIcon}
              >
                <Popup closeButton={false} className="font-raleway">
                  <div className="space-y-1">
                    <h3 className="md:text-xl font-semibold font-crimson !text-primary tracking-wider">
                      {item.name}
                    </h3>
                    <p className="pb-2">{item.subtitle}</p>
                    <div className="flex w-full justify-end">
                      <Link
                        to={`/peta-kesenian/${item.slug}`}
                        className="!text-tertiary font-semibold !pt-2"
                      >
                        Lihat lebih lanjut &rarr;
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* footer */}
        <div className="mt-20">
          <MainFooter />
        </div>
      </div>
    </>
  );
};

export default PetaKesenian;
