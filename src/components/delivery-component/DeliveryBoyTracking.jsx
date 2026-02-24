import scooter from "../../assets/scooter.png";
import home from "../../assets/home.png";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Polyline, Popup } from "react-leaflet";
import * as L from "leaflet";

const deliveryBoyIcon = new L.Icon({
  iconUrl: scooter,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const customerIcon = new L.Icon({
  iconUrl: home,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function DeliveryBoyTracking({ data }) {
  const deliveryBoyLat = data?.deliveryBoyLocation?.lat;
  const deliveryBoyLon = data?.deliveryBoyLocation?.lon;
  const customerLat = data?.customerLocation?.lat;
  const customerLon = data?.customerLocation?.lon;

  // 🚨 STOP if any coordinate missing
  if (
    deliveryBoyLat == null ||
    deliveryBoyLon == null ||
    customerLat == null ||
    customerLon == null
  ) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-gray-400 border border-white/20 rounded-2xl">
        Waiting for location data...
      </div>
    );
  }

  const path = [
    [deliveryBoyLat, deliveryBoyLon],
    [customerLat, customerLon],
  ];

  const center = [deliveryBoyLat, deliveryBoyLon];

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-white/20">
      <MapContainer
        key={`${deliveryBoyLat}-${deliveryBoyLon}`}
        zoom={16}
        className="w-full h-full"
        center={center}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[deliveryBoyLat, deliveryBoyLon]}
          icon={deliveryBoyIcon}
        >
          <Popup>Delivery Boy</Popup>
        </Marker>

        <Marker
          position={[customerLat, customerLon]}
          icon={customerIcon}
        >
          <Popup>Customer</Popup>
        </Marker>

        <Polyline positions={path} color="blue" />
      </MapContainer>
    </div>
  );
}

export default DeliveryBoyTracking;