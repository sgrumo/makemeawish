import type { NextConfig } from "next";
import pattycake from "pattycake";

const nextConfig: NextConfig = pattycake.next({
}, { disableOptionalChaining: false });

export default nextConfig;
