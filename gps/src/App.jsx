import "./App.css";
import ChatApi from "./ChatApi";
import FullscreenMonitoring from "./FullscreenMonitoring";
import GpsLocating from "./GpsLocating";
import OpenCamera from "./OpenCamera";
import MaximizedText from "./FullscreenMonitoring";
import OnTabMonitor from "./OnTabMonitor";
import OnBrowserMonitor from "./OnBrowserMonitor";
import FaceLandmarksLogger from "./FaceLandmarksLogger";
import FacePoseLogger from "./FacePoseLogger";
import FacePoseLoggerWithSound from "./FacePoseLoggerWithSound";
import ChatApiSeperateQuestions from "./ChatApiSeperateQuestions";

function App() {
  return (
    <>
      {/* <GpsLocating /> */}
      <ChatApi />
      {/* <ChatApiSeperateQuestions /> */}
      {/* <FullscreenMonitoring /> */}
      {/* <MaximizedText /> */}
      {/* <OnTabMonitor /> */}
      {/* <OnBrowserMonitor /> */}
      {/* <OpenCamera /> */}
      {/* <FaceLandmarksLogger /> */}
      {/* <FacePoseLogger /> */}
      {/* <FacePoseLoggerWithSound /> */}
    </>
  );
}

export default App;