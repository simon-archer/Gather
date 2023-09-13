import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { tw } from "twind";

export default function AudioPlayer({ setIsLoading, audioBlob, audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
  const [speed, setSpeed] = useState(1);
  const speedMenuRef = useRef(null);

  console.log('AudioPlayer: Initial audioBlob:', audioBlob);

 // Utility function to format time
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

  const handleSkip = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the element
    const width = rect.width;
    const newTime = (x / width) * duration;
    audioRef.current.currentTime = newTime;
  };
  
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
    console.log("Handling play/pause. Current isPlaying:", isPlaying);
  };

  const handleSpeedChange = (newSpeed) => {
    audioRef.current.playbackRate = newSpeed;
    setSpeed(newSpeed);
    setSpeedMenuOpen(false);
  };

  const handleReplay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset audio time to start
      audioRef.current.play(); // Play the audio
    }
    setIsPlaying(true); // Update the isPlaying state
  };

  const progress = (currentTime / duration) * 100;

  useEffect(() => {
    if (!(audioBlob instanceof Blob)) {
      console.warn("Invalid audioBlob");
      return;
    }
  
    const url = URL.createObjectURL(audioBlob);
    console.log("Audio URL: ", url);
    audioRef.current = new Audio(url);
  
    // Listen for the canplaythrough event
    const handleCanPlayThrough = () => {
      setIsLoading(false);
    };
    audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
  
    console.log("Updated audioBlob: ", audioBlob);
  
    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
      }
    };
  }, [audioBlob]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging) {
        handleSkip(event);
      }
    };
  
    const handleMouseUp = () => {
      setIsDragging(false);
      self.removeEventListener('mousemove', handleMouseMove);
      self.removeEventListener('mouseup', handleMouseUp);
    };
  
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(Math.floor(audioRef.current.currentTime));
      });
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(Math.floor(audioRef.current.duration));
      });
  
      // Listen to mousedown on the document for your progress bar
      document.addEventListener('mousedown', (event) => {
        if (event.target.closest('.progress-bar')) { // Add a class to your progress bar div
          setIsDragging(true);
          self.addEventListener('mousemove', handleMouseMove);
          self.addEventListener('mouseup', handleMouseUp);
        }
      });
    }
  
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', () => {});
        audioRef.current.removeEventListener('loadedmetadata', () => {});
      }
      self.removeEventListener('mousemove', handleMouseMove);
      self.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, audioRef.current]); // Add audioRef.current to the dependency array
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(event.target)) {
        setSpeedMenuOpen(false);
      }
    };
    self.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      self.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const ReplayButton = () => h("button", { class: tw`bg-[#38A1FF] hover:bg-[#318BDC] text-white rounded-full w-10 h-10 flex justify-center items-center shadow-lg`, onClick: () => handleReplay()}, h("svg", { class: tw`fill-current text-white`, width: "24", height: "24" },h("path", { d: "M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" })));
  const SpeedButton = () => h("button", { class: tw`bg-[#38A1FF] hover:bg-[#318BDC] text-white rounded-full w-10 h-10 flex justify-around items-center shadow-lg`, onClick: () => setSpeedMenuOpen(!speedMenuOpen)}, h("svg", { class: tw`fill-current text-white`, width: "24", height: "24" },h("path", { d: "M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z" }) ));
  const SpeedMenu = () => h("div", { class: tw`absolute bottom-32 bg-[#38A1FF] w-10 flex flex-col rounded-3xl shadow-lg`, ref: speedMenuRef }, ['0.75', '1', '1.5', '1.75'].map(s => h("button", { onClick: () => handleSpeedChange(parseFloat(s)), class: tw`hover:bg-[#318BDC] text-white rounded-full h-10 flex justify-around items-center`}, s)));
  const PlayButton = () => h("button", { class: tw`bg-[#38A1FF] hover:bg-[#318BDC] text-white rounded-full w-10 h-10 flex justify-around items-center shadow-lg`,onClick: handlePlayPause },h("svg", { class: tw`fill-current text-white`, width: "24", height: "24" }, h("path", { d: isPlaying ? "M6 19h4V5H6v14zm8-14v14h4V5h-4z" : "M8 5v14l11-7z" })));

  return h("div", { class: tw`fixed bottom-5 flex flex-col-reverse justify-center px-2 items-center w-full` },
[
  h("div", { class: tw`relative px-2 flex-col justify-center items-center bg-gray-100 rounded-full shadow-md w-full` },
    [
      h("div", { class: tw`relative w-full max-w-screen flex flex-col justify-center items-center rounded-lg`,
                 style: { maxWidth: '100vw' } },
        [
          h("div", { class: tw`flex w-full justify-between items-center` }, 
            [
              h("span", { class: tw`m-2 py-2` }, formatTime(currentTime)),
              h("div", { 
                class: tw`relative flex-grow h-2 bg-gray-300 rounded-full progress-bar`, 
                onClick: handleSkip
                },
                [
                  h("div", { 
                    class: tw`bg-[#38A1FF] rounded-full transition-all ease-linear duration-1000`, 
                    style: { width: `${progress}%`, height: '100%' } 
                  })
                ]
              ),
              h("span", { class: tw`m-2` }, formatTime(duration - currentTime))
            ]
          )
        ]
      )
    ]
  ),
  h("div", { class: tw`w-full flex justify-between items-center p-4` }, 
    [
      ReplayButton(),
      PlayButton(),
      h("div", { class: tw`flex items-center` },
        [
          SpeedButton(),
          speedMenuOpen && SpeedMenu()
        ]
      )
    ]
  ),
]);
}