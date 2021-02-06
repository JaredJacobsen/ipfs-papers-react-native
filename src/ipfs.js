import IpfsHttpClient from "ipfs-http-client";

// const ipfs = IpfsHttpClient("http://localhost:5001");
const ipfs = IpfsHttpClient("/ip4/127.0.0.1/tcp/5001");

export default ipfs;
