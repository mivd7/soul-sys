import React, { useState } from 'react';

const ControlPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 bg-lcars-orange hover:bg-lcars-gold transition-colors px-6 py-3 rounded-lcars font-lcars font-bold text-black text-xl tracking-wider"
        >
          LCARS ACCESS
        </button>
      )}

      {/* Main Panel */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-96 h-screen z-40 flex flex-col">
          {/* Header Bar */}
          <div className="flex items-stretch h-24">
            {/* Corner piece */}
            <div className="w-32 bg-lcars-purple rounded-br-[48px]" />
            
            {/* Top bar with title */}
            <div className="flex-1 flex items-center justify-between bg-lcars-orange px-6">
              <span className="text-black font-lcars font-bold text-3xl tracking-wider">
                3D SOL SYS
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-black text-lcars-orange hover:text-lcars-gold px-4 py-2 rounded-full font-lcars font-bold text-sm transition-colors"
              >
                [ CLOSE ]
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex">
            {/* Left sidebar with colored strips */}
            <div className="w-32 flex flex-col gap-2 p-2">
              <div className="h-16 bg-lcars-blue rounded-lcars flex items-center justify-center">
                <span className="font-lcars text-black font-bold text-sm">02-654598</span>
              </div>
              <div className="h-20 bg-lcars-coral rounded-lcars flex items-center justify-center">
                <span className="font-lcars text-black font-bold text-sm">03-975683</span>
              </div>
              <div className="h-16 bg-lcars-tan rounded-lcars flex items-center justify-center">
                <span className="font-lcars text-black font-bold text-sm">04-765486</span>
              </div>
              <div className="h-20 bg-lcars-gold rounded-lcars flex items-center justify-center">
                <span className="font-lcars text-black font-bold text-sm">05-224953</span>
              </div>
              <div className="flex-1 bg-lcars-orange rounded-lcars flex items-center justify-center">
                <span className="font-lcars text-black font-bold text-sm">06-578565</span>
              </div>
            </div>

            {/* Main display area with glassmorphism */}
            <div className="flex-1 backdrop-blur-md bg-black/80 p-6 border-l-4 border-lcars-orange">
              <div className="h-full flex flex-col">
                {/* Tech readout header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex gap-1">
                    <span className="text-lcars-orange font-lcars text-lg font-bold">●</span>
                    <span className="text-lcars-gold font-lcars text-lg font-bold">●</span>
                    <span className="text-lcars-blue font-lcars text-lg font-bold">●</span>
                  </div>
                  <span className="text-lcars-orange font-lcars text-sm tracking-wider">
                    SYSTEM READY
                  </span>
                </div>

                {/* Content will go here */}
                <div className="flex-1 text-lcars-blue font-lcars">
                  {/* Placeholder for planet list or details */}
                </div>

                {/* Bottom tech display */}
                <div className="flex justify-between items-center pt-4 border-t border-lcars-orange/30">
                  <span className="text-lcars-gold font-lcars text-xs tracking-wider">
                    DATA NODE 188
                  </span>
                  <div className="flex gap-2 font-lcars text-xs text-lcars-blue">
                    <span>9988-224</span>
                    <span>●</span>
                    <span>0120-089</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ControlPanel;