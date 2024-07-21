import { AnimatePresence } from "framer-motion";
import { Input, Radio, Select } from "antd";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { RegistrationContext } from "../../../middleware/RegistrationContext";
import {
  P2PServices,
  destinationLocations,
  otherSourceLocation,
  sourceLocations,
} from "../../../lib/constants";
import { Image } from "antd";
import { PittsburghMap } from "../../../assets";

const SourceDestinationSelect = () => {
  const registrationContext = useContext(RegistrationContext);
  const { source, setSource, destination, setDestination, service } =
    registrationContext;

  const [sourceLocation, setSourceLocation] = useState(source);
  const [destinationLocation, setDestinationLocation] = useState(destination);
  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col items-center p-8 gap-4"
        key="source-destination-container"
      >
        {service === P2PServices.FIND_A_RIDE ? (
          <motion.div
            className="flex flex-col justify-center gap-4 items-center max-w-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            viewport={{ once: true }}
            key={"source-container"}
          >
            <div>Where would you be starting your ride from?</div>
            <Radio.Group
              onChange={(e) => {
                if (e.target.value !== otherSourceLocation) {
                  setSource(e.target.value);
                } else {
                  setSource("");
                }
                setSourceLocation(e.target.value);
              }}
              value={sourceLocation}
              buttonStyle="solid"
              className="flex flex-col w-full gap-2"
            >
              {sourceLocations.map((location) => (
                <Radio.Button key={location} value={location}>
                  {location}
                </Radio.Button>
              ))}
            </Radio.Group>
          </motion.div>
        ) : null}
        {sourceLocation === otherSourceLocation ||
        service === P2PServices.REQUEST_A_UHAUL ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2 w-full max-w-sm"
          >
            Where would you start from?
            <Input
              type="text"
              placeholder="Enter your starting location"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="p-2 text-sm border focus:outline-cmu-red rounded"
            />
          </motion.div>
        ) : null}
        {source !== otherSourceLocation && source !== "" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2 w-full max-w-sm "
          >
            <div>Where would you like to go?</div>
            <Select
              placeholder="Select your destination"
              value={destinationLocation}
              onChange={(value) => {
                if (value !== "Other") {
                  setDestination(value);
                } else {
                  setDestination("");
                }
                setDestinationLocation(value);
              }}
              className="w-full border text-sm focus:outline-cmu-red rounded"
            >
              {destinationLocations.map((location) => (
                <Select.Option key={location} value={location}>
                  {location}
                </Select.Option>
              ))}
            </Select>
            {destinationLocation === "Other" ? (
              <div className="flex flex-col gap-2 w-full max-w-sm">
                <div>Please specify your destination:</div>
                <Input
                  type="text"
                  placeholder="Enter your specific destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-2 border text-sm focus:outline-cmu-red rounded"
                />
              </div>
            ) : null}
            {sourceLocation ? (
              <div className="flex flex-col gap-2 w-full max-w-sm">
                <Image className="w-full max-w-sm" src={PittsburghMap} />
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
};

export default SourceDestinationSelect;
