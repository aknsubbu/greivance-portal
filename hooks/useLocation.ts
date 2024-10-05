import { useState, useEffect } from "react";
import * as Location from "expo-location";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation({
          ...location,
          error: "Permission to access location was denied",
        });
        return;
      }

      try {
        let locationResult = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: locationResult.coords.latitude,
          longitude: locationResult.coords.longitude,
          error: null,
        });
      } catch (err) {
        setLocation({ ...location, error: "Error fetching location" });
      }
    })();
  }, []);

  return location;
};
