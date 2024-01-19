interface Location {
  latitude: number;
  longitude: number;
}

export const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

export const calculateDistance = (coord1: Location, coord2: Location) => {
  const R = 6371; // Earth radius in kilometers

  const dLat = deg2rad(coord2.latitude! - coord1.latitude!);
  const dLng = deg2rad(coord2.longitude! - coord1.longitude!);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.latitude!)) *
      Math.cos(deg2rad(coord2.latitude!)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return (distance * 1000).toFixed(2);
};

export const getCurrentLocation = async (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error.message);
          reject({ latitude: null, longitude: null });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      reject({ latitude: null, longitude: null });
    }
  });
};
