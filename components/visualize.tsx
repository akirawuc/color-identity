import styled from "styled-components";
import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  WagmiConfig, createConfig, configureChains,  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'

const ColorBox = styled.div`
  background-color: ${(props) => "#" + props.color};
  width: calc(100vw / 8); // fill the whole horizontal space divided by 7
  height: 100vh;
  margin: 0;
`;

const EthereumAddressColorVisualizer = () => {
  const { address, connector, isConnected } = useAccount()
  const [colors, setColors] = useState([]);

    // process only if address is set
    if (isConnected) {
        const addressWithoutPrefix = address.slice(2); // remove '0x'
        let colorCodes = [];

        for (let i = 0; i < addressWithoutPrefix.length; i += 6) {
          let group = addressWithoutPrefix.slice(i, i + 6);

          // pad the group with '0' if less than 6 characters
            if (group.length < 6) {
                group = group.padEnd(6, "0");
            };

          colorCodes.push(group);
        }

        if (colorCodes.length > 1) {
        useEffect(() => {
            setColors(colorCodes);
                }, [address]);
        }
        

      return (
        <div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {colors.map((color, index) => (
              <ColorBox key={index} color={color} />
            ))}
          </div>
        </div>
      );
    } else {
        return (
            <div>
                <h1>Connect your wallet to visualize your Ethereum address as a color!</h1>
            </div>
        )
    }
};


export default EthereumAddressColorVisualizer;
