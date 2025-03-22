import { EntityData, EllipseData } from "./types";
import novaimage from "../../assets/images/nova.svg";
import echoimage from "../../assets/images/echo.svg";
import pulseimage from "../../assets/images/pulse.svg";
import quantumimage from "../../assets/images/quantum.svg";
import synthimage from "../../assets/images/synth.svg";
import nexusimage from "../../assets/images/nexus.svg";

export const entitiesData: EntityData[] = [
  {
    id: "omega-1",
    name: "Omega",
    role: "Industry Scout",
    status: "Running",
    imageSrc: novaimage,
    results: {
      count: 10,
      type: "high-potential markets",
      description: "with significant growth opportunities",
    },
    timestamp: {
      lastRun: "3/9/2025, 8:00:00 AM",
      timeTaken: "600 seconds",
    },
  },
  {
    id: "human-worker",
    name: "Human Worker",
    role: "Industry Scout",
    status: "Scheduled",
    imageSrc:
      "https://s3-alpha-sig.figma.com/img/9fd8/cb46/56c727231b5a45fe030da9464f7ff9d1?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mZmWSJX216WLS7OOM6ShPvUwZhASWsK-ypG9~LvXQ8xpvcAUUjV9CMX7QccS5DmeVkhTUmPiM3jMMCbEuleesPJT6-uiOSEr0uHIFOv28xHAAZNNszPI3bS1L7X02K6~z2Sv1HydE9-sFQdtgd3veGLB9DvtXRWO89L5IBXDLQC7a1Dd~CJDHbyVoLWcWp6xC0UyauW3teuhfX6ZA1hmTyfc4Iy4N8BygLeT9AMbTr56Lt5Yk7DlJ4Aom7OlI0AZED14fne3m~N~FfXEnwmiAclf381fmOX0sVaz-tfH3NP~PwWdGZ2Ipv~09O3u5PRNImyzWJCnSSZxyW8SwljdLA__",
    results: {
      count: 8,
      type: "emerging trends",
      description: "in sustainable technologies",
    },
    timestamp: {
      lastRun: "3/8/2025, 2:30:00 PM",
      timeTaken: "450 seconds",
    },
  },
  {
    id: "echo",
    name: "Echo",
    role: "Industry Scout",
    status: "Scheduled",
    imageSrc: echoimage,
    results: {
      count: 15,
      type: "market opportunities",
      description: "in digital transformation",
    },
    timestamp: {
      lastRun: "3/8/2025, 10:15:00 AM",
      timeTaken: "720 seconds",
    },
  },
  {
    id: "pulse",
    name: "Pulse",
    role: "Industry Scout",
    status: "Scheduled",
    imageSrc: pulseimage,
    results: {
      count: 12,
      type: "growth sectors",
      description: "in healthcare innovation",
    },
    timestamp: {
      lastRun: "3/7/2025, 4:45:00 PM",
      timeTaken: "540 seconds",
    },
  },
  {
    id: "quantum",
    name: "Quantum",
    role: "Industry Scout",
    status: "Scheduled",
    imageSrc: quantumimage,
    results: {
      count: 7,
      type: "breakthrough technologies",
      description: "in quantum computing",
    },
    timestamp: {
      lastRun: "3/7/2025, 1:20:00 PM",
      timeTaken: "800 seconds",
    },
  },
  {
    id: "synth",
    name: "Synth",
    role: "Industry Scout",
    status: "Scheduled",
    imageSrc: synthimage,
    results: {
      count: 9,
      type: "market segments",
      description: "in synthetic biology",
    },
    timestamp: {
      lastRun: "3/6/2025, 11:30:00 AM",
      timeTaken: "660 seconds",
    },
  },
  {
    id: "nexus",
    name: "Nexus",
    role: "Industry Scout",
    status: "Scheduled",
    imageSrc: nexusimage,
    results: {
      count: 11,
      type: "strategic partnerships",
      description: "in cross-industry innovation",
    },
    timestamp: {
      lastRun: "3/6/2025, 9:15:00 AM",
      timeTaken: "580 seconds",
    },
  },
  {
    id: "nova-2",
    name: "Nova",
    role: "Industry Scout",
    status: "Scheduled",
    imageSrc: novaimage,
    results: {
      count: 6,
      type: "emerging markets",
      description: "in renewable energy",
    },
    timestamp: {
      lastRun: "3/5/2025, 3:45:00 PM",
      timeTaken: "420 seconds",
    },
  },
];

export const ellipseData: EllipseData[] = [
  {
    src: "/ellipse-138.svg",
    width: "218px",
    height: "257px",
    top: "123px",
    left: "520px",
  },
  {
    src: "/ellipse-140.svg",
    width: "257px",
    height: "218px",
    top: "3px",
    left: "28px",
  },
  {
    src: "/ellipse-141.svg",
    width: "218px",
    height: "257px",
    top: "123px",
    left: "0px",
  },
  {
    src: "/ellipse-139.svg",
    width: "289px",
    height: "250px",
    top: "0px",
    left: "351px",
  },
  {
    src: "/ellipse-142.svg",
    width: "218px",
    height: "257px",
    top: "0px",
    left: "0px",
  },
  {
    src: "/ellipse-143.svg",
    width: "257px",
    height: "218px",
    top: "151px",
    left: "28px",
  },
  {
    src: "/ellipse-144.svg",
    width: "257px",
    height: "218px",
    top: "151px",
    left: "0px",
  },
  {
    src: "/ellipse-145.svg",
    width: "218px",
    height: "257px",
    top: "0px",
    left: "151px",
  },
];
